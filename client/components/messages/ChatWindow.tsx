'use client';

import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/message';

interface ChatWindowProps {
  messages: Message[];
  username: string;
}

export default function ChatWindow({ messages, username }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">👋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start a conversation
          </h3>
          <p className="text-gray-600">
            Send a message to @{username}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}