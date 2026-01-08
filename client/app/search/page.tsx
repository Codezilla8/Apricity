'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import UserSearchResult from '@/components/search/UserSearchResult';
import { mockUsers } from '@/lib/mockData';

export default function SearchPage() {
  // 🚧 MOCK DATA - Current user
  const currentUser = mockUsers[0];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const searchResults = searchQuery. trim()
    ? mockUsers.filter(user =>
        user.username. toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Search header */}
        <div className="mb-8">
          <h1 className="text-3xl font-lora font-bold text-gray-900 mb-6">
            Search for users
          </h1>

          {/* Search input */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Search results */}
        {searchQuery. trim() === '' ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start searching
            </h3>
            <p className="text-gray-600">
              Type a username to find creators
            </p>
          </div>
        ) : searchResults.length === 0 ?  (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              Try searching for a different username
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Found {searchResults.length} {searchResults.length === 1 ? 'user' : 'users'}
            </p>
            {searchResults.map((user) => (
              <UserSearchResult
                key={user.username}
                username={user.username}
                bio={user.bio}
                postCount={user.posts}
                avatar={user.avatar}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}