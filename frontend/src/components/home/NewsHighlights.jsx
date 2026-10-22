import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, Calendar, ArrowRight } from "lucide-react";

/* -----------------------------------------------------------------------
   Workshop / News data — add or update items here as needed.
   Each item:
     - tag      : short label shown on the image (Teacher Training, etc.)
     - date     : human-readable date string
     - title    : headline of the news article / workshop
     - image    : path to the card thumbnail
     - link     : internal or external URL for "Read More"
------------------------------------------------------------------------ */
const newsItems = [
    {
        id: "news-1",
        tag: "Teacher Training",
        date: "7 Apr, 2026",
        title: "UCOST launches 6-day AI & Robotics mentor training in Uttarakhand",
        image: "/images/hero-2.png",
        link: "/workshops",
    },
    {
        id: "news-2",
        tag: "Student Projects",
        date: "27 Dec, 2025",
        title: "From a Class 9 science fair model to Gujarat State's Best Startup Project…",
        image: "/images/hero-1.png",
        link: "/workshops",
    },
    {
        id: "news-3",
        tag: "Impact Programs",
        date: "23 Dec, 2025",
        title: "How AI Education is Reaching Remote Schools Where Vehicles Cannot!",
        image: "/images/hero-3.png",
        link: "/workshops",
    },
    {
        id: "news-4",
        tag: "Bootcamp",
        date: "15 Nov, 2025",
        title: "500 students explore Drone Technology at STEMSAGE National Bootcamp",
        image: "/images/hero-2.png",
        link: "/workshops",
    },
    {
        id: "news-5",
        tag: "Lab Setup",
        date: "10 Oct, 2025",
        title: "STEMSAGE sets up state-of-the-art Robotics Lab at DPS Jaipur",
        image: "/images/hero-1.png",
        link: "/workshops",
    },
    {
        id: "news-6",
        tag: "Competition",
        date: "5 Sep, 2025",
        title: "STEMSAGE students win Gold at National Science Olympiad 2025",
        image: "/images/hero-3.png",
        link: "/workshops",
    },
];

/* -----------------------------------------------------------------------
   Single news card
------------------------------------------------------------------------ */
function NewsCard({ item }) {
    const [imgError, setImgError] = useState(false);

    return (
        <article
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            aria-label={item.title}
        >
            {/* Thumbnail */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-200 shrink-0">
                {!imgError ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400 text-xs font-semibold">
                        Image unavailable
                    </div>
                )}

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Tag chip */}
                <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
                    <Tag className="h-3 w-3 text-red-600" />
                    {item.tag}
                </span>

                {/* Date */}
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                </span>
            </div>

            {/* Text content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                </h3>

                <div className="mt-auto pt-4">
                    <Link
                        to={item.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors duration-200"
                        aria-label={"Read more about: " + item.title}
                    >
                        Read More
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

/* -----------------------------------------------------------------------
   Section — News & Highlights
------------------------------------------------------------------------ */
function NewsHighlights() {
    const VISIBLE_DEFAULT = 3;
    const [showAll, setShowAll] = useState(false);

    const visibleItems = showAll ? newsItems : newsItems.slice(0, VISIBLE_DEFAULT);

    return (
        <section
            id="news-highlights"
            className="relative w-full overflow-hidden bg-[#f7f8fc] py-16 sm:py-24 px-5 sm:px-8 border-b border-slate-100"
        >
            {/* Subtle decorative blobs */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-100/40 blur-3xl"
            />

            <div className="relative mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        News &amp; <span className="text-red-600">Highlights</span>
                    </h2>
                    <div className="mt-4 mx-auto h-[3px] w-20 bg-red-600 rounded-full" />
                    <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base font-medium text-slate-500 leading-relaxed">
                        Explore our latest breakthroughs, milestones, and moments shaping
                        the future of learning.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {visibleItems.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>

                {/* See All / Show Less button */}
                <div className="mt-10 flex justify-center">
                    <button
                        type="button"
                        id="news-highlights-toggle-btn"
                        onClick={() => setShowAll((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1c2d5a] hover:bg-[#15234a] text-white font-bold text-sm px-8 py-3.5 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03]"
                    >
                        {showAll ? "Show Less" : "See All"}
                        <ArrowRight
                            className={"h-4 w-4 transition-transform duration-300 " + (showAll ? "rotate-180" : "")}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NewsHighlights;
