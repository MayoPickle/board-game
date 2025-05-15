import React from 'react';
import { BOARD_SIZE } from '@/lib/go';
import { CellState, GameState, Player } from '@/lib/types';

interface GoBoardProps {
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
  onPass: () => void;
  playerId: string;
}

export const GoBoard: React.FC<GoBoardProps> = ({
  gameState,
  onCellClick,
  onPass,
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

  // Handle pass move
  const handlePass = () => {
    if (isPlayerTurn && !gameOver) {
      onPass();
    }
  };

  // Generate column labels (A-T, skip I to match traditional Go notation)
  const columnLabels = Array.from({ length: BOARD_SIZE }, (_, i) => {
    // Skip 'I' in column labels as per Go tradition
    let char = String.fromCharCode(65 + i);
    if (char >= 'I') {
      char = String.fromCharCode(char.charCodeAt(0) + 1);
    }
    return char;
  });

  // Generate row labels (19-1, top to bottom)
  const rowLabels = Array.from({ length: BOARD_SIZE }, (_, i) => BOARD_SIZE - i);
  
  // Cell size in pixels
  const cellSize = 28; // Slightly smaller than Gomoku since Go board is larger

  // Get star points (9 in a standard 19x19 board)
  const getStarPoints = () => {
    const starPoints = [
      [3, 3], [3, 9], [3, 15],
      [9, 3], [9, 9], [9, 15],
      [15, 3], [15, 9], [15, 15]
    ];
    
    return starPoints.map(([row, col], index) => (
      <div 
        key={`star-${index}`} 
        className="absolute w-[5px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${col * cellSize}px`,
          top: `${row * cellSize}px`
        }}
      />
    ));
  };

  return (
    <div className="board-container overflow-auto">
      <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-xl shadow-xl border-2 border-amber-300 dark:border-amber-700 overflow-hidden">
        <div className="mb-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-black mr-1"></div>
              <span className="text-xs">黑: {gameState.meta?.captures?.white || 0}子</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-white border border-slate-300 dark:border-slate-600 mr-1"></div>
              <span className="text-xs">白: {gameState.meta?.captures?.black || 0}子</span>
            </div>
          </div>
          
          {isPlayerTurn && !gameOver && (
            <button 
              onClick={handlePass}
              className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
            >
              虚着 (Pass)
            </button>
          )}
        </div>
        
        {/* Board with coordinates and lines */}
        <div className="flex flex-col">
          {/* Top row for column coordinates */}
          <div className="flex h-5 mb-1">
            {/* Empty corner for top-left */}
            <div className="w-5"></div>
            
            {/* Column labels */}
            {columnLabels.map((label, index) => (
              <div 
                key={`col-${label}`} 
                className="flex items-center justify-center w-7 h-5 text-xs font-medium opacity-80"
              >
                {label}
              </div>
            ))}
          </div>
          
          {/* Board with row labels and grid */}
          <div className="flex">
            {/* Row coordinates */}
            <div className="flex flex-col w-5 mr-1">
              {rowLabels.map((label, index) => (
                <div 
                  key={`row-${label}`} 
                  className="flex items-center justify-center h-7 w-5 text-xs font-medium opacity-80"
                >
                  {label}
                </div>
              ))}
            </div>
            
            {/* Actual board */}
            <div className="relative go-board">
              {/* Board background */}
              <div 
                className="relative bg-amber-200 dark:bg-amber-800/80"
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
                    className="absolute w-full h-[1px] bg-black/70 dark:bg-white/70"
                    style={{ top: `${index * cellSize}px` }}
                  />
                ))}
                
                {/* Vertical lines */}
                {Array.from({ length: BOARD_SIZE }).map((_, index) => (
                  <div 
                    key={`v-line-${index}`}
                    className="absolute h-full w-[1px] bg-black/70 dark:bg-white/70"
                    style={{ left: `${index * cellSize}px` }}
                  />
                ))}

                {/* Star points */}
                {getStarPoints()}

                {/* Clickable intersections */}
                {board.map((row, rowIndex) => 
                  row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        absolute w-7 h-7 -ml-3.5 -mt-3.5 
                        flex items-center justify-center go-intersection
                        ${isPlayerTurn && !gameOver && cell === null 
                          ? 'cursor-pointer hover:before:bg-purple-400/20 hover:before:scale-100' 
                          : ''
                        }
                        before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full 
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
                            rounded-full w-5 h-5 go-stone z-10
                            ${cell === 'black' ? 'black' : 'white'}
                            scale-in
                          `}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 