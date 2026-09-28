import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles, Cpu, Code2, Bot } from "lucide-react";
import SectionHeading from "./SectionHeading";

const explorePillars = [
    {
        title: "Hands-on Learning",
        desc: "Learn by doing, assembling circuits, and testing physical hardware.",
        icon: Cpu,
    },
    {
        title: "Real-World Projects",
        desc: "Solve actual engineering problems using robotics, IoT, and embedded systems.",
        icon: Bot,
    },
    {
        title: "Coding & Logic",
        desc: "Develop computational thinking through C++, Python, and block programming.",
        icon: Code2,
    },
    {
        title: "Continuous Innovation",
        desc: "Transform creative ideas into functional prototypes and capstone projects.",
        icon: Sparkles,
    },
];

function ExploreStem() {
    return (
        <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-24 md:px-10 lg:px-12 border-b border-slate-200/80">
            {/* Subtle background graphics */}
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-red-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column: Text & Features */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-[2px] w-8 bg-red-600 sm:w-12" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600 sm:text-xs">
                                Explore STEM
                            </span>
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
                            Explore STEM With{" "}
                            <span className="text-red-600">STEMSAGE</span>
                        </h2>

                        <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                            At STEMSAGE, we bridge the gap between abstract textbook theory and real-world technology.
                            Our hands-on learning framework empowers students to explore robotics, electronics, IoT,
                            3D design, and programming with practical kits and project-driven guidance.
                        </p>

                        {/* Feature Pillar Grid */}
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {explorePillars.map((pillar, idx) => {
                                const Icon = pillar.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900">
                                                {pillar.title}
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500 leading-normal">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Primary CTA */}
                        <div className="mt-10">
                            <Link
                                to="/learning"
                                className="inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-600/30"
                            >
                                <span>Explore Programs</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Visual Banner */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        {/* Red Circular Ambient Backing */}
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/80 blur-2xl" />

                        {/* Image Frame */}
                        <div className="relative z-10 overflow-hidden rounded-3xl border-4 border-white bg-slate-900 shadow-2xl shadow-slate-900/20">
                            <img
                                src="/images/hero-2.png"
                                alt="Students engaging in practical STEM activities"
                                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                            {/* Floating Stats Badges */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/90 backdrop-blur-md p-4 text-slate-900 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-bold text-lg">
                                        ⚡
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">100% Hands-On</div>
                                        <div className="text-[11px] text-slate-500">Project-Based Learning</div>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-right">
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                                        Practical STEM
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExploreStem;
