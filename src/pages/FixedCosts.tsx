import { motion } from 'motion/react';
import { Home, Zap, Pill, Dumbbell, Smartphone, Music } from 'lucide-react';

export default function FixedCosts() {
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
            2.845<span className="text-2xl text-on-surface-variant font-medium">,00</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-secondary-container/20 text-secondary px-4 py-2 rounded-full border border-secondary/10">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="text-sm font-bold">In linea con le scadenze</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl font-bold text-on-surface px-2">Costi Fissi</h3>
          <div className="space-y-4">
            {/* Rent */}
            <div className="bg-surface-container-lowest rounded-[28px] p-6 ambient-shadow border border-white/20 dark:border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary">Affitto</h4>
                    <p className="font-label text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Scadenza il 1°</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">€1.800</div>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 mb-3">
                <div className="bg-secondary h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                <span className="text-secondary flex items-center gap-1">Pagato</span>
                <span>Obiettivo: €1.800</span>
              </div>
            </div>

            {/* Farmacia - New requested */}
            <div className="bg-surface-container-lowest rounded-[28px] p-6 ambient-shadow border border-white/20 dark:border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary">Farmacia</h4>
                    <p className="font-label text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Spesa Ricorrente</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">€45</div>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 mb-3">
                <div className="bg-red-400 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                <span>Residuo: €9</span>
                <span>Budget: €45</span>
              </div>
            </div>

            {/* Utilities */}
            <div className="bg-surface-container-lowest rounded-[28px] p-6 ambient-shadow border border-white/20 dark:border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed-dim text-primary flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary">Utenze</h4>
                    <p className="font-label text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Scadenza il 15</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">€320</div>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 mb-3">
                <div className="bg-primary-fixed h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                <span>Versato: €144</span>
                <span>Obiettivo: €320</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-2xl font-bold text-on-surface">Abbonamenti</h3>
            <button className="text-xs font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary">Gestisci</button>
          </div>
          <div className="bg-surface-container-lowest rounded-[32px] p-2 ambient-shadow border border-white/20 dark:border-white/5">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-all rounded-2xl group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 font-bold text-lg">N</div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Netflix</h4>
                  <p className="text-xs text-on-surface-variant font-medium">Standard Plan</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">€15,49</div>
              </div>
            </div>

            {/* Palestra - New requested */}
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-all rounded-2xl group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Palestra</h4>
                  <p className="text-xs text-on-surface-variant font-medium">Equinox Premium</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">€250,00</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-all rounded-2xl group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 font-bold text-lg">S</div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Spotify</h4>
                  <p className="text-xs text-on-surface-variant font-medium">Premium Duo</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">€14,99</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
