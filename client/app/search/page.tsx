// 'use client';

// import { useState } from 'react';
// import Header from '@/components/layout/Header';
// import UserSearchResult from '@/components/search/UserSearchResult';
// import { mockUsers } from '@/lib/mockData';

// export default function SearchPage() {
//   // 🚧 MOCK DATA - Current user
//   const currentUser = mockUsers[0];

//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter users based on search query
//   const searchResults = searchQuery. trim()
//     ? mockUsers.filter(user =>
//         user.username. toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="max-w-4xl mx-auto px-6 py-8">
//         {/* Search header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-lora font-bold text-gray-900 mb-6">
//             Search for users
//           </h1>

//           {/* Search input */}
//           <div className="relative">
//             <svg
//               className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//             <input
//               type="text"
//               placeholder="Search by username..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
//               autoFocus
//             />
//           </div>
//         </div>

//         {/* Search results */}
//         {searchQuery. trim() === '' ? (
//           <div className="text-center py-20">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Start searching
//             </h3>
//             <p className="text-gray-600">
//               Type a username to find creators
//             </p>
//           </div>
//         ) : searchResults.length === 0 ?  (
//           <div className="text-center py-20">
//             <div className="text-6xl mb-4">😔</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No users found
//             </h3>
//             <p className="text-gray-600">
//               Try searching for a different username
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <p className="text-sm text-gray-600 mb-4">
//               Found {searchResults.length} {searchResults.length === 1 ? 'user' : 'users'}
//             </p>
//             {searchResults.map((user) => (
//               <UserSearchResult
//                 key={user.username}
//                 username={user.username}
//                 bio={user.bio}
//                 postCount={user.posts}
//                 avatar={user.avatar}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import Header from '@/components/layout/Header';
// import UserSearchResult from '@/components/search/UserSearchResult';

// interface User {
//   username: string;
//   profilePicture: string | null;
//   description?: string;
//   postCount: number;
// }

// export default function SearchPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setResults([]);
//       return;
//     }

//     const controller = new AbortController();

//     const searchUsers = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:8000/api/v1/users/search?q=${searchQuery}`,
//           {
//             credentials: 'include',
//             signal: controller.signal,
//           }
//         );

//         const data = await res.json();
//         setResults(data.data.users || []);
//       } catch (err) {
//         console.error('Search failed', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     searchUsers();

//     return () => controller.abort();
//   }, [searchQuery]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="max-w-4xl mx-auto px-6 py-8">
//         {/* Search header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-lora font-bold text-gray-900 mb-6">
//             Search for users
//           </h1>

//           <input
//             type="text"
//             placeholder="Search by username..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-4 border rounded-xl text-lg"
//             autoFocus
//           />
//         </div>

//         {/* Results */}
//         {!searchQuery.trim() ? (
//           <p className="text-center text-gray-500">Start typing to search</p>
//         ) : loading ? (
//           <p className="text-center">Searching...</p>
//         ) : results.length === 0 ? (
//           <p className="text-center text-gray-500">No users found</p>
//         ) : (
//           <div className="space-y-4">
//             {results.map((user) => (
//               <UserSearchResult
//                 username={user.username}
//                 bio={user.description ?? ''}
//                 avatar={user.profilePicture}
//                 postCount={user.postCount}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import UserSearchResult from '@/components/search/UserSearchResult';

interface SearchUser {
  username: string;
  profilePicture: string | null;
  description: string;
  postCount: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/users/search?q=${query}`,
          { credentials: 'include', signal: controller.signal }
        );

        const data = await res.json();
        setUsers(data.data.users);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Search for users</h1>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by username..."
          className="w-full px-4 py-4 border rounded-xl mb-8"
          autoFocus
        />

        {!query.trim() ? (
          <p className="text-center text-gray-500">Start typing to search</p>
        ) : loading ? (
          <p className="text-center">Searching…</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map(user => (
              <UserSearchResult
                key={user.username}
                username={user.username}
                bio={user.description}
                avatar={user.profilePicture}
                postCount={user.postCount}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
