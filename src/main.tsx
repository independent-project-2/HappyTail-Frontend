// Import React dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Import global styles
import './index.css'

// Import main App component
import App from './App.tsx'

// Import Auth Provider
import { AuthProvider } from './context/AuthContext'

// Import test utilities (for debugging)
import './utils/testBackendConnection'

// Render the React application to the DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
