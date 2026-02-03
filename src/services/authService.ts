/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { API_ENDPOINTS, getHeaders } from '../config/api';
import { setCookie, getCookie, deleteCookie, cookieExists } from '../utils/cookies';
import { getUserFromToken } from '../utils/jwt';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    console.log('Logging in user:', credentials.email);
    console.log('API Endpoint:', API_ENDPOINTS.auth.login);
    
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
      mode: 'cors',
    });

    console.log('Response status:', response.status);

    // Get response text first to handle both success and error
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      let errorMessage = 'Login failed. Please try again.';
      
      try {
        const errorData = JSON.parse(responseText);
        console.log('Error data:', errorData);
        
        // Handle different error response formats
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.errors) {
          // Handle validation errors
          const errors = Object.values(errorData.errors).flat();
          errorMessage = errors.join(', ');
        }
        
        // Provide user-friendly messages for common status codes
        if (response.status === 401) {
          errorMessage = errorMessage || 'Invalid email or password. Please check your credentials and try again.';
        } else if (response.status === 400) {
          errorMessage = errorMessage || 'Invalid login information. Please check your email and password.';
        } else if (response.status === 404) {
          errorMessage = 'User not found. Please check your email or sign up for a new account.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } catch (e) {
        // Response is not JSON
        if (responseText) {
          errorMessage = responseText;
        }
      }
      
      throw new Error(errorMessage);
    }

    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('Invalid response from server. Please try again.');
    }
    
    console.log('Login successful');
    
    // Store token in cookie (expires in 7 days)
    if (data.token) {
      setCookie('authToken', data.token, 7);
      
      // Extract user info from JWT token
      const user = getUserFromToken(data.token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User info extracted from token:', user);
      }
      
      console.log('Token saved to cookie');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    
    // Provide more detailed error messages
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection or the server may be down.');
    }
    
    throw error;
  }
};

/**
 * Register new user
 */
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    console.log('Registering user:', { email: userData.email, name: userData.name });
    console.log('API Endpoint:', API_ENDPOINTS.auth.register);
    console.log('Request body:', JSON.stringify(userData));
    
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
      mode: 'cors',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Try to get the response body for debugging
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      let errorMessage = 'Registration failed. Please try again.';
      
      try {
        const errorData = JSON.parse(responseText);
        console.log('Error data:', errorData);
        
        // Handle different error response formats
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.errors) {
          // Handle validation errors
          const errors = Object.values(errorData.errors).flat();
          errorMessage = errors.join(', ');
        }
        
        // Provide user-friendly messages for common status codes
        if (response.status === 400) {
          errorMessage = errorMessage || 'Invalid registration information. Please check all fields.';
        } else if (response.status === 409) {
          errorMessage = 'This email is already registered. Please login or use a different email.';
        } else if (response.status === 422) {
          errorMessage = errorMessage || 'Please check your input. Password must be at least 6 characters.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } catch (e) {
        // Response is not JSON, use the text
        if (responseText) {
          errorMessage = responseText;
        }
      }
      
      throw new Error(errorMessage);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('Invalid response from server');
    }
      // Extract user info from JWT token
      const user = getUserFromToken(data.token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User info extracted from token:', user);
      }
      
    
    console.log('Registration successful, response data:', data);
    
    // Store token in cookie (expires in 7 days)
    if (data.token) {
      setCookie('authToken', data.token, 7);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Token saved to cookie');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    
    // Provide more detailed error messages
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your internet connection or the server may be down.');
    }
    
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    const token = getCookie('authToken');
    
    if (token) {
      await fetch(API_ENDPOINTS.auth.logout, {
        method: 'POST',
        headers: getHeaders(true),
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear cookie and local storage regardless of API call result
    deleteCookie('authToken');
    localStorage.removeItem('user');
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return cookieExists('authToken');
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null;
    }
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    // Clear invalid data
    localStorage.removeItem('user');
    return null;
  }
};
