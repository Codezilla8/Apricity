'use client';

import { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed && ! disabled) {
      onSend(trimmed);
      setText('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target. value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />
        
        <button
          onClick={handleSend}
          disabled={! text.trim() || disabled}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}