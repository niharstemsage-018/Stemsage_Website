import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";

/*
 * testimonials — mix of text and video items.
 *
 * For TEXT items:
 *   type: "text"
 *   quote, name, role, avatar
 *
 * For VIDEO items:
 *   type: "video"
 *   videoSrc  — path/URL to an mp4 (or any <video>-compatible source)
 *   name, role, avatar
 *   (set videoSrc: null to show a placeholder until a real file is added)
 */
const testimonials = [
    {
        id: "t-1",
        type: "text",
        quote:
            "Visiting the Surat Municipal Corporation's robotics lab and interacting with the students was a very delightful experience. In today's time, it is very important that students become familiar with subjects like AI and robotics and develop an innovative mindset.",
        name: "Bhupendra Patel",
        role: "CM of Gujarat",
        avatar: "/images/hero-2.png",
    },
    {
        id: "t-2",
        type: "video",
        videoSrc: null, // ← replace with real video path, e.g. "/videos/pushkar-dhami.mp4"
        name: "Pushkar Singh Dhami",
        role: "CM of Uttarakhand",
        avatar: "/images/hero-1.png",
    },
    {
        id: "t-3",
        type: "text",
        quote:
            "By integrating cutting-edge fields such as Artificial Intelligence and Robotics into our education ecosystem, we are preparing Uttarakhand's youth for future opportunities and inclusive growth, building a digitally competent, innovation-driven generation for the 21st century.",
        name: "Pushkar Singh Dhami",
        role: "CM of Uttarakhand",
        avatar: "/images/hero-1.png",
    },
    {
        id: "t-4",
        type: "text",
        quote:
            "Today we inaugurated the AI & Robotics Lab, a first-of-its-kind initiative in Jamnagar. Aligned with the National Education Policy, it prioritises technology to develop crucial skills like Critical Thinking and Programming. This initiative will immensely benefit students and drive professional upgradation for teachers, ensuring education keeps moving forward.",
        name: "Vipul Mehta",
        role: "CEO, Jamnagar District",
        avatar: "/images/hero-3.png",
    },
    {
        id: "t-5",
        type: "text",
        quote:
            "STEMbotix seamlessly integrates robotics with STEAM, revolutionising education. Their innovative curriculum cultivates problem-solving and creativity, exploring intersections of disciplines.",
        name: "Mr. Davoud Jafari",
        role: "Founder, ROBOTICS IRAN",
        avatar: "/images/hero-2.png",
    },
    {
        id: "t-6",
        type: "video",
        videoSrc: null, // ← replace with real video path, e.g. "/videos/shreshtha.mp4"
        name: "Shreshtha Singh",
        role: "Student, DAPS Swaminirajan Vidyamandir",
        avatar: "/images/hero-3.png",
    },
    {
        id: "t-7",
        type: "text",
        quote:
            "STEMbotix excels in quality educational materials & effective teaching methods simplifying complex STEM concepts. Strong commitment to advancing STEM education, nurturing problem-solving & creativity. Enthusiastically recommend for rewarding STEM journey.",
        name: "Shreshtha Singh",
        role: "Student, DAPS Swaminirajan Vidyamandir",
        avatar: "/images/hero-3.png",
    },
    {
        id: "t-8",
        type: "text",
        quote:
            "The hands-on learning kits provided by STEMSAGE turned our science classroom into an active innovation lab. Students learn circuit design and programming with real enthusiasm.",
        name: "Anand Verma",
        role: "STEM Coordinator, Apex International",
        avatar: "/images/hero-2.png",
    },
    {
        id: "t-9",
        type: "text",
        quote:
            "Organising the IoT & Robotics bootcamp with STEMSAGE was seamless. The students built working smart sensors in just two days. Truly an extraordinary experience!",
        name: "Sneha Kulkarni",
        role: "Head of Innovation Lab, Tech Campus",
        avatar: "/images/hero-3.png",
    },
];

/* ─── How many cards to show per page depending on viewport ─────────── */
function useCardsPerPage() {
    const [cards, setCards] = useState(3);
    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setCards(1);
            else if (window.innerWidth < 1024) setCards(2);
            else setCards(3);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return cards;
}

