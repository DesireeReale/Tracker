import { motion } from 'motion/react';
import { Calendar, Lightbulb, Home, Utensils, Car } from 'lucide-react';

const spendingData = [
  { category: 'Casa', amount: 2100, percentage: '49%' },
  { category: 'Cibo e Spesa', amount: 850, percentage: '20%' },
  { category: 'Trasporti', amount: 450, percentage: '11%' }
];

const totalSpent = 4250;

export default function Analytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-10 pb-12"
    >
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Analisi</h2>
          <p className="text-on-surface-variant font-medium">Aprile 2026</p>
        </div>
        <button className="bg-surface-container-high hover:bg-surface-container-highest transition-all px-5 py-2.5 rounded-2xl text-primary flex items-center gap-2 font-bold text-sm shadow-sm">
          <Calendar className="w-4 h-4" />
          <span>Questo Mese</span>
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-white/20 dark:border-white/5 flex flex-col">
          <h3 className="text-xl font-bold text-primary mb-8 px-1">Spese Per Categoria</h3>
          <div className="flex-grow flex items-center justify-center relative min-h-[220px]">
            <svg className="w-48 h-48" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="60" className="stroke-primary origin-center -rotate-90" />
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="200" className="stroke-on-surface-variant origin-center rotate-45" />
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="220" className="stroke-secondary origin-center rotate-180" />
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="230" className="stroke-outline origin-center -rotate-135" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Totale</span>
              <span className="text-2xl font-bold text-primary">€4.250</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { color: 'bg-primary', label: 'Casa' },
              { color: 'bg-on-surface-variant', label: 'Cibo' },
              { color: 'bg-secondary', label: 'Trasporti' },
              { color: 'bg-outline', label: 'Altro' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-bold text-on-surface-variant">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-sm border border-white/20 dark:border-white/5 flex flex-col">
          <h3 className="text-xl font-bold text-primary mb-8 px-1">Entrate vs Uscite</h3>
          <div className="flex-grow flex items-end justify-between gap-4 h-[200px] border-b border-surface-container pb-4">
            {[60, 75, 90, 50, 80].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 max-w-[40px]">
                <div className="flex flex-row items-end gap-1 w-full h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="flex-1 bg-secondary-container rounded-t-lg transition-all hover:bg-secondary" 
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 0.7}%` }}
                    className="flex-1 bg-primary-fixed rounded-t-lg transition-all hover:bg-primary" 
                  />
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{['Gen', 'Feb', 'Mar', 'Apr', 'Mag'][i]}</span>
              </div>
            ))}
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
          <h3 className="text-xl font-bold text-primary mb-6">Totale Per Categoria</h3>
          <div className="space-y-4">
            {spendingData.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 group hover:bg-surface-container-low transition-all rounded-2xl px-4 -mx-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    {item.category === 'Casa' ? <Home className="w-5 h-5" /> : 
                     item.category === 'Cibo e Spesa' ? <Utensils className="w-5 h-5" /> : 
                     <Car className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-base font-bold text-primary">{item.category}</p>
                    <p className="text-xs text-on-surface-variant font-medium">Dettagli spesa</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-primary">€{item.amount.toLocaleString('it-IT')},00</p>
                  <p className="text-xs text-on-surface-variant font-bold">{item.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 flex">
          <div className="bg-primary text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden backdrop-blur-xl flex flex-col justify-between w-full">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="bg-white/20 p-3 rounded-2xl w-fit">
                <Lightbulb className="w-6 h-6 text-primary-fixed" />
              </div>
              <h4 className="text-xl font-bold text-primary-fixed">Riepilogo Intelligente</h4>
              <p className="text-sm text-primary-fixed/80 leading-relaxed font-medium">
                Le tue spese alimentari sono inferiori del 15% questo mese rispetto alla media degli ultimi 3 mesi. Ottimo lavoro nel limitare le cene fuori!
              </p>
            </div>
            <button className="mt-8 bg-white/10 hover:bg-white/20 transition-all py-3 rounded-2xl text-sm font-bold relative z-10">
              Vedi Suggerimenti
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
