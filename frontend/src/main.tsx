import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TripProvider } from './contexts'
import { Router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TripProvider>
      <Router />
    </TripProvider>
  </StrictMode>,
)
