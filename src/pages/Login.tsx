import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.div 
      className="min-h-screen w-full bg-[#fef9f3] flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Left Corner Decoration */}
      <div className="absolute top-0 left-0 w-64 h-48 bg-gradient-to-br from-[#d4a574] via-[#d4a574]/50 to-transparent opacity-40 rounded-full blur-3xl"></div>
      {/* Bottom Right Corner Decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-48 bg-gradient-to-tl from-[#d4a574] via-[#d4a574]/50 to-transparent opacity-40 rounded-full blur-3xl"></div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src ="/assets/Images/log cat.png"
              alt="Cat with blue eyes"
              className="w-full max-w-2xl h-auto object-contain"
            />
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            className="bg-[#f5f3f0] rounded-2xl p-8 shadow-sm w-full max-w-md mx-auto lg:mx-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-black mb-8 text-center">
              Welcome Back
            </h1>

            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {/* Email Field */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  autoComplete="email"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  autoComplete="current-password"
                />
              </motion.div>

              {/* Forgot Password */}
              <motion.div 
                className="text-right"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-black hover:text-[#9088d8] transition-colors"
                >
                  Forgot Password
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-3 mt-4 text-base font-semibold text-white bg-gradient-to-r from-[#a89ee6] to-[#9088d8] border-none rounded-lg cursor-pointer transition-all duration-300 hover:from-[#9888d6] hover:to-[#8078c8] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </motion.button>
            </motion.form>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-sm text-black">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-black font-bold underline hover:text-[#9088d8] transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
