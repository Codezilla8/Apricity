// 'use client';

// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import LightPillar from '@/components/backgrounds/LightPillar';
// import FeedPost from '@/components/feed/FeedPost';

// export default function ProfilePage() {
//   const params = useParams();
//   const username = params.username as string;
//   const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

//   // Mock user data - will be replaced with real API
//   const mockUser = {
//     username: username === 'me' ? 'yourUsername' : username,
//     email: 'user@example.com',
//     selectedColor: '#9d84c4',
//     bio: 'A wanderer of words, seeker of light.  Poetry is my compass, art is my soul.',
//     dateOfBirth: '1995-06-15',
//     joinedAt: '2025-12-26',
//     stats: {
//       posts: 24,
//       followers: 342,
//       following: 156
//     }
//   };

//   const mockUserPosts = [
//     {
//       id: '1',
//       author: {
//         username: mockUser.username,
//         avatar: null,
//         selectedColor: mockUser.selectedColor
//       },
//       content: 'The moon whispers secrets\nTo the silent night,\nAnd I listen with my heart.',
//       type: 'poetry' as const,
//       createdAt: new Date().toISOString(),
//       likes: 89,
//       comments: 12
//     }
//   ];

//   const isOwnProfile = username === 'me'; // Replace with real auth check

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black">
//       {/* Background with user's selected color */}
//       <LightPillar
//         topColor={mockUser.selectedColor}
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

//       <div className="absolute inset-0 bg-black/40 z-0" />

//       {/* Content */}
//       <div className="relative z-10 min-h-screen">
//         {/* Top Navigation */}
//         <nav className="backdrop-blur-xl bg-black/30 border-b border-white/10">
//           <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//             <Link href="/feed">
//               <motion.div
//                 whileHover={{ x: -5 }}
//                 className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 <span>Back to Feed</span>
//               </motion.div>
//             </Link>

//             <Link href="/">
//               <h1 className="text-2xl font-quicksand font-bold text-white">Apricity</h1>
//             </Link>

//             <div className="w-24" /> {/* Spacer for centering */}
//           </div>
//         </nav>

//         {/* Profile Content */}
//         <div className="max-w-4xl mx-auto px-6 py-12">
//           {/* Profile Header Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity:  1, y: 0 }}
//             className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-8"
//           >
//             {/* Avatar & Basic Info */}
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
//               {/* Avatar */}
//               <div 
//                 className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl"
//                 style={{ 
//                   background: `linear-gradient(135deg, ${mockUser.selectedColor}, #FF9FFC)` 
//                 }}
//               >
//                 {mockUser.username.charAt(0).toUpperCase()}
//               </div>

//               {/* Info */}
//               <div className="flex-1 text-center md:text-left">
//                 <h2 className="text-4xl font-quicksand font-bold text-white mb-2">
//                   {mockUser.username}
//                 </h2>
//                 <p className="text-white/60 mb-4">{mockUser.email}</p>

//                 {/* Stats */}
//                 <div className="flex gap-8 justify-center md:justify-start mb-4">
//                   <div>
//                     <div className="text-2xl font-bold text-white">{mockUser.stats.posts}</div>
//                     <div className="text-sm text-white/60">Posts</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">{mockUser. stats.followers}</div>
//                     <div className="text-sm text-white/60">Followers</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">{mockUser.stats.following}</div>
//                     <div className="text-sm text-white/60">Following</div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 {isOwnProfile ?  (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all"
//                   >
//                     Edit Profile
//                   </motion.button>
//                 ) : (
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-all"
//                     >
//                       Follow
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all"
//                     >
//                       Message
//                     </motion.button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Bio */}
//             {mockUser.bio && (
//               <div className="pt-6 border-t border-white/10">
//                 <p className="text-white/80 text-lg leading-relaxed italic">
//                   "{mockUser.bio}"
//                 </p>
//               </div>
//             )}

//             {/* Theme Color Display */}
//             <div className="pt-4 flex items-center gap-3">
//               <span className="text-white/60 text-sm">Theme Color:</span>
//               <div 
//                 className="w-8 h-8 rounded-full border-2 border-white/30"
//                 style={{ backgroundColor: mockUser.selectedColor }}
//               />
//             </div>
//           </motion.div>

//           {/* Tabs */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="flex gap-2 mb-6 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
//           >
//             <button
//               onClick={() => setActiveTab('posts')}
//               className={`
//                 flex-1 py-2 px-6 rounded-xl font-medium transition-all
//                 ${activeTab === 'posts'
//                   ? 'bg-purple-600 text-white'
//                   : 'text-white/60 hover:text-white hover:bg-white/5'
//                 }
//               `}
//             >
//               Posts
//             </button>
//             <button
//               onClick={() => setActiveTab('about')}
//               className={`
//                 flex-1 py-2 px-6 rounded-xl font-medium transition-all
//                 ${activeTab === 'about'
//                   ? 'bg-purple-600 text-white'
//                   : 'text-white/60 hover:text-white hover: bg-white/5'
//                 }
//               `}
//             >
//               About
//             </button>
//           </motion.div>

//           {/* Tab Content */}
//           {activeTab === 'posts' ?  (
//             <div className="space-y-6">
//               {mockUserPosts. map((post, index) => (
//                 <motion.div
//                   key={post.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 + index * 0.1 }}
//                 >
//                   <FeedPost post={post} />
//                 </motion. div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
//             >
//               <div className="space-y-4 text-white/80">
//                 <div>
//                   <h3 className="text-white font-semibold mb-1">Joined</h3>
//                   <p>{new Date(mockUser.joinedAt).toLocaleDateString('en-US', { 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-white font-semibold mb-1">Member for</h3>
//                   <p>
//                     {Math.floor((Date.now() - new Date(mockUser.joinedAt).getTime()) / (1000 * 60 * 60 * 24))} days
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





'use client';

import { use } from 'react';
import Header from '@/components/layout/Header';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserPosts from '@/components/profile/UserPosts';
import { mockUsers, mockPosts } from '@/lib/mockData';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);

  // 🚧 MOCK DATA - Current logged-in user
  const currentUser = mockUsers[0];

  // 🚧 MOCK DATA - Find the profile user
  const profileUser = mockUsers.find(u => u.username === username);

  // 🚧 MOCK DATA - Get user's posts
  const userPosts = mockPosts.filter(post => post.author.username === username);

  // If user not found
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} />
        <main className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="text-6xl mb-4">🤷</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
          <p className="text-gray-600">@{username} doesn't exist</p>
        </main>
      </div>
    );
  }

  const isOwnProfile = currentUser.username === username;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile header */}
        <ProfileHeader
          username={profileUser.username}
          bio={profileUser.bio}
          postCount={profileUser. posts}
          avatar={profileUser.avatar}
          isOwnProfile={isOwnProfile}
        />

        {/* User's posts */}
        <UserPosts posts={userPosts} username={username} />
      </main>
    </div>
  );
}