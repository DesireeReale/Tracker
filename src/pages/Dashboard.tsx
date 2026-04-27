import { motion } from 'motion/react';
import { TrendingUp, Edit3, Home as HomeIcon, Utensils, Car } from 'lucide-react';

export default function Dashboard() {
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
            <h2 className="text-5xl font-bold text-primary mb-6">€4.250,00</h2>
            <div className="flex items-center gap-2 text-secondary font-label text-xs bg-secondary-container/30 w-fit px-4 py-1.5 rounded-full font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% questo mese</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow flex flex-col justify-between border border-white/20 dark:border-white/5">
          <div className="flex justify-between items-start mb-4">
            <p className="font-label text-sm text-on-surface-variant font-medium">Stipendio Mensile</p>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">€8.500,00</p>
            <p className="text-sm text-on-surface-variant mt-1 font-medium">Prossimo deposito: 1 Nov</p>
          </div>
        </div>
      </section>

      {/* Savings Goal */}
      <section>
        <h3 className="text-2xl font-bold text-on-surface mb-6 px-2">Obiettivo di Risparmio</h3>
        <div className="bg-surface-container-lowest rounded-[32px] p-6 ambient-shadow flex flex-col md:flex-row items-center gap-8 border border-white/20 dark:border-white/5 transition-all hover:shadow-lg">
          <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-surface-container" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
              <circle 
                className="stroke-secondary" 
                cx="50" cy="50" fill="none" r="45" 
                strokeDasharray="282.7" 
                strokeDashoffset="70.6" 
                strokeLinecap="round" 
                strokeWidth="8" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-secondary">75%</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xl font-bold text-primary">Fondo Emergenza</p>
                <p className="text-sm text-on-surface-variant font-medium">Obiettivo: €10.000</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">€7.500</p>
                <p className="font-label text-xs text-secondary font-bold uppercase tracking-wider">In linea</p>
              </div>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className="h-full bg-secondary rounded-full"
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h3 className="text-2xl font-bold text-on-surface mb-6 px-2">Riepilogo Spese</h3>
        <div className="flex flex-col gap-4">
          <div className="group flex items-center justify-between p-4 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-white/40 dark:hover:border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">Affitto e Casa</p>
                <p className="text-sm text-on-surface-variant font-medium">Affitto & Utenze</p>
              </div>
            </div>
            <p className="text-lg font-bold text-primary">-€2.100,00</p>
          </div>

          <div className="group flex items-center justify-between p-4 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-white/40 dark:hover:border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">Cibo e Ristorazione</p>
                <p className="text-sm text-on-surface-variant font-medium">Spesa & Ristoranti</p>
              </div>
            </div>
            <p className="text-lg font-bold text-primary">-€650,00</p>
          </div>

          <div className="group flex items-center justify-between p-4 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-white/40 dark:hover:border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">Trasporti</p>
                <p className="text-sm text-on-surface-variant font-medium">Carburante & Mezzi</p>
              </div>
            </div>
            <p className="text-lg font-bold text-primary">-€320,00</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
