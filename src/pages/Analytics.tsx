import { motion } from 'motion/react';
import { Calendar, Lightbulb, Home, Utensils, Car, ShoppingBag, Music, Heart, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Analytics() {
  const { transactions, salary, totalExpenses, totalFixedCosts } = useApp();
  
  const totalSpent = totalExpenses + totalFixedCosts;
  
  // Group expenses by category
  const categories = transactions.reduce((acc: any, t) => {
    if (t.type === 'income') return acc;
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const categoryEntries = Object.entries(categories).map(([label, amount]: any) => ({
    label,
    amount,
    percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0
  })).sort((a, b) => b.amount - a.amount);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Casa': case 'Affitto': return <Home className="w-5 h-5" />;
      case 'Cibo': return <Utensils className="w-5 h-5" />;
      case 'Trasporti': return <Car className="w-5 h-5" />;
      case 'Shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'Svago': case 'Abbonamenti': return <Music className="w-5 h-5" />;
      case 'Salute': return <Heart className="w-5 h-5" />;
      default: return <MoreHorizontal className="w-5 h-5" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-10 pb-12"
    >
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Analisi Finale</h2>
          <p className="text-on-surface-variant font-medium">Panoramica del mese corrente</p>
        </div>
        <button className="bg-surface-container-high hover:bg-surface-container-highest transition-all px-5 py-2.5 rounded-2xl text-primary flex items-center gap-2 font-bold text-sm shadow-sm">
          <Calendar className="w-4 h-4" />
          <span>Questo Mese</span>
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-white/20 dark:border-white/5 flex flex-col">
          <h3 className="text-xl font-bold text-primary mb-8 px-1">Distribuzione Spese</h3>
          <div className="flex-grow flex items-center justify-center relative min-h-[220px]">
            <svg className="w-48 h-48" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={totalSpent > 0 ? 0 : 251.2} className="stroke-surface-container origin-center -rotate-90" />
              {categoryEntries.slice(0, 1).map((cat, i) => (
                <circle 
                  key={i}
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  strokeWidth="12" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * cat.percentage) / 100} 
                  className="stroke-primary origin-center -rotate-90" 
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Totale Uscite</span>
              <span className="text-2xl font-bold text-primary">€{totalSpent.toLocaleString('it-IT')}</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {categoryEntries.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : 'bg-outline'}`}></div>
                <span className="text-sm font-bold text-on-surface-variant">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-white/20 dark:border-white/5 flex flex-col">
          <h3 className="text-xl font-bold text-primary mb-8 px-1">Flusso Di Cassa</h3>
          <div className="flex-grow flex items-end justify-between gap-12 h-[200px] border-b border-surface-container pb-4 px-4">
            <div className="flex flex-col items-center gap-4 flex-1">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                className="w-full bg-secondary-container rounded-t-2xl shadow-inner relative group"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface text-secondary px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  €{salary}
                </div>
              </motion.div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Entrate</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${Math.min(100, (totalSpent / salary) * 100)}%` }}
                className="w-full bg-primary-fixed rounded-t-2xl shadow-inner relative group"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface text-primary px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  €{totalSpent}
                </div>
              </motion.div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Uscite</span>
            </div>
          </div>
          <div className="mt-8 flex gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-secondary-container"></div>
              <span className="text-sm font-bold text-on-surface-variant">Entrate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-primary-fixed"></div>
              <span className="text-sm font-bold text-on-surface-variant">Uscite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Totals table and Insight */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-white/20 dark:border-white/5">
          <h3 className="text-xl font-bold text-primary mb-6 px-1">Totale Per Categoria</h3>
          <div className="space-y-2">
            {categoryEntries.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 group hover:bg-surface-container-low transition-all rounded-2xl px-4 -mx-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    {getIcon(item.label)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-primary">{item.label}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Mese Corrente</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-primary">€{item.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-on-surface-variant font-bold">{item.percentage}% del totale</p>
                </div>
              </div>
            ))}
            {categoryEntries.length === 0 && (
              <div className="text-center py-6 text-on-surface-variant font-medium">Nessun dato di spesa disponibile</div>
            )}
          </div>
        </div>

        <div className="md:col-span-4 flex">
          <div className="bg-primary text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden backdrop-blur-xl flex flex-col justify-between w-full">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="bg-white/20 p-3 rounded-2xl w-fit">
                <Lightbulb className="w-6 h-6 text-primary-fixed" />
              </div>
              <h4 className="text-xl font-bold text-primary-fixed tracking-tight">Financial Health</h4>
              <p className="text-sm text-primary-fixed/80 leading-relaxed font-medium">
                {totalSpent > salary 
                  ? "Attenzione: le tue uscite superano le entrate. È consigliabile rivedere i costi fissi o limitare le spese non essenziali." 
                  : `Ottimo! Stai risparmiando il ${Math.round(((salary - totalSpent) / salary) * 100)}% del tuo stipendio mensile.`}
              </p>
            </div>
            <button className="mt-8 bg-white/10 hover:bg-white/20 transition-all py-3 rounded-2xl text-sm font-bold relative z-10 uppercase tracking-widest">
              Analisi Dettagliata
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
