/**
 * Backend Connection Test Utility
 * Use this to test if the backend is reachable
 */

import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

/**
 * Test backend connection
 * Call this from browser console: testBackendConnection()
 */
export const testBackendConnection = async () => {
  console.log('Testing backend connection...');
  console.log('Backend URL:', API_BASE_URL);
  console.log('Register endpoint:', API_ENDPOINTS.auth.register);
  
  try {
    // Try to reach the base URL
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      mode: 'cors',
    });
    
    console.log('✅ Backend is reachable!');
    console.log('Status:', response.status);
    console.log('Response:', response);
    
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('This is likely a CORS issue or the backend is not running.');
      console.error('Possible solutions:');
      console.error('1. Check if backend is running');
      console.error('2. Ensure CORS is configured on the backend to allow your frontend origin');
      console.error('3. Check your internet connection');
    }
    
    return false;
  }
};

/**
 * Test registration endpoint specifically
 */
export const testRegisterEndpoint = async () => {
  console.log('Testing registration endpoint...');
  console.log('Endpoint:', API_ENDPOINTS.auth.register);
  
  try {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: 'OPTIONS', // CORS preflight
      mode: 'cors',
    });
    
    console.log('✅ Registration endpoint is reachable!');
    console.log('Status:', response.status);
    console.log('CORS headers:', {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
    });
    
    return true;
  } catch (error) {
    console.error('❌ Registration endpoint test failed:', error);
    return false;
  }
};

// Make functions available in browser console
if (typeof window !== 'undefined') {
  (window as any).testBackendConnection = testBackendConnection;
  (window as any).testRegisterEndpoint = testRegisterEndpoint;
}
