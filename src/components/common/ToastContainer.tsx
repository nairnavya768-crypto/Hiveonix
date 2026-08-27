import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 bg-white ${
              toast.type === 'success'
                ? 'border-[#C8E6C9] text-[#1E4620]'
                : toast.type === 'warning'
                ? 'border-[#FFE082] text-[#5D4037]'
                : toast.type === 'error'
                ? 'border-[#FFCDD2] text-[#B71C1C]'
                : 'border-[#E0E0E0] text-[#212121]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#F57F17]" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#D32F2F]" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#D9A441]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">{toast.title}</p>
              <p className="text-xs text-[#555] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-stone-400 hover:text-stone-700 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
