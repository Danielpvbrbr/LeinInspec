import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './styles.js'
import App from './App.jsx'
import AuthProvider from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <GlobalStyle />
    </AuthProvider>
  </StrictMode>,
)
