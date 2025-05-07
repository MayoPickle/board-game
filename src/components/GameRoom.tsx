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
    const blackActive = gameState.currentPlayer === 'black' && !gameState.gameOver;
    const whiteActive = gameState.currentPlayer === 'white' && !gameState.gameOver;
    
    return (
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className={`flex-1 flex items-center gap-2 p-2 rounded-lg transition-all ${blackActive ? 'bg-purple-100 dark:bg-purple-900/30 shadow-sm' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
          <div className="relative">
            <span className="block w-5 h-5 rounded-full bg-black shadow-md"></span>
            {blackActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full pulse"></span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm truncate">{isBlackPlayer ? '你' : '对手'}</span>
            <span className="text-xs opacity-70">{blackActive ? '思考中...' : ''}</span>
          </div>
        </div>
        
        <div className="text-sm px-3 py-1 flex items-center justify-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-full shadow-sm">
          <span className="font-bold">VS</span>
        </div>
        
        <div className={`flex-1 flex items-center gap-2 p-2 rounded-lg justify-end transition-all ${whiteActive ? 'bg-purple-100 dark:bg-purple-900/30 shadow-sm' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
          <div className="flex flex-col items-end">
            <span className="font-medium text-sm truncate">{isWhitePlayer ? '你' : '对手'}</span>
            <span className="text-xs opacity-70">{whiteActive ? '思考中...' : ''}</span>
          </div>
          <div className="relative">
            <span className="block w-5 h-5 rounded-full bg-white border border-slate-300 dark:border-slate-600 shadow-md"></span>
            {whiteActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full pulse"></span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full">
      <div className="card mb-4 relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">房间号</h2>
              <div className="flex items-center">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm font-mono select-all">{gameState.roomId}</span>
                <button 
                  onClick={copyRoomId} 
                  className="ml-1 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-purple-600 dark:text-purple-400 transition-colors"
                  title="复制房间号"
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs opacity-70 mt-1">分享此房间号邀请好友加入</p>
          </div>
          
          <div className="flex gap-2">
            <div className="text-sm px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>{getPlayerStatus()}</span>
            </div>
            
            <div className="text-sm px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 flex items-center gap-1 font-medium">
              {gameState.currentPlayer === 'black' ? (
                <span className="w-3 h-3 rounded-full bg-black"></span>
              ) : (
                <span className="w-3 h-3 rounded-full bg-white border border-black/20"></span>
              )}
              <span>{getTurnText()}</span>
            </div>
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
        <div className="mt-6 text-center slide-up">
          <div className="card mb-4 py-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-100 dark:border-purple-900/30">
            <div className={`text-2xl font-bold mb-4 ${
              gameState.winner === 'draw' 
                ? 'text-amber-600 dark:text-amber-400' 
                : gameState.winner === 'black' 
                  ? 'text-slate-900 dark:text-slate-100' 
                  : 'text-slate-700 dark:text-slate-300'
            }`}>
              {gameState.winner === 'draw' 
                ? '游戏平局!' 
                : gameState.winner === ((isBlackPlayer) ? 'black' : (isWhitePlayer ? 'white' : null))
                  ? '恭喜，你赢了!'
                  : '游戏结束，你输了'}
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              {gameState.winner === 'black' && (
                <div className="w-8 h-8 rounded-full bg-black shadow-md"></div>
              )}
              {gameState.winner === 'white' && (
                <div className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow-md"></div>
              )}
              {gameState.winner === 'draw' && (
                <>
                  <div className="w-8 h-8 rounded-full bg-black shadow-md"></div>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow-md"></div>
                </>
              )}
            </div>
            
            <button
              onClick={onCreateNewRoom}
              className="btn-primary mx-auto flex items-center gap-2 px-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              开始新游戏
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 