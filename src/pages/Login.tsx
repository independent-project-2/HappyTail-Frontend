import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';

/**
 * Login Page Component
 * User authentication page
 */
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * Handle input changes and clear errors
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: formData.email,
          name: 'Demo User',
        })
      );

      setIsSubmitting(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="h-screen w-full bg-[#fef9f3] flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-2.5 w-full min-h-0">
        <div className="max-w-[1300px] w-[90%] grid grid-cols-[minmax(380px,420px)_1fr] gap-8 items-center justify-items-center max-h-[calc(100vh-40px)] lg:grid-cols-1 lg:max-w-[600px] lg:p-5">
          {/* Left Side - Form */}
          <div className="bg-white py-3 px-5 rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full max-w-[420px] justify-self-end overflow-y-auto max-h-[calc(100vh-60px)] lg:justify-self-center lg:mx-0 lg:p-6 lg:rounded-[20px] lg:max-w-full">
            <div className="w-full">
              <h1 className="text-[22px] font-bold text-[#1a1a1a] my-0 mb-2 text-left tracking-[-0.5px] leading-tight">
                Log In
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-0.5">
                {/* Email Field */}
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  autoComplete="email"
                />

                {/* Password Field */}
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  autoComplete="current-password"
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center my-1.5 mt-1.5 mb-2.5">
                  <label className="flex items-center gap-1.5 text-xs text-[#4a4a4a] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#9088d8]"
                    />
                    <span>Remember me</span>
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-[#9088d8] no-underline font-medium transition-colors duration-200 hover:text-[#8078c8] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 text-[13px] font-semibold text-white bg-gradient-to-br from-[#a89ee6] to-[#9088d8] border-none rounded-xl cursor-pointer transition-all duration-300 mt-1 hover:bg-gradient-to-br hover:from-[#9888d6] hover:to-[#8078c8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(152,136,214,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="text-center mt-2 text-xs text-[#1a1a1a]">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-[#1a1a1a] underline font-semibold transition-colors duration-200 hover:text-[#9088d8]"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-start w-full h-full max-h-[calc(100vh-120px)] justify-self-start lg:hidden">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/assets/Images/1220ca60f061c741e0d04b9305745bf48e653e8d.png"
                alt="Golden Retriever Puppy"
                className="w-auto h-auto max-h-[calc(100vh-60px)] max-w-full object-contain object-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
