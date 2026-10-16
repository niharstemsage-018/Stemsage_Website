import React from "react";

import cpLogo from "../../assets/association_logos/CP.png";
import droniLogo from "../../assets/association_logos/DroniCulture.webp";
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
            </div>
        </section>
    );
}

export default AssociationSocials;
