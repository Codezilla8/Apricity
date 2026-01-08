interface AvatarProps {
  username: string;
  avatar?:  string | null;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ username, avatar, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  // Generate a consistent color based on username
  const colors = [
    'from-pink-400 to-rose-400',
    'from-purple-400 to-indigo-400',
    'from-cyan-400 to-blue-400',
    'from-amber-400 to-orange-400',
    'from-emerald-400 to-teal-400',
  ];
  
  const colorIndex = username.charCodeAt(0) % colors.length;
  const gradient = colors[colorIndex];

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={username}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  // Fallback:  First letter with gradient background
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold`}
    >
      {username. charAt(0).toUpperCase()}
    </div>
  );
}