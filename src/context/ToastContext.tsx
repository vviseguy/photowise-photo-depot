// ToastContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: number;
  message: string;
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  }

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Render toasts */}
      <div className="toast-container">
        {toasts.map(({ id, message }) => (
          <div className="toast" key={id}>
            {message}
            <button onClick={() => removeToast(id)}>Close</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook for easy access
export function useToast() {
  return useContext(ToastContext);
}
