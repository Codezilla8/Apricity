// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import LightPillar from '@/components/backgrounds/LightPillar';
// import SignupForm from '@/components/auth/SignupForm';

// export default function SignupPage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black">
//       {/* Subtle Light Pillar Background */}
//       <LightPillar
//         topColor="#5227FF"
//         bottomColor="#FF9FFC"
//         intensity={0.4}
//         rotationSpeed={0.2}
//         glowAmount={0.003}
//         pillarWidth={2.0}
//         pillarHeight={0.5}
//         noiseIntensity={0.3}
//         interactive={false}
//         mixBlendMode="normal"
//       />

//       {/* Dark Overlay for Better Readability */}
//       <div className="absolute inset-0 bg-black/40 z-0" />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
//         {/* Back to Home Link */}
//         <Link href="/">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x:  0 }}
//             className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span className="text-sm font-medium">Back to Home</span>
//           </motion.div>
//         </Link>

//         {/* Card Container */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity:  1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md"
//         >
//           {/* Glassmorphism Card */}
//           <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <motion.h1
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay:  0.2 }}
//                 className="text-4xl font-quicksand font-bold text-white mb-2"
//               >
//                 Join Apricity
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-white/60"
//               >
//                 Create your creative sanctuary
//               </motion.p>
//             </div>

//             {/* Signup Form */}
//             <SignupForm />
//           </div>
//         </motion.div>

//         {/* Footer Note
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-8 text-white/40 text-xs text-center"
//         >
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </motion.p> */}
//       </div>
//     </div>
//   );
// }





'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import GoogleButton from '@/components/auth/GoogleButton';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username. trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username. length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (! formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/. test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData. confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData. dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React. FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 🚧 MOCK DATA - Replace with real API call
      const response = await fetch('http://localhost:8000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Signup successful:', data);
        router.push('/feed');
      } else {
        alert(data.message || 'Signup failed.  Please try again.');
      }
    } catch (error) {
      console.error('❌ Signup error:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update form field
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      {/* Back to home */}
      <Link href="/" className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 font-medium">
        ← Back
      </Link>

      {/* Signup card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
              Join Apricity
            </h1>
            <p className="text-gray-600">Create your creative sanctuary</p>
          </div>

          {/* Google signup */}
          <GoogleButton mode="signup" />

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Email signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder="yourname"
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              error={errors.username}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target. value)}
              error={errors. confirmPassword}
            />

            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateField('dateOfBirth', e.target.value)}
              error={errors.dateOfBirth}
            />

            <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account? {' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}