// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import LightPillar from '@/components/backgrounds/LightPillar';

// export default function LandingPage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black">
//       {/* Light Pillar Background - Keep it!  */}
//       <LightPillar
//         topColor="#5227FF"
//         bottomColor="#FF9FFC"
//         intensity={0.7}
//         rotationSpeed={0.3}
//         glowAmount={0.005}
//         pillarWidth={3.0}
//         pillarHeight={0.4}
//         noiseIntensity={0.5}
//         interactive={false}
//         mixBlendMode="normal"
//       />

//       {/* Subtle noise texture overlay for organic feel */}
//       <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-0" />

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
//         {/* Handwritten-style welcome note */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity:  1, y: 0 }}
//           transition={{ duration:  0.8, delay: 0.1 }}
//           className="mb-6"
//         >
//           <p className="text-white/40 text-sm font-lora italic tracking-wide">
//             welcome to
//           </p>
//         </motion.div>

//         {/* Logo/Title with breathing animation */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity:  1, scale: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//           className="mb-6"
//         >
//           <h1 className="text-7xl md:text-8xl font-quicksand font-bold text-white mb-3 tracking-wide drop-shadow-2xl animate-breathe">
//             Apricity
//           </h1>
//           <div className="flex items-center justify-center gap-3 mb-2">
//             <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
//             {/* <p className="text-base md:text-lg text-white/60 font-crimson italic">
//               The warmth of the sun in winter
//             </p> */}
//             <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
//           </div>
//         </motion.div>

//         {/* Personal, conversational tagline */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity:  1 }}
//           transition={{ delay: 0.4, duration: 0.9 }}
//           className="max-w-2xl mb-10"
//         >
//           <p className="text-lg md:text-xl text-white/80 leading-relaxed font-lora">
//             A quiet corner of the internet where{' '}
//             <span className="text-pink-300 font-semibold relative">
//               poets
//               <span className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-300/30 animate-pulse" />
//             </span>
//             ,{' '}
//             <span className="text-purple-300 font-semibold relative">
//               artists
//               <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-300/30 animate-pulse delay-100" />
//             </span>
//             , and{' '}
//             <span className="text-cyan-300 font-semibold relative">
//               dreamers
//               <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-300/30 animate-pulse delay-200" />
//             </span>
//             {' '}come to share their hearts.
//           </p>
          
//         </motion.div>

//         {/* CTA Buttons with softer design */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.8 }}
//           className="flex flex-col sm:flex-row gap-5 mb-16"
//         >
//           <Link href="/signup">
//             <motion.button
//               whileHover={{ scale: 1.03, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-black rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 Begin Your Journey
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//             </motion.button>
//           </Link>

//           <Link href="/login">
//             <motion.button
//               whileHover={{ scale: 1.03, y: -2 }}
//               whileTap={{ scale:  0.98 }}
//               className="px-10 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all duration-300"
//             >
//               Welcome Back
//             </motion.button>
//           </Link>
//         </motion.div>

//         {/* Features with handcrafted feel */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//           className="grid grid-cols-1 md: grid-cols-3 gap-6 max-w-4xl"
//         >
//           {[
//             { 
//               title: "Poetry", 
//               desc: "Let your words breathe",
//               color: "from-pink-500/10 to-rose-500/10 border-pink-500/20"
//             },
//             { 
//               title: "Art", 
//               desc: "Paint your emotions", 
//               color: "from-purple-500/10 to-violet-500/10 border-purple-500/20"
//             },
//             { 
//               title:  "Stories", 
//               desc: "Weave your worlds", 
//               // icon: "📖",
//               color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
//             },
//             { 
//               title:  "Photos", 
//               desc: "Capture your moments", 
//               // icon: "�",
//               color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
//             },
//           ].map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay:  1.2 + index * 0.15, duration: 0.6 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-md border hover:border-opacity-50 transition-all duration-300 cursor-default`}
//             >
//               {/* <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
//                 {feature.icon}
//               </div> */}
//               <h3 className="text-xl font-quicksand font-semibold text-white mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-white/60 text-sm font-lora italic">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Small human touch at bottom */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.8, duration: 1 }}
//           className="mt-20 text-white/30 text-xs font-inter"
//         >
//           <p className="flex items-center gap-2">
//             Made with love for creative souls
//             <span className="inline-block animate-pulse">✨</span>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }





// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { mockPosts } from '@/lib/mockData'; // ✅ Import mock data
// import Avatar from '@/components/ui/Avatar';

// export default function LandingPage() {
//   // 🚧 MOCK DATA - Get first 2 posts for preview
//   const featuredPosts = mockPosts.slice(0, 2);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           <Link href="/">
//             <h1 className="text-2xl font-quicksand font-bold text-gray-900">
//               Apricity
//             </h1>
//           </Link>
//           <div className="flex items-center gap-4">
//             <Link href="/login">
//               <button className="text-gray-600 hover:text-gray-900 font-medium">
//                 Log in
//               </button>
//             </Link>
//             <Link href="/signup">
//               <button className="bg-indigo-600 hover: bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
//                 Sign up
//               </button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           {/* Left:  Text */}
//           <div>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-5xl md:text-6xl font-lora font-bold text-gray-900 mb-6 leading-tight"
//             >
//               Where words find warmth
//             </motion.h2>
            
//             <motion.p
//               initial={{ opacity: 0, y:  20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-xl text-gray-600 mb-8 leading-relaxed"
//             >
//               A quiet space for{' '}
//               <span className="text-pink-500 font-semibold">poets</span>,{' '}
//               <span className="text-purple-500 font-semibold">artists</span>, and{' '}
//               <span className="text-cyan-500 font-semibold">dreamers</span> to share their creativity.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y:  20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Link href="/signup">
//                 <button className="bg-indigo-600 hover: bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
//                   Start creating
//                 </button>
//               </Link>
//             </motion.div>
//           </div>

//           {/* Right:  Illustration placeholder */}
//           <div className="hidden md:block">
//             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 text-center">
//               {/* <div className="text-6xl mb-4">✍️</div> */}
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//     <img
//     src="/images/hero-sunset.jpg"
//     alt="Sunset warmth"
//     className="w-full h-[400px] object-cover"
//   />
  
//   {/* Dark gradient overlay so text is readable */}
//   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  
//   {/* White text at bottom */}
//   <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
//     <p className="text-white italic font-lora text-xl leading-relaxed drop-shadow-lg">
//       "In the warmth of winter,<br />
//       I found your smile..."
//     </p>
//   </div>
// </div>
//               {/* <p className="text-gray-600 italic font-lora">
//                 "In the warmth of winter,<br />
//                 I found your smile..."
//               </p> */}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="bg-gray-50 py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           <h3 className="text-3xl font-lora font-bold text-center text-gray-900 mb-12">
//             How it works
//           </h3>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Step 1 */}
//             <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
//               <div className="text-5xl mb-4">📝</div>
//               <h4 className="text-xl font-semibold text-gray-900 mb-3">Write</h4>
//               <p className="text-gray-600">
//                 Share your poetry, stories, art, or photography
//               </p>
//             </div>

//             {/* Step 2 */}
//             <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
//               <div className="text-5xl mb-4">🎨</div>
//               <h4 className="text-xl font-semibold text-gray-900 mb-3">Share</h4>
//               <p className="text-gray-600">
//                 Your work appears in a beautiful, distraction-free feed
//               </p>
//             </div>

//             {/* Step 3 */}
//             <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
//               <div className="text-5xl mb-4">💬</div>
//               <h4 className="text-xl font-semibold text-gray-900 mb-3">Connect</h4>
//               <p className="text-gray-600">
//                 Message other creators and build meaningful connections
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Posts Preview - ✅ NOW USING MOCK DATA */}
//       <section className="max-w-4xl mx-auto px-6 py-20">
//         <h3 className="text-3xl font-lora font-bold text-gray-900 mb-12">
//           Recent creations
//         </h3>

//         <div className="space-y-8">
//           {featuredPosts.map((post) => (
//             <div
//               key={post.id}
//               className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
//             >
//               {/* Author info */}
//               <div className="flex items-center gap-3 mb-4">
//                 <Avatar username={post.author.username} avatar={post.author.avatar} size="sm" />
//                 <div>
//                   <p className="font-medium text-gray-900">@{post.author.username}</p>
//                   <p className="text-sm text-gray-500 capitalize">{post.type}</p>
//                 </div>
//               </div>

