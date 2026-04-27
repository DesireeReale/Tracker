import { Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function TopBar({ isDarkMode, toggleDarkMode }: TopBarProps) {
  const { user, logout } = useApp();

  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-[0px_12px_32px_rgba(30,41,59,0.04)] flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container flex-shrink-0 ring-2 ring-white/10 shadow-sm relative group">
          <img 
            alt="User profile photo" 
            className="w-full h-full object-cover" 
            src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuDkODb-CPJ9xW-Xln4R5LY80bGX-jxNbVDSgxKzdG_zF_uPBnxbW6l6kZSr5nTnnUjUoPulRf9AlyKvqIuAC7Qd4Vnbq4u24y6czp5h3tXPDI5nFo-M7PGe96-h-gzqFojZ_f-G2sYBItnp9HJxNTLqTWGSfZkEPH4fN7RACaPq_5ukr_89s74Gmp9KJvvqiDjSO_PpvXFFgPUjXM0R_uxae1WRiFn3kKKUThJosyxgqJV-BXKxEu3d_c79ezyRE4nXv5lKZlxo9l5H"} 
          />
          <button 
            onClick={logout}
            className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-primary font-sans leading-none">{user?.displayName || 'Utente'}</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tracker</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className="p-2 hover:bg-surface-container transition-all rounded-full active:scale-95 duration-200 text-on-surface-variant cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <button className="p-2 hover:bg-surface-container transition-all rounded-full active:scale-95 duration-200 text-on-surface-variant relative cursor-pointer">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
