import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import FixedCosts from './pages/FixedCosts';
import Analytics from './pages/Analytics';

type Tab = 'dashboard' | 'expenses' | 'fixed' | 'analytics';

export default function App() {
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
