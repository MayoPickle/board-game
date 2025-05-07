import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800/95 shadow-sm border-b border-slate-200 dark:border-slate-700/50 py-3">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold brand-gradient">Rabbit Hole</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/games/gomoku" className="text-sm text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              五子棋
            </Link>
            <span className="text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed">
              围棋
            </span>
            <span className="text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed">
              象棋
            </span>
          </nav>
          
          <div className="flex items-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-md shadow-sm transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新建游戏
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 