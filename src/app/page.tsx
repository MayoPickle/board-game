import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="game-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">在线棋牌游戏</h1>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">与朋友一起在线游玩棋牌游戏，无需登录，只需房间号即可邀请好友加入</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Link href="/games/gomoku" className="card group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">五子棋</h2>
              <span className="inline-block p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <span className="inline-block w-6 h-6 rounded-full bg-black"></span>
              <span className="inline-block w-6 h-6 rounded-full bg-white border border-slate-300 dark:border-slate-600"></span>
            </div>
            
            <p className="text-sm opacity-70">
              经典的五子棋游戏，先连成五子者获胜。简单易学，老少皆宜。
            </p>
          </Link>
          
          <div className="card opacity-60 cursor-not-allowed">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">更多游戏</h2>
              <span className="inline-block p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </span>
            </div>
            
            <p className="text-sm opacity-70">
              更多精彩棋牌游戏即将推出，敬请期待...
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm opacity-50">© {new Date().getFullYear()} 在线棋牌 | 无需注册 | 即开即玩</p>
        </div>
      </div>
    </main>
  )
} 