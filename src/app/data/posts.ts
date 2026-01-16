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

// Load markdown content for a post
export async function loadPostContent(id: string): Promise<string> {
  try {
    const response = await fetch(`/src/app/posts/${id}.md`);
    if (!response.ok) throw new Error("Post not found");
    return await response.text();
  } catch (error) {
    console.error(`Failed to load post ${id}:`, error);
    return "Content not available.";
  }
}

// Get a single post by ID
export function getPostById(id: string): Post | undefined {
  return initialPosts.find((post) => post.id === id);
}

// Get all posts
export function getAllPosts(): Post[] {
  return initialPosts;
}
