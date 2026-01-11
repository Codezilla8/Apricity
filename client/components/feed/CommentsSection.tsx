'use client';

import { useState, useEffect } from 'react';
import Avatar from '@/components/ui/Avatar';

interface Comment {
  _id: string;
  author:  {
    username: string;
    profilePicture:  string | null;
  };
  content: string;
  createdAt: string;
}

interface CommentsSectionProps {
  postId:  string;
  commentsCount: number;
}

export default function CommentsSection({ postId, commentsCount }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/posts/${postId}/comments`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setComments(data.data. comments);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: newComment }),
      });

      const data = await response.json();
      if (data.success) {
        setComments([data.data.comment, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            maxLength={500}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={! newComment.trim() || isSubmitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.  Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              <Avatar username={comment.author.username} avatar={comment.author.profilePicture} size="sm" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <p className="font-semibold text-sm">{comment.author.username}</p>
                  <p className="text-gray-800 text-sm">{comment. content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}