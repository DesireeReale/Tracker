import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValue: number;
  onConfirm: (val: number) => void;
  label: string;
}

export default function ValueModal({ isOpen, onClose, title, initialValue, onConfirm, label }: ValueModalProps) {
  const [value, setValue] = useState(initialValue.toString());

  useEffect(() => {
    if (isOpen) setValue(initialValue.toString());
  }, [isOpen, initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(parseFloat(value) || 0);
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
            className="relative bg-surface rounded-[32px] p-8 w-full max-w-sm shadow-2xl border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary">{title}</h3>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">{label} (€)</label>
                <input
                  autoFocus
                  type="number"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-surface-container border-none rounded-2xl p-4 text-2xl font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Salva Cambiamenti
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
