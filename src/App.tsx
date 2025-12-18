
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

/**
 * Main App Component
 * Configures routing for the application
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to sign up page */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<Home />} />
        
        {/* Placeholder Routes */}
        <Route path="/browse-pets" element={<Home />} />
        <Route path="/blog" element={<Home />} />
        <Route path="/about" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
