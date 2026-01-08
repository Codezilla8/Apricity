export type PostType = 'poetry' | 'story' | 'painting' | 'photograph';

export interface Post {
  id: string;
  author: {
    username: string;
    avatar:  string | null;
  };
  type: PostType;
  title?:  string;
  content: string;
  image?: string | null;
  likes: number;
  comments: number;
  createdAt: Date;
}