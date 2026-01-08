'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import ChatList from '@/components/messages/ChatList';
import ChatWindow from '@/components/messages/ChatWindow';
import MessageInput from '@/components/messages/MessageInput';
import Avatar from '@/components/ui/Avatar';
import { mockUsers, mockConversations, mockMessages } from '@/lib/mockData';
import { Message } from '@/types/message';

export default function ChatPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);

  // 🚧 MOCK DATA - Current user
  const currentUser = mockUsers[0];

  // 🚧 MOCK DATA - Get messages with this user
  const initialMessages = mockMessages[username as keyof typeof mockMessages] || [];
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Find the other user
  const otherUser = mockUsers.find(u => u.username === username);

  // Handle sending a message
  const handleSendMessage = (text: string) => {
    // 🚧 MOCK - In production, send to API
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text,
      timestamp: new Date(),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    console.log('📤 Sent message:', text);
  };

  // Desktop layout (split screen)
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header currentUser={currentUser} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Conversations list (hidden on mobile) */}
        <div className="hidden md:block w-80 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Messages</h2>
          </div>
          <ChatList conversations={mockConversations} activeUsername={username} />
        </div>

        {/* Right panel - Active chat */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Link href="/messages" className="md:hidden text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>

              <div className="flex items-center gap-3">
                <Avatar username={username} avatar={otherUser?.avatar} size="sm" />
                <div>
                  <p className="font-semibold text-gray-900">@{username}</p>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>

              <Link href={`/profile/${username}`}>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View Profile
                </button>
              </Link>
            </div>
          </div>

          {/* Messages */}
          <ChatWindow messages={messages} username={username} />

          {/* Message input */}
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}