import { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
    // TODO: Implement authentication API call
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        {/* TODO: Replace with locally hosted image for production */}
        <img 
          src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=800&fit=crop" 
          alt="Cute cat" 
          className="cat-image"
        />
      </div>
      <div className="signin-right">
        <div className="signin-card">
          <h1 className="signin-title">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <a href="#forgot-password" className="forgot-password">Forgot Password</a>
            <button type="submit" className="signin-button">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
