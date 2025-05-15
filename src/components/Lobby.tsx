import React, { useState } from 'react';

interface LobbyProps {
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
  gameType?: string;
}

export const Lobby: React.FC<LobbyProps> = ({ 
  onCreateRoom, 
  onJoinRoom,
  gameType = 'gomoku'
}) => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const handleCreateRoom = () => {
    onCreateRoom();
  };
  
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim()) {
      setError('请输入房间号');
      return;
    }
    
    onJoinRoom(roomId.trim().toUpperCase());
  };
  
  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value.toUpperCase());
    if (error) setError(null);
  };

  const getGameTitle = () => {
    switch (gameType) {
      case 'go':
        return '围棋';
      case 'gomoku':
      default:
        return '五子棋';
    }
  };

  const getGameDescription = () => {
    switch (gameType) {
      case 'go':
        return '围棋，起源于中国古代的战略棋类游戏，黑白双方轮流落子并围地得分。';
      case 'gomoku':
      default:
        return '五子棋，简单易学的棋类游戏，黑白双方轮流落子，先连成五子者获胜。';
    }
  };
  
  return (
    <div className="card p-6 sm:p-8 relative overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full"></div>
      
      <h2 className="text-xl font-bold mb-2">{getGameTitle()}</h2>
      <p className="text-sm opacity-70 mb-6">{getGameDescription()}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="card border-dashed border-2 p-4 flex flex-col items-center justify-center hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer"
          onClick={handleCreateRoom}
        >
          <div className="mb-3 w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">创建新房间</h3>
          <p className="text-sm opacity-70 text-center">创建一个新游戏并邀请好友加入</p>
        </div>
        
        <div className="card border-2 p-4">
          <h3 className="font-medium mb-3 text-center">加入已有房间</h3>
          <form onSubmit={handleJoinRoom}>
            <div className="mb-3">
              <input 
                type="text" 
                className="input-field"
                placeholder="输入6位房间号" 
                value={roomId}
                onChange={handleRoomIdChange}
                maxLength={6}
              />
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
            <button 
              type="submit" 
              className="w-full btn-primary"
              disabled={!roomId.trim()}
            >
              加入游戏
            </button>
          </form>
        </div>
      </div>
      
      <div className="text-xs opacity-50 text-center">
        所有游戏均为实时对战，请确保您的网络连接良好
      </div>
    </div>
  );
}; 