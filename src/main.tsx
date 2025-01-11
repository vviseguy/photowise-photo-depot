// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { ToastProvider } from "./context/ToastContext"; // Import AuthProvider
import { PaneProvider } from './context/PaneContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <PaneProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </PaneProvider>
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>
)





