import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TargetCursor from './components/TargetCursor';
import './index.css'
import './i18n'
import { AuthProvider } from "./components/AuthContext";

const isDesktop = window.matchMedia('(min-width: 768px)').matches;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      {isDesktop && <TargetCursor spinDuration={2} hideDefaultCursor={true} />}
    </AuthProvider>
  </React.StrictMode>,
)