import { useState, useEffect } from "react";
import { Eye, MessageCircle, Pencil, Tag, UserRound, X, BookOpen, Calendar } from "lucide-react";
import Footer from "../components/common/Footer";
import { getBlogs } from "../services/blogService";

const filters = ["All", "Electronics", "Robotics", "Programming", "IoT", "3D Design"];
const startingPosts = [
  {
    title: "Getting Started with Arduino",
    authorName: "admin",
    category: "Electronics",
    content: "I'm new to Arduino and electronics. Where should I start? What components do I need for basic projects?...",
    commentsCount: "2",
    date: "Aug 03, 2026"
  },
  {
    title: "Best Robotics Project Ideas",
    authorName: "admin",
    category: "Robotics",
    content: "Share your favorite robotics project ideas! I'm looking for inspiration for my next project....",
    commentsCount: "1",
    date: "Aug 05, 2026"
  },
  {
    title: "AI and Machine Learning in STEM",
    authorName: "john_doe",
    category: "Programming",
    content: "How can we integrate AI and machine learning into STEM education? Share your thoughts and resources....",
    commentsCount: "1",
    date: "Aug 10, 2026"
  },
  {
    title: "IoT Smart Home Projects",
    authorName: "john_doe",
    category: "IoT",
    content: "I'm working on a smart home project. Any suggestions for sensors and automation ideas?...",
    commentsCount: "1",
    date: "Aug 12, 2026"
  },
  {
    title: "3D Printing Tips",
    authorName: "admin",
    category: "3D Design",
    content: "What are your best tips for successful 3D printing? Share your experiences with different materials and settings....",
    commentsCount: "0",
    date: "Aug 15, 2026"
  }
];

function Forum() {
  const [active, setActive] = useState("All");
  const [dbBlogs, setDbBlogs] = useState([]);
  const [posts, setPosts] = useState(startingPosts);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", author: "", category: "Electronics" });

  useEffect(() => {
    let isMounted = true;
    const loadBlogs = async () => {
      try {
        const response = await getBlogs();
        if (response.success && Array.isArray(response.data) && isMounted) {
          if (response.data.length > 0) {
            const formatted = response.data.map((b) => ({
              id: b._id,
              title: b.title,
              slug: b.slug,
              authorName: b.author?.name || "Admin",
              category: b.category || "General",
              content: b.excerpt || b.content,
              commentsCount: "0",
              date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Recent",
              isDbBlog: true
            }));
            setDbBlogs(formatted);
          }
        }
      } catch (err) {
        console.warn("Could not fetch backend blogs, using default forum items:", err.message);
      }
    };
    loadBlogs();
    return () => { isMounted = false; };
  }, []);

  const allDisplayPosts = dbBlogs.length > 0 ? [...dbBlogs, ...posts] : posts;

  const visiblePosts = allDisplayPosts.filter(
    (post) => active === "All" || post.category.toLowerCase() === active.toLowerCase()
  );

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const createPost = (event) => {
    event.preventDefault();
    const newPost = {
      title: form.title.trim(),
      authorName: form.author.trim() || "Anonymous",
      category: form.category,
      content: form.description.trim(),
      commentsCount: "0",
      date: "Just now"
    };
    setPosts([newPost, ...posts]);
    setForm({ title: "", description: "", author: "", category: "Electronics" });
    setIsComposerOpen(false);
    setActive("All");
  };

  return (
    <main className="bg-white text-slate-600 min-h-screen flex flex-col justify-between">
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:px-8 lg:pt-20">
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            STEMSAGE Blog & Community
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Our <span className="text-red-600">Forum & Blog</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-14 bg-red-600 rounded-full" />
          <p className="mt-6 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Connect, read articles from STEM experts, share projects, and learn with the STEMSAGE community.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition cursor-pointer ${
                active === filter
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Blog & Forum Cards List */}
        <div className="mt-8 space-y-5">
          {visiblePosts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm font-medium">No posts found for this category.</p>
            </div>
          ) : (
            visiblePosts.map((post, idx) => (
              <article
                key={post.id || `${post.title}-${idx}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-red-200"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                    <Tag size={12} />
                    {post.category}
                  </span>
                  {post.isDbBlog && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                      Official Article
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h2>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                    <UserRound size={13} className="text-slate-400" />
                    {post.authorName}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={13} className="text-slate-400" />
                    {post.date}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {post.content}
                </p>

                <div className="mt-4 flex items-center gap-5 text-xs text-slate-400 border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle size={14} />
                    {post.commentsCount} comments
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye size={14} />
                    Views
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Create Post Button */}
        <button
          type="button"
          onClick={() => setIsComposerOpen(true)}
          className="mt-8 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-6 text-center text-sm transition hover:bg-red-50/60 hover:border-red-300 cursor-pointer group"
        >
          <Pencil className="text-red-600 group-hover:scale-110 transition-transform" size={28} />
          <span className="mt-2 font-bold text-slate-800">Create a new post</span>
          <span className="text-xs text-slate-500">Share your thoughts with the STEMSAGE community</span>
        </button>
      </section>

      {/* Composer Modal */}
      {isComposerOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 backdrop-blur-xs px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsComposerOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-post-title"
            className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsComposerOpen(false)}
              aria-label="Close new post form"
              className="absolute right-5 top-5 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-red-600">Join the conversation</p>
              <h2 id="create-post-title" className="mt-1 text-2xl font-extrabold text-slate-900">
                Create a new post
              </h2>
              <p className="mt-1 text-sm text-slate-500">Share a question, idea, or project with the STEMSAGE community.</p>
            </div>
            <form onSubmit={createPost} className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Title
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder="What would you like to discuss?"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Description
                <textarea
                  required
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  rows="4"
                  placeholder="Tell the community more..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  By whom
                  <input
                    required
                    name="author"
                    value={form.author}
                    onChange={updateField}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={updateField}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  >
                    {filters.slice(1).map((filter) => (
                      <option key={filter}>{filter}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 shadow-md cursor-pointer"
                >
                  Publish post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

export default Forum;
