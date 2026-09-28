import React from "react";

import cpLogo from "../../assets/association_logos/CP.png";
import droniLogo from "../../assets/association_logos/DroniCulture~mv2.webp";
import madariLogo from "../../assets/association_logos/MadariVeda.jpg";
import mentorLogo from "../../assets/association_logos/MentorPrep.webp";
import nmimsLogo from "../../assets/association_logos/NMIMS.svg";
import sesLogo from "../../assets/association_logos/SES.png";

const logosList = [
    { name: "CP", src: cpLogo },
    { name: "Droni Culture", src: droniLogo },
    { name: "Madari Veda", src: madariLogo },
    { name: "Mentor Prep", src: mentorLogo },
    { name: "NMIMS", src: nmimsLogo },
    { name: "SES Education", src: sesLogo },
];

// Duplicate arrays for 100% seamless marquee looping
const row1Items = [...logosList, ...logosList, ...logosList, ...logosList];
const row2Items = [...logosList].reverse().concat([...logosList].reverse(), [...logosList].reverse(), [...logosList].reverse());

// Circular Brand SVG Icons matching reference screenshot
const WhatsappCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-115 drop-shadow-md" fill="#25D366">
        <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
);

const YoutubeCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-115 drop-shadow-md" fill="#FF0000">
        <path d="M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6l0-162.4 142.7 81.2-142.7 81.2z"/>
    </svg>
);

const InstagramCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-115 drop-shadow-md">
        <defs>
            <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="25%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
            </linearGradient>
        </defs>
        <path fill="url(#igGrad)" d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
    </svg>
);

const LinkedinCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-115 drop-shadow-md" fill="#0A66C2">
        <path d="M100.3 448l-92.9 0 0-299.1 92.9 0 0 299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 39.5 5.7 25.9 15.8 15.8s23.8-15.8 38-15.8 27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3zM447.9 448l-92.7 0 0-145.6c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7l0 148.1-92.8 0 0-299.1 89.1 0 0 40.8 1.3 0c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3l0 164.3-.1 0z"/>
    </svg>
);

const FacebookCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-115 drop-shadow-md" fill="#1877F2">
        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"/>
    </svg>
);

const socialCirclePlatforms = [
    { name: "WhatsApp", icon: WhatsappCircleIcon, link: "#" },
    { name: "YouTube", icon: YoutubeCircleIcon, link: "#" },
    { name: "Instagram", icon: InstagramCircleIcon, link: "#" },
    { name: "LinkedIn", icon: LinkedinCircleIcon, link: "#" },
    { name: "Facebook", icon: FacebookCircleIcon, link: "#" },
];

function AssociationSocials() {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
            {/* Inline Styles for Slow Dual-Direction Marquee */}
            <style>{`
                @keyframes marqueeLeftToRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                @keyframes marqueeRightToLeft {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-l2r {
                    display: flex;
                    width: max-content;
                    animation: marqueeLeftToRight 55s linear infinite;
                }
                .animate-marquee-r2l {
                    display: flex;
                    width: max-content;
                    animation: marqueeRightToLeft 55s linear infinite;
                }
            `}</style>

            <div className="relative mx-auto w-full">
                {/* Heading — Our Association */}
                <div className="text-center px-5">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Our <span className="text-red-600">Association</span>
                    </h2>
                    {/* Red line under heading */}
                    <div className="mt-4 mx-auto h-[3px] w-16 bg-red-600 rounded-full" />
                </div>

                {/* Marquee Section Container */}
                <div className="mt-16 bg-slate-50/50 py-10 border-y border-slate-200/60 space-y-10 overflow-hidden">
                    {/* Row 1: Left to Right */}
                    <div className="relative w-full overflow-hidden">
                        <div className="animate-marquee-l2r items-center">
                            {row1Items.map((logo, idx) => (
                                <div
                                    key={`r1-${idx}`}
                                    className="flex items-center justify-center h-20 sm:h-24 w-52 sm:w-64 px-6 mx-6 shrink-0 transition-transform duration-300 hover:scale-105"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.name}
                                        className="max-h-16 sm:max-h-20 max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Horizontal Divider Line between Row 1 and Row 2 */}
                    <div className="h-[1px] w-full bg-slate-200/80 max-w-6xl mx-auto px-5" />

                    {/* Row 2: Right to Left (Opposite Direction) */}
                    <div className="relative w-full overflow-hidden">
                        <div className="animate-marquee-r2l items-center">
                            {row2Items.map((logo, idx) => (
                                <div
                                    key={`r2-${idx}`}
                                    className="flex items-center justify-center h-20 sm:h-24 w-52 sm:w-64 px-6 mx-6 shrink-0 transition-transform duration-300 hover:scale-105"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.name}
                                        className="max-h-16 sm:max-h-20 max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Heading — Our Socials */}
                <div className="mt-24 text-center px-5">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Our <span className="text-red-600">Socials</span>
                    </h2>
                    {/* Red line under heading */}
                    <div className="mt-4 mx-auto h-[3px] w-16 bg-red-600 rounded-full" />
                </div>

                {/* Circular Social Icons Bar matching reference screenshot */}
                <div className="mt-14 py-10 px-5 border-y border-slate-200/80 shadow-xs bg-white">
                    <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 max-w-5xl mx-auto">
                        {socialCirclePlatforms.map((platform) => {
                            const IconComponent = platform.icon;
                            return (
                                <a
                                    key={platform.name}
                                    href={platform.link}
                                    aria-label={platform.name}
                                    onClick={(e) => {
                                        if (platform.link === "#") e.preventDefault();
                                    }}
                                    className="inline-flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <IconComponent />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AssociationSocials;
