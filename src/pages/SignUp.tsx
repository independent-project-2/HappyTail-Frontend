import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormInput from '../components/FormInput';
import '../styles/SignUpPage.css';

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
          {/* Left Side - Form */}
          <motion.div 
            className="bg-[#f5f3f0] rounded-2xl p-8 shadow-sm w-full max-w-md mx-auto lg:mx-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-black mb-8">
              Sign Up
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
              {/* Name Field */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FormInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  autoComplete="name"
                />
              </motion.div>

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
                  autoComplete="new-password"
                />
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FormInput
                  label="Confirm"
                  type="password"
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  error={errors.confirm}
                  autoComplete="new-password"
                />
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
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </motion.button>
            </motion.form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-black">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-black font-bold underline hover:text-[#9088d8] transition-colors"
              >
                Log in
              </Link>
            </p>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/assets/Images/5184127ebcbd53fe761cd4962df4875947ccd85f.png"
              alt="Golden Retriever Puppy"
              className="w-full max-w-lg h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
