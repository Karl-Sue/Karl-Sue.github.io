export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  content?: string;
}

export const initialPosts: Post[] = [
];

export const categories = [
  "All",
  "Frontend Development",
  "Backend Development",
  "Full Stack",
  "Learning Progress",
];

// Storage key for localStorage
const STORAGE_KEY = "blog_posts";

// Get posts from localStorage
export function getStoredPosts(): Post[] {
  if (typeof window === "undefined") return initialPosts;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load posts from storage:", error);
  }
  
  return initialPosts;
}

// Save posts to localStorage
export function savePostsToStorage(posts: Post[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to save posts to storage:", error);
  }
}

// Get a single post by ID
export function getPostById(id: string): Post | undefined {
  const posts = getStoredPosts();
  return posts.find((post) => post.id === id);
}
