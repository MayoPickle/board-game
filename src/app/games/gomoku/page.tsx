'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lobby } from '@/components/Lobby';
import { GameRoom } from '@/components/GameRoom';
import { useSocket } from '@/lib/use-socket';

export default function GomokuPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams ? searchParams.get('room') : null;
  
  const { 
    isConnected, 
    gameState, 
    error, 
    testMessage,
    playerId, 
    createRoom, 
    joinRoom, 
    makeMove 
  } = useSocket();
  
  // Join room from URL parameter if available
  useEffect(() => {
    if (isConnected && roomIdParam && !gameState && playerId) {
      console.log('Joining room from URL parameter:', roomIdParam);
      joinRoom(roomIdParam);
    }
  }, [isConnected, roomIdParam, gameState, playerId, joinRoom]);
  
  // Handle creating a new room
  const handleCreateRoom = () => {
    createRoom();
  };
  
  // Handle joining a room
  const handleJoinRoom = (roomId: string) => {
    // Update URL with room ID
    router.push(`/games/gomoku?room=${roomId}`);
    joinRoom(roomId);
  };
  
  // Handle making a move
  const handleMove = (row: number, col: number) => {
    makeMove(row, col);
  };

  // Show loading state if player ID is not yet available
  if (!playerId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <div className="game-container">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">五子棋</h1>
          <div className="card flex items-center justify-center p-8">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent"></div>
              <span>正在初始化游戏...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="game-container">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">五子棋</h1>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>错误: {error}</span>
          </div>
        )}
        
        {!isConnected && (
          <div className="card flex items-center justify-center p-8">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-500 border-t-transparent"></div>
              <span>正在连接服务器...</span>
            </div>
          </div>
        )}

        {isConnected && !gameState && (
          <Lobby 
            onCreateRoom={handleCreateRoom} 
            onJoinRoom={handleJoinRoom} 
          />
        )}
        
        {isConnected && gameState && (
          <GameRoom 
            gameState={gameState} 
            playerId={playerId} 
            onMove={handleMove} 
            onCreateNewRoom={handleCreateRoom}
          />
        )}

        <div className="mt-8 text-center">
          <p className="text-sm opacity-50">
            连接状态: {isConnected ? '已连接' : '未连接'} | 
            玩家ID: {playerId.substring(0, 8)}...
          </p>
        </div>
      </div>
    </main>
  );
} 