import { getCookie } from '../utils/cookies';

// API Configuration
const BASE_URL = import.meta.env.DEV ? '' : 'https://happytail-backend-btdnewfhhvajeybe.southeastasia-01.azurewebsites.net';

export const API_BASE_URL = BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/api/User/signin`,
    register: `${BASE_URL}/api/User/signup`,
    logout: `${BASE_URL}/api/User/logout`,
    refresh: `${BASE_URL}/api/User/refresh`,
  },
  pets: {
    getAll: `${BASE_URL}/api/pets`,
    getById: (id: string) => `${BASE_URL}/api/pets/${id}`,
    create: `${BASE_URL}/api/pets`,
    update: (id: string) => `${BASE_URL}/api/pets/${id}`,
    delete: (id: string) => `${BASE_URL}/api/pets/${id}`,
    filter: `${BASE_URL}/api/pets/filter`,
  },
  blog: {
    getAll: `${BASE_URL}/api/blog`,
    create: `${BASE_URL}/api/blog`,
    getById: (id: string) => `${BASE_URL}/api/blog/${id}`,
  },
  users: {
    profile: `${BASE_URL}/api/users/profile`,
    updateProfile: `${BASE_URL}/api/users/profile`,
  },
};

/**
 * Get headers for API requests
 * @param includeAuth - If true, includes Authorization header with token from cookie
 */
export const getHeaders = (includeAuth: boolean = true): HeadersInit => {
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
