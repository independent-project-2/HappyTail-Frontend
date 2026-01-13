import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';

/**
 * SignUp Page Component
 * User registration page with form validation
 */
interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirm) {
      newErrors.confirm = 'Please confirm your password';
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = 'Passwords do not match';
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
          name: formData.name,
          email: formData.email,
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
        <div className="max-w-[1300px] w-[90%] grid grid-cols-[minmax(380px,420px)_1fr] gap-8 items-center justify-items-center max-h-[calc(100vh-40px)] lg:grid-cols-1 lg:max-w-[500px] lg:p-4 lg:justify-items-center">
          {/* Left Side - Form */}
          <div className="bg-white py-3 px-5 rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full max-w-[420px] justify-self-end overflow-y-auto max-h-[calc(100vh-60px)] lg:justify-self-center lg:mx-0 lg:py-6 lg:px-7 lg:rounded-[20px] lg:max-w-full">
            <div className="w-full">
              <h1 className="text-[22px] font-bold text-[#1a1a1a] my-0 mb-2 text-left tracking-[-0.5px] leading-tight">
                Sign Up
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-0.5">
                {/* Name Field */}
                <FormInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  autoComplete="name"
                />

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
                  autoComplete="new-password"
                />

                {/* Confirm Password Field */}
                <FormInput
                  label="Confirm"
                  type="password"
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  error={errors.confirm}
                  autoComplete="new-password"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 text-[13px] font-semibold text-white bg-gradient-to-br from-[#a89ee6] to-[#9088d8] border-none rounded-xl cursor-pointer transition-all duration-300 mt-1 hover:bg-gradient-to-br hover:from-[#9888d6] hover:to-[#8078c8] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(152,136,214,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>

              {/* Login Link */}
              <p className="text-center mt-2 text-xs text-[#1a1a1a]">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#1a1a1a] underline font-semibold transition-colors duration-200 hover:text-[#9088d8]"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-start w-full h-full max-h-[calc(100vh-120px)] justify-self-start lg:hidden">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/assets/Images/5184127ebcbd53fe761cd4962df4875947ccd85f.png"
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

export default SignUp;
