import React, { useState } from 'react';
import { GomokuBoard } from './GomokuBoard';
import { GameState } from '@/lib/types';

interface GameRoomProps {
  gameState: GameState;
  playerId: string;
  onMove: (row: number, col: number) => void;
  onCreateNewRoom: () => void;
}

export const GameRoom: React.FC<GameRoomProps> = ({
  gameState,
  playerId,
  onMove,
  onCreateNewRoom,
}) => {
  const [copied, setCopied] = useState(false);
  
  // Determine player roles
  const isBlackPlayer = gameState.players.black === playerId;
  const isWhitePlayer = gameState.players.white === playerId;
  const isSpectator = !isBlackPlayer && !isWhitePlayer;
  
  // Handle copying room ID to clipboard
  const copyRoomId = () => {
    navigator.clipboard.writeText(gameState.roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Get player status text
  const getPlayerStatus = () => {
    if (isBlackPlayer) return '你是黑棋';
    if (isWhitePlayer) return '你是白棋';
    return '你是观众';
  };
  
  // Get current turn text
  const getTurnText = () => {
    if (gameState.gameOver) {
      if (gameState.winner === 'draw') return '游戏平局';
      return `${gameState.winner === 'black' ? '黑棋' : '白棋'}获胜!`;
    }
    return `当前回合: ${gameState.currentPlayer === 'black' ? '黑棋' : '白棋'}`;
  };
  
  // Get player indicators
  const renderPlayerIndicators = () => {
    return (
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className={`flex-1 flex items-center gap-2 p-2 rounded-lg ${gameState.currentPlayer === 'black' ? 'bg-indigo-100 dark:bg-indigo-900/30 ring-1 ring-indigo-500' : ''}`}>
          <span className="w-4 h-4 rounded-full bg-black"></span>
          <span className="font-medium truncate">{isBlackPlayer ? '你' : '对手'}</span>
        </div>
        
        <div className="text-sm opacity-70 px-2">VS</div>
        
        <div className={`flex-1 flex items-center gap-2 p-2 rounded-lg justify-end ${gameState.currentPlayer === 'white' ? 'bg-indigo-100 dark:bg-indigo-900/30 ring-1 ring-indigo-500' : ''}`}>
          <span className="font-medium truncate">{isWhitePlayer ? '你' : '对手'}</span>
          <span className="w-4 h-4 rounded-full bg-white border border-slate-300 dark:border-slate-600"></span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
          <h2 className="text-lg font-bold flex items-center">
            房间号: 
            <span className="ml-2 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded select-all">{gameState.roomId}</span>
          </h2>
          <button 
            onClick={copyRoomId} 
            className="btn-text flex items-center gap-1 text-sm"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                已复制!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                复制房间号
              </>
            )}
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div className="text-sm px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700">
            {getPlayerStatus()}
          </div>
          <div className="text-sm font-semibold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
            {getTurnText()}
          </div>
        </div>
      </div>
      
      {renderPlayerIndicators()}
      
      <div className="flex justify-center overflow-x-auto pb-6">
        <div className="max-w-full">
          <GomokuBoard 
            gameState={gameState} 
            onCellClick={onMove} 
            playerId={playerId} 
          />
        </div>
      </div>
      
      {gameState.gameOver && (
        <div className="mt-6 text-center">
          <div className={`text-xl font-bold mb-4 ${
            gameState.winner === 'draw' 
              ? 'text-amber-600 dark:text-amber-400' 
              : gameState.winner === 'black' 
                ? 'text-slate-900 dark:text-slate-100' 
                : 'text-slate-700 dark:text-slate-300'
          }`}>
            {gameState.winner === 'draw' 
              ? '游戏平局!' 
              : `${gameState.winner === 'black' ? '黑棋' : '白棋'}获胜!`}
          </div>
          
          <button
            onClick={onCreateNewRoom}
            className="btn-primary"
          >
            开始新游戏
          </button>
        </div>
      )}
    </div>
  );
}; 