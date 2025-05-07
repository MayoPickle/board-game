import { CellState, GameState, Player } from './types';

// Board size (15x15 is standard for Gomoku)
export const BOARD_SIZE = 15;

// Initialize a new game state
export function initializeGame(roomId: string): GameState {
  return {
    board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
    currentPlayer: 'black', // Black always goes first in Gomoku
    winner: null,
    gameOver: false,
    roomId,
    players: {},
    spectators: [],
  };
}

// Make a move on the board
export function makeMove(gameState: GameState, row: number, col: number): GameState {
  // If the game is over or the cell is already occupied, return the current state
  if (gameState.gameOver || gameState.board[row][col] !== null) {
    return gameState;
  }

  // Create a deep copy of the current game state
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  
  // Place the stone
  newState.board[row][col] = newState.currentPlayer;
  
  // Check for a winner
  if (checkWin(newState.board, row, col, newState.currentPlayer)) {
    newState.winner = newState.currentPlayer;
    newState.gameOver = true;
  } 
  // Check for a draw
  else if (checkDraw(newState.board)) {
    newState.winner = 'draw';
    newState.gameOver = true;
  } 
  // Switch to the next player
  else {
    newState.currentPlayer = newState.currentPlayer === 'black' ? 'white' : 'black';
  }
  
  return newState;
}

// Check if the game is a draw (all cells filled)
function checkDraw(board: CellState[][]): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

// Check if the current move results in a win
function checkWin(board: CellState[][], row: number, col: number, player: Player): boolean {
  const directions = [
    [1, 0],   // horizontal
    [0, 1],   // vertical
    [1, 1],   // diagonal (top-left to bottom-right)
    [1, -1],  // diagonal (bottom-left to top-right)
  ];
  
  return directions.some(([dx, dy]) => {
    return countConsecutive(board, row, col, player, dx, dy) >= 5;
  });
}

// Count consecutive stones in a direction
function countConsecutive(
  board: CellState[][], 
  row: number, 
  col: number, 
  player: Player, 
  dx: number, 
  dy: number
): number {
  let count = 1;  // Start with 1 for the current stone
  
  // Count in the positive direction
  let r = row + dx;
  let c = col + dy;
  while (
    r >= 0 && r < BOARD_SIZE && 
    c >= 0 && c < BOARD_SIZE && 
    board[r][c] === player
  ) {
    count++;
    r += dx;
    c += dy;
  }
  
  // Count in the negative direction
  r = row - dx;
  c = col - dy;
  while (
    r >= 0 && r < BOARD_SIZE && 
    c >= 0 && c < BOARD_SIZE && 
    board[r][c] === player
  ) {
    count++;
    r -= dx;
    c -= dy;
  }
  
  return count;
} 