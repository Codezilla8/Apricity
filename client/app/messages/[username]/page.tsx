// 'use client';

// import { use, useState } from 'react';
// import Link from 'next/link';
// import Header from '@/components/layout/Header';
// import ChatList from '@/components/messages/ChatList';
// import ChatWindow from '@/components/messages/ChatWindow';
// import MessageInput from '@/components/messages/MessageInput';
// import Avatar from '@/components/ui/Avatar';
// import { mockUsers, mockConversations, mockMessages } from '@/lib/mockData';
// import { Message } from '@/types/message';

// export default function ChatPage({ params }: { params: Promise<{ username: string }> }) {
//   const { username } = use(params);

//   // 🚧 MOCK DATA - Current user
//   const currentUser = mockUsers[0];

//   // 🚧 MOCK DATA - Get messages with this user
//   const initialMessages = mockMessages[username as keyof typeof mockMessages] || [];
//   const [messages, setMessages] = useState<Message[]>(initialMessages);

//   // Find the other user
//   const otherUser = mockUsers.find(u => u.username === username);

//   // Handle sending a message
//   const handleSendMessage = (text: string) => {
//     // 🚧 MOCK - In production, send to API
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       sender: 'me',
//       text,
//       timestamp: new Date(),
//       isMe: true,
//     };

//     setMessages([...messages, newMessage]);
//     console.log('📤 Sent message:', text);
//   };

//   // Desktop layout (split screen)
//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       <Header currentUser={currentUser} />

//       <div className="flex-1 flex overflow-hidden">
//         {/* Left sidebar - Conversations list (hidden on mobile) */}
//         <div className="hidden md:block w-80 border-r border-gray-200 bg-white">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="font-semibold text-gray-900">Messages</h2>
//           </div>
//           <ChatList conversations={mockConversations} activeUsername={username} />
//         </div>

//         {/* Right panel - Active chat */}
//         <div className="flex-1 flex flex-col">
//           {/* Chat header */}
//           <div className="bg-white border-b border-gray-200 p-4">
//             <div className="flex items-center justify-between max-w-4xl mx-auto">
//               <Link href="/messages" className="md:hidden text-gray-600 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </Link>

//               <div className="flex items-center gap-3">
//                 <Avatar username={username} avatar={otherUser?.avatar} size="sm" />
//                 <div>
//                   <p className="font-semibold text-gray-900">@{username}</p>
//                   <p className="text-xs text-gray-500">Active now</p>
//                 </div>
//               </div>

//               <Link href={`/profile/${username}`}>
//                 <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
//                   View Profile
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* Messages */}
//           <ChatWindow messages={messages} username={username} />

//           {/* Message input */}
//           <MessageInput onSend={handleSendMessage} />
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import MessageBubble from '@/components/messages/MessageBubble';
import MessageInput from '@/components/messages/MessageInput';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

export default function ChatPage() {
  const params = useParams();
  const username = params.username as string;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get access token from cookie
    const getAccessToken = () => {
      const name = "accessToken=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };

    const token = getAccessToken();

    // Initialize socket
    const newSocket = io('http://localhost:8000', {
      auth:  { token },
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    newSocket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data. message]);
    });

    newSocket.on('message_sent', (data) => {
      // Message confirmed sent
    });

    setSocket(newSocket);

    // Fetch existing messages
    fetchMessages();

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/chat/messages/${username}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.data.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (text: string) => {
    if (socket && text.trim()) {
      socket.emit('send_message', {
        recipientId: username, // You'll need to get the actual user ID
        text,
      });
      
      // Optimistically add message
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'me',
        text,
        timestamp: new Date(),
        isMe: true,
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold">{username}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {isLoading ? (
          <div className="text-center py-12">Loading... </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}