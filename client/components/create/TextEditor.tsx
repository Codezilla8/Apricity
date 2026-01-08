'use client';

interface TextEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  placeholder?: string;
}

export default function TextEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  placeholder = 'Start writing...',
}: TextEditorProps) {
  return (
    <div className="space-y-4">
      {/* Title input */}
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => onTitleChange(e.target. value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-indigo-500 text-xl font-lora font-semibold"
      />

      {/* Content textarea */}
      <textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        rows={12}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-lora leading-relaxed resize-none"
      />

      {/* Character count */}
      <div className="text-right text-sm text-gray-500">
        {content.length} characters
      </div>
    </div>
  );
}