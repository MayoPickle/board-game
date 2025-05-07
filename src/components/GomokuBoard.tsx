import React from 'react';
import { BOARD_SIZE } from '@/lib/gomoku';
import { CellState, GameState, Player } from '@/lib/types';

interface GomokuBoardProps {
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
  playerId: string;
}

export const GomokuBoard: React.FC<GomokuBoardProps> = ({
  gameState,
  onCellClick,
  playerId,
}) => {
  const { board, currentPlayer, winner, gameOver, players } = gameState;
  
  // Determine if the current user is a player and which color they are
  const isPlayer = playerId === players.black || playerId === players.white;
  const playerColor: Player | null = 
    playerId === players.black ? 'black' : 
    playerId === players.white ? 'white' : 
    null;
  
  // Check if it's the current player's turn
  const isPlayerTurn = isPlayer && playerColor === currentPlayer;
  
  // Handle intersection click
  const handleIntersectionClick = (row: number, col: number) => {
    // Only allow clicks if it's the player's turn and the intersection is empty
    if (isPlayerTurn && !gameOver && board[row][col] === null) {
      onCellClick(row, col);
    }
  };

  // Generate column labels (A-O)
  const columnLabels = Array.from({ length: BOARD_SIZE }, (_, i) => 
    String.fromCharCode(65 + i)
  );

  // Generate row labels (1-15)
  const rowLabels = Array.from({ length: BOARD_SIZE }, (_, i) => i + 1);

  return (
    <div className="board-container">
      <div className="board-bg p-4 rounded-xl shadow-lg border border-amber-300 dark:border-amber-800">
        {/* Column coordinates (A-O) */}
        <div className="flex mb-1 ml-7">
          {columnLabels.map((label) => (
            <div key={`col-${label}`} className="w-8 h-8 flex items-center justify-center text-xs opacity-70">
              {label}
            </div>
          ))}
        </div>
        
        <div className="flex">
          {/* Row coordinates (1-15) */}
          <div className="flex flex-col mr-1">
            {rowLabels.map((label) => (
              <div key={`row-${label}`} className="w-6 h-8 flex items-center justify-center text-xs opacity-70">
                {label}
              </div>
            ))}
          </div>
          
          {/* Actual board */}
          <div className="relative gomoku-board">
            {/* Board grid lines */}
            <div 
              className="bg-amber-200 dark:bg-amber-800"
              style={{ 
                width: `${BOARD_SIZE * 32}px`, 
                height: `${BOARD_SIZE * 32}px`,
                position: 'relative',
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.5) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            >
              {/* Clickable intersections */}
              <div 
                className="absolute inset-0 grid"
                style={{ 
                  gridTemplateColumns: `repeat(${BOARD_SIZE}, 32px)`,
                  gridTemplateRows: `repeat(${BOARD_SIZE}, 32px)`,
                }}
              >
                {board.map((row, rowIndex) => 
                  row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        flex items-center justify-center gomoku-intersection
                        ${isPlayerTurn && !gameOver && cell === null ? 'cursor-pointer hover:bg-indigo-200/30' : ''}
                      `}
                      onClick={() => handleIntersectionClick(rowIndex, colIndex)}
                    >
                      {cell && (
                        <div 
                          className={`
                            rounded-full w-7 h-7 gomoku-stone
                            ${cell === 'black' ? 'black' : 'white'}
                            scale-in
                          `}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
              
              {/* Center dot and key points */}
              <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-1/4 top-1/4 w-2 h-2 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-3/4 top-1/4 w-2 h-2 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-1/4 top-3/4 w-2 h-2 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-3/4 top-3/4 w-2 h-2 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 