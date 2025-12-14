import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="15" r="3" fill="#7c6fe6" />
          <ellipse cx="14" cy="10" rx="2" ry="3" fill="#7c6fe6" />
          <ellipse cx="26" cy="10" rx="2" ry="3" fill="#7c6fe6" />
          <ellipse cx="10" cy="14" rx="2" ry="3" transform="rotate(-30 10 14)" fill="#7c6fe6" />
          <ellipse cx="30" cy="14" rx="2" ry="3" transform="rotate(30 30 14)" fill="#7c6fe6" />
          <path d="M20 18C24 18 27 21 27 25V30C27 32 25 34 23 34H17C15 34 13 32 13 30V25C13 21 16 18 20 18Z" fill="#7c6fe6" />
        </svg>
        <div className="logo-text">
          <span className="pet-shop">Pet Shop</span>
          <span className="services">SERVICES</span>
        </div>
      </div>
      <nav className="nav">
        <a href="#home" className="nav-link active">Home</a>
        <a href="#browse-pets" className="nav-link">Browse Pets</a>
        <a href="#blog" className="nav-link">Blog</a>
        <a href="#about" className="nav-link">About</a>
      </nav>
    </header>
  );
}

export default Header;
