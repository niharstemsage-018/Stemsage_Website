import { useState, useEffect, useCallback } from "react";
import { Eye, MessageCircle, Pencil, Tag, UserRound, X, BookOpen, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";
import { getBlogs, createBlog } from "../services/blogService";

const filters = ["All", "Electronics", "Robotics", "Programming", "IoT", "3D Design"];

function Forum() {
  const { user, token, isAuthenticated } = useAuth();
  const [active, setActive] = useState("All");
  const [dbBlogs, setDbBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [form, setForm] = useState({ title: "", description: "", author: "", category: "Electronics" });

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBlogs();
      if (response.success && Array.isArray(response.data)) {
        const formatted = response.data.map((b) => ({
          id: b._id,
          title: b.title,
          slug: b.slug,
          authorName: b.author?.name || "Admin",
          category: b.category || "General",
          content: b.excerpt || b.content,
          commentsCount: "0",
          date: b.publishedAt
            ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            : "Recent",
          isDbBlog: true
        }));
        setDbBlogs(formatted);
      }
    } catch (err) {
      console.warn("Could not fetch backend blogs from MongoDB:", err.message);
      setDbBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const visiblePosts = dbBlogs.filter(
    (post) => active === "All" || post.category.toLowerCase() === active.toLowerCase()
  );

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleOpenComposer = () => {
    setFormError("");
    setFormSuccess("");
    setForm({
      title: "",
      description: "",
      author: user?.name || "",
      category: "Electronics"
    });
    setIsComposerOpen(true);
  };

  const createPost = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!form.title.trim()) {
      setFormError("Title is required.");
      return;
    }

    if (!form.description.trim()) {
      setFormError("Description content is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const blogPayload = {
        title: form.title.trim(),
        content: form.description.trim(),
        excerpt: form.description.trim().substring(0, 160),
        category: form.category,
        published: true
      };

      const response = await createBlog(token || null, blogPayload);

      if (response.success && response.data?.blog) {
        setFormSuccess("Blog post published successfully to MongoDB!");
        setForm({ title: "", description: "", author: "", category: "Electronics" });
        setIsComposerOpen(false);
        setActive("All");
        // Refetch blogs directly from MongoDB so newly created blog appears immediately & persists
        await loadBlogs();
      } else {
        setFormError(response.message || "Failed to publish blog post.");
      }
    } catch (err) {
      console.error("Create blog error:", err);
      setFormError(err.message || "An error occurred while publishing the blog post.");
    } finally {
      setIsSubmitting(false);
    }
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
            Read published articles from STEM experts, share projects, and learn with the STEMSAGE community.
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

        {/* Blog Cards List */}
        <div className="mt-8 space-y-5">
          {loading ? (
            <div className="py-16 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-red-600 mb-3" />
              <p className="text-sm font-medium">Fetching blog articles from MongoDB...</p>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm font-medium">No published blog posts found for this category.</p>
            </div>
          ) : (
            visiblePosts.map((post) => (
              <article
                key={post.id || post.slug}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-red-200"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                    <Tag size={12} />
                    {post.category}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                    Official Article
                  </span>
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
          onClick={handleOpenComposer}
          className="mt-8 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-6 text-center text-sm transition hover:bg-red-50/60 hover:border-red-300 cursor-pointer group"
        >
          <Pencil className="text-red-600 group-hover:scale-110 transition-transform" size={28} />
          <span className="mt-2 font-bold text-slate-800">Create a new post</span>
          <span className="text-xs text-slate-500">
            Share your thoughts and publish an article to the STEMSAGE community
          </span>
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
              <p className="mt-1 text-sm text-slate-500">Publish a new article to the STEMSAGE blog repository.</p>
            </div>

            {/* Error / Warning Alert */}
            {formError && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-center gap-2.5 text-red-700 text-xs font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Success Alert */}
            {formSuccess && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2.5 text-emerald-700 text-xs font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={createPost} className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Title <span className="text-red-600">*</span>
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
                Description / Content <span className="text-red-600">*</span>
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
                  Author Name
                  <input
                    disabled
                    name="author"
                    value={user?.name || "Community Member"}
                    className="mt-2 w-full rounded-xl border border-slate-100 bg-slate-100 px-4 py-3 text-sm font-normal text-slate-500 outline-none cursor-not-allowed"
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
                  disabled={isSubmitting}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 shadow-md cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? "Publishing..." : "Publish post"}
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
