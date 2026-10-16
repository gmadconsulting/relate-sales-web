import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrivacyPage } from './pages/Privacy.tsx'

// Routing minimo: la landing su "/" e le pagine legali su percorsi dedicati.
const path = window.location.pathname.replace(/\/+$/, '')
const Page = path === '/privacy' ? PrivacyPage : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
