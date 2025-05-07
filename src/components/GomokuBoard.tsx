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
  
  // Cell size in pixels
  const cellSize = 32;

  return (
    <div className="board-container overflow-auto">
      <div className="board-bg p-4 rounded-xl shadow-xl border-2 border-amber-300 dark:border-amber-700 overflow-hidden">
        {/* Board with coordinates and lines */}
        <div className="flex flex-col">
          {/* Top row for column coordinates */}
          <div className="flex h-6 mb-1">
            {/* Empty corner for top-left */}
            <div className="w-6"></div>
            
            {/* Column labels (A-O) */}
            {columnLabels.map((label, index) => (
              <div 
                key={`col-${label}`} 
                className="flex items-center justify-center w-8 h-6 text-xs font-medium opacity-80"
              >
                {label}
              </div>
            ))}
          </div>
          
          {/* Board with row labels and grid */}
          <div className="flex">
            {/* Row coordinates (1-15) */}
            <div className="flex flex-col w-6 mr-2">
              {rowLabels.map((label, index) => (
                <div 
                  key={`row-${label}`} 
                  className="flex items-center justify-center h-8 w-6 text-xs font-medium opacity-80"
                >
                  {label}
                </div>
              ))}
            </div>
            
            {/* Actual board */}
            <div className="relative gomoku-board">
              {/* Board grid lines - Traditional style with lines */}
              <div 
                className="relative bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800"
                style={{ 
                  width: `${(BOARD_SIZE-1) * cellSize}px`, 
                  height: `${(BOARD_SIZE-1) * cellSize}px`,
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
                }}
              >
                {/* Horizontal lines */}
                {Array.from({ length: BOARD_SIZE }).map((_, index) => (
                  <div 
                    key={`h-line-${index}`}
                    className="absolute w-full h-[1px] bg-black/60 dark:bg-white/60"
                    style={{ top: `${index * cellSize}px` }}
                  />
                ))}
                
                {/* Vertical lines */}
                {Array.from({ length: BOARD_SIZE }).map((_, index) => (
                  <div 
                    key={`v-line-${index}`}
                    className="absolute h-full w-[1px] bg-black/60 dark:bg-white/60"
                    style={{ left: `${index * cellSize}px` }}
                  />
                ))}

                {/* Clickable intersections */}
                {board.map((row, rowIndex) => 
                  row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        absolute w-8 h-8 -ml-4 -mt-4 
                        flex items-center justify-center gomoku-intersection
                        ${isPlayerTurn && !gameOver && cell === null 
                          ? 'cursor-pointer hover:before:bg-purple-400/20 hover:before:scale-100' 
                          : ''
                        }
                        before:content-[''] before:absolute before:w-6 before:h-6 before:rounded-full 
                        before:scale-0 before:transition-transform before:duration-150
                      `}
                      style={{
                        left: `${colIndex * cellSize}px`,
                        top: `${rowIndex * cellSize}px`
                      }}
                      onClick={() => handleIntersectionClick(rowIndex, colIndex)}
                    >
                      {cell && (
                        <div 
                          className={`
                            rounded-full w-6 h-6 gomoku-stone z-10
                            ${cell === 'black' ? 'black' : 'white'}
                            scale-in
                          `}
                        />
                      )}
                    </div>
                  ))
                )}
                
                {/* Star points (天元和星) */}
                {/* Center point (天元) */}
                <div className="absolute left-1/2 top-1/2 w-[5px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Corner star points (星) */}
                <div className="absolute left-1/4 top-1/4 w-[5px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-3/4 top-1/4 w-[5px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-1/4 top-3/4 w-[5px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-3/4 top-3/4 w-[5px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 