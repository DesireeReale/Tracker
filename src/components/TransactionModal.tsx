import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'expense' | 'fixed';
}

export default function TransactionModal({ isOpen, onClose, type }: ModalProps) {
  const { addTransaction } = useApp();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    addTransaction({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
      type
    });
    
    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-surface rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary">
                Aggiungi {type === 'expense' ? 'Spesa' : 'Costo Fisso'}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Importo (€)</label>
                <input
                  autoFocus
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface-container border-none rounded-2xl p-4 text-xl font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface-container border-none rounded-2xl p-4 text-base font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                >
                  <option value="">Seleziona...</option>
                  {type === 'expense' ? (
                    <>
                      <option value="Cibo">Cibo e Spesa</option>
                      <option value="Trasporti">Trasporti</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Svago">Svago</option>
                      <option value="Salute">Salute</option>
                      <option value="Altro">Altro</option>
                    </>
                  ) : (
                    <>
                      <option value="Affitto">Affitto/Mutuo</option>
                      <option value="Utenze">Bollette/Utenze</option>
                      <option value="Assicurazione">Assicurazione</option>
                      <option value="Abbonamenti">Abbonamenti</option>
                      <option value="Debiti">Rate/Finanziamenti</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Dettagli (opzionale)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Esempio: Spesa settimanale"
                  className="w-full bg-surface-container border-none rounded-2xl p-4 text-base font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
              >
                Conferma
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
