import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Loading from './pages/loading';
import Navbar from './components/nav';
import Chatbot from './pages/chatbot';
import Blog from './pages/blog';
import BrowsePets from './pages/BrowsePets';


import './App.css';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Loading page */}
          <Route path="/" element={<Loading />} />

          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Chatbot Route */}
          <Route path="/ask-me" element={<Chatbot />} />

          {/* Redirect old routes to loading */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/browse-pets" element={<BrowsePets />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
