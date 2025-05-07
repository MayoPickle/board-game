// Game types
export type Player = 'black' | 'white';
export type CellState = Player | null;

export interface GameState {
  board: CellState[][];
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  gameOver: boolean;
  roomId: string;
  players: {
    black?: string;
    white?: string;
  };
  spectators: string[];
}

export interface Room {
  id: string;
  game: GameState;
  createdAt: number;
}

// Socket event types
export interface JoinRoomPayload {
  roomId: string;
  playerId: string;
  playerName?: string;
}

export interface MovePayload {
  roomId: string;
  playerId: string;
  row: number;
  col: number;
}

export interface GameStateUpdate {
  gameState: GameState;
} 