//               {/* Post content */}
//               {post.image ?  (
//                 // If post has image (painting/photograph)
//                 <>
//                   <img
//                     src={post.image}
//                     alt={post. title}
//                     className="w-full h-64 object-cover rounded-xl mb-4"
//                   />
//                   <p className="text-gray-700">{post.content}</p>
//                 </>
//               ) : (
//                 // If post is text (poetry/story)
//                 <p className="text-gray-700 font-lora italic leading-relaxed whitespace-pre-line">
//                   {post.content. split('\n').slice(0, 4).join('\n')}
//                   {post.content.split('\n').length > 4 && '...'}
//                 </p>
//               )}

//               {/* Engagement */}
//               <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
//                 <span>❤️ {post.likes}</span>
//                 <span>💬 {post.comments}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA to see more */}
//         <div className="mt-12 text-center">
//           <Link href="/signup">
//             <button className="text-indigo-600 hover: text-indigo-700 font-semibold">
//               Join to see more →
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-gray-200 py-12">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <p className="text-gray-500 text-sm">
//             Made with love for creative souls ✨
//           </p>
//           <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
//             <a href="#" className="hover:text-gray-900">About</a>   
//             <a href="#" className="hover:text-gray-900">Privacy</a>
//             <a href="#" className="hover:text-gray-900">Terms</a>
//             <a href="#" className="hover:text-gray-900">Contact</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockPosts } from '@/lib/mockData';
import Avatar from '@/components/ui/Avatar';
import Image from 'next/image';

export default function LandingPage() {
  const featuredPosts = mockPosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-quicksand font-bold text-gray-900">
              Apricity
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                Log in
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left:  Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-lora font-bold text-gray-900 mb-6 leading-tight"
            >
              Where words find warmth
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y:  20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              A quiet space for{' '}
              <span className="text-pink-500 font-semibold">poets</span>,{' '}
              <span className="text-purple-500 font-semibold">artists</span>, and{' '}
              <span className="text-cyan-500 font-semibold">dreamers</span> to share their creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y:  20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/signup">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
                  Start creating
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Beautiful sunset image with text overlay - ✅ FIXED */}
          <div className="hidden md:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Your sunset image */}
              <img
                src="/images/hero-sunset.jpg"
                alt="Sunset warmth"
                className="w-full h-[400px] object-cover"
              />
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <p className="text-white italic font-lora text-xl leading-relaxed drop-shadow-lg">
                  "In the warmth of winter,<br />
                  I found your smile..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-lora font-bold text-center text-gray-900 mb-12">
            How it works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
              {/* <div className="text-5xl mb-4">📝</div> */}
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Write</h4>
              <p className="text-gray-600">
                Share your poetry, stories, art, or photography
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
              {/* <div className="text-5xl mb-4">🎨</div> */}
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Share</h4>
              <p className="text-gray-600">
                Your work appears in a beautiful, distraction-free feed
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
              {/* <div className="text-5xl mb-4">💬</div> */}
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Connect</h4>
              <p className="text-gray-600">
                Message other creators and build meaningful connections
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Preview */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-lora font-bold text-gray-900 mb-12">
          Recent creations
        </h3>

        <div className="space-y-8">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar username={post.author. username} avatar={post.author.avatar} size="sm" />
                <div>
                  <p className="font-medium text-gray-900">@{post.author.username}</p>
                  <p className="text-sm text-gray-500 capitalize">{post.type}</p>
                </div>
              </div>

              {post.image ?  (
                <>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <p className="text-gray-700">{post.content}</p>
                </>
              ) : (
                <p className="text-gray-700 font-lora italic leading-relaxed whitespace-pre-line">
                  {post.content. split('\n').slice(0, 4).join('\n')}
                  {post.content.split('\n').length > 4 && '...'}
                </p>
              )}

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/signup">
            <button className="text-indigo-600 hover: text-indigo-700 font-semibold">
              Join to see more →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            Made with love for creative souls ✨
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">About</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}