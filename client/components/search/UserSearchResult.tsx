import Avatar from '@/components/ui/Avatar';
import Link from 'next/link';

interface UserSearchResultProps {
  username: string;
  bio: string;
  postCount: number;
  avatar?:  string | null;
}

export default function UserSearchResult({
  username,
  bio,
  postCount,
  avatar,
}: UserSearchResultProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        {/* User info */}
        <div className="flex items-center gap-4 flex-1">
          <Avatar username={username} avatar={avatar} size="md" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">@{username}</h3>
            <p className="text-sm text-gray-600 mb-1">{bio}</p>
            <p className="text-xs text-gray-500">{postCount} posts</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link href={`/profile/${username}`}>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium text-sm transition-colors">
              View Profile
            </button>
          </Link>
          
          <Link href={`/messages/${username}`}>
            <button className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-. 949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}