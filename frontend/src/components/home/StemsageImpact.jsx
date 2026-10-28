import React from "react";
import impactPhoto from "../../assets/stemsage_impact.jpg";

// Icons for each stat card
const SchoolIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M3 21h18M9 21V10.5M15 21V10.5M3 10.5l9-7.5 9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="14" width="6" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StudentsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TeachersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 9h2M11 9h6M7 12h4M15 12h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WorkshopIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9h18M9 4v5M15 4v5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14h4M7 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CitiesIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const impactStats = [
    {
        id: "schools",
        icon: SchoolIcon,
        stat: "20+",
        label: "Schools Empowered",
        desc: "STEM Labs, Workshops and Yearlong Programs",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
    },
    {
        id: "students",
        icon: StudentsIcon,
        stat: "50,000+",
        label: "Students Trained",
        desc: "From Grade 3 to Engineering Students",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
    },
    {
        id: "teachers",
        icon: TeachersIcon,
        stat: "200+",
        label: "Teachers Trained",
        desc: "STEM and Technology Capacity Building Programs",
        color: "text-slate-700",
        bg: "bg-slate-50",
        border: "border-slate-100",
    },
    {
        id: "workshops",
        icon: WorkshopIcon,
        stat: "30+",
        label: "Workshops Conducted",
        desc: "Bootcamps at Schools, Colleges and Institutions",
        color: "text-slate-700",
        bg: "bg-slate-50",
        border: "border-slate-100",
    },
    {
        id: "cities",
        icon: CitiesIcon,
        stat: "10+",
        label: "Cities Covered",
        desc: "Growing presence across the nation",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
    },
];

function StemsageImpact() {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
            {/* Subtle background accent blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-70 pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* ── LEFT COLUMN ── */}
                    <div className="flex flex-col gap-8">

                        {/* Heading */}
                        <div className="-mt-4">
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                                A Growing Network of<br />
                                <span className="text-red-600">Ideas, Innovation</span>
                                <br />&amp; Impact Across the Nation
                            </h2>
                        </div>

                        {/* Stats Grid — 3 columns, 2 rows */}
                        <div className="grid grid-cols-3 gap-3">
                            {impactStats.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={item.id}
                                        className={`group flex flex-row items-start gap-3 p-3 rounded-2xl border ${item.bg} ${item.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                                    >
                                        {/* Icon — left side */}
                                        <span className={`inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-xl ${item.bg} border ${item.border} ${item.color} mt-0.5`}>
                                            <IconComponent />
                                        </span>
                                        {/* Text — right side */}
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className={`text-xl font-extrabold ${item.color} leading-none`}>
                                                {item.stat}
                                            </span>
                                            <span className="text-xs font-bold text-slate-800 leading-snug">
                                                {item.label}
                                            </span>
                                            <span className="text-[11px] text-slate-400 leading-relaxed">
                                                {item.desc}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN — Image ── */}
                    <div className="relative flex items-start justify-center">
                        {/* Decorative dot grid */}
                        <div className="absolute top-4 right-4 grid grid-cols-5 gap-1.5 opacity-30 pointer-events-none">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <span key={i} className="block w-1.5 h-1.5 rounded-full bg-red-400" />
                            ))}
                        </div>

                        {/* Red blob accent */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-600 rounded-3xl opacity-10 pointer-events-none" />

                        {/* Photo */}
                        <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                            <img
                                src={impactPhoto}
                                alt="Students and teachers engaged in STEM hands-on learning"
                                className="w-full h-auto object-cover"
                            />
                            {/* Bottom overlay gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/30 to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default StemsageImpact;

