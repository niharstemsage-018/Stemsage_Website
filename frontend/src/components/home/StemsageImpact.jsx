import React from "react";

// Custom SVG Illustration 1 — Onsite Workshops
const OnsiteIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor Frame */}
        <rect x="90" y="40" width="220" height="150" rx="12" stroke="#0f172a" strokeWidth="4" fill="#ffffff" />
        <path d="M140 190L120 230H280L260 190" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="100" y1="230" x2="300" y2="230" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

        {/* Code inside monitor */}
        <rect x="110" y="60" width="180" height="24" rx="4" fill="#f1f5f9" />
        <path d="M125 72L135 67M125 72L135 77M145 66L140 78M150 72L160 67M150 72L160 77" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="175" y1="72" x2="270" y2="72" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />

        <line x1="110" y1="100" x2="250" y2="100" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <line x1="110" y1="115" x2="210" y2="115" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
        <line x1="110" y1="130" x2="270" y2="130" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <line x1="110" y1="145" x2="180" y2="145" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />

        {/* Person Sitting Left */}
        <circle cx="95" cy="155" r="16" stroke="#0f172a" strokeWidth="4" fill="#ffffff" />
        <path d="M70 210C70 185 85 180 95 180C105 180 120 185 120 210" stroke="#0f172a" strokeWidth="4" fill="none" />
        <path d="M100 190L135 200" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

        {/* Person Standing Right */}
        <circle cx="310" cy="115" r="16" stroke="#0f172a" strokeWidth="4" fill="#ffffff" />
        <path d="M290 195V150C290 140 300 135 310 135C320 135 330 140 330 150V195" stroke="#0f172a" strokeWidth="4" fill="none" />
        <path d="M295 145L260 140" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

        {/* Floating Sparkles/Dots */}
        <circle cx="70" cy="90" r="3" fill="#06b6d4" />
        <circle cx="330" cy="70" r="4" fill="#ef4444" />
        <path d="M60 110L66 116M66 110L60 116" stroke="#64748b" strokeWidth="2" />
    </svg>
);

// Custom SVG Illustration 2 — Online Workshops
const OnlineIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gear background */}
        <circle cx="310" cy="75" r="22" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" fill="none" />
        <circle cx="210" cy="55" r="14" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 4" fill="none" />

        {/* Big Laptop Screen */}
        <rect x="80" y="80" width="240" height="140" rx="10" stroke="#0f172a" strokeWidth="4" fill="#1e293b" />
        <rect x="90" y="90" width="220" height="120" rx="6" fill="#ffffff" />
        <path d="M50 220H350L330 232H70L50 220Z" stroke="#0f172a" strokeWidth="4" fill="#e2e8f0" />

        {/* Screen Content */}
        <rect x="100" y="102" width="90" height="50" rx="4" fill="#f8fafc" stroke="#06b6d4" strokeWidth="2" />
        <path d="M110 127L120 118M110 127L120 136M130 115L125 138M135 127L145 118M135 127L145 136" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />

        <rect x="200" y="102" width="95" height="50" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <line x1="210" y1="115" x2="280" y2="115" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        <line x1="210" y1="127" x2="260" y2="127" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <line x1="210" y1="139" x2="275" y2="139" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

        {/* Person Left coding */}
        <circle cx="115" cy="155" r="14" fill="#f97316" />
        <path d="M95 205C95 185 105 175 115 175C125 175 135 185 135 205" fill="#0f172a" />
        <path d="M125 180L160 165" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />

        {/* Person Right waving */}
        <circle cx="285" cy="130" r="14" fill="#38bdf8" />
        <path d="M265 180C265 160 275 150 285 150C295 150 305 160 305 180" fill="#0f172a" />

        {/* Plant on right */}
        <path d="M325 195Q315 170 330 160Q345 170 335 195Z" fill="#10b981" />
        <rect x="323" y="195" width="14" height="18" fill="#f97316" rx="2" />
    </svg>
);

// Custom SVG Illustration 3 — Developed 50+ Projects
const ProjectsIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-56 object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background gear circle glow */}
        <circle cx="200" cy="140" r="75" fill="#eff6ff" />
        <circle cx="200" cy="140" r="65" stroke="#3b82f6" strokeWidth="4" strokeDasharray="12 8" fill="none" />
        <circle cx="145" cy="170" r="40" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 6" fill="none" />

        {/* Main Big Gear */}
        <circle cx="200" cy="140" r="30" stroke="#1d4ed8" strokeWidth="8" fill="none" />

        {/* Person Climbing Ladder Left */}
        <path d="M260 230L290 120" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M275 230L305 120" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <line x1="267" y1="200" x2="282" y2="200" stroke="#0f172a" strokeWidth="3" />
        <line x1="273" y1="175" x2="288" y2="175" stroke="#0f172a" strokeWidth="3" />
        <line x1="279" y1="150" x2="294" y2="150" stroke="#0f172a" strokeWidth="3" />
        <line x1="285" y1="125" x2="300" y2="125" stroke="#0f172a" strokeWidth="3" />

        <circle cx="280" cy="95" r="14" fill="#ec4899" />
        <path d="M265 145C265 125 275 115 280 115C285 115 295 125 295 145" fill="#1e1b4b" />

        {/* Person Pushing Gear Bottom Left */}
        <circle cx="115" cy="180" r="14" fill="#ef4444" />
        <path d="M95 230C95 205 105 198 115 198C125 198 135 205 135 230" fill="#0f172a" />
        <path d="M125 205L160 185" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const impactStats = [
    {
        id: "stat-1",
        illustration: OnsiteIllustration,
        titleLine1: "Conducted over 20+",
        titleLine2: "onsite workshops",
    },
    {
        id: "stat-2",
        illustration: OnlineIllustration,
        titleLine1: "Conducted 10+ online",
        titleLine2: "workshops",
    },
    {
        id: "stat-3",
        illustration: ProjectsIllustration,
        titleLine1: "Developed over 50+",
        titleLine2: "projects",
    },
];

function StemsageImpact() {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 px-5 border-b border-slate-100">
            <div className="relative mx-auto max-w-6xl">
                {/* 3 Impact Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start text-center">
                    {impactStats.map((item) => {
                        const IllustrationComponent = item.illustration;
                        return (
                            <div
                                key={item.id}
                                className="group flex flex-col items-center justify-start p-2 transition-all duration-300 hover:-translate-y-1.5"
                            >
                                {/* Vector Graphic Container */}
                                <div className="h-44 sm:h-52 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                    <IllustrationComponent />
                                </div>

                                {/* Typography Label */}
                                <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight max-w-[280px]">
                                    <span className="block">{item.titleLine1}</span>
                                    <span className="block">{item.titleLine2}</span>
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default StemsageImpact;
