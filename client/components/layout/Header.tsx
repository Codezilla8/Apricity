'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import { useEffect, useState } from 'react';

// interface HeaderProps {
//   currentUser?: {
//     username: string;
//     avatar?: string | null;
//   };
// }

export default function Header() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<{
    username: string;
    avatar?: string | null;
  } | null>(null);


  // const handleLogout = () => {
  //   // 🚧 MOCK - Replace with real logout
  //   console.log('Logging out...');
  //   router.push('/');
  // };
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      router.push('/login');
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/me', {
          credentials: 'include',
        });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data.data.user);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };
      fetchMe();
  }, []);


  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/feed">
          <h1 className="text-2xl font-quicksand font-bold text-gray-900 cursor-pointer">
            Apricity
          </h1>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <Link href="/search">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </Link>

          {/* Create Post */}
          <Link href="/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover: bg-indigo-700 text-white rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline font-medium">Post</span>
            </button>
          </Link>

          {/* Messages */}
          <Link href="/messages">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h. 01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-. 949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {/* Unread indicator (mock) */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:opacity-80 transition-opacity"
            >
              <Avatar username={user?.username || 'User'} avatar={user?.avatar} size="sm" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {/* <Link href={`/profile/${user?.username}`}>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                    Profile
                  </div>
                </Link> */}
                {user && (
                <Link href={`/profile/${user.username}`}>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                    Profile
                  </div>
                </Link>
              )}

                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                  Settings
                </div>
                <hr className="my-2" />
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-red-600"
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}