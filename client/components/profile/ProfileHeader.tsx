'use client';

import Avatar from '@/components/ui/Avatar';
import Link from 'next/link';

interface ProfileHeaderProps {
  username: string;
  bio: string;
  postCount: number;
  avatar?: string | null;
  isOwnProfile: boolean;
}

export default function ProfileHeader({
  username,
  bio,
  postCount,
  avatar,
  isOwnProfile,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Avatar */}
        <Avatar username={username} avatar={avatar} size="lg" />

        {/* Profile info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">@{username}</h1>
          <p className="text-gray-600 mb-4">{bio}</p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mb-4">
            <div>
              <span className="font-semibold text-gray-900">{postCount}</span>
              <span className="text-gray-600 ml-1">Posts</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {isOwnProfile ?  (
              // Show "Post" button on own profile
              <Link href="/create">
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post
                </button>
              </Link>
            ) : (
              // Show "Message" button on other's profile
              <Link href={`/messages/${username}`}>
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h. 01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-. 949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}