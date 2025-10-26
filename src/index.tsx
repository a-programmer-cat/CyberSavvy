import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TargetCursor from './components/TargetCursor';
import './index.css'
import './i18n'
import { AuthProvider } from "./components/AuthContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)