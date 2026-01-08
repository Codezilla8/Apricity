'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { LoginData } from '@/types/user';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [generalError, setGeneralError] = useState('');

  // Form validation
  const validateForm = (): boolean => {
    const newErrors:  Partial<Record<keyof LoginData, string>> = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Call backend API
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Success!  Backend set auth cookies
        console.log('Login successful:', data);
        router.push('/feed');
      } else {
        // Show backend error
        setGeneralError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setGeneralError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };
  // Update form field
  const updateField = (field:  keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (generalError) setGeneralError('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6"
    >
      {/* General Error Message */}
      {generalError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm"
        >
          {generalError}
        </motion.div>
      )}

      {/* Email */}
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData. email}
        onChange={(e) => updateField('email', e. target.value)}
        error={errors.email}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />

        {/* Username */}
      <Input
        label="Username"
        type="text"
        placeholder="yourusername"
        value={formData.username}
        onChange={(e) => updateField('username', e. target.value)}
        error={errors.username}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />

      {/* Password */}
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) => updateField('password', e.target.value)}
        error={errors.password}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      {/* Forgot Password Link */}
      <div className="text-right">
        <a href="#" className="text-sm text-purple-400 hover: text-purple-300 transition-colors">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        {isLoading ?  'Logging in...' :  'Log In'}
      </Button>

      {/* Signup Link */}
      <p className="text-center text-white/60 text-sm">
        New to Apricity? {' '}
        <a href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
          Create an account
        </a>
      </p>
    </motion.form>
  );
}
