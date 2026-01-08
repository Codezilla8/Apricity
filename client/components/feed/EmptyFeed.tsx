import Link from 'next/link';

export default function EmptyFeed() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-2xl font-lora font-bold text-gray-900 mb-2">
        No posts yet
      </h3>
      <p className="text-gray-600 mb-6">
        Be the first to share your creativity! 
      </p>
      <Link href="/create">
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors">
          Create your first post
        </button>
      </Link>
    </div>
  );
}