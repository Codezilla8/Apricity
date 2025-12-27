'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ColorPicker from '@/components/ui/ColorPicker';
import { SignupData } from '@/types/user';

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedColor: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({});

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupData, string>> = {};

    // Username validation
    if (!formData. username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (! formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/. test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Color selection validation
    if (!formData. selectedColor) {
      newErrors.selectedColor = 'Please choose a theme color';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React. FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call (replace with actual API later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful signup - store in localStorage for now
    const mockUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      selectedColor: formData.selectedColor,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('apricityUser', JSON.stringify(mockUser));
    localStorage.setItem('apricityToken', 'mock-token-' + Date.now());

    setIsLoading(false);

    // Redirect to feed (we'll create this later)
    // For now, redirect to landing page with success message
    router.push('/? signup=success');
  };

  // Update form field
  const updateField = (field: keyof SignupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6"
    >
      {/* Username */}
      <Input
        label="Username"
        type="text"
        placeholder="your_username"
        value={formData.username}
        onChange={(e) => updateField('username', e.target.value)}
        error={errors.username}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        error={errors.email}
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

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={formData. confirmPassword}
        onChange={(e) => updateField('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* Color Picker */}
      <ColorPicker
        selectedColor={formData.selectedColor}
        onColorSelect={(color) => updateField('selectedColor', color)}
        error={errors.selectedColor}
      />

      {/* Submit Button */}
      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* Login Link */}
      <p className="text-center text-white/60 text-sm">
        Already have an account? {' '}
        <a href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
          Log in
        </a>
      </p>
    </motion.form>
  );
}
