import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { ToastProvider } from "./context/ToastContext"; // Import AuthProvider
import { SearchProvider } from './context/SearchContext.tsx';
import { PaneProvider } from './context/PaneContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <PaneProvider>
        <ToastProvider>
          
            <App />
        </ToastProvider>
      </PaneProvider>
    </AuthProvider>
  // </StrictMode>
)





