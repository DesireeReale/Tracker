import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Settings, 
  Home as HomeIcon, 
  Utensils, 
  Car, 
  Plus, 
  Target,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import TransactionModal from '../components/TransactionModal';
import ValueModal from '../components/ValueModal';

export default function Dashboard() {
  const { 
    balance, 
    salary, 
    setSalary, 
    savingsGoal, 
    setSavingsGoal,
    transactions,
    totalExpenses,
    totalFixedCosts
  } = useApp();

  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const savingsProgress = Math.min(100, Math.round(((salary - totalExpenses - totalFixedCosts) / savingsGoal) * 100));
  const recentTransactions = transactions.slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-8 pb-12"
    >
      {/* Balance Overview */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 glass-card rounded-[32px] p-8 ambient-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="relative z-10">
            <p className="font-label text-sm text-on-surface-variant mb-2 font-medium">Bilancio Rimanente</p>
            <h2 className="text-5xl font-bold text-primary mb-6 uppercase tracking-tight">€{balance.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</h2>
            <div className="flex items-center gap-2 text-secondary font-label text-xs bg-secondary-container/30 w-fit px-4 py-1.5 rounded-full font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>In linea con il budget</span>
            </div>
            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setIsTransactionModalOpen(true)}
                className="bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <Plus className="w-5 h-5" />
                Aggiungi Spesa
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow flex flex-col justify-between border border-white/20 dark:border-white/5">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label text-sm text-on-surface-variant font-medium">Stipendio Mensile</p>
            <button 
              onClick={() => setIsSalaryModalOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors p-2 hover:bg-surface-container rounded-full"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">€{salary.toLocaleString('it-IT')},00</p>
            <div className="mt-4 flex items-center gap-1 text-secondary font-bold text-xs uppercase tracking-wider">
              <ArrowUpRight className="w-4 h-4" />
              <span>Entrata confermata</span>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Goal */}
      <section>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-2xl font-bold text-on-surface tracking-tight">Obiettivo Risparmio</h3>
          <button 
            onClick={() => setIsGoalModalOpen(true)}
            className="text-xs font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors uppercase tracking-widest"
          >
            Modifica
          </button>
        </div>
        <div className="bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow flex flex-col md:flex-row items-center gap-8 border border-white/20 dark:border-white/5 transition-all hover:shadow-lg">
          <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-surface-container" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
              <circle 
                className="stroke-secondary transition-all duration-1000 ease-out" 
                cx="50" cy="50" fill="none" r="45" 
                strokeWidth="8"
                strokeDasharray="282.7" 
                strokeDashoffset={282.7 - (282.7 * savingsProgress) / 100} 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-secondary">{savingsProgress}%</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xl font-bold text-primary">Fondo Risparmio</p>
                <p className="text-sm text-on-surface-variant font-medium">Traguardo: €{savingsGoal.toLocaleString('it-IT')}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">€{(salary - totalExpenses - totalFixedCosts).toLocaleString('it-IT')}</p>
                <p className="font-label text-xs text-secondary font-bold uppercase tracking-wider">In corso</p>
              </div>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${savingsProgress}%` }}
                className="h-full bg-secondary rounded-full"
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-2xl font-bold text-on-surface tracking-tight">Ultime Attività</h3>
          <button className="text-xs font-bold text-primary uppercase tracking-widest">Tutte</button>
        </div>
        <div className="flex flex-col gap-4">
          {recentTransactions.map((t) => (
            <div key={t.id} className="group flex items-center justify-between p-4 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-white/40 dark:hover:border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm font-bold">
                  {t.category === 'Cibo' ? <Utensils className="w-6 h-6" /> : 
                   t.category === 'Trasporti' ? <Car className="w-6 h-6" /> : 
                   <HomeIcon className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-lg font-bold text-on-surface">{t.category}</p>
                  <p className="text-sm text-on-surface-variant font-medium">{t.description || 'Registrato'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-primary">-€{t.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
                <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <div className="text-center py-8 text-on-surface-variant border-2 border-dashed border-surface-container rounded-[32px]">
              <p className="font-bold">Nessuna transazione recente</p>
              <p className="text-sm">Inizia ad aggiungere le tue spese giornaliere</p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <ValueModal 
        isOpen={isSalaryModalOpen} 
        onClose={() => setIsSalaryModalOpen(false)}
        title="Modifica Stipendio"
        initialValue={salary}
        onConfirm={setSalary}
        label="Stipendio Mensile"
      />
      <ValueModal 
        isOpen={isGoalModalOpen} 
        onClose={() => setIsGoalModalOpen(false)}
        title="Obiettivo Risparmio"
        initialValue={savingsGoal}
        onConfirm={setSavingsGoal}
        label="Traguardo Mensile"
      />
      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => setIsTransactionModalOpen(false)}
        type="expense"
      />
    </motion.div>
  );
}
