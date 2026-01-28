import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from 'lucide-react';





export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = true; // Replace with actual authentication logic

  const router = useNavigate();

  

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
             {/* profile */}
            

              {isAuthenticated ? (
           <div onClick={() => router('/profile')} className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-black">
  <img 
    src="/assets/profilePhoto/profile.png" 
    alt="Profile" 
    className="w-full h-full object-cover"
  />
</div> ): (  <div><LogIn className="w-6 h-6 text-black" /></div>
        )}
         
          </div>
          


          <div className="flex items-center md:hidden">
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
          <a href="/home" className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Home
          </a>
          <a href="/browse-pets" className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Browse Pets
          </a>
          <a href="/blog" className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Blog
          </a>
          <a href="/about" className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            About
          </a>
          <button onClick={() => router('/ask-me')} className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Ask me
          </button>
          <button onClick={() => router('/login')} className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Login
          </button>
          <button onClick={() => router('/signup')} className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
