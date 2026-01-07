'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface FeedPostProps {
  post:  {
    id: string;
    author: {
      username:  string;
      avatar: string | null;
      selectedColor: string;
    };
    content: string;
    type: 'poetry' | 'art' | 'stories';
    image?: string;
    createdAt: string;
    likes: number;
    comments: number;
  };
}

export default function FeedPost({ post }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Author Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/profile/${post.author.username}`}>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
            style={{ background: `linear-gradient(135deg, ${post.author.selectedColor}, #FF9FFC)` }}
          >
            {post.author.username.charAt(0).toUpperCase()}
          </div>
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${post.author.username}`}>
            <h3 className="text-white font-semibold hover:underline cursor-pointer">
              {post. author.username}
            </h3>
          </Link>
          <p className="text-white/50 text-sm">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium">
          {post. type}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post.type === 'poetry' ?  (
          <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line font-literary italic">
            {post.content}
          </p>
        ) : (
          <p className="text-white/90 leading-relaxed">
            {post.content}
          </p>
        )}
      </div>

      {/* Image (if exists) */}
      {post.image && (
        <div className="mb-4 rounded-2xl overflow-hidden">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-white/10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex items-center gap-2 text-white/60 hover:text-pink-400 transition-colors"
        >
          <svg 
            className={`w-6 h-6 ${isLiked ? 'fill-pink-400 text-pink-400' : 'fill-none'}`}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4. 318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-medium">{likesCount}</span>
        </motion.button>

        <button className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-. 949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium">{post.comments}</span>
        </button>

        <button className="ml-auto text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8. 684 13.342C8.886 12.938 9 12.482 9 12c0-. 482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6. 632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </motion.article>
  );
}