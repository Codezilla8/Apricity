'use client';

import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import { Post } from '@/types/post';
import Link from 'next/link';

interface PostCardProps {
  post:  Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Local state for likes
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  // Format time ago
  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  // Handle like toggle
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
    
    // 🚧 MOCK - In production, send API request here
    console.log(`${isLiked ? 'Unliked' : 'Liked'} post ${post.id}`);
  };

  // Post type badge colors
  const typeColors = {
    poetry: 'bg-pink-100 text-pink-700',
    story: 'bg-purple-100 text-purple-700',
    painting: 'bg-cyan-100 text-cyan-700',
    photograph: 'bg-amber-100 text-amber-700',
  };

  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      {/* Author info */}
      <div className="flex items-center justify-between mb-4">
        <Link href={`/profile/${post.author.username}`}>
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <Avatar 
              username={post.author.username} 
              avatar={post.author.profilePicture} 
              size="md" 
            />
            <div>
              <p className="font-semibold text-gray-900">@{post.author.username}</p>
              <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
            </div>
          </div>
        </Link>

        {/* Post type badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${typeColors[post.type]}`}>
          {post.type}
        </span>
      </div>

      {/* Post content */}
      <div className="mb-4">
        {/* Title (if exists) */}
        {post.title && (
          <h3 className="text-xl font-lora font-bold text-gray-900 mb-3">
            {post.title}
          </h3>
        )}

        {/* Image (for painting/photograph) */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title || 'Post image'}
            className="w-full rounded-xl mb-4 object-cover max-h-96"
          />
        )}

        {/* Text content */}
        {post.type === 'poetry' || post.type === 'story' ?  (
          <p className="text-gray-800 font-lora leading-relaxed whitespace-pre-line italic">
            {post.content. length > 300 
              ? `${post.content.substring(0, 300)}...` 
              : post.content}
          </p>
        ) : (
          <p className="text-gray-700">
            {post.content}
          </p>
        )}
      </div>

      {/* Engagement actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
        {/* Like button - ✅ FIXED HEART ICON */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-all ${
            isLiked 
              ? 'text-red-500' 
              : 'text-gray-500 hover:text-red-400'
          }`}
        >
          {isLiked ? (
            // Filled red heart when liked
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            // Outline heart when not liked
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5. 5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          )}
          <span className="text-sm font-medium">{likeCount}</span>
        </button>

        {/* Comment button */}
        <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-. 949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium">{post. comments}</span>
        </button>

        {/* Share button */}
        <button className="ml-auto text-gray-500 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8. 684 13.342C8.886 12.938 9 12.482 9 12c0-. 482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </article>
  );
}