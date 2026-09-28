import { useState } from "react";
import { Eye, MessageCircle, Pencil, Tag, UserRound, X } from "lucide-react";
import Footer from "../components/common/Footer";

const filters = ["All", "Electronics", "Robotics", "Programming", "IoT", "3D Design"];
const startingPosts = [
    ["Getting Started with Arduino", "admin", "Electronics", "I'm new to Arduino and electronics. Where should I start? What components do I need for basic projects?...", "2"],
    ["Best Robotics Project Ideas", "admin", "Robotics", "Share your favorite robotics project ideas! I'm looking for inspiration for my next project....", "1"],
    ["AI and Machine Learning in STEM", "john_doe", "Programming", "How can we integrate AI and machine learning into STEM education? Share your thoughts and resources....", "1"],
    ["IoT Smart Home Projects", "john_doe", "IoT", "I'm working on a smart home project. Any suggestions for sensors and automation ideas?...", "1"],
    ["3D Printing Tips", "admin", "3D Design", "What are your best tips for successful 3D printing? Share your experiences with different materials and settings....", "0"],
];

function Forum() {
    const [active, setActive] = useState("All");
    const [posts, setPosts] = useState(startingPosts);
    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", author: "", category: "Electronics" });
    const visiblePosts = posts.filter((post) => active === "All" || post[2] === active);

    const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const createPost = (event) => {
        event.preventDefault();
        const newPost = [form.title.trim(), form.author.trim(), form.category, form.description.trim(), "0"];
        setPosts([newPost, ...posts]);
        setForm({ title: "", description: "", author: "", category: "Electronics" });
        setIsComposerOpen(false);
        setActive("All");
    };

    return <main className="bg-white text-slate-600">
        <section className="mx-auto max-w-4xl px-6 pb-20 pt-20 sm:px-8 lg:pt-24">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">Our <span className="text-red-600">Forum</span></h1>
            <div className="mx-auto mt-4 h-1 w-14 bg-red-600" />
            <p className="mt-7 text-center text-sm sm:text-base">Connect, share, and learn with the STEMSAGE community.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">{filters.map((filter) => <button type="button" key={filter} onClick={() => setActive(filter)} className={`rounded-full px-5 py-2 text-xs font-medium transition ${active === filter ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"}`}>{filter}</button>)}</div>
            <div className="mt-6 space-y-4">{visiblePosts.map(([title, author, category, description, comments]) => <article key={`${title}-${author}`} className="rounded-xl border border-slate-100 px-5 py-6 shadow-sm sm:px-6"><h2 className="text-base font-bold text-slate-700">{title}</h2><div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><UserRound size={13} fill="currentColor" />{author}</span><span>◷ Aug 03, 2026</span><span className="inline-flex items-center gap-1 font-semibold text-red-600"><Tag size={13} fill="currentColor" />{category}</span></div><p className="mt-3 text-sm leading-6">{description}</p><div className="mt-4 flex items-center gap-5 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><MessageCircle size={14} fill="currentColor" />{comments} comments</span><span className="inline-flex items-center gap-1"><Eye size={14} />0 views</span></div></article>)}</div>
            <button type="button" onClick={() => setIsComposerOpen(true)} className="mt-6 flex w-full flex-col items-center justify-center rounded-md bg-slate-50 py-5 text-center text-sm transition hover:bg-red-50"><Pencil className="text-red-600" size={27} fill="currentColor" /><span className="mt-2 font-medium">Create a new post</span></button>
        </section>
        <Footer />

        {isComposerOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 px-4 py-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsComposerOpen(false); }}>
            <div role="dialog" aria-modal="true" aria-labelledby="create-post-title" className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
                <button type="button" onClick={() => setIsComposerOpen(false)} aria-label="Close new post form" className="absolute right-5 top-5 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={19} /></button>
                <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Join the conversation</p><h2 id="create-post-title" className="mt-2 text-2xl font-extrabold text-slate-800">Create a new post</h2><p className="mt-2 text-sm text-slate-500">Share a question, idea, or project with the STEMSAGE community.</p></div>
                <form onSubmit={createPost} className="space-y-5"><label className="block text-sm font-semibold text-slate-700">Title<input required name="title" value={form.title} onChange={updateField} placeholder="What would you like to discuss?" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100" /></label><label className="block text-sm font-semibold text-slate-700">Description<textarea required name="description" value={form.description} onChange={updateField} rows="5" placeholder="Tell the community more..." className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold text-slate-700">By whom<input required name="author" value={form.author} onChange={updateField} placeholder="Your name" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100" /></label><label className="block text-sm font-semibold text-slate-700">Category<select name="category" value={form.category} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100">{filters.slice(1).map((filter) => <option key={filter}>{filter}</option>)}</select></label></div><div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setIsComposerOpen(false)} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700">Publish post</button></div></form>
            </div>
        </div>}
    </main>;
}

export default Forum;
