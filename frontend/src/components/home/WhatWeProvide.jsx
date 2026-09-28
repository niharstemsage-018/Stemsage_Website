import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

import workshopImg from "../../assets/workshop-img.jpg";
import eduKitImg from "../../assets/Edu-kit.webp";

const servicesProvided = [
    {
        id: "01",
        title: "STEM Workshops",
        description: "Join our engaging STEM workshops to spark curiosity and foster innovation through hands-on learning experiences!",
        image: workshopImg,
        link: "/workshops",
    },
    {
        id: "02",
        title: "Educational Kits",
        description: "Get excited about our amazing kits in Electronics, Robotics, and Drones that spark creativity for future engineers!",
        image: eduKitImg,
        link: "/store",
    },
    {
        id: "03",
        title: "STEM product supply",
        description: "Explore an exciting range of Electronics, IoT, and Robotics parts to effortlessly bring your innovative ideas to life!",
        image: "/images/hero-1.png",
        link: "/store",
    },
    {
        id: "04",
        title: "STEM Lab Setup Service",
        description: "We're excited to launch STEM labs! Students access amazing technology for a fun learning experience.",
        image: "/images/hero-3.png",
        link: "/services",
    },
];

function CardImage({ src, alt }) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-slate-200 text-slate-400 p-4 text-center">
                <ImageIcon className="h-10 w-10 mb-2 opacity-60" />
                <span className="text-xs font-semibold">Image Placeholder</span>
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
        <div className="group flex flex-col sm:flex-row items-stretch rounded-[24px] bg-[#f2f3f5] border border-slate-200/90 p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300">
            {/* Left Image Area */}
            <div className="w-full sm:w-[46%] h-52 sm:h-auto min-h-[190px] rounded-[18px] overflow-hidden bg-slate-200 shrink-0 relative">
                <CardImage src={item.image} alt={item.title} />
            </div>

            {/* Right Text Area */}
            <div className="flex-1 flex flex-col justify-between mt-5 sm:mt-0 sm:pl-6 text-left py-1">
                <div>
                    <h3 className="text-2xl sm:text-[26px] font-black text-slate-900 leading-tight">
                        {item.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base font-medium text-slate-600 leading-snug">
                        {item.description}
                    </p>
                </div>

                {/* Button */}
                <div className="mt-6">
                    <Link
                        to={item.link}
                        className="inline-block rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-3 px-8 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] text-center"
                    >
                        Read More
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

                {/* 2x2 Grid */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {servicesProvided.map((service) => (
                        <ServiceCard key={service.id} item={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhatWeProvide;
