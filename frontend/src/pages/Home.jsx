import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/common/Footer";

// Redesigned Homepage Sections below Hero
import DoorsOfInnovation from "../components/home/DoorsOfInnovation";
import WhatWeProvide from "../components/home/WhatWeProvide";
import StemsageImpact from "../components/home/StemsageImpact";
import BookDemoWorkshop from "../components/home/BookDemoWorkshop";
import StemTeachingJourney from "../components/home/StemTeachingJourney";
import AssociationSocials from "../components/home/AssociationSocials";
import TestimonialsSection from "../components/home/TestimonialsSection";


function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    /*
     * hero-1 is repeated at the end so that the automatic
     * carousel can continuously move:
     *
     * hero-1 → hero-2 → hero-3 → hero-1
     *
     * Always moving from right to left.
     */
    const heroImages = [
        "/images/hero-1.png",
        "/images/hero-2.png",
        "/images/hero-3.png",
        "/images/hero-1.png",
    ];

    /*
     * Automatic carousel.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => prev + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    /*
     * Reset after the duplicated hero-1 slide.
     */
    useEffect(() => {
        if (currentSlide === heroImages.length - 1) {
            const resetTimer = setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentSlide(0);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setTransitionEnabled(true);
                    });
                });
            }, 1000);

            return () => clearTimeout(resetTimer);
        }
    }, [currentSlide, heroImages.length]);

    /*
     * Manual next button.
     */
    const nextSlide = () => {
        if (currentSlide < heroImages.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    /*
     * Manual previous button.
     */
    const previousSlide = () => {
        if (currentSlide === 0) {
            /*
             * Temporarily jump to hero-3 without animation.
             */
            setTransitionEnabled(false);
            setCurrentSlide(heroImages.length - 2);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransitionEnabled(true);
                });
            });
        } else {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    return (
        /*
         * Natural page scrolling.
         *
         * IMPORTANT:
         * No h-screen
         * No snap-y
         * No snap-mandatory
         *
         * This allows the user to naturally see part of
         * the next section while scrolling.
         */
        <main className="w-full overflow-x-hidden bg-[var(--bg-primary)]">
            {/* =========================================================
                HERO (LOCKED - APPROVED UNCHANGED)
            ========================================================== */}
            <section className="relative w-full overflow-hidden bg-white">
                {/*
                 * Desktop:
                 * approximately 80-85% viewport height.
                 *
                 * Mobile:
                 * approximately 65-70% viewport height.
                 *
                 * The minimum height prevents the hero from
                 * becoming too short on smaller screens.
                 */}
                <div className="relative h-[68vh] min-h-[480px] w-full sm:h-[74vh] sm:min-h-[520px] md:h-[78vh] lg:h-[89vh] lg:min-h-[600px]">
                    {/* =================================================
                        IMAGE TRACK
                    ================================================== */}
                    <div
                        className={`absolute inset-0 flex ${transitionEnabled
                            ? "transition-transform duration-1000 ease-in-out"
                            : ""
                            }`}
                        style={{
                            transform: `translateX(-${currentSlide * 100
                                }%)`,
                        }}
                    >
                        {heroImages.map((image, index) => (
                            <div
                                key={`${image}-${index}`}
                                className="relative h-full w-full min-w-full flex-shrink-0 bg-black"
                            >
                                <img src={image} alt={`STEMSAGE hero slide ${index + 1}`} className="h-full w-full object-contain object-center opacity-100 sm:object-cover" />

                                {/* Blackish image overlay */}
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                        ))}
                    </div>

                    {/* =================================================
                        LEFT ARROW
                    ================================================== */}
                    <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Previous slide"
                        className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-3xl font-light leading-none text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70 sm:left-5 sm:h-12 sm:w-12" >
                        ‹
                    </button>

                    {/* =================================================
                        RIGHT ARROW
                    ================================================== */}
                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next slide"
                        className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-3xl font-light leading-none text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70 sm:right-5 sm:h-12 sm:w-12">
                        ›
                    </button>

                    {/* =================================================
                        HERO BUTTONS
                    ================================================== */}
                    <div
                        className="
                            absolute
                            bottom-[15%]
                            sm:bottom-[18%]
                            md:bottom-[20%]
                            lg:bottom-[22%]
                            left-[1%]
                            sm:left-[7%]
                            md:left-[9%]
                            lg:left-[7%]
                            z-20
                            flex
                            flex-wrap
                            items-center
                            justify-start
                            gap-3
                            sm:gap-4
                        "
                    >
                        <Link
                            to="/services"
                            className="
                                rounded-full
                                bg-red-600
                                px-5
                                py-3
                                text-xs
                                font-bold
                                text-white
                                shadow-lg
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:bg-red-700
                                sm:px-7
                                sm:py-3.5
                                sm:text-sm
                                md:px-8
                            "
                        >
                            Explore More
                        </Link>

                        <Link
                            to="/contact"
                            className="
                                rounded-full
                                border-2
                                border-gray-800
                                bg-white
                                px-5
                                py-3
                                text-xs
                                font-bold
                                text-gray-900
                                shadow-lg
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:bg-gray-100
                                sm:px-7
                                sm:py-3.5
                                sm:text-sm
                                md:px-8
                            "
                        >
                            Book a call
                        </Link>
                    </div>

                    {/* =================================================
                        SCROLL DOWN INDICATOR
                    ================================================== */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "3%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 20,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                letterSpacing: "0.15em",
                                color: "#0f172a",
                                textShadow: "0 1px 4px rgba(255,255,255,0.6)",
                                textTransform: "uppercase",
                            }}
                        >
                            Scroll Down
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
                            {[0, 1, 2].map((i) => (
                                <svg
                                    key={i}
                                    width="16"
                                    height="9"
                                    viewBox="0 0 16 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        animation: "scrollBounce 1.4s ease-in-out infinite",
                                        animationDelay: `${i * 0.18}s`,
                                        opacity: 1 - i * 0.3,
                                    }}
                                >
                                    <path
                                        d="M1 1L8 8L15 1"
                                        stroke="#0f172a"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ))}
                        </div>
                        <style>{`
                            @keyframes scrollBounce {
                                0%, 100% { transform: translateY(0); opacity: 0.9; }
                                50% { transform: translateY(5px); opacity: 0.35; }
                            }
                        `}</style>
                    </div>

                    {/* =================================================
                        BOTTOM FADE
                    ================================================== */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            bottom-0
                            z-10
                            h-20
                            sm:h-24
                            md:h-28
                        "
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.85) 80%, #ffffff 100%)",
                        }}
                    />
                </div>
            </section>

            {/* =========================================================
                SECTION 1 — 5 DOORS OF INNOVATION
            ========================================================== */}
            <DoorsOfInnovation />

            {/* =========================================================
                SECTION 2 — WHAT WE PROVIDE
            ========================================================== */}
            <WhatWeProvide />

            {/* =========================================================
                SECTION 3 — STEMSAGE IMPACT / STATISTICS
            ========================================================== */}
            <StemsageImpact />

            {/* =========================================================
                SECTION 4 — BOOK A DEMO WORKSHOP NOW
            ========================================================== */}
            <BookDemoWorkshop />

            {/* =========================================================
                SECTION 5 — STEM TEACHING JOURNEY
            ========================================================== */}
            <StemTeachingJourney />

            {/* =========================================================
                SECTION 6 — ASSOCIATION / SOCIALS
            ========================================================== */}
            <AssociationSocials />

            {/* =========================================================
                SECTION 7 — TESTIMONIAL
            ========================================================== */}
            <TestimonialsSection />

            {/* =========================================================
                FOOTER
            ========================================================== */}
            <Footer />
        </main>
    );
}

export default Home;