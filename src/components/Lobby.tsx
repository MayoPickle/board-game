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
      <div className="card relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full"></div>
        
        <h2 className="text-2xl font-bold mb-8 text-center">五子棋游戏大厅</h2>
        
        <div className="mb-8 relative">
          <button
            onClick={onCreateRoom}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 group transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:rotate-90">
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
            <label htmlFor="roomId" className="block text-sm font-medium mb-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-purple-500">
                <path fillRule="evenodd" d="M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 010-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h4.085l1.079-5.397a.75.75 0 01.683-.588zM11.265 9l-1.2 6h4.47l1.2-6h-4.47z" clipRule="evenodd" />
              </svg>
              输入房间号
            </label>
            <div className="relative">
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="例如: ABC123"
                className="input-field pr-10"
                maxLength={6}
              />
              {roomId && (
                <button
                  type="button"
                  onClick={() => setRoomId('')}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-xs mt-1 text-slate-500">房间号为6位字母数字组合</p>
          </div>
          <button
            type="submit"
            disabled={!roomId.trim()}
            className="btn-secondary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            加入游戏
          </button>
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm opacity-60">创建或加入游戏房间，与朋友一起跳入兔子洞</p>
      </div>
    </div>
  );
}; 