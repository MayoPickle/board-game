import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full flex items-center p-4 relative z-0">
      {/* Decorative game pieces with animation */}
      <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-black opacity-10 dark:opacity-20 animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-16 right-20 w-10 h-10 rounded-full bg-white border border-slate-300/50 dark:border-slate-600/50 opacity-10 dark:opacity-20 animate-[pulse_12s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-14 w-6 h-6 rounded-full bg-black opacity-5 dark:opacity-15 animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 left-16 w-8 h-8 rounded-full bg-white border border-slate-300/50 dark:border-slate-600/50 opacity-10 dark:opacity-20 animate-[pulse_9s_ease-in-out_infinite]"></div>
      
      <div className="game-container relative z-10">
        <div className="text-center mb-4 slide-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 brand-gradient">Rabbit Hole</h1>
          <p className="text-xs md:text-sm opacity-80 max-w-2xl mx-auto">
            跳入兔子洞，与朋友共同体验在线棋牌游戏的乐趣，无需登录，只需分享房间号
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 fade-in">
          <Link 
            href="/games/gomoku" 
            className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-purple-50 dark:hover:bg-purple-900/20 overflow-hidden p-3"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-bl-full"></div>
            
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-bold">五子棋</h2>
              <span className="inline-block p-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
            
            <div className="flex gap-2 mb-1.5">
              <span className="inline-block w-4 h-4 rounded-full bg-black shadow-md"></span>
              <span className="inline-block w-4 h-4 rounded-full bg-white border border-slate-300 dark:border-slate-600 shadow-md"></span>
            </div>
            
            <p className="text-xs opacity-70">
              经典的五子棋游戏，先连成五子者获胜。简单易学，考验策略。
            </p>
            
            <div className="mt-1.5 flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>2 玩家</span>
            </div>
          </Link>
          
          <Link 
            href="/games/go" 
            className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 overflow-hidden p-3"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-600/20 to-transparent rounded-bl-full"></div>
            
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-bold">围棋</h2>
              <span className="inline-block p-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
            
            <div className="flex gap-2 mb-1.5 relative">
              <div className="w-8 h-8 bg-amber-200 dark:bg-amber-800/50 rounded overflow-hidden">
                <div className="absolute w-[9px] h-[1px] bg-black/70 dark:bg-white/70 top-[14px] left-[4px]"></div>
                <div className="absolute w-[9px] h-[1px] bg-black/70 dark:bg-white/70 top-[18px] left-[4px]"></div>
                <div className="absolute w-[1px] h-[9px] bg-black/70 dark:bg-white/70 top-[14px] left-[8px]"></div>
                <div className="absolute w-[1px] h-[9px] bg-black/70 dark:bg-white/70 top-[14px] left-[12px]"></div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-black top-[12px] left-[16px]"></div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-white border border-slate-300 dark:border-slate-600 top-[18px] left-[21px]"></div>
              </div>
            </div>
            
            <p className="text-xs opacity-70">
              围棋，起源于中国古代的战略棋类游戏，黑白双方轮流落子并围地得分。
            </p>
            
            <div className="mt-1.5 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>2 玩家</span>
            </div>
          </Link>
          
          <div className="card opacity-80 relative overflow-hidden group p-3">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 to-slate-100/90 dark:from-slate-800/50 dark:to-slate-800/90 backdrop-blur-[1px] flex items-center justify-center z-10">
              <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-full text-xs font-medium">即将推出</span>
            </div>
            
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-pink-600/20 to-transparent rounded-bl-full"></div>
            
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-bold">更多游戏</h2>
              <span className="inline-block p-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-1.5">
              <span className="px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-700 rounded-md">象棋</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-700 rounded-md">国际象棋</span>
            </div>
            
            <p className="text-xs opacity-70">
              更多精彩棋牌游戏即将加入Rabbit Hole，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 