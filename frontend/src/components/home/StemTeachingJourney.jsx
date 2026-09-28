import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, BookOpen, Award, Users } from "lucide-react";

function StemTeachingJourney() {
    return (
        <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-24 md:px-10 lg:px-12 border-b border-slate-200/80">
            <div className="relative mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column: Visual Graphic (Swapped to Left) */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none order-2 lg:order-1">
                        <div className="relative overflow-hidden rounded-3xl border-4 border-slate-100 bg-slate-900 shadow-2xl">
                            <img
                                src="/images/hero-1.png"
                                alt="STEM Educator teaching students"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/95 backdrop-blur-md p-5 text-slate-900 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-extrabold text-slate-900">Educator Network</div>
                                        <div className="text-xs text-slate-500">Empowering Schools & Mentors</div>
                                    </div>
                                </div>
                                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                                    Join Network
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content & CTA (Swapped to Right) */}
                    <div className="order-1 lg:order-2">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-[2px] w-8 bg-red-600 sm:w-12" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600 sm:text-xs">
                                Educator Development
                            </span>
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
                            Start Your <span className="text-red-600">STEM Teaching Journey</span>
                        </h2>

                        <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                            We empower educators, teachers, and school administrators with comprehensive STEM curricula,
                            hands-on training toolkits, and ongoing mentor support to seamlessly integrate robotics, coding,
                            and experiential learning into standard education.
                        </p>

                        {/* Educator Benefits List */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-all hover:bg-slate-100/80">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white font-bold">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                        Curriculum & Lesson Plans
                                    </h4>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Turnkey, structured STEM modules with teacher guides and step-by-step project manuals.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-all hover:bg-slate-100/80">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white font-bold">
                                    <Award className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                        Faculty Training & Certification
                                    </h4>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Hands-on training sessions for teachers to gain confidence in hardware and robotics tools.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-10">
                            <Link
                                to="/learning"
                                className="inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-600/30"
                            >
                                <GraduationCap className="h-5 w-5" />
                                <span>Explore Programs</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StemTeachingJourney;
