import React, { useState, useEffect } from "react";

const testimonials = [
    {
        id: "test-1",
        quote: "The workshops by STEMSAGE not only inspired our students but also provided them with the technical foundation to excel at the national level. The success of Vhyuastra Robotics is a testament to their innovative approach to education.",
        name: "Dr. Sharma",
        role: "Principal, SVKM School",
        avatar: "/images/hero-2.png",
    },
    {
        id: "test-2",
        quote: "STEMSAGE has been instrumental in bridging the gap between academic theory and practical engineering applications through high quality hardware kits and interactive robotics labs.",
        name: "Prof. Patel",
        role: "Head of Engineering, RCPIT",
        avatar: "/images/hero-3.png",
    },
    {
        id: "test-3",
        quote: "My daughter built her first autonomous robotics project after attending the 3-day STEMSAGE workshop. The mentors are genuinely passionate, supportive, and knowledgeable!",
        name: "Ms. Reddy",
        role: "Parent of High School Student",
        avatar: "/images/hero-1.png",
    },
    {
        id: "test-4",
        quote: "The hands-on learning kits provided by STEMSAGE turned our science classroom into an active innovation lab. Students learn circuit design and programming with real enthusiasm.",
        name: "Anand Verma",
        role: "STEM Coordinator, Apex International",
        avatar: "/images/hero-2.png",
    },
    {
        id: "test-5",
        quote: "Organizing the IoT & Robotics bootcamp with STEMSAGE was seamless. The students built working smart sensors in just two days. Truly an extraordinary experience!",
        name: "Sneha Kulkarni",
        role: "Head of Innovation Lab, Tech Campus",
        avatar: "/images/hero-3.png",
    },
];

function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    // Auto-advance carousel every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const current = testimonials[currentIndex];

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-sky-100 via-teal-50 to-blue-100 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
            {/* Left Navigation Arrow — Distant at the outer left side of the screen */}
            <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="absolute left-4 sm:left-8 md:left-12 lg:left-16 xl:left-24 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-light text-slate-500 hover:text-slate-900 transition-all hover:scale-125 focus:outline-none"
            >
                ‹
            </button>

            {/* Right Navigation Arrow — Distant at the outer right side of the screen */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="absolute right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-light text-slate-500 hover:text-slate-900 transition-all hover:scale-125 focus:outline-none"
            >
                ›
            </button>

            {/* Center Content Area */}
            <div className="relative mx-auto max-w-4xl px-6 sm:px-10">
                {/* White Card */}
                <div className="relative w-full bg-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/80 transition-all duration-500 min-h-[300px] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Left Avatar */}
                    <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden shrink-0 border-4 border-slate-100 shadow-xl bg-slate-200">
                        <img
                            src={current.avatar}
                            alt={current.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-base sm:text-lg md:text-xl font-medium text-slate-700 leading-relaxed sm:leading-loose">
                            "{current.quote}"
                        </p>
                        <p className="mt-6 text-sm sm:text-base font-semibold text-slate-600">
                            — {current.role}
                        </p>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="mt-8 flex items-center justify-center gap-2.5">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex
                                    ? "w-8 bg-slate-700"
                                    : "w-2.5 bg-slate-400/60 hover:bg-slate-600"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
