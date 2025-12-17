import React, { createContext, useContext, useState, useCallback } from 'react';
import { Icons } from '../Icons';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg shadow-lg border border-slate-200 min-w-[300px] animate-fade-in bg-white`}
          >
            <div className={`mr-3 p-1 rounded-full ${
              toast.type === 'success' ? 'bg-green-100 text-green-600' :
              toast.type === 'error' ? 'bg-red-100 text-red-600' :
              toast.type === 'warning' ? 'bg-amber-100 text-amber-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {toast.type === 'success' && <Icons.Compliance className="w-4 h-4" />}
              {toast.type === 'error' && <Icons.Alert className="w-4 h-4" />}
              {toast.type === 'warning' && <Icons.Alert className="w-4 h-4" />}
              {toast.type === 'info' && <Icons.Bell className="w-4 h-4" />}
            </div>
            <p className="text-sm font-medium text-slate-800 flex-1">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 ml-2">
              <Icons.Close className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};