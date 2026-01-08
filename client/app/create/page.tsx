'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PostTypeSelector from '@/components/create/PostTypeSelector';
import TextEditor from '@/components/create/TextEditor';
import ImageUploader from '@/components/create/ImageUploader';
import { PostType } from '@/types/post';

export default function CreatePostPage() {
  const router = useRouter();
  
  const [selectedType, setSelectedType] = useState<PostType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  // Validate form
  const canPublish = (): boolean => {
    if (!selectedType) return false;
    
    if (selectedType === 'poetry' || selectedType === 'story') {
      return content.trim().length > 0;
    }
    
    if (selectedType === 'painting' || selectedType === 'photograph') {
      return image !== null;
    }
    
    return false;
  };

  // Handle publish
  const handlePublish = async () => {
    if (!canPublish()) return;

    setIsPublishing(true);

    try {
      // 🚧 MOCK DATA - Replace with real API call
      const postData = {
        type: selectedType,
        title:  title || undefined,
        content: selectedType === 'poetry' || selectedType === 'story' ?  content : caption,
        image: selectedType === 'painting' || selectedType === 'photograph' ? image : undefined,
      };

      console.log('📝 Publishing post:', postData);

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to feed
      alert('Post published successfully!  ✨');
      router.push('/feed');
    } catch (error) {
      console.error('❌ Error publishing post:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/feed">
            <button className="text-gray-600 hover:text-gray-900 font-medium">
              ← Cancel
            </button>
          </Link>

          <h1 className="text-xl font-semibold text-gray-900">Create Post</h1>

          <button
            onClick={handlePublish}
            disabled={!canPublish() || isPublishing}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8">
          {/* Post type selector */}
          <PostTypeSelector
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />

          {/* Conditional editor based on type */}
          {selectedType && (
            <>
              <hr className="border-gray-200" />

              {(selectedType === 'poetry' || selectedType === 'story') && (
                <TextEditor
                  title={title}
                  content={content}
                  onTitleChange={setTitle}
                  onContentChange={setContent}
                  placeholder={
                    selectedType === 'poetry'
                      ? 'Write your poetry here...\n\nYour words will inspire others.'
                      : 'Write your story here...\n\nTake your readers on a journey.'
                  }
                />
              )}

              {(selectedType === 'painting' || selectedType === 'photograph') && (
                <ImageUploader
                  image={image}
                  caption={caption}
                  onImageChange={setImage}
                  onCaptionChange={setCaption}
                />
              )}
            </>
          )}
        </div>

        {/* Tips section */}
        {selectedType && (
          <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
            <h4 className="font-semibold text-indigo-900 mb-2">💡 Tips</h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              {selectedType === 'poetry' && (
                <>
                  <li>• Let your emotions flow naturally</li>
                  <li>• Line breaks matter - use them intentionally</li>
                  <li>• Don't worry about perfection, just write</li>
                </>
              )}
              {selectedType === 'story' && (
                <>
                  <li>• Start with a compelling opening</li>
                  <li>• Show, don't just tell</li>
                  <li>• Leave your readers wanting more</li>
                </>
              )}
              {(selectedType === 'painting' || selectedType === 'photograph') && (
                <>
                  <li>• High-quality images work best</li>
                  <li>• Add a caption to give context</li>
                  <li>• Share the story behind your creation</li>
                </>
              )}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}