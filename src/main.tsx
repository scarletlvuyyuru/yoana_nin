import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './index.css'

const TRACKING_QUERY_PARAMS = [
  'e',
  'fbclid',
  'gclid',
  'msclkid',
  'ttclid',
  'mc_cid',
  'mc_eid'
]

const removeTrackingParams = () => {
  const url = new URL(window.location.href)
  const hadTrackingParam = TRACKING_QUERY_PARAMS.some((param) => url.searchParams.has(param))

  if (!hadTrackingParam) {
    return
  }

  TRACKING_QUERY_PARAMS.forEach((param) => url.searchParams.delete(param))
  const cleanQuery = url.searchParams.toString()
  const cleanUrl = `${url.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${url.hash}`

  window.history.replaceState({}, document.title, cleanUrl)
}

removeTrackingParams()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,  
)
