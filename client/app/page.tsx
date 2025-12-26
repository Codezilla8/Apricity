'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-lavender-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease:  "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-glow/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity:  [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y:  -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration:  0.8 }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-8xl font-quicksand font-bold text-lavender-400 mb-4 tracking-wide">
            Apricity
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-literary italic">
            The warmth of the sun in winter
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
        >
          A sanctuary for <span className="text-lavender-400 font-semibold">poets</span>, 
          <span className="text-cyan-glow font-semibold"> artists</span>, and 
          <span className="text-teal-glow font-semibold"> dreamers</span>.
          <br />
          Share your creations with the world.
        </motion. p>

        {/* CTA Buttons */}
        <motion. div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:  0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(184, 164, 217, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-lavender-500 hover:bg-lavender-600 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lavender-glow"
            >
              Begin Your Journey
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-lavender-400/40 hover:border-lavender-400/80 text-white rounded-full font-semibold text-lg transition-all duration-300"
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
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl"
        >
          {[
              { title: "Poetry", desc: "Express emotions through verse" },
              { title: "Art", desc: "Share visual masterpieces" },
              { title: "Stories", desc: "Craft narratives that inspire" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y:  20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lavender-400/40 transition-all duration-300"
              >
                {/* REMOVED:  <div className="text-4xl mb-3">{feature.icon}</div> */}
                <h3 className="text-xl font-semibold text-lavender-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </motion.div>
        ))}
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center text-white/40 text-sm"
      >
        Made with care for creative souls ✨
      </motion.div>
    </div>
  );
}
