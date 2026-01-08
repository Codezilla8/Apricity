'use client';

import Header from '@/components/layout/Header';
import ChatList from '@/components/messages/ChatList';
import { mockUsers, mockConversations } from '@/lib/mockData';
import Link from 'next/link';

export default function MessagesPage() {
  // 🚧 MOCK DATA - Current user
  const currentUser = mockUsers[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-lora font-bold text-gray-900 mb-6">
          Your Messages
        </h1>

        {mockConversations.length === 0 ? (
          // Empty state
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-600 mb-6">
              Search for users to start chatting
            </p>
            <Link href="/search">
              <button className="px-6 py-3 bg-indigo-600 hover: bg-indigo-700 text-white rounded-full font-semibold transition-colors">
                Find Users
              </button>
            </Link>
          </div>
        ) : (
          // Conversations list
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <ChatList conversations={mockConversations} />
          </div>
        )}
      </main>
    </div>
  );
}