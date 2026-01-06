import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <a href="/" className="text-black hover:text-[#9A93FF] font-medium">
              Home
            </a>
            <a href="/browse-pets" className="text-black hover:text-[#9A93FF] font-medium">
              Browse Pets
            </a>
            <a href="/blog" className="text-black hover:text-[#9A93FF] font-medium">
              Blog
            </a>
            <a href="/about" className="text-black hover:text-[#9A93FF] font-medium">
              About
            </a>
          </div>

          {/* Ask me button */}
            <div className="hidden md:block">
                <button className="bg-[#9A93FF] text-white px-4 py-2 rounded-full hover:bg-[#827afe] font-medium">
                    Ask me
                </button>
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
          <a href="/" className="block px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
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
          <button className="block w-full text-left px-4 py-2 text-black hover:text-[#9A93FF] font-medium">
            Ask me
          </button>
        </div>
      )}
    </nav>
  );
}
