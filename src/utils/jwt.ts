/**
 * JWT Token Utility
 * Helper functions for decoding and extracting data from JWT tokens
 */

interface JWTPayload {
  nameid?: string;
  email?: string;
  unique_name?: string;
  exp?: number;
  [key: string]: any;
}

/**
 * Decode JWT token and extract payload
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      console.error('Invalid JWT token format');
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    
    // Base64 decode
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    
    // Parse JSON
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Extract user information from JWT token
 */
export const getUserFromToken = (token: string) => {
  const payload = decodeJWT(token);
  
  if (!payload) {
    return null;
  }

  return {
    id: payload.nameid || '',
    name: payload.unique_name || 'User',
    email: payload.email || '',
  };
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  
  if (!payload || !payload.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now();
};
