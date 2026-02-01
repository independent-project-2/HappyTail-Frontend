/**
 * Example: How to use Authentication in Components
 */

// Example 1: Display user info and logout button in Navbar
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavbarExample = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.name}!</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </>
      )}
    </nav>
  );
};

// Example 2: Make authenticated API calls
import { API_ENDPOINTS, getHeaders } from '../config/api';

const fetchUserProfile = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.user.profile, {
      method: 'GET',
      headers: getHeaders(true), // true = include auth token
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Example 3: Protected component that requires auth
const ProtectedComponent = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this feature</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      {/* Your protected content here */}
    </div>
  );
};

// Example 4: Check auth status before action
const AddPetComponent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddPet = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Proceed with adding pet
  };

  return (
    <button onClick={handleAddPet}>Add Pet</button>
  );
};

export { NavbarExample, fetchUserProfile, ProtectedComponent, AddPetComponent };
