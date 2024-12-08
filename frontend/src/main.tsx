import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TripsProvider } from './contexts'
import { Router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TripsProvider>
      <Router />
    </TripsProvider>
  </StrictMode>,
)
