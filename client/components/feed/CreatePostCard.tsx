'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CreatePostCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y:  0 }}
      className="mb-8 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
          M
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 text-left px-4 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          What's on your mind?
        </button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height:  'auto', opacity: 1 }}
          className="mt-4 space-y-4"
        >
          <textarea
            placeholder="Share your poetry, art, or story..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder: text-white/40 focus:outline-none focus: border-purple-400 resize-none"
            rows={4}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-white/10 hover: bg-white/20 text-white/80 text-sm transition-all">
                📷 Image
              </button>
              <select className="px-4 py-2 rounded-lg bg-white/10 text-white border-none focus:outline-none">
                <option value="poetry">Poetry</option>
                <option value="art">Art</option>
                <option value="stories">Stories</option>
              </select>
            </div>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-all">
              Post
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}