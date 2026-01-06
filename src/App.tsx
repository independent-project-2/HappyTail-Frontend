import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
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
        
        {/* Protected Routes */}
        <Route path="/home" element={<Home />} />
        
        {/* Chatbot Route */}
        <Route path="/ask-me" element={<Chatbot />} />
        
        {/* Placeholder Routes */}
        <Route path="/browse-pets" element={<Home />} />
        <Route path="/blog" element={<Home />} />
        <Route path="/about" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
