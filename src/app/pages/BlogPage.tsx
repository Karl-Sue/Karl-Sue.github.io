import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, Tag, Plus, X } from "lucide-react";
import {
  Post,
  categories,
  getStoredPosts,
  savePostsToStorage,
} from "../data/posts";

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    category: "Frontend Development",
    tags: "",
    content: "",
  });

  // Load posts from storage on mount
  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  // Save posts to storage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      savePostsToStorage(posts);
    }
  }, [posts]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAddModal]);

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  const handleAddPost = () => {
    if (!newPost.title || !newPost.excerpt) {
      alert("Please fill in title and excerpt");
      return;
    }

    const post: Post = {
      id: newPost.title.toLowerCase().replace(/\s+/g, "-"),
      title: newPost.title,
      excerpt: newPost.excerpt,
      category: newPost.category,
      tags: newPost.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: "5 min read",
      content: newPost.content,
    };

    setPosts([post, ...posts]);
    setShowAddModal(false);
    setNewPost({
      title: "",
      excerpt: "",
      category: "Frontend Development",
      tags: "",
      content: "",
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Introduction Section */}
        <div className="mb-12">
          <h1 className="text-4xl mb-4">Blog & Learning Journey</h1>
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-3">
              Welcome to my digital garden 🌱 where I document my journey as a
              software developer. Here, I share insights on web development,
              cloud architecture, and my continuous learning adventures.
            </p>
            <p className="text-gray-600">
              From deep technical dives to reflections on learning new
              technologies, this space captures my experiences building scalable
              applications and exploring the ever-evolving landscape of software
              engineering. Feel free to learn, share, and connect!
            </p>
          </Card>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            CATEGORIES
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">TAGS</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
              >
                <X className="w-3 h-3" />
                {selectedTag}
              </button>
            )}
            {allTags
              .filter((tag) => tag !== selectedTag)
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </button>
              ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </div>

        {/* Posts Grid */}
        <div className="space-y-16">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                No posts found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag(null);
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
        title="Add new post"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-scrollbar">
            <div className="p-6 pr-4">
              <div className="flex items-center justify-between mb-6 pr-2">
                <h2 className="text-2xl">Add New Post</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 pr-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) =>
                      setNewPost({ ...newPost, excerpt: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Brief description of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.filter((c) => c !== "All").map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) =>
                      setNewPost({ ...newPost, tags: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. React, TypeScript, Tutorial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Content (Markdown)
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    rows={12}
                    placeholder="Write your post content in markdown format..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddPost}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Add Post
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}