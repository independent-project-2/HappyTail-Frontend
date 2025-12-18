import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

/**
 * Home Page Component
 * Protected dashboard page for authenticated users
 */
interface User {
  name: string;
  email: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  /**
   * Check authentication on component mount
   */
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="home-main">
        <div className="home-container">
          {/* Welcome Section */}
          <div className="home-welcome">
            <h1 className="home-title">Welcome back, {user.name}!</h1>
            <p className="home-subtitle">You're logged in as {user.email}</p>
            <button onClick={handleLogout} className="home-logout-button">
              Logout
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="home-dashboard">
            <div className="dashboard-card">
              <div className="card-icon">🐾</div>
              <h3 className="card-title">My Pets</h3>
              <p className="card-description">Manage your pet profiles</p>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📅</div>
              <h3 className="card-title">Appointments</h3>
              <p className="card-description">View and schedule visits</p>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">💊</div>
              <h3 className="card-title">Health Records</h3>
              <p className="card-description">Track medical history</p>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">👤</div>
              <h3 className="card-title">Profile</h3>
              <p className="card-description">Update your settings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
