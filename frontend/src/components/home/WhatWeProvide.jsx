import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import workshopImg from "../../assets/workshop-img.jpg";
import eduKitImg from "../../assets/Edu-kit.webp";

const servicesProvided = [
    {
        id: "01",
        title: "Curriculums and Workshops",
        description: "Structured, hands-on learning programs in STEM, Robotics, Physical AI, Innovation, Aviation, and emerging technologies, designed to develop practical skills throughout the academic year.",
        image: workshopImg,
        link: "/workshops",
        buttonText: "Explore Programs"
    },
    {
        id: "02",
        title: "Smart Lab Setup",
        description: "End-to-end lab setup solutions for schools and colleges, from STEM and Innovation Labs to advanced Engineering Labs, equipped with modern infrastructure, tools, and technology.",
        image: eduKitImg,
        link: "/store",
        buttonText: "Explore Lab Solutions"
    },
    {
        id: "03",
        title: "Industrial Training Programs",
        description: "Industry-aligned technical training in Embedded Systems, Industrial IoT, Autonomous Robotics, ROS, VLSI, Industrial Automation, Drone Technology, and Advanced Circuit Design.",
        image: "/images/hero-1.png",
        link: "/store",
        buttonText: "Explore Training Programs"
    },
    {
        id: "04",
        title: "Teacher Capacity Building",
        description: "Professional development programs in STEM, AI, Robotics, IoT, Design Thinking, and innovative teaching methodologies.",
        image: "/images/hero-3.png",
        link: "/services",
        buttonText: "Explore Programs"
    },
    {
        id: "05",
        title: "Digital Learning Ecosystem",
        description: "Self-learning platforms, tutorial videos, educational resources, and digital curriculums that support flexible, technology-driven learning.",
        image: "/images/hero-3.png",
        link: "/services",
        buttonText: "Explore Platforms"
    },
];

function CardImage({ src, alt }) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100 text-slate-400 gap-2 opacity-40">
                <div className="h-10 w-10 rounded-lg bg-slate-300 flex items-center justify-center">
                    <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-slate-400">Service Image</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setHasError(true)}
        />
    );
}

export function ServiceCard({ item }) {
    return (
        <div className="group flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:border-red-200 hover:-translate-y-0.5">
            {/* Top Image Area */}
            <div className="w-full h-40 overflow-hidden bg-slate-100 shrink-0 relative">
                <CardImage src={item.image} alt={item.title} />
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Bottom Text Area */}
            <div className="flex-1 flex flex-col justify-between px-5 pt-4 pb-5 text-left">
                <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                        {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-600 leading-snug">
                        {item.description}
                    </p>
                </div>

                {/* Button */}
                <div className="mt-5">
                    <Link
                        to={item.link}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-2.5 px-4 transition-all duration-300 shadow hover:shadow-md hover:scale-[1.02]"
                    >
                        {item.buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function WhatWeProvide() {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 px-5 sm:px-8 border-b border-slate-100">
            <div className="relative mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        What we <span className="text-red-600">Provide</span> ?
                    </h2>
                    {/* Red line under title */}
                    <div className="mt-4 mx-auto h-[3px] w-20 bg-red-600 rounded-full" />
                </div>

                {/* 3-column Grid — first 3 only */}
                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesProvided.slice(0, 3).map((service) => (
                        <ServiceCard key={service.id} item={service} />
                    ))}
                </div>

                {/* View All Services CTA */}
                <div className="mt-12 flex justify-center">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-3 rounded-full border-2 border-red-600 bg-white px-10 py-4 text-sm font-bold text-red-600 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20 hover:scale-105"
                    >
                        View All Services
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default WhatWeProvide;
