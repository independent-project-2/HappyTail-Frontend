/**
 * API Configuration
 * Backend URL configuration for the HappyTail application
 */

import { getCookie } from '../utils/cookies';

// Base URL for the backend API
// In development, use proxy to avoid CORS issues
// In production, use the full backend URL
export const API_BASE_URL = import.meta.env.DEV 
  ? '' // Use proxy in development
  : 'https://happytail-backend-btdnewfhhvajeybe.southeastasia-01.azurewebsites.net';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  auth: {
    login: `${API_BASE_URL}/api/User/signin`,
    register: `${API_BASE_URL}/api/User/signup`,
    logout: `${API_BASE_URL}/api/User/logout`,
  },
  // Add other endpoints as needed
  pets: {
    browse: `${API_BASE_URL}/api/Pet/all`,
    filter: `${API_BASE_URL}/api/Pet/filter`,
    create: `${API_BASE_URL}/api/Pet/create`,
    update: (id: string) => `${API_BASE_URL}/api/Pet/update/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/Pet/delete/${id}`,
  },
  blog: {
    all: `${API_BASE_URL}/api/Blog/all`,
    create: `${API_BASE_URL}/api/Blog/create`,
  },
  user: {
    profile: `${API_BASE_URL}/api/User/profile`,
  },
};

/**
 * Default headers for API requests
 */
export const getHeaders = (includeAuth: boolean = true) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getCookie('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};
