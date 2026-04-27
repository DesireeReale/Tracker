import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Zap, Pill, Dumbbell, Smartphone, Music, Plus, Trash2, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TransactionModal from '../components/TransactionModal';

export default function FixedCosts() {
  const { transactions, deleteTransaction, totalFixedCosts } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fixedCosts = transactions.filter(t => t.type === 'fixed');

  const getIcon = (category: string) => {
    switch (category) {
      case 'Affitto': return <Home className="w-6 h-6" />;
      case 'Utenze': return <Zap className="w-6 h-6" />;
      case 'Salute': return <Pill className="w-6 h-6" />;
      case 'Abbonamenti': return <Music className="w-6 h-6" />;
      default: return <Smartphone className="w-6 h-6" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-10 pb-12"
    >
      <section>
        <div className="bg-surface-container-lowest rounded-[32px] shadow-sm border border-white/20 dark:border-white/5 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed rounded-full blur-[80px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
          <h2 className="font-label text-xs text-on-surface-variant uppercase tracking-[0.2em] mb-4 font-bold">Totale Impegni Mensili</h2>
          <div className="text-5xl font-bold text-primary flex items-baseline gap-1 mb-4">
            <span className="text-2xl text-on-surface-variant font-medium">€</span>
            {totalFixedCosts.toLocaleString('it-IT')}<span className="text-2xl text-on-surface-variant font-medium">,00</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-secondary-container/20 text-secondary px-4 py-2 rounded-full border border-secondary/10">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="text-sm font-bold">In linea con le scadenze</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nuovo Impegno
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8">
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-on-surface px-2 tracking-tight">Elenco Costi Ricorrenti</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fixedCosts.map((cost) => (
              <div key={cost.id} className="bg-surface-container-lowest rounded-[28px] p-6 ambient-shadow border border-white/20 dark:border-white/5 group relative">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center">
                      {getIcon(cost.category)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary">{cost.category}</h4>
                      <p className="font-label text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">{cost.description || 'Spesa Ricorrente'}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">€{cost.amount.toLocaleString('it-IT')}</div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="bg-secondary-container/30 text-secondary px-3 py-1 rounded-lg text-xs font-bold uppercase">
                    Attivo
                  </div>
                  <button 
                    onClick={() => deleteTransaction(cost.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {fixedCosts.length === 0 && (
              <div className="md:col-span-2 text-center py-12 text-on-surface-variant border-2 border-dashed border-surface-container rounded-[32px]">
                <p className="font-bold">Nessun costo fisso registrato</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="fixed"
      />
    </motion.div>
  );
}
