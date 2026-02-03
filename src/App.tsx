import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Loading from './pages/loading';
import Navbar from './components/nav';
import Chatbot from './pages/chatbot';
import Blog from './pages/blog';
import BrowsePets from './pages/BrowsePets';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Profile from './pages/ProfilePage';
import AddPets from './pages/AddPets';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';


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
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/browse-pets" 
          element={
            <ProtectedRoute>
              <BrowsePets />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Chatbot Route */}
        <Route path="/ask-me" element={<Chatbot />} />

      </Routes>
    </>
  );
}

export default App;
