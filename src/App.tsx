import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Loading from './pages/loading';
import Navbar from './components/nav';
import Chatbot from './pages/chatbot';
import './App.css';

/**
 * Main App Component
 * Configures routing for the application
 */
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Loading page */}
        <Route path="/" element={<Loading />} />
        
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Chatbot Route */}
        <Route path="/ask-me" element={<Chatbot />} />
        
        {/* Redirect old routes to loading */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/browse-pets" element={<Navigate to="/" replace />} />
        <Route path="/blog" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
