// 🚧 MOCK DATA - Replace with real API calls when backend is ready

export const mockUsers = [
  {
    username: 'poeticSoul',
    bio: 'Writing about the warmth in winter moments',
    posts: 42,
    avatar: null,
  },
  {
    username:  'artist23',
    bio: 'Painter of dreams and digital landscapes',
    posts: 156,
    avatar: null,
  },
  {
    username: 'storyteller',
    bio: 'Weaving tales of magic and wonder',
    posts: 89,
    avatar: null,
  },
  {
    username: 'lensCrafter',
    bio: 'Capturing moments through my lens',
    posts: 203,
    avatar: null,
  }
];

export const mockPosts = [
  {
    id: '1',
    author: {
      username: 'poeticSoul',
      avatar: null,
    },
    type: 'poetry' as const,
    title: 'Winter Warmth',
    content: `In the warmth of winter,
I found your smile like sunlight
breaking through frost. 

Each word you spoke
melted the ice around my heart,
apricity in human form.`,
    image: null,
    likes: 42,
    comments: 7,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    author: {
      username: 'artist23',
      avatar: null,
    },
    type:  'painting' as const,
    title:  'Sunset Dreams',
    content: 'A digital painting exploring the warmth of golden hour',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    likes: 128,
    comments: 24,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: '3',
    author: {
      username: 'storyteller',
      avatar: null,
    },
    type: 'story' as const,
    title: 'The Last Bookshop',
    content: `The old bookshop stood at the corner of Maple and 5th, its wooden sign creaking in the winter wind. Inside, dust motes danced in streams of afternoon light. 

"We're closing," the owner said, but her eyes told a different story.  This place held more than books—it held memories, dreams, and the whispered secrets of a thousand readers.

I picked up a worn copy of poetry.  The margins were filled with notes from previous readers.  "This line saved me," one said. Another:  "Read this on the darkest day."

The bookshop might close, but these words would live forever. `,
    image: null,
    likes: 67,
    comments: 15,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    author: {
      username: 'lensCrafter',
      avatar: null,
    },
    type: 'photograph' as const,
    title:  'Morning Light',
    content: 'Captured this moment of pure serenity at sunrise',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    likes: 203,
    comments: 31,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  }
];

export const mockConversations = [
  {
    id: '1',
    with: 'poeticSoul',
    lastMessage: "That's beautiful! I loved your latest poem",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    unread: 0,
  },
  {
    id: '2',
    with: 'artist23',
    lastMessage: 'Thanks for the comment! 😊',
    lastMessageTime:  new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    unread: 2,
  },
  {
    id: '3',
    with: 'storyteller',
    lastMessage: "Let's collaborate on something",
    lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    unread: 0,
  }
];

export const mockMessages = {
  poeticSoul: [
    {
      id: '1',
      sender: 'poeticSoul',
      text: 'Hey! I loved your latest poem about winter',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isMe: false,
    },
    {
      id: '2',
      sender:  'me',
      text: 'Thank you so much! 😊 That means a lot',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 2 * 60 * 1000),
      isMe: true,
    },
    {
      id: '3',
      sender: 'poeticSoul',
      text: 'The imagery was stunning.  Have you written more?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 3 * 60 * 1000),
      isMe: false,
    },
    {
      id: '4',
      sender: 'me',
      text: "I'm working on a collection!  Would love your thoughts when it's ready",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      isMe: true,
    }
  ],
  artist23: [
    {
      id: '1',
      sender: 'artist23',
      text: 'Thanks for the comment on my painting!',
      timestamp:  new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isMe: false,
    },
    {
      id: '2',
      sender: 'me',
      text: 'It was absolutely gorgeous! 🎨',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
      isMe: true,
    }
  ]
};