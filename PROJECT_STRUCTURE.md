# HappyTail Authentication System

A clean, well-structured authentication system built with React, TypeScript, and React Router.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar with logo and menu
│   └── FormInput.tsx   # Reusable form input field
├── pages/              # Application pages
│   ├── SignUp.tsx      # User registration page
│   ├── Login.tsx       # User authentication page
│   └── Home.tsx        # Protected dashboard page
├── styles/             # CSS stylesheets
│   ├── Navbar.css      # Navigation bar styles
│   ├── FormInput.css   # Form input styles
│   ├── SignUpPage.css  # Sign up page styles
│   ├── LoginPage.css   # Login page styles
│   └── Home.css        # Home page styles
├── App.tsx             # Main app with routing configuration
└── main.tsx            # Application entry point
```

## 🎨 Design Features

- **Clean Code Structure**: Organized with separate components, pages, and styles
- **Reusable Components**: Modular Navbar and FormInput components
- **Responsive Design**: Mobile-friendly layout with breakpoints
- **Form Validation**: Real-time input validation with error messages
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Beautiful cream background with purple accent colors
- **Smooth Animations**: Hover effects and transitions

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📋 Features

### Sign Up Page
- Name field validation
- Email format validation
- Password strength check (min 6 characters)
- Password confirmation matching
- Clean form layout with golden retriever image
- Responsive design

### Login Page
- Email and password validation
- Remember me checkbox
- Forgot password link
- Consistent design with sign up page
- Same beautiful layout

### Home Dashboard
- Welcome message with user name
- Four dashboard cards (My Pets, Appointments, Health Records, Profile)
- Logout functionality
- Protected route (redirects to login if not authenticated)

### Navigation Bar
- Logo with paw icon
- Menu items: Home, Browse Pets, Blog, About
- Active page highlighting
- Sticky positioning

## 🎯 Component Documentation

### Navbar Component
```tsx
// Usage
import Navbar from '../components/Navbar';

<Navbar />
```
- Displays logo and navigation menu
- Automatically highlights active page
- Responsive design for mobile devices

### FormInput Component
```tsx
// Usage
import FormInput from '../components/FormInput';

<FormInput
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  autoComplete="email"
/>
```
- Reusable input field with label
- Built-in error message display
- Consistent styling across forms

## 🔒 Authentication Flow

1. **Sign Up**: User creates account → Data stored in localStorage → Redirect to home
2. **Login**: User authenticates → Data stored in localStorage → Redirect to home
3. **Protected Routes**: Home page checks for user data → Redirects to login if not authenticated
4. **Logout**: Clear localStorage → Redirect to login page

## 🎨 Color Palette

- **Background**: `#f5f0e8` (Cream)
- **Primary**: `#8b7fc8` (Purple)
- **Text Dark**: `#2d2d2d`
- **Text Light**: `#4a4a4a`
- **White**: `#ffffff`

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ✅ Code Quality

- ✓ 100% TypeScript
- ✓ Clean component structure
- ✓ Proper JSDoc comments
- ✓ Consistent naming conventions
- ✓ Organized CSS with comments
- ✓ No errors or warnings
- ✓ Modern React patterns (hooks, functional components)
- ✓ Proper form validation
- ✓ Accessibility considerations

## 🔧 Technologies Used

- React 19.1.1
- TypeScript 5.9.3
- React Router DOM 7.10.1
- Vite 7.1.7
- CSS3 with modern features

## 📝 Notes

- User data is currently stored in localStorage (for demo purposes)
- In production, replace localStorage with proper backend authentication
- Dog image is loaded from Unsplash CDN
- All components are fully typed with TypeScript interfaces
- Form validation runs in real-time as user types
