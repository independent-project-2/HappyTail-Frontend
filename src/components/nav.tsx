import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';





export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  const router = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    router('/login');
  };

  

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <img
              className="h-35 w-auto"
              src="/assets/Images/textlogo.png"
              alt="Logo"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <a onClick={()=>router('/home')} className="text-black hover:text-[#9A93FF] font-medium cursor-pointer">
              Home
            </a>
            <a onClick={()=>router('/browse-pets')} className="text-black hover:text-[#9A93FF] font-medium cursor-pointer">
              Browse Pets
            </a>
            <a onClick={()=>router('/blog')} className="text-black hover:text-[#9A93FF] font-medium cursor-pointer">
              Blog
            </a>
            <a onClick={()=>router('/about')} className="text-black hover:text-[#9A93FF] font-medium cursor-pointer">
              About
            </a>
          </div>

        

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => router('/ask-me')} className="bg-[#9A93FF] text-white px-4 py-2 rounded-full hover:bg-[#827afe] font-medium cursor-pointer">
              Ask me
            </button>
            
            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-black hover:border-[#9A93FF] transition-colors focus:outline-none"
                >
                  <img 
                    src="/assets/profilePhoto/profile.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute -right-20 mt-2 w-56 bg-[#E8F0F8] rounded-2xl shadow-xl py-2 z-50 border border-gray-200 animate-fadeIn">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#9A93FF]/10 to-transparent">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>

                    {/* Profile & Logout */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          router('/profile');
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4 text-[#9A93FF]" />
                        <span className="font-medium">My Profile</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          


          <div className="flex items-center md:hidden space-x-2">
            {/* Profile Icon for Mobile */}
            {isAuthenticated && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 border-black hover:border-[#9A93FF] transition-colors focus:outline-none"
                >
                  <img 
                    src="/assets/profilePhoto/profile.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Mobile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#E8F0F8] rounded-2xl shadow-xl py-2 z-50 border border-gray-200 animate-fadeIn">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#9A93FF]/10 to-transparent">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>

                    {/* Profile & Logout */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          router('/profile');
                          setIsProfileOpen(false);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4 text-[#9A93FF]" />
                        <span className="font-medium">My Profile</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black font-medium focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-70 backdrop-blur-sm">
          <a onClick={()=>{router('/home'); setIsOpen(false);}} className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium cursor-pointer">
            Home
          </a>
          <a onClick={()=>{router('/browse-pets'); setIsOpen(false);}} className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium cursor-pointer">
            Browse Pets
          </a>
          <a onClick={()=>{router('/blog'); setIsOpen(false);}} className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium cursor-pointer">
            Blog
          </a>
          <a onClick={()=>{router('/about'); setIsOpen(false);}} className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium cursor-pointer">
            About
          </a>
          <button onClick={() => {router('/ask-me'); setIsOpen(false);}} className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Ask me
          </button>
          
          {!isAuthenticated && (
            <>
              <button onClick={() => {router('/login'); setIsOpen(false);}} className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
                Login
              </button>
              <button onClick={() => {router('/signup'); setIsOpen(false);}} className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
