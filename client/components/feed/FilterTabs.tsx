'use client';

import { PostType } from '@/types/post';

interface FilterTabsProps {
  activeFilter: PostType | 'all';
  onFilterChange: (filter: PostType | 'all') => void;
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const tabs:  { value: PostType | 'all'; label: string; emoji:  string }[] = [
    { value: 'all', label: 'All', emoji: '✨' },
    { value:  'poetry', label: 'Poetry', emoji: '📝' },
    { value: 'story', label: 'Stories', emoji: '📖' },
    { value: 'painting', label: 'Paintings', emoji: '🎨' },
    { value: 'photograph', label: 'Photos', emoji: '📸' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-2 overflow-x-auto py-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange(tab.value)}
              className={`
                px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors
                ${activeFilter === tab.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className="mr-2">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}