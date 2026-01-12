// // 'use client';
// // import { motion } from 'framer-motion';
// // import { useState } from 'react';
// // import Link from 'next/link';
// // import LightPillar from '@/components/backgrounds/LightPillar';
// // import FeedPost from '@/components/feed/FeedPost';
// // import CreatePostCard from '@/components/feed/CreatePostCard';

// // export default function FeedPage(){
// //   const [activeTab, setActiveTab] = useState<'all' | 'poetry' | 'art' | 'stories'>('all');

// //   // Mock data - will be replaced with real API calls
// //   const mockPosts = [
// //     {
// //       id: '1',
// //       author: {
// //         username: 'poeticSoul',
// //         avatar: null,
// //         selectedColor: '#9d84c4'
// //       },
// //       content: 'In the silence of dawn,\nWhispers of light embrace the earth,\nApricity warms my soul.',
// //       type: 'poetry' as const,
// //       createdAt: new Date().toISOString(),
// //       likes: 42,
// //       comments:  7
// //     },
// //     {
// //       id: '2',
// //       author: {
// //         username: 'artisticDreamer',
// //         avatar: null,
// //         selectedColor: '#64ffda'
// //       },
// //       content: 'Just finished this piece about finding warmth in the coldest moments.. .',
// //       type: 'art' as const,
// //       image: '/mock-art. jpg',
// //       createdAt:  new Date(Date.now() - 3600000).toISOString(),
// //       likes: 128,
// //       comments: 15
// //     }
// //   ];

// //   return(
// //     <div className="relative min-h-screen overflow-hidden bg-black">
// //       {/* Subtle Background */}
// //       <LightPillar
// //         topColor="#5227FF"
// //         bottomColor="#FF9FFC"
// //         intensity={0.3}
// //         rotationSpeed={0.15}
// //         glowAmount={0.002}
// //         pillarWidth={2.5}
// //         pillarHeight={0.6}
// //         noiseIntensity={0.2}
// //         interactive={false}
// //         mixBlendMode="normal"
// //       />

// //       {/* Dark overlay */}
// //       <div className="absolute inset-0 bg-black/50 z-0" />

// //       {/* Main Content */}
// //       <div className="relative z-10 min-h-screen">
// //         {/* Top Navigation Bar */}
// //         <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
// //           <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
// //             {/* Logo */}
// //             <Link href="/">
// //               <motion.h1
// //                 whileHover={{ scale: 1.05 }}
// //                 className="text-3xl font-quicksand font-bold text-white cursor-pointer"
// //               >
// //                 Apricity
// //               </motion.h1>
// //             </Link>

// //             {/* Navigation Links */}
// //             <div className="flex items-center gap-6">
// //               <Link href="/feed">
// //                 <span className="text-white/90 hover:text-white transition-colors font-medium">
// //                   Feed
// //                 </span>
// //               </Link>
// //               <Link href="/explore">
// //                 <span className="text-white/60 hover:text-white transition-colors">
// //                   Explore
// //                 </span>
// //               </Link>
// //               <Link href="/profile/me">
// //                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform">
// //                   M
// //                 </div>
// //               </Link>
// //             </div>
// //           </div>
// //         </nav>

// //         {/* Feed Container */}
// //         <div className="max-w-3xl mx-auto px-6 py-8">
// //           {/* Create Post Card */}
// //           <CreatePostCard />

// //           {/* Filter Tabs */}
// //           <motion.div
// //             initial={{ opacity: 0, y:  20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="flex gap-3 mb-8 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
// //           >
// //             {(['all', 'poetry', 'art', 'stories'] as const).map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`
// //                   flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300
// //                   ${activeTab === tab
// //                     ? 'bg-purple-600 text-white shadow-lg'
// //                     : 'text-white/60 hover:text-white hover: bg-white/5'
// //                   }
// //                 `}
// //               >
// //                 {tab. charAt(0).toUpperCase() + tab.slice(1)}
// //               </button>
// //             ))}
// //           </motion.div>

// //           {/* Feed Posts */}
// //           <div className="space-y-6">
// //             {mockPosts.map((post, index) => (
// //               <motion.div
// //                 key={post. id}
// //                 initial={{ opacity:  0, y: 30 }}
// //                 animate={{ opacity:  1, y: 0 }}
// //                 transition={{ delay: 0.3 + index * 0.1 }}
// //               >
// //                 <FeedPost post={post} />
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Load More */}
// //           <motion.button
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.8 }}
// //             className="w-full mt-8 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
// //           >
// //             Load More
// //           </motion.button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';

// import { useState } from 'react';
// import Header from '@/components/layout/Header';
// import PostCard from '@/components/feed/PostCard';
// import FilterTabs from '@/components/feed/FilterTabs';
// import EmptyFeed from '@/components/feed/EmptyFeed';
// import { mockPosts } from '@/lib/mockData';
// import { PostType } from '@/types/post';

// export default function FeedPage() {
//   // 🚧 MOCK DATA - Replace with real user data
//   const currentUser = {
//     username: 'myusername',
//     avatar: null,
//   };

//   const [activeFilter, setActiveFilter] = useState<PostType | 'all'>('all');

//   // Filter posts based on active filter
//   const filteredPosts = activeFilter === 'all' 
//     ? mockPosts 
//     : mockPosts.filter(post => post.type === activeFilter);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <Header currentUser={currentUser} />

//       {/* Filter tabs */}
//       <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

//       {/* Feed content */}
//       <main className="max-w-4xl mx-auto px-6 py-8">
//         {filteredPosts.length === 0 ? (
//           <EmptyFeed />
//         ) : (
//           <div className="space-y-6">
//             {filteredPosts.map((post) => (
//               <PostCard key={post.id} post={post} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import PostCard from '@/components/feed/PostCard';
import FilterTabs from '@/components/feed/FilterTabs';
import EmptyFeed from '@/components/feed/EmptyFeed';
import { PostType } from '@/types/post';

interface Post {
  _id: string;
  author: {
    username: string;
    profilePicture: string | null;
  };
  type: PostType;
  title?:  string;
  content:  string;
  image:  string | null;
  likes: any[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked: boolean;
}

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<PostType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts();
  }, [activeFilter]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/me', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.data. user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      router.push('/login');
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const type = activeFilter === 'all' ? '' : `&type=${activeFilter}`;
      const response = await fetch(`http://localhost:8000/api/v1/feed? page=1&limit=20${type}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (! currentUser) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <EmptyFeed />
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post._id} 
                post={{
                  id: post._id,
                  author: post.author,
                  type: post.type,
                  title: post.title,
                  content: post.content,
                  image: post.image,
                  likes: post.likesCount,
                  comments: post.commentsCount,
                  createdAt: new Date(post.createdAt),
                }} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}