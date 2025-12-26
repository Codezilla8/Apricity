'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LightPillar from '@/components/backgrounds/LightPillar';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Light Pillar Background - Original Colors */}
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={0.7}
        rotationSpeed={0.3}
        glowAmount={0.005}
        pillarWidth={3.0}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        interactive={false}
        mixBlendMode="normal"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration:  1.1 }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-8xl font-quicksand font-bold text-white mb-4 tracking-wide drop-shadow-lg">
            Apricity
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-literary italic">
            The warmth of the sun in winter
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
        >
          A sanctuary for <span className="text-pink-300 font-semibold">poets</span>, 
          <span className="text-purple-300 font-semibold"> artists</span>, and 
          <span className="text-cyan-300 font-semibold"> dreamers</span>.
          <br />
          Share your creations with the world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(138, 43, 226, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
            >
              Begin Your Journey
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              whileHover={{ scale:  1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-white/30 hover:border-white/60 text-white rounded-full font-semibold text-lg transition-all duration-300"
            >
              Welcome Back
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 grid grid-cols-1 md: grid-cols-3 gap-8 max-w-5xl"
        >
          {[
            { title: "Poetry", desc: "Express emotions through verse" },
            { title: "Art", desc: "Share visual masterpieces" },
            { title: "Stories", desc: "Craft narratives that inspire" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y:  0 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm z-10"
      >
        Made with care for creative souls ✨
      </motion.div>
    </div>
  );
}
