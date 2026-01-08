'use client';

import { PostType } from '@/types/post';

interface PostTypeSelectorProps {
  selectedType: PostType | null;
  onSelectType: (type: PostType) => void;
}

export default function PostTypeSelector({ selectedType, onSelectType }: PostTypeSelectorProps) {
  const types:  { value: PostType; label: string; emoji: string; description: string }[] = [
    { value: 'poetry', label: 'Poetry', emoji: '📝', description: 'Share verses' },
    { value: 'story', label: 'Story', emoji: '📖', description: 'Tell a tale' },
    { value: 'painting', label: 'Painting', emoji: '🎨', description: 'Digital art' },
    { value:  'photograph', label: 'Photograph', emoji: '📸', description: 'Capture moments' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">What are you sharing?</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onSelectType(type.value)}
            className={`
              p-6 rounded-xl border-2 transition-all text-center
              ${selectedType === type.value
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <div className="text-4xl mb-2">{type.emoji}</div>
            <div className="font-semibold text-gray-900 mb-1">{type.label}</div>
            <div className="text-xs text-gray-500">{type.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}