/* ─── VIDEO card ─────────────────────────────────────────────────────── */
function VideoCard({ item }) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        if (!videoRef.current) return;
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-slate-700/60 select-none">
            {/* Video area */}
            <div
                className="relative flex-1 bg-black cursor-pointer group"
                style={{ minHeight: "220px" }}
                onClick={toggle}
            >
                {item.videoSrc ? (
                    <video
                        ref={videoRef}
                        src={item.videoSrc}
                        className="w-full h-full object-cover"
                        onEnded={() => setPlaying(false)}
                        playsInline
                    />
                ) : (
                    /* Placeholder when no video src is provided */
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500 p-6 text-center">
                        <Play className="h-10 w-10 mb-3 text-slate-600" />
                        <span className="text-xs font-semibold text-slate-500">
                            Video coming soon
                        </span>
                    </div>
                )}

                {/* Play / Pause overlay */}
                {item.videoSrc && (
                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                        }`}
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl">
                            {playing ? (
                                /* Pause icon */
                                <span className="flex gap-1">
                                    <span className="block w-[5px] h-5 bg-white rounded-sm" />
                                    <span className="block w-[5px] h-5 bg-white rounded-sm" />
                                </span>
                            ) : (
                                <Play className="h-6 w-6 text-white ml-0.5" />
                            )}
                        </div>
                    </div>
                )}

                {/* Duration badge (decorative) */}
                {item.videoSrc && (
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/80 bg-black/50 backdrop-blur-sm rounded px-1.5 py-0.5">
                        0:00 / 0:05
                    </span>
                )}
            </div>

            {/* Person info */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/80">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-9 w-9 rounded-full object-cover border-2 border-slate-600 shrink-0"
                />
                <div className="min-w-0">
                    <p className="text-[13px] font-bold text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{item.role}</p>
                </div>
            </div>
        </div>
    );
}

/* ─── TEXT card ──────────────────────────────────────────────────────── */
function TextCard({ item }) {
    return (
        <div className="flex flex-col h-full rounded-2xl bg-white shadow-md border border-slate-100 p-5 sm:p-6 select-none">
            {/* Big quote icon */}
            <Quote className="h-8 w-8 text-[#1c2d5a] mb-3 shrink-0" strokeWidth={2.5} />

            {/* Quote text — scrollable if very long */}
            <p className="flex-1 text-[13px] sm:text-sm font-medium text-slate-700 leading-relaxed overflow-y-auto pr-1 max-h-52">
                {item.quote}
            </p>

            {/* Person info */}
            <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{item.role}</p>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Section ───────────────────────────────────────────────────── */
function TestimonialsSection() {
    const cardsPerPage = useCardsPerPage();
    const [offset, setOffset] = useState(0); // index of first visible card
    const [animDir, setAnimDir] = useState(null); // "left" | "right" | null
    const [visible, setVisible] = useState(true);
    const autoRef = useRef(null);

    const total = testimonials.length;
    const maxOffset = Math.max(0, total - cardsPerPage);

    /* Clamp offset when cardsPerPage changes */
    useEffect(() => {
        setOffset((prev) => Math.min(prev, Math.max(0, total - cardsPerPage)));
    }, [cardsPerPage, total]);

    const slide = useCallback(
        (dir) => {
            setAnimDir(dir);
            setVisible(false);
            setTimeout(() => {
                setOffset((prev) => {
                    if (dir === "right") return prev >= maxOffset ? 0 : prev + 1;
                    return prev <= 0 ? maxOffset : prev - 1;
                });
                setVisible(true);
                setAnimDir(null);
            }, 220);
        },
        [maxOffset]
    );

    /* Auto-advance every 6 s */
    useEffect(() => {
        autoRef.current = setInterval(() => slide("right"), 6000);
        return () => clearInterval(autoRef.current);
    }, [slide]);

    const pause = () => clearInterval(autoRef.current);
    const resume = () => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => slide("right"), 6000);
    };

    const visibleItems = testimonials.slice(offset, offset + cardsPerPage);
    const dotCount = maxOffset + 1;

    return (
        <section
            id="testimonials"
            className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 py-16 sm:py-20 border-b border-slate-100"
            onMouseEnter={pause}
            onMouseLeave={resume}
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">

                {/* ── Header row ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Testimonials
                        </h2>
                        <div className="mt-3 h-[3px] w-16 bg-red-600 rounded-full" />
                        <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium max-w-md leading-relaxed">
                            What our clients say about us and the partners we work with.
                        </p>
                    </div>

                    {/* Navigation arrows — top-right */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            id="testimonials-prev-btn"
                            onClick={() => slide("left")}
                            aria-label="Previous testimonials"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c2d5a] text-white shadow-md hover:bg-[#15234a] transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            id="testimonials-next-btn"
                            onClick={() => slide("right")}
                            aria-label="Next testimonials"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c2d5a] text-white shadow-md hover:bg-[#15234a] transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* ── Cards row ── */}
                <div
                    className="grid gap-5 transition-opacity duration-200"
                    style={{
                        gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))`,
                        opacity: visible ? 1 : 0,
                        transform: visible
                            ? "translateX(0)"
                            : animDir === "right"
                            ? "translateX(-12px)"
                            : "translateX(12px)",
                        transition: "opacity 0.22s ease, transform 0.22s ease",
                    }}
                >
                    {visibleItems.map((item) =>
                        item.type === "video" ? (
                            <VideoCard key={item.id} item={item} />
                        ) : (
                            <TextCard key={item.id} item={item} />
                        )
                    )}
                </div>

                {/* ── Pagination dots ── */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    {Array.from({ length: dotCount }).map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            id={"testimonials-dot-" + idx}
                            onClick={() => {
                                setAnimDir(idx > offset ? "right" : "left");
                                setVisible(false);
                                setTimeout(() => {
                                    setOffset(idx);
                                    setVisible(true);
                                    setAnimDir(null);
                                }, 220);
                            }}
                            aria-label={"Go to slide " + (idx + 1)}
                            className={[
                                "h-2.5 rounded-full transition-all duration-300",
                                idx === offset
                                    ? "w-7 bg-[#1c2d5a]"
                                    : "w-2.5 bg-slate-300 hover:bg-slate-500",
                            ].join(" ")}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
