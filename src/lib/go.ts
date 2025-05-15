import { CellState, GameState, Player } from './types';

// Board size (19x19 is standard for Go)
export const BOARD_SIZE = 19;

// Initialize a new game state
export function initializeGame(roomId: string): GameState {
  return {
    board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
    currentPlayer: 'black', // Black always goes first in Go
    winner: null,
    gameOver: false,
    roomId,
    players: {},
    spectators: [],
    // Go-specific state data
    meta: {
      captures: { black: 0, white: 0 },
      previousBoard: null, // For ko rule detection
      passes: 0, // Count consecutive passes
      resigned: false
    }
  };
}

// Make a move on the board (place a stone or pass)
export function makeMove(gameState: GameState, row: number, col: number): GameState {
  // Create a deep copy of the current game state
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  
  // Ensure meta exists with all required properties
  if (!newState.meta) {
    newState.meta = {
      captures: { black: 0, white: 0 },
      previousBoard: null,
      passes: 0,
      resigned: false
    };
  }
  
  // Ensure captures exists
  if (!newState.meta.captures) {
    newState.meta.captures = { black: 0, white: 0 };
  }
  
  // Handle pass move
  if (row === -1 && col === -1) {
    return handlePass(newState);
  }
  
  // If the game is over or the cell is already occupied, return the current state
  if (newState.gameOver || newState.board[row][col] !== null) {
    return newState;
  }

  // Save the current board for ko rule checking
  newState.meta.previousBoard = JSON.parse(JSON.stringify(newState.board));
  
  // Place the stone
  newState.board[row][col] = newState.currentPlayer;
  
  // Capture any opponent stones that have no liberties
  const capturedStones = captureStones(newState.board, newState.currentPlayer);
  
  // Update capture counts
  if (capturedStones > 0) {
    newState.meta.captures[newState.currentPlayer] += capturedStones;
  }
  
  // Check if the move is suicidal (player's own stones have no liberties)
  if (!hasLiberties(newState.board, row, col)) {
    // If it's a suicide move, revert the board and return the original state
    return gameState;
  }
  
  // Check for ko rule violation
  if (checkKoViolation(newState)) {
    // If it violates the ko rule, revert and return the original state
    return gameState;
  }
  
  // Reset pass counter since a stone was played
  if (!newState.meta.passes) {
    newState.meta.passes = 0;
  } else {
    newState.meta.passes = 0;
  }
  
  // Switch to the next player
  newState.currentPlayer = newState.currentPlayer === 'black' ? 'white' : 'black';
  
  return newState;
}

// Handle pass move
function handlePass(gameState: GameState): GameState {
  // Ensure meta exists with all required properties
  if (!gameState.meta) {
    gameState.meta = {
      captures: { black: 0, white: 0 },
      previousBoard: null,
      passes: 0,
      resigned: false
    };
  }
  
  // Ensure passes exists
  if (gameState.meta.passes === undefined) {
    gameState.meta.passes = 0;
  }
  
  // Ensure captures exists
  if (!gameState.meta.captures) {
    gameState.meta.captures = { black: 0, white: 0 };
  }
  
  // Increment pass counter
  gameState.meta.passes += 1;
  
  // If both players pass consecutively, the game ends
  if (gameState.meta.passes >= 2) {
    gameState.gameOver = true;
    
    // Determine winner based on captured stones and territory (simplified)
    const blackScore = gameState.meta.captures.black;
    const whiteScore = gameState.meta.captures.white + 6.5; // Add komi (compensation for black's advantage)
    
    if (blackScore > whiteScore) {
      gameState.winner = 'black';
    } else if (whiteScore > blackScore) {
      gameState.winner = 'white';
    } else {
      gameState.winner = 'draw'; // Rare but possible
    }
  } else {
    // Switch to the next player
    gameState.currentPlayer = gameState.currentPlayer === 'black' ? 'white' : 'black';
  }
  
  return gameState;
}

// Capture opponent stones that have no liberties
function captureStones(board: CellState[][], player: Player): number {
  const opponent = player === 'black' ? 'white' : 'black';
  let capturedCount = 0;
  
  // Check each cell on the board
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      // If it's an opponent stone, check if it has liberties
      if (board[r][c] === opponent) {
        // Check if this group has no liberties
        if (!hasLiberties(board, r, c)) {
          // Capture the entire group
          capturedCount += removeGroup(board, r, c);
        }
      }
    }
  }
  
  return capturedCount;
}

// Check if a stone or group has liberties (adjacent empty spaces)
function hasLiberties(board: CellState[][], row: number, col: number): boolean {
  const color = board[row][col];
  if (!color) return true; // Empty space always has liberties
  
  const visited = new Set<string>();
  const queue = [[row, col]];
  
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    
    // Check adjacent cells
    const adjacentPositions = [
      [r-1, c], [r+1, c], [r, c-1], [r, c+1]
    ];
    
    for (const [adjR, adjC] of adjacentPositions) {
      // Check if the position is valid
      if (adjR < 0 || adjR >= BOARD_SIZE || adjC < 0 || adjC >= BOARD_SIZE) {
        continue;
      }
      
      // If there's an empty space, the group has a liberty
      if (board[adjR][adjC] === null) {
        return true;
      }
      
      // Add same-colored stones to the queue
      if (board[adjR][adjC] === color) {
        queue.push([adjR, adjC]);
      }
    }
  }
  
  // If no liberties found, return false
  return false;
}

// Remove a group of stones from the board and return the count
function removeGroup(board: CellState[][], row: number, col: number): number {
  const color = board[row][col];
  if (!color) return 0;
  
  const visited = new Set<string>();
  const queue = [[row, col]];
  let count = 0;
  
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    
    // Remove the stone
    if (board[r][c] === color) {
      board[r][c] = null;
      count++;
      
      // Check adjacent cells
      const adjacentPositions = [
        [r-1, c], [r+1, c], [r, c-1], [r, c+1]
      ];
      
      for (const [adjR, adjC] of adjacentPositions) {
        // Check if the position is valid
        if (adjR < 0 || adjR >= BOARD_SIZE || adjC < 0 || adjC >= BOARD_SIZE) {
          continue;
        }
        
        // Add same-colored stones to the queue
        if (board[adjR][adjC] === color) {
          queue.push([adjR, adjC]);
        }
      }
    }
  }
  
  return count;
}

// Check for ko rule violation (simple ko rule)
function checkKoViolation(gameState: GameState): boolean {
  // Ensure meta exists
  if (!gameState.meta) {
    gameState.meta = {
      captures: { black: 0, white: 0 },
      previousBoard: null,
      passes: 0,
      resigned: false
    };
  }
  
  // Ko rule only applies if there's a previous board state
  if (!gameState.meta.previousBoard) return false;
  
  // Check if the current board is identical to the previous board
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (gameState.board[r][c] !== gameState.meta.previousBoard[r][c]) {
        return false;
      }
    }
  }
  
  // If the boards are identical, it's a ko rule violation
  return true;
} 