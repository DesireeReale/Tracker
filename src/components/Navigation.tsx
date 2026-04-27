import { motion } from 'motion/react';
import { Home, CreditCard, Repeat, BarChart2 } from 'lucide-react';

type Tab = 'dashboard' | 'expenses' | 'fixed' | 'analytics';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'expenses' as const, label: 'Spese', icon: CreditCard },
    { id: 'fixed' as const, label: 'Costi Fissi', icon: Repeat },
    { id: 'analytics' as const, label: 'Analisi', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-surface/90 backdrop-blur-xl border-t border-outline-variant shadow-[0px_-12px_32px_rgba(30,41,59,0.06)] rounded-t-[24px]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-300 relative ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-surface-container rounded-2xl -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-primary/20' : ''}`} />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
