import { motion } from 'motion/react';
import { Utensils, Car, Smartphone, Plus } from 'lucide-react';

export default function Expenses() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col gap-10 pb-24"
    >
      <section className="flex flex-col gap-1 px-2">
        <h1 className="font-label text-sm text-on-surface-variant uppercase tracking-widest font-bold">Spese Giornaliere</h1>
        <div className="text-5xl font-bold text-primary">€142,50</div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow border border-white/20 dark:border-white/5 hover:shadow-lg transition-all flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">Categoria Maggiore</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">Cibo e Ristoranti</span>
            <span className="text-sm text-on-surface-variant font-medium mt-1">€45,20 oggi</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow border border-white/20 dark:border-white/5 hover:shadow-lg transition-all flex items-center justify-between min-h-[160px]">
          <div className="flex flex-col">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-4">Budget Giornaliero</span>
            <span className="text-xl font-bold text-primary leading-none">
              €142 <span className="text-on-surface-variant font-medium text-base">/ €200</span>
            </span>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-surface-container" cx="50" cy="50" fill="none" r="40" strokeWidth="6" />
              <circle 
                className="stroke-secondary" 
                cx="50" cy="50" fill="none" r="40" 
                strokeDasharray="251.2" 
                strokeDashoffset="72.8" 
                strokeLinecap="round" 
                strokeWidth="6" 
              />
            </svg>
            <span className="absolute text-xs font-bold text-primary">71%</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-on-surface mb-2 px-2">Transazioni Recenti</h3>
        <div className="flex flex-col gap-2">
          {[
            { icon: Utensils, name: 'Sweetgreen', time: '12:30', amount: '-€18,50' },
            { icon: Car, name: 'Uber', time: '09:15', amount: '-€24,00' },
            { icon: Smartphone, name: 'Apple Store', time: 'Ieri', amount: '-€100,00' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-on-surface">{item.name}</span>
                  <span className="text-sm text-on-surface-variant font-medium">{item.time}</span>
                </div>
              </div>
              <span className="text-lg font-bold text-primary">{item.amount}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <button className="fixed bottom-[110px] right-6 z-40 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
        <Plus className="w-8 h-8" />
      </button>
    </motion.div>
  );
}
