import { Message } from '@/types/message';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  // Format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute:  '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs md:max-w-md`}>
        <div
          className={`
            px-4 py-3 rounded-2xl
            ${message.isMe
              ? 'bg-indigo-600 text-white rounded-br-sm'
              : 'bg-gray-200 text-gray-900 rounded-bl-sm'
            }
          `}
        >
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
        </div>
        <p
          className={`
            text-xs text-gray-500 mt-1 px-1
            ${message.isMe ? 'text-right' : 'text-left'}
          `}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}