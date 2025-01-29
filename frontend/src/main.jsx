import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AlarmProvider } from './context/alarmContext.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <AlarmProvider>
          <App />
        </AlarmProvider>
      </AuthProvider>
    </StrictMode>,
  </BrowserRouter>
)
