'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  image:  string | null;
  caption:  string;
  onImageChange: (imageUrl: string) => void;
  onCaptionChange: (value: string) => void;
}

export default function ImageUploader({
  image,
  caption,
  onImageChange,
  onCaptionChange,
}:  ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // 🚧 MOCK - In production, upload the file
    const files = e.dataTransfer.files;
    if (files. length > 0) {
      console.log('File dropped:', files[0].name);
      // Mock:  Use a placeholder URL
      onImageChange('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 🚧 MOCK - In production, upload the file
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('File selected:', files[0].name);
      // Mock: Use a placeholder URL
      onImageChange('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800');
    }
  };

  const removeImage = () => {
    onImageChange('');
  };

  return (
    <div className="space-y-4">
      {/* Image upload area */}
      {! image ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-colors
            ${isDragging 
              ? 'border-indigo-600 bg-indigo-50' 
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }
          `}
        >
          <div className="text-6xl mb-4">📷</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h4>
          <p className="text-gray-600 mb-4">Drag and drop or click to browse</p>
          
          <label className="inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <span className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold cursor-pointer inline-block transition-colors">
              Choose File
            </span>
          </label>
        </div>
      ) : (
        // Image preview
        <div className="relative">
          <img
            src={image}
            alt="Upload preview"
            className="w-full rounded-xl object-cover max-h-96"
          />
          <button
            onClick={removeImage}
            className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Caption input */}
      <input
        type="text"
        placeholder="Caption (optional)"
        value={caption}
        onChange={(e) => onCaptionChange(e. target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}