# Authentication Setup

## Overview
The HappyTail frontend is now connected to the backend API for authentication.

## Backend URL
```
https://happytail-backend-btdnewfhhvajeybe.southeastasia-01.azurewebsites.net
```

## Configuration Files

### API Configuration
- **Location**: `src/config/api.ts`
- **Purpose**: Contains backend URL and API endpoints
- **Exports**:
  - `API_BASE_URL`: Base URL for the backend
  - `API_ENDPOINTS`: Object containing all API endpoints
  - `getHeaders()`: Function to generate request headers with authentication

### Authentication Service
- **Location**: `src/services/authService.ts`
- **Purpose**: Handles all authentication-related API calls
- **Functions**:
  - `login(credentials)`: Authenticates user and stores token
  - `register(userData)`: Registers new user and stores token
  - `logout()`: Logs out user and clears token
  - `isAuthenticated()`: Checks if user is authenticated
  - `getCurrentUser()`: Retrieves current user from localStorage

### Authentication Context
- **Location**: `src/context/AuthContext.tsx`
- **Purpose**: Provides global authentication state
- **Exports**:
  - `AuthProvider`: Context provider component
  - `useAuth()`: Hook to access auth state and methods

### Protected Route Component
- **Location**: `src/components/ProtectedRoute.tsx`
- **Purpose**: Wraps routes that require authentication
- **Behavior**: Redirects to `/login` if user is not authenticated

## Updated Pages

### Login Page
- **Location**: `src/pages/Login.tsx`
- **Changes**:
  - Integrated with backend API
  - Calls `login()` from authService
  - Displays error messages from backend
  - Refreshes auth context on success
  - Redirects to `/home` after login

### SignUp Page
- **Location**: `src/pages/SignUp.tsx`
- **Changes**:
  - Integrated with backend API
  - Calls `register()` from authService
  - Displays error messages from backend
  - Refreshes auth context on success
  - Redirects to `/home` after registration

## Protected Routes
The following routes now require authentication:
- `/home`
- `/browse-pets`
- `/blog`
- `/about`
- `/profile`

## Authentication Flow

### Registration
1. User fills out signup form
2. Form validates input
3. Frontend sends POST request to `/api/Auth/register`
4. Backend returns JWT token and user data
5. Token stored in localStorage as `authToken`
6. User data stored in localStorage as `user`
7. Auth context refreshed
8. User redirected to `/home`

### Login
1. User fills out login form
2. Form validates input
3. Frontend sends POST request to `/api/Auth/login`
4. Backend returns JWT token and user data
5. Token stored in localStorage as `authToken`
6. User data stored in localStorage as `user`
7. Auth context refreshed
8. User redirected to `/home`

### Logout
1. User initiates logout
2. Frontend sends POST request to `/api/Auth/logout` with token
3. Token and user data removed from localStorage
4. Auth context cleared
5. User redirected to login page

### Protected Route Access
1. User attempts to access protected route
2. `ProtectedRoute` checks if token exists
3. If authenticated: Route renders normally
4. If not authenticated: Redirect to `/login`

## API Request Headers
All authenticated API requests include:
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>'
}
```

## Local Storage
The app stores:
- `authToken`: JWT authentication token
- `user`: User object with id, name, and email

## Error Handling
- Network errors displayed to user
- Backend error messages shown in UI
- Form validation errors highlighted per field
- General errors shown at top of form

## Testing the Authentication

### Test Login
1. Start the dev server: `npm run dev`
2. Navigate to `/login`
3. Enter credentials
4. Check Network tab for API calls
5. Verify token in localStorage
6. Confirm redirect to `/home`

### Test Registration
1. Navigate to `/signup`
2. Fill out registration form
3. Check Network tab for API calls
4. Verify token in localStorage
5. Confirm redirect to `/home`

### Test Protected Routes
1. Clear localStorage
2. Try accessing `/home` directly
3. Should redirect to `/login`
4. Login successfully
5. Should now access `/home`

## Backend API Endpoints Used

### Authentication
- **Register**: `POST /api/Auth/register`
  - Body: `{ name, email, password }`
  - Response: `{ token, user: { id, name, email } }`

- **Login**: `POST /api/Auth/login`
  - Body: `{ email, password }`
  - Response: `{ token, user: { id, name, email } }`

- **Logout**: `POST /api/Auth/logout`
  - Headers: `Authorization: Bearer <token>`
  - Response: Success/failure status

## Next Steps

### Recommended Additions
1. **Password Reset**: Add forgot password functionality
2. **Token Refresh**: Implement token refresh mechanism
3. **Session Timeout**: Add automatic logout on token expiration
4. **Remember Me**: Add option to persist login
5. **Email Verification**: Integrate email verification flow
6. **Social Login**: Add OAuth providers (Google, Facebook)
7. **Profile Update**: Add API calls for updating user profile
8. **Error Boundary**: Add error boundaries for better error handling

### API Integration
Update other pages to use authenticated API calls:
- Browse Pets: Fetch pets with authentication
- Add Pets: Submit pet data with authentication
- Profile: Fetch and update user profile
- Blog: Fetch blog posts with authentication

## Troubleshooting

### Common Issues

**Issue**: Login fails with CORS error
- **Solution**: Ensure backend CORS is configured for frontend domain

**Issue**: Token not included in requests
- **Solution**: Check `getHeaders()` implementation and localStorage

**Issue**: Redirects not working
- **Solution**: Verify React Router setup and route paths

**Issue**: Protected routes accessible without login
- **Solution**: Check `ProtectedRoute` implementation and route wrapping

**Issue**: Backend returns 401 Unauthorized
- **Solution**: Verify token format and backend authentication middleware
