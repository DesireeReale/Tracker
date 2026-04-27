import { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Car, Smartphone, Plus, Trash2, ShoppingBag, Music, Heart, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TransactionModal from '../components/TransactionModal';

export default function Expenses() {
  const { transactions, deleteTransaction, balance } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = lastDayOfMonth - today.getDate() + 1;
  const dailyBudget = Math.max(0, balance / daysRemaining);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Cibo': return <Utensils className="w-5 h-5" />;
      case 'Trasporti': return <Car className="w-5 h-5" />;
      case 'Shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'Svago': return <Music className="w-5 h-5" />;
      case 'Salute': return <Heart className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const totalSpentToday = expenses
    .filter(e => new Date(e.date).toDateString() === today.toDateString())
    .reduce((acc, e) => acc + e.amount, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col gap-10 pb-24"
    >
      <section className="flex flex-col gap-1 px-2">
        <h1 className="font-label text-sm text-on-surface-variant uppercase tracking-widest font-bold">Spesi Oggi</h1>
        <div className="text-5xl font-bold text-primary">€{totalSpentToday.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow border border-white/20 dark:border-white/5 hover:shadow-lg transition-all flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">Analisi Rapida</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">Budget Rimanente</span>
            <span className="text-sm text-on-surface-variant font-medium mt-1">€{balance.toLocaleString('it-IT')} disponibili</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow border border-white/20 dark:border-white/5 hover:shadow-lg transition-all flex items-center justify-between min-h-[160px]">
          <div className="flex flex-col">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-4">Budget Giornaliero</span>
            <span className="text-xl font-bold text-primary leading-none">
              €{dailyBudget.toLocaleString('it-IT', { maximumFractionDigits: 0 })} <span className="text-on-surface-variant font-medium text-base">/ gg</span>
            </span>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-surface-container" cx="50" cy="50" fill="none" r="40" strokeWidth="6" />
              <circle 
                className="stroke-secondary" 
                cx="50" cy="50" fill="none" r="40" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * Math.min(100, Math.round((dailyBudget / (dailyBudget + totalSpentToday)) * 100))) / 100} 
                strokeLinecap="round" 
                strokeWidth="6" 
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-primary">OPTIMAL</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-on-surface mb-2 px-2 tracking-tight">Transazioni Recenti</h3>
        <div className="flex flex-col gap-2">
          {expenses.map((expense) => (
            <motion.div 
              key={expense.id}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 rounded-[24px] hover:bg-surface-container-low transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  {getIcon(expense.category)}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-on-surface">{expense.category}</span>
                  <span className="text-sm text-on-surface-variant font-medium">{new Date(expense.date).toLocaleDateString('it-IT')} {expense.description && `- ${expense.description}`}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-primary">-€{expense.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                <button 
                  onClick={() => deleteTransaction(expense.id)}
                  className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          {expenses.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant font-medium">Nessuna spesa recentemente registrata</div>
          )}
        </div>
      </section>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[110px] right-6 z-40 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
      >
        <Plus className="w-8 h-8" />
      </button>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="expense"
      />
    </motion.div>
  );
}
