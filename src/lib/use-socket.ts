import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { GameState, GameStateUpdate, JoinRoomPayload, MovePayload } from './types';

// Socket.IO client instance
let socket: Socket;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState<string | null>(null);
  
  // Use useEffect for client-side only code to avoid hydration mismatch
  const [playerId, setPlayerId] = useState<string>('');
  
  // Initialize player ID on client side only
  useEffect(() => {
    // Generate a unique player ID or use an existing one from localStorage
    const storedId = localStorage.getItem('playerId');
    const newId = storedId || uuidv4();
    
    // Store the ID in localStorage for persistence
    localStorage.setItem('playerId', newId);
    
    // Update state with the player ID
    setPlayerId(newId);
  }, []);

  // Initialize socket connection (only when playerId is available)
  useEffect(() => {
    // Don't initialize socket until we have a player ID
    if (!playerId) return;
    
    // Socket initialization
    const initSocket = () => {
      // Use window.location.origin directly instead of environment variable
      // This ensures the client connects to the same server that served the page
      const socketUrl = window.location.origin;
      console.log('Connecting to socket server at:', socketUrl);
      
      socket = io(socketUrl, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'], // Try WebSocket first, then fallback to polling
      });

      socket.on('connect', () => {
        console.log('Socket connected!', socket.id);
        setIsConnected(true);
        setError(null);
        
        // Test the connection by making a simple request
        fetch('/api/socket-test')
          .then(res => res.json())
          .then(data => {
            console.log('Socket test response:', data);
          })
          .catch(err => {
            console.error('Socket test error:', err);
          });
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        setError(`Failed to connect to server: ${err.message}`);
      });

      socket.on('error', (data: { message: string }) => {
        console.error('Socket error:', data.message);
        setError(data.message);
      });
      
      socket.on('test', (data: { message: string }) => {
        console.log('Test message received:', data);
        setTestMessage(data.message);
      });

      socket.on('game_state', (data: GameStateUpdate) => {
        console.log('Received game state:', data);
        setGameState(data.gameState);
        setError(null);
      });

      socket.on('game_over', (data: { winner: string; gameState: GameState }) => {
        console.log('Game over:', data);
        setGameState(data.gameState);
      });
    };

    if (!socket) {
      initSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [playerId]);

  // Create a new game room
  const createRoom = () => {
    if (!socket) return;
    console.log('Creating room');
    socket.emit('create_room');
  };

  // Join an existing game room
  const joinRoom = (roomId: string, playerName?: string) => {
    if (!socket || !playerId) return;
    console.log('Joining room:', roomId);
    
    const payload: JoinRoomPayload = {
      roomId,
      playerId,
      playerName,
    };
    
    socket.emit('join_room', payload);
  };

  // Make a move on the board
  const makeMove = (row: number, col: number) => {
    if (!socket || !gameState || !playerId) return;
    console.log('Making move:', row, col);
    
    const payload: MovePayload = {
      roomId: gameState.roomId,
      playerId,
      row,
      col,
    };
    
    socket.emit('make_move', payload);
  };

  // Handle room creation response
  useEffect(() => {
    if (!socket || !playerId) return;

    const handleRoomCreated = (data: { roomId: string }) => {
      console.log('Room created:', data.roomId);
      joinRoom(data.roomId);
    };

    socket.on('room_created', handleRoomCreated);

    return () => {
      socket.off('room_created', handleRoomCreated);
    };
  }, [playerId]);

  return {
    isConnected,
    gameState,
    error,
    testMessage,
    playerId,
    createRoom,
    joinRoom,
    makeMove,
  };
}; 