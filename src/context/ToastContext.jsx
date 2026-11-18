import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((title, message) => {
    addToast({ title, message, type: 'success' });
  }, [addToast]);

  const showError = useCallback((title, message) => {
    addToast({ title, message, type: 'error' });
  }, [addToast]);

  const showInfo = useCallback((title, message) => {
    addToast({ title, message, type: 'info' });
  }, [addToast]);

  const showWarning = useCallback((title, message) => {
    addToast({ title, message, type: 'warning' });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, showSuccess, showError, showInfo, showWarning, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          let bgClass = 'bg-dark-800 border-dark-600 text-slate-100';
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (toast.type === 'success') {
            bgClass = 'bg-dark-800 border-emerald-500/40 text-slate-100 shadow-emerald-500/10';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (toast.type === 'error') {
            bgClass = 'bg-dark-800 border-red-500/40 text-slate-100 shadow-red-500/10';
            icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
          } else if (toast.type === 'warning') {
            bgClass = 'bg-dark-800 border-amber-500/40 text-slate-100 shadow-amber-500/10';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          } else {
            bgClass = 'bg-dark-800 border-brand-500/40 text-slate-100 shadow-brand-500/10';
            icon = <Info className="w-5 h-5 text-brand-400 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-fade-in ${bgClass}`}
            >
              <div className="mt-0.5">{icon}</div>
              <div className="flex-1 min-w-0">
                {toast.title && <h4 className="font-semibold text-sm text-white mb-0.5">{toast.title}</h4>}
                {toast.message && <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-dark-700"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
