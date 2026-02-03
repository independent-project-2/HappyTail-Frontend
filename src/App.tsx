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
import ProtectedRoute from './components/ProtectedRoute';
import AddPets from './pages/AddPets';


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
              <Home />
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
        <Route 
          path="/add-pets" 
          element={
            <ProtectedRoute>
              <AddPets />
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
