import { Post } from '@/types/post';
import PostCard from '@/components/feed/PostCard';

interface UserPostsProps {
  posts: Post[];
  username: string;
}

export default function UserPosts({ posts, username }:  UserPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No posts yet
        </h3>
        <p className="text-gray-600">
          @{username} hasn't shared anything yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}