import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/StemSage_Footer_Logo.avif";
import logoFallback from "/images/logo.png";

function Footer() {
    return (
        <footer className="w-full bg-white text-slate-800 font-sans border-t border-slate-100 pt-10 pb-12">
            {/* Red Horizontal Separator Line at top */}
            <div className="w-full max-w-7xl mx-auto px-6">
                <div className="h-[2px] w-full bg-red-600" />
            </div>

            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Column 1: Logo */}
                    <div className="md:col-span-5 flex flex-col items-start">
                        <Link to="/" className="inline-block">
                            <img
                                src={logoImg}
                                alt="STEMSAGE — Once Step Towards DIGITAL !"
                                className="h-36 sm:h-40 w-auto object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = logoFallback;
                                }}
                            />
                        </Link>
                    </div>

                    {/* Column 2: Company */}
                    <div className="md:col-span-2 text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                            Company
                        </h3>
                        <ul className="space-y-4 text-base font-semibold text-slate-700">
                            <li>
                                <Link to="/" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="md:col-span-2 text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                            Resources
                        </h3>
                        <ul className="space-y-4 text-base font-semibold text-slate-700">
                            <li>
                                <Link to="/projects" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Our projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/student-projects" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Student projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/workshops" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Workshops
                                </Link>
                            </li>
                            <li>
                                <Link to="/learning" className="hover:text-red-600 underline-offset-4 hover:underline">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Address */}
                    <div className="md:col-span-3 text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                            Address
                        </h3>
                        <div className="flex items-start gap-2.5 text-base font-semibold text-slate-700 leading-relaxed">
                            <span className="text-red-600 shrink-0 text-xl mt-0.5">📌</span>
                            <span>
                                2nd Floor, R. C. Patel Institute of Technology, Shirpur, 425405
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar (Copyright, Privacy policy, Terms and Conditions) */}
                <div className="mt-20 pt-8 border-t border-slate-200/70 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-semibold text-slate-700">
                    <div className="w-full md:w-1/3 text-left">
                        © Copyright 2024 STEMSAGE TECHWORLD LLP
                    </div>
                    <div className="w-full md:w-1/3 text-center">
                        <Link to="/contact" className="hover:text-red-600 hover:underline">
                            Privacy policy
                        </Link>
                    </div>
                    <div className="w-full md:w-1/3 text-right">
                        <Link to="/contact" className="hover:text-red-600 hover:underline">
                            Terms and Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
