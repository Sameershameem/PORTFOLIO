import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles/index.css'
import './styles/portfolio-experience.css'
import App from './App.jsx'

// Drop build-time <head> tags; <SEO> renders the live ones for the current route.
document.querySelectorAll('[data-prerender]').forEach((node) => node.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
