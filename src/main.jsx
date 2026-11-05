import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PreferencesProvider } from './i18n/preferences'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider>
      <div className="app-shell">
        <div className="app-frame">
          <App />
        </div>
      </div>
    </PreferencesProvider>
  </StrictMode>,
)
