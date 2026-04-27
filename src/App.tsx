import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import FixedCosts from './pages/FixedCosts';
import Analytics from './pages/Analytics';
import { useApp } from './context/AppContext';
import { LogIn, Loader2 } from 'lucide-react';

type Tab = 'dashboard' | 'expenses' | 'fixed' | 'analytics';

export default function App() {
  const { user, loading, login } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'expenses':
        return <Expenses key="expenses" />;
      case 'fixed':
        return <FixedCosts key="fixed" />;
      case 'analytics':
        return <Analytics key="analytics" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen bg-surface flex items-center justify-center p-6 ${isDarkMode ? 'dark' : ''}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container-lowest p-10 rounded-[40px] shadow-2xl border border-white/10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-[32px] flex items-center justify-center mx-auto mb-8">
            <LogIn className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight">Benvenuto</h1>
          <p className="text-on-surface-variant font-medium mb-10 leading-relaxed">
            Accedi con il tuo account Google per gestire le tue finanze in modo sicuro e sincronizzato.
          </p>
          <button 
            onClick={login}
            className="w-full bg-primary text-on-primary py-5 rounded-[24px] text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Accedi con Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col transition-colors duration-300">
      <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-8 pb-32 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
