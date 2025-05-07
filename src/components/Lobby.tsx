import React, { useState } from 'react';

interface LobbyProps {
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onCreateRoom, onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      onJoinRoom(roomId.trim().toUpperCase());
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-8 text-center">五子棋游戏大厅</h2>
        
        <div className="mb-8">
          <button
            onClick={onCreateRoom}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            创建新游戏
          </button>
        </div>
        
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">或者</span>
          </div>
        </div>
        
        <form onSubmit={handleJoinRoom}>
          <div className="mb-4">
            <label htmlFor="roomId" className="block text-sm font-medium mb-1">
              输入房间号
            </label>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              placeholder="例如: ABC123"
              className="input-field"
              maxLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={!roomId.trim()}
            className="btn-secondary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            加入游戏
          </button>
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm opacity-60">创建或加入游戏房间，与朋友一起对战</p>
      </div>
    </div>
  );
}; 