'use client';

import Avatar from '@/components/ui/Avatar';
import { Conversation } from '@/types/message';
import Link from 'next/link';

interface ChatListProps {
  conversations: Conversation[];
  activeUsername?:  string;
}

export default function ChatList({ conversations, activeUsername }: ChatListProps) {
  // Format time ago
  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-4xl mb-3">💬</div>
        <p className="text-sm text-gray-500">No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {conversations.map((conversation) => (
        <Link key={conversation.id} href={`/messages/${conversation.with}`}>
          <div
            className={`
              flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors
              ${activeUsername === conversation.with ?  'bg-indigo-50 border-indigo-200' : ''}
            `}
          >
            <Avatar username={conversation.with} size="md" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900 truncate">
                  @{conversation.with}
                </p>
                <span className="text-xs text-gray-500 ml-2 shrink-0">
                  {getTimeAgo(conversation.lastMessageTime)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage}
              </p>
            </div>

            {conversation.unread > 0 && (
              <div className="shrink-0 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {conversation. unread}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}