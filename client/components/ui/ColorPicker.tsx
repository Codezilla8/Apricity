
// 'use client';

// import { motion } from 'framer-motion';
// import { ColorOption } from '@/types/user';

// interface ColorPickerProps {
//   selectedColor: string;
//   onColorSelect: (color: string) => void;
//   error?: string;
// }

// const colorOptions: ColorOption[] = [
//   { name: 'Lavender Dream', value: '#9d84c4', gradient: 'from-purple-400 to-pink-400' },
//   { name: 'Ocean Breeze', value: '#64ffda', gradient: 'from-cyan-400 to-blue-400' },
//   { name:  'Sunset Glow', value: '#ff9a76', gradient: 'from-orange-400 to-red-400' },
//   { name: 'Forest Whisper', value: '#6dd5a0', gradient: 'from-green-400 to-emerald-400' },
//   { name: 'Royal Purple', value: '#8470ff', gradient: 'from-indigo-400 to-purple-400' },
//   { name:  'Rose Garden', value: '#ff87ab', gradient: 'from-pink-400 to-rose-400' },
// ];

// export default function ColorPicker({ selectedColor, onColorSelect, error }: ColorPickerProps) {
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-white/80 mb-3">
//         Choose Your Theme Color
//       </label>
      
//       <div className="grid grid-cols-3 gap-4">
//         {colorOptions.map((color) => (
//           <motion.button
//             key={color.value}
//             type="button"
//             onClick={() => onColorSelect(color. value)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`
//               relative p-4 rounded-xl
//               bg-gradient-to-br ${color.gradient}
//               border-2 transition-all duration-200
//               ${selectedColor === color.value 
//                 ? 'border-white shadow-lg shadow-white/30 scale-105' 
//                 : 'border-white/20 hover:border-white/40'
//               }
//             `}
//           >
//             {selectedColor === color.value && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute inset-0 flex items-center justify-center"
//               >
//                 <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//               </motion.div>
//             )}
            
//             <span className="sr-only">{color.name}</span>
//           </motion.button>
//         ))}
//       </div>
      
//       {selectedColor && (
//         <p className="mt-2 text-sm text-white/60 text-center">
//           {colorOptions.find(c => c. value === selectedColor)?.name}
//         </p>
//       )}
      
//       {error && (
//         <p className="mt-1.5 text-sm text-red-400">{error}</p>
//       )}
//     </div>
//   );
// }
