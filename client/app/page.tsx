'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LightPillar from '@/components/backgrounds/LightPillar';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Light Pillar Background - Keep it!  */}
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

      {/* Subtle noise texture overlay for organic feel */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Handwritten-style welcome note */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity:  1, y: 0 }}
          transition={{ duration:  0.8, delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-white/40 text-sm font-lora italic tracking-wide">
            welcome to
          </p>
        </motion.div>

        {/* Logo/Title with breathing animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity:  1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-7xl md:text-8xl font-quicksand font-bold text-white mb-3 tracking-wide drop-shadow-2xl animate-breathe">
            Apricity
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* <p className="text-base md:text-lg text-white/60 font-crimson italic">
              The warmth of the sun in winter
            </p> */}
            <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </motion.div>

        {/* Personal, conversational tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity:  1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-lora">
            A quiet corner of the internet where{' '}
            <span className="text-pink-300 font-semibold relative">
              poets
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-300/30 animate-pulse" />
            </span>
            ,{' '}
            <span className="text-purple-300 font-semibold relative">
              artists
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-300/30 animate-pulse delay-100" />
            </span>
            , and{' '}
            <span className="text-cyan-300 font-semibold relative">
              dreamers
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-300/30 animate-pulse delay-200" />
            </span>
            {' '}come to share their hearts.
          </p>
          
        </motion.div>

        {/* CTA Buttons with softer design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 mb-16"
        >
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-black rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Your Journey
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale:  0.98 }}
              className="px-10 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all duration-300"
            >
              Welcome Back
            </motion.button>
          </Link>
        </motion.div>

        {/* Features with handcrafted feel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="grid grid-cols-1 md: grid-cols-3 gap-6 max-w-4xl"
        >
          {[
            { 
              title: "Poetry", 
              desc: "Let your words breathe",
              color: "from-pink-500/10 to-rose-500/10 border-pink-500/20"
            },
            { 
              title: "Art", 
              desc: "Paint your emotions", 
              color: "from-purple-500/10 to-violet-500/10 border-purple-500/20"
            },
            { 
              title:  "Stories", 
              desc: "Weave your worlds", 
              // icon: "📖",
              color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
            },
            { 
              title:  "Photos", 
              desc: "Capture your moments", 
              // icon: "�",
              color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay:  1.2 + index * 0.15, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-md border hover:border-opacity-50 transition-all duration-300 cursor-default`}
            >
              {/* <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div> */}
              <h3 className="text-xl font-quicksand font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm font-lora italic">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Small human touch at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 text-white/30 text-xs font-inter"
        >
          <p className="flex items-center gap-2">
            Made with love for creative souls
            <span className="inline-block animate-pulse">✨</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}