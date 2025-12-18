// Import React dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import global styles
import './index.css'

// Import main App component
import App from './App.tsx'

// Render the React application to the DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Main application component */}
     <App />
  </StrictMode>,
)
