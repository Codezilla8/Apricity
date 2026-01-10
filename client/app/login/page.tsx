// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import LightPillar from '@/components/backgrounds/LightPillar';
// import LoginForm from '@/components/auth/LoginForm';

// export default function LoginPage() {
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

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/40 z-0" />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
//         {/* Back to Home Link */}
//         <Link href="/">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
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
//           animate={{ opacity: 1, scale: 1 }}
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
//                 transition={{ delay: 0.2 }}
//                 className="text-4xl font-quicksand font-bold text-white mb-2"
//               >
//                 Welcome Back
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-white/60"
//               >
//                 Continue your creative journey
//               </motion.p>
//             </div>

//             {/* Login Form */}
//             <LoginForm />
//           </div>
//         </motion.div>
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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  // Form validation
  const validateForm = (): boolean => {
    const newErrors:  Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  setGeneralError('');

  try {
    const response = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // LOGIN SUCCESSFUL
      console.log('Login successful');
      
      //CHECK PROFILE COMPLETION
      if (data.data.profileComplete === false) {
        // Profile NOT complete → Redirect to complete it
        console.log('Profile incomplete, redirecting.. .');
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('tempUsername', data.data.user.username);
        }
        
        router. push('/complete-profile');
        
      } else {
        // Profile complete → Go to feed
        console.log('Profile complete, going to feed');
        router.push('/feed');
      }
      
    } else {
      //LOGIN FAILED
      setGeneralError(data. message || 'Invalid email or password');
    }
    
  } catch (error) {
    console.error('Login error:', error);
    setGeneralError('Network error. Please check your connection.');
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
    if (generalError) setGeneralError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      {/* Back to home */}
      <Link href="/" className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 font-medium">
        ← Back
      </Link>

      {/* Login card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Continue your creative journey</p>
          </div>

          {/* Google login */}
          <GoogleButton mode="login" />

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* General error */}
          {generalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {generalError}
            </div>
          )}

          {/* Email login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData. email}
              onChange={(e) => updateField('email', e. target.value)}
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

            <div className="text-right">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
              {isLoading ? 'Logging in.. .' : 'Log in'}
            </Button>
          </form>

          {/* Signup link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            New to Apricity? {' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}