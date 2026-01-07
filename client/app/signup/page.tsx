'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LightPillar from '@/components/backgrounds/LightPillar';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Subtle Light Pillar Background */}
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={0.4}
        rotationSpeed={0.2}
        glowAmount={0.003}
        pillarWidth={2.0}
        pillarHeight={0.5}
        noiseIntensity={0.3}
        interactive={false}
        mixBlendMode="normal"
      />

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Back to Home Link */}
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x:  0 }}
            className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </motion.div>
        </Link>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity:  1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay:  0.2 }}
                className="text-4xl font-quicksand font-bold text-white mb-2"
              >
                Join Apricity
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/60"
              >
                Create your creative sanctuary
              </motion.p>
            </div>

            {/* Signup Form */}
            <SignupForm />
          </div>
        </motion.div>

        {/* Footer Note
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-white/40 text-xs text-center"
        >
          By signing up, you agree to our Terms of Service and Privacy Policy
        </motion.p> */}
      </div>
    </div>
  );
}
