import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { GameState, JoinRoomPayload, MovePayload, Room } from './types';
import { initializeGame as initializeGomokuGame, makeMove as makeGomokuMove } from './gomoku';
import { initializeGame as initializeGoGame, makeMove as makeGoMove } from './go';

// Store active game rooms
const rooms: Record<string, Room> = {};

export function initSocketServer(server: NetServer) {
  console.log('Initializing Socket.IO server');
  
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  });

  // Add a test endpoint
  server.on('request', (req, res) => {
    if (req.url === '/api/socket-test') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        status: 'ok', 
        socketRunning: true,
        activeConnections: io.engine.clientsCount,
        activeRooms: Object.keys(rooms).length,
        rooms: Object.keys(rooms)
      }));
      return;
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Add a test event
    socket.emit('test', { message: 'Socket connection successful!' });

    // Create a new room
    socket.on('create_room', (data: { gameType?: string } = {}) => {
      try {
        const gameType = data.gameType || 'gomoku'; // Default to gomoku
        const roomId = generateRoomId();
        let gameState: GameState;
        
        // Initialize the appropriate game type
        if (gameType === 'go') {
          gameState = initializeGoGame(roomId);
          console.log(`Creating Go game room: ${roomId}`);
        } else {
          gameState = initializeGomokuGame(roomId);
          console.log(`Creating Gomoku game room: ${roomId}`);
        }
        
        rooms[roomId] = {
          id: roomId,
          game: gameState,
          createdAt: Date.now(),
        };

        socket.emit('room_created', { roomId, gameType });
      } catch (error) {
        console.error('Error creating room:', error);
        socket.emit('error', { message: 'Failed to create room' });
      }
    });

    // Join a room
    socket.on('join_room', (payload: JoinRoomPayload) => {
      try {
        console.log('Join room request:', payload);
        const { roomId, playerId } = payload;
        const room = rooms[roomId];

        if (!room) {
          console.log(`Room not found: ${roomId}`);
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Join the socket.io room
        socket.join(roomId);

        // Assign player to a color if available
        if (!room.game.players.black) {
          room.game.players.black = playerId;
          console.log(`Player ${playerId} assigned as black in room ${roomId}`);
        } else if (!room.game.players.white) {
          room.game.players.white = playerId;
          console.log(`Player ${playerId} assigned as white in room ${roomId}`);
        } else {
          // Add as spectator
          room.game.spectators.push(playerId);
          console.log(`Player ${playerId} joined as spectator in room ${roomId}`);
        }

        // Send the current game state to the player
        socket.emit('game_state', { gameState: room.game });
        console.log(`Game state sent to player ${playerId}`);
        
        // Notify others in the room
        socket.to(roomId).emit('player_joined', { 
          playerId,
          playerName: payload.playerName || 'Anonymous',
          gameState: room.game
        });

        console.log(`Player ${playerId} joined room ${roomId}`);
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Handle a move
    socket.on('make_move', (payload: MovePayload) => {
      try {
        const { roomId, playerId, row, col } = payload;
        console.log(`Move request: room=${roomId}, player=${playerId}, row=${row}, col=${col}`);
        
        const room = rooms[roomId];

        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Check if the player is allowed to make a move
        const isBlackPlayer = room.game.players.black === playerId;
        const isWhitePlayer = room.game.players.white === playerId;
        
        if (!isBlackPlayer && !isWhitePlayer) {
          socket.emit('error', { message: 'You are not a player in this game' });
          return;
        }

        // Check if it's the player's turn
        const isPlayersTurn = 
          (room.game.currentPlayer === 'black' && isBlackPlayer) ||
          (room.game.currentPlayer === 'white' && isWhitePlayer);

        if (!isPlayersTurn) {
          socket.emit('error', { message: 'Not your turn' });
          return;
        }

        // Make the move based on the game type
        let updatedGameState: GameState;
        
        // Determine game type
        const isGoGame = room.game.meta && 'captures' in room.game.meta;
        
        if (isGoGame) {
          updatedGameState = makeGoMove(room.game, row, col);
        } else {
          updatedGameState = makeGomokuMove(room.game, row, col);
        }
        
        room.game = updatedGameState;

        console.log(`Move made: room=${roomId}, player=${playerId}, row=${row}, col=${col}`);

        // Broadcast the updated game state to all players in the room
        io.to(roomId).emit('game_state', { gameState: updatedGameState });

        // If the game is over, handle end game
        if (updatedGameState.gameOver) {
          io.to(roomId).emit('game_over', { 
            winner: updatedGameState.winner,
            gameState: updatedGameState
          });
          console.log(`Game over in room ${roomId}. Winner: ${updatedGameState.winner}`);
        }
      } catch (error) {
        console.error('Error making move:', error);
        socket.emit('error', { message: 'Failed to make move' });
      }
    });

    // Handle player leaving
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      // Clean up rooms if needed (e.g., remove empty rooms)
      Object.keys(rooms).forEach(roomId => {
        const room = rooms[roomId];
        if (room.game.players.black === socket.id) {
          console.log(`Black player left room ${roomId}`);
          room.game.players.black = undefined;
        } else if (room.game.players.white === socket.id) {
          console.log(`White player left room ${roomId}`);
          room.game.players.white = undefined;
        } else {
          const wasSpectator = room.game.spectators.includes(socket.id);
          if (wasSpectator) {
            console.log(`Spectator left room ${roomId}`);
          }
          room.game.spectators = room.game.spectators.filter(id => id !== socket.id);
        }
        
        // If the room is empty, remove it after some time
        if (!room.game.players.black && !room.game.players.white && room.game.spectators.length === 0) {
          console.log(`Room ${roomId} is empty, scheduling deletion`);
          setTimeout(() => {
            delete rooms[roomId];
            console.log(`Room ${roomId} deleted due to inactivity`);
          }, 60000); // 1 minute
        }
      });
    });
  });

  // Log active connections every minute
  setInterval(() => {
    const socketCount = io.engine.clientsCount;
    const roomCount = Object.keys(rooms).length;
    console.log(`Active connections: ${socketCount}, Active rooms: ${roomCount}`);
  }, 60000);

  return io;
}

// Generate a 6-character room ID
function generateRoomId(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
} 