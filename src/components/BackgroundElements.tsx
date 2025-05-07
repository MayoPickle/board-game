import React from 'react';

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient backgrounds */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 via-purple-100/10 to-transparent dark:from-purple-900/10 dark:via-purple-800/5 -translate-x-1/3 -translate-y-1/3 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-pink-200/20 via-pink-100/10 to-transparent dark:from-pink-900/10 dark:via-pink-800/5 translate-x-1/3 translate-y-1/3 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 via-pink-200/10 to-transparent dark:from-purple-900/5 dark:via-pink-900/5 rounded-full blur-3xl"></div>
      
      {/* Grid pattern - subtle lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMzAsMzAsMjAwLDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHptMCAwaDMwdjMwSDMweiIgc3Ryb2tlPSJyZ2JhKDEzMCwzMCwyMDAsMC4wMykiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-70 dark:opacity-40"></div>

      {/* Floating animated pieces */}
      <div className="absolute top-1/4 left-1/4 w-5 h-5 rounded-full bg-black/10 dark:bg-black/30 blur-[1px] float"></div>
      <div className="absolute top-3/4 left-2/3 w-6 h-6 rounded-full bg-white border border-slate-300/30 dark:border-slate-600/30 blur-[1px] shadow-md animate-[float_7s_ease-in-out_infinite_1s]"></div>
      <div className="absolute top-2/3 left-1/5 w-4 h-4 rounded-full bg-black/5 dark:bg-black/20 blur-[1px] animate-[float_9s_ease-in-out_infinite_0.5s]"></div>
      <div className="absolute top-1/5 left-3/4 w-7 h-7 rounded-full bg-white/10 shadow-sm border border-slate-300/10 dark:border-slate-600/10 blur-[1px] animate-[float_8s_ease-in-out_infinite_2s]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-5 h-5 rounded-full bg-black/8 dark:bg-black/25 blur-[1px] animate-[float_10s_ease-in-out_infinite_1.5s]"></div>
      
      {/* Game board in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] dark:opacity-[0.06] spin-slow">
        <div className="absolute inset-0 grid grid-cols-9 grid-rows-9">
          {Array(81).fill(0).map((_, i) => (
            <div key={i} className="border border-slate-800/20 dark:border-slate-200/20"></div>
          ))}
        </div>
      </div>
      
      {/* Small decorative dots */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/5 w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-400/30"></div>
        <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-pink-500/20 dark:bg-pink-400/20"></div>
        <div className="absolute top-2/3 left-1/6 w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-400/30"></div>
        <div className="absolute top-3/4 left-3/4 w-1.5 h-1.5 rounded-full bg-pink-500/20 dark:bg-pink-400/20"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-purple-500/20 dark:bg-purple-400/20"></div>
      </div>
      
      {/* Abstract curved lines */}
      <div className="absolute top-0 right-0 w-80 h-80 border-r-4 border-b-4 border-purple-200/5 dark:border-purple-400/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 border-t-4 border-l-4 border-pink-200/5 dark:border-pink-400/5 rounded-tr-full"></div>
    </div>
  );
} 