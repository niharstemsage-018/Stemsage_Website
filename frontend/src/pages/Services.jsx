import { useState, useEffect } from "react";
import Footer from "../components/common/Footer";
import { ServiceCard } from "../components/home/WhatWeProvide";
import { getServices } from "../services/serviceService";

// Imported Assets (fallback images)
import bannerBg from "../assets/Edu-kit.webp";
import workshopImg from "../assets/workshop-img.jpg";
import eduKitsImg from "../assets/services/Educational_kits.png";
import labSetupImg from "../assets/services/Lab_Setup.png";

/* ============================================================
   FALLBACK SERVICES DATA (used when API fails or returns empty)
   ============================================================ */
const fallbackServices = [
    {
        id: "01",
        title: "Curriculums and Workshops",
        description: "Structured, hands-on learning programs in STEM, Robotics, Physical AI, Innovation, Aviation, and emerging technologies, designed to develop practical skills throughout the academic year.",
        image: workshopImg,
        link: "/courses",
        buttonText: "Explore Programs",
    },
    {
        id: "02",
        title: "Smart Lab Setup",
        description: "End-to-end lab setup solutions for schools and colleges, from STEM and Innovation Labs to advanced Engineering Labs, equipped with modern infrastructure, tools, and technology.",
        image: labSetupImg,
        link: "/contact",
        buttonText: "Explore Lab Solutions",
    },
    {
        id: "03",
        title: "Smart Educational Kits",
        description: "Innovative, hands-on educational kits that make STEM concepts, electronics, robotics, and emerging technologies engaging, interactive, and accessible to learners.",
        image: eduKitsImg,
        link: "/store",
        buttonText: "Explore Kits",
    },
    {
        id: "04",
        title: "Industrial Training Programs",
        description: "Industry-aligned technical training in Embedded Systems, Industrial IoT, Autonomous Robotics, ROS, VLSI, Industrial Automation, Drone Technology, and Advanced Circuit Design.",
        image: null,
        link: "/contact",
        buttonText: "Explore Training Programs",
    },
    {
        id: "05",
        title: "Teacher Capacity Building",
        description: "Professional development programs in STEM, AI, Robotics, IoT, Design Thinking, and innovative teaching methodologies.",
        image: null,
        link: "/contact",
        buttonText: "Explore Programs",
    },
    {
        id: "06",
        title: "Digital Learning Ecosystem",
        description: "Self-learning platforms, tutorial videos, educational resources, and digital curriculums that support flexible, technology-driven learning.",
        image: null,
        link: "/contact",
        buttonText: "Explore Platforms",
    },
];

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function loadServices() {
            try {
                setLoading(true);
                const apiServices = await getServices();
                if (!cancelled) {
                    if (apiServices && apiServices.length > 0) {
                        setServices(apiServices);
                    } else {
                        // API succeeded but returned empty
                        setServices([]);
                    }
                }
            } catch (err) {
                console.warn("Failed to fetch services, using fallback:", err.message);
                if (!cancelled) {
                    setServices(fallbackServices);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        loadServices();
        return () => { cancelled = true; };
    }, []);

    return (
        <main className="w-full bg-white font-sans text-slate-800">
            {/* ─── Top Background Banner ─── */}
            <div className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden bg-slate-900">
                <img
                    src={bannerBg}
                    alt="STEMSAGE Services Banner"
                    className="h-full w-full object-cover object-center opacity-85 blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* ─── Floating White Intro Box ─── */}
            <div className="relative z-10 mx-auto -mt-28 sm:-mt-36 md:-mt-48 max-w-4xl px-4 sm:px-6">
                <div className="bg-white border border-slate-200/90 shadow-xl px-6 py-10 sm:px-12 sm:py-14 md:px-16 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 mb-6">
                        Our Services
                    </h1>
                    <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal">
                        We provide a diverse array of services in the STEM field, focusing on cutting-edge areas
                        such as electronics, robotics, programming, and the Internet of Things (IoT). Our team is
                        dedicated to delivering innovative solutions that cater to the evolving needs of our clients.
                        Whether it's through hands-on workshops, consulting, or project development, we aim to
                        empower individuals and organizations to thrive in these dynamic sectors.
                    </p>
                </div>
            </div>

            {/* ─── Service Cards Grid ─── */}
            <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="group flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="w-full h-40 bg-slate-100" />
                                    <div className="h-px bg-slate-100" />
                                    <div className="flex-1 flex flex-col justify-between px-5 pt-4 pb-5">
                                        <div className="space-y-3">
                                            <div className="h-8 bg-slate-200 rounded w-3/4" />
                                            <div className="h-12 bg-slate-200 rounded w-full" />
                                            <div className="h-12 bg-slate-200 rounded w-full" />
                                        </div>
                                        <div className="h-10 bg-slate-200 rounded-lg w-1/2" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : services.length === 0 ? (
                        <div className="col-span-full text-center py-16 text-slate-500 font-medium">
                            Nothing here yet
                        </div>
                    ) : (
                        services.map((service) => (
                            <ServiceCard key={service.id} item={service} />
                        ))
                    )}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}

export default Services;

