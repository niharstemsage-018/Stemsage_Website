import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

// Imported Assets
import bannerBg from "../assets/Edu-kit.webp";
import workshopImg from "../assets/workshop-img.jpg";
import eduKitsImg from "../assets/services/Educational_kits.png";
import coursesImg from "../assets/services/Courses.png";
import labSetupImg from "../assets/services/Lab_Setup.png";

const serviceList = [
    {
        id: "educational-kits",
        title: "Educational kits",
        image: eduKitsImg,
        text: "Get excited about our amazing kits in Electronics, Robotics, and Drones that spark creativity for future engineers! Each kit includes all components, user manuals, and step-by-step project guides.",
        link: "/store",
        btnText: "Explore Kits",
    },
    {
        id: "courses",
        title: "Courses",
        image: coursesImg,
        text: "Structured hands-on courses designed to teach students foundational to advanced concepts in Electronics, Robotics, IoT, 3D Printing, and Software Programming.",
        link: "/courses",
        btnText: "View Courses",
    },
    {
        id: "stem-workshops",
        title: "STEM Workshops",
        image: workshopImg,
        text: "Interactive, expert-led workshops for schools, colleges, and institutions. Students build real working prototypes and gain practical engineering skills.",
        link: "/workshops",
        btnText: "Book Workshop",
    },
    {
        id: "stem-lab-setup",
        title: "STEM Lab Setup",
        image: labSetupImg,
        text: "Complete end-to-end setup for school and college STEM/Innovation labs — including hardware tools, 3D printers, workstations, curriculum, and instructor training.",
        link: "/contact",
        btnText: "Consult Us",
    },
];

function Services() {
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

            {/* ─── Floating White Intro Box (Matching Reference Screenshot) ─── */}
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
                        empower individuals and organizations to thrive in these dynamic sectors. Partner with us
                        to explore new possibilities and elevate your expertise in the world of STEM.
                    </p>
                </div>
            </div>

            {/* ─── Service Cards Grid (Matching Reference Screenshot Bordered Cards) ─── */}
            <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                    {serviceList.map((service) => (
                        <article
                            key={service.id}
                            className="bg-white border border-slate-300 overflow-hidden shadow-xs transition-all duration-300 hover:shadow-lg flex flex-col"
                        >
                            {/* Card Title Box at Top */}
                            <div className="border-b border-slate-200 bg-slate-50/40 py-5 px-6 text-center">
                                <h2 className="text-2xl sm:text-3xl font-medium text-slate-900">
                                    {service.title}
                                </h2>
                            </div>

                            {/* Card Image */}
                            <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Card Description & CTA */}
                            <div className="p-6 sm:p-8 flex flex-col flex-grow text-center justify-between">
                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                                    {service.text}
                                </p>

                                <div>
                                    <Link
                                        to={service.link}
                                        className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
                                    >
                                        {service.btnText}
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}

export default Services;
