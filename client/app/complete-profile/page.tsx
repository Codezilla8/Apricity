'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

export default function CompleteProfilePage() {
  const router = useRouter();
  
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 🚧 MOCK - Get username from localStorage temporarily
  const [username] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tempUsername') || 'user';
    }
    return 'user';
  });

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > (5 * 1024 * 1024)) {
        setError('Image must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader. result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Remove avatar
  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (bio.trim().length < 10) {
      setError('Bio must be at least 10 characters');
      return;
    }

    if (bio.trim().length > 150) {
      setError('Bio must not exceed 150 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Send to backend
      const formData = new FormData();
      formData.append('bio', bio. trim());
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch('http://localhost:8000/api/v1/users/complete-profile', {
        method: 'POST',
        credentials: 'include', // Send cookies
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Clear temporary data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('tempUsername');
        }
        
        // Redirect to feed
        router.push('/feed');
      } else {
        setError(data.message || 'Failed to complete profile');
      }
    } catch (error) {
      console.error('❌ Profile completion error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✨</div>
            <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Tell the community about yourself
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {avatarPreview ?  (
                  <>
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="w-24 h-24">
                    <Avatar username={username} size="lg" />
                  </div>
                )}
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {avatarPreview ?  'Change Photo' : 'Upload Photo'}
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                {avatarPreview ? 'JPG, PNG, or GIF' : 'Optional • Max 5MB'}
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself...  Are you a poet, artist, photographer, or storyteller?"
                rows={5}
                maxLength={150}
                required
                className={`
                  w-full px-4 py-3 border rounded-lg 
                  focus:outline-none focus:ring-2 focus: ring-indigo-500 
                  resize-none
                  ${error && bio.trim().length < 10 ? 'border-red-500' : 'border-gray-300'}
                `}
              />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-xs ${bio.trim().length < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                  {bio.trim().length < 10 ? `${10 - bio.trim().length} more characters needed` : 'Minimum 10 characters'}
                </p>
                <p className={`text-xs ${bio.length > 140 ? 'text-amber-600' : 'text-gray-500'}`}>
                  {bio.length}/150
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              disabled={bio.trim().length < 10}
            >
              {isSubmitting ? 'Completing Profile...' : 'Complete Profile'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}