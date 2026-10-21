import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    CheckCircle2,
    Tag,
    ArrowRight,
    ShoppingCart,
    MessageCircle,
    Star,
    Zap,
    Cpu,
    FlaskConical,
    Wrench,
    GraduationCap,
} from "lucide-react";

/* ============================================================
   PRODUCT DATA
   ============================================================ */
const products = [
    {
        id: "01",
        badge: "STEM Kit",
        badgeColor: "bg-emerald-100 text-emerald-700",
        accentColor: "#10b981",
        accentBg: "bg-emerald-50",
        accentRing: "ring-emerald-200",
        icon: FlaskConical,
        iconBg: "bg-emerald-500",
        title: "My STEM Box",
        subtitle: "Hands-On Science & Discovery",
        features: [
            "20+ Hands-On STEM Activities",
            "5 Core Subjects Covered",
            "Step-by-Step Activity Manuals",
            "Self-Learning Video Tutorials",
        ],
        price: "2,999",
        priceType: "fixed",
        tags: ["STEM", "Science", "Physics", "Chemistry", "Biology", "Math"],
        tagColor: "bg-emerald-100 text-emerald-700",
        cta: "Buy Now",
        ctaType: "buy",
        ctaLink: "/store",
        featured: false,
    },
    {
        id: "02",
        badge: "Innovation Kit",
        badgeColor: "bg-blue-100 text-blue-700",
        accentColor: "#3b82f6",
        accentBg: "bg-blue-50",
        accentRing: "ring-blue-200",
        icon: Cpu,
        iconBg: "bg-blue-500",
        title: "My Innovation Box",
        subtitle: "Build, Code & Create",
        features: [
            "200+ Buildable Projects",
            "40 Essential Components",
            "Digital Project Manuals",
            "Self-Learning Resources",
        ],
        price: "4,999",
        priceType: "fixed",
        tags: ["Robotics", "IoT", "Electronics", "Arduino", "Programming"],
        tagColor: "bg-blue-100 text-blue-700",
        cta: "Buy Now",
        ctaType: "buy",
        ctaLink: "/store",
        featured: true,
    },

    {
        id: "04",
        badge: "Maker Space",
        badgeColor: "bg-orange-100 text-orange-700",
        accentColor: "#f97316",
        accentBg: "bg-orange-50",
        accentRing: "ring-orange-200",
        icon: Wrench,
        iconBg: "bg-orange-500",
        title: "STEMSAGE Smart Maker Space",
        subtitle: "Innovation Hub for Schools & Colleges",
        features: [
            "Dedicated Innovation & Maker Space Setup",
            "Robotics & Electronics Project Development",
            "IoT & Smart Technology Exploration",
            "3D Printing & Rapid Prototyping",
            "Customizable Lab Setup for Schools & Colleges",
        ],
        price: "Enquire for Price",
        priceType: "enquire",
        tags: ["Schools", "Innovation", "Robotics & AI", "Lab Setup", "Engineering"],
        tagColor: "bg-orange-100 text-orange-700",
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: false,
    },
    {
        id: "05",
        badge: "Curriculum",
        badgeColor: "bg-red-100 text-red-700",
        accentColor: "#e11d48",
        accentBg: "bg-red-50",
        accentRing: "ring-red-200",
        icon: GraduationCap,
        iconBg: "bg-red-600",
        title: "Yearlong Robotics & Physical AI Curriculum",
        subtitle: "School-Wide Experiential Learning Program",
        features: [
            "10 Hands-On Learning Activities",
            "Group-Based Robotics Kits",
            "Teacher Training & Orientation",
            "LMS Access & Digital Learning Resources",
            "Dedicated STEMSAGE Host Trainer",
            "School-Customized Curriculum",
        ],
        price: "Enquire for Price",
        priceType: "enquire",
        tags: ["Robotics", "Physical AI", "STEM Education", "School Curriculum", "Experiential Learning"],
        tagColor: "bg-red-100 text-red-700",
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: true,
    },
    {
        id: "06",
        badge: "Master Class",
        badgeColor: "bg-cyan-100 text-cyan-700",
        accentColor: "#06b6d4",
        accentBg: "bg-cyan-50",
        accentRing: "ring-cyan-200",
        icon: Zap,
        iconBg: "bg-cyan-500",
        title: "STEMSAGE Arduino Master Class",
        subtitle: "From Circuits to Code — On Campus",
        features: [
            "20+ Hands-On Projects",
            "Electronics & Embedded Systems Fundamentals",
            "Arduino Programming & Circuit Design",
            "5-Phase Structured Learning Program",
            "~20 Hours of Training",
            "On-Campus Implementation",
            "Certificate-Based Learning Program",
        ],
        price: "Enquire for Price",
        priceType: "enquire",
        tags: ["Arduino", "Robotics", "Electronics", "Embedded Systems", "Coding", "Automation"],
        tagColor: "bg-cyan-100 text-cyan-700",
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: false,
    },
];

/* ============================================================
   PRODUCT CARD
   ============================================================ */
function ProductCard({ product, index }) {
    const [hovered, setHovered] = useState(false);
    const Icon = product.icon;

    return (
        <div
            className={`
                group relative flex flex-col rounded-3xl border bg-white
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                ${product.featured
                    ? "border-slate-300 shadow-lg ring-2 ring-offset-2"
                    : "border-slate-200/80 shadow-sm"
                }
                ${product.featured ? product.accentRing : ""}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Featured Ribbon */}
            {product.featured && (
                <div
                    className="absolute -top-3.5 left-6 z-10 flex items-center gap-1.5 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md"
                    style={{ backgroundColor: product.accentColor }}
                >
                    <Star className="h-3 w-3 fill-white" />
                    Most Popular
                </div>
            )}

            {/* Card Header */}
            <div className={`relative overflow-hidden rounded-t-3xl ${product.accentBg} p-6 pb-5`}>
                {/* Decorative circles */}
                <div
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
                    style={{ backgroundColor: product.accentColor }}
                />
                <div
                    className="pointer-events-none absolute -right-2 -bottom-6 h-20 w-20 rounded-full opacity-10"
                    style={{ backgroundColor: product.accentColor }}
                />

                <div className="relative flex items-start justify-between gap-3">
                    {/* Icon */}
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${product.iconBg}`}
                    >
                        <Icon className="h-6 w-6" />
                    </div>

                    {/* Badge */}
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${product.badgeColor}`}>
                        {product.badge}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl">
                        {product.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                        {product.subtitle}
                    </p>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-6">
                {/* Features */}
                <ul className="space-y-2.5">
                    {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0"
                                style={{ color: product.accentColor }}
                            />
                            <span className="text-sm font-medium text-slate-700 leading-snug">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map((tag, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${product.tagColor}`}
                        >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Divider */}
                <div className="my-5 h-px w-full bg-slate-100" />

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-4">
                    {/* Price */}
                    <div>
                        {product.priceType === "fixed" ? (
                            <>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Price
                                </p>
                                <p
                                    className="mt-0.5 text-2xl font-black tracking-tight"
                                    style={{ color: product.accentColor }}
                                >
                                    &#8377;{product.price}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Pricing
                                </p>
                                <p className="mt-0.5 text-base font-bold italic text-slate-500">
                                    {product.price}
                                </p>
                            </>
                        )}
                    </div>

                    {/* CTA Button */}
                    <Link
                        to={product.ctaLink}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                            backgroundColor: product.accentColor,
                            boxShadow: hovered
                                ? `0 8px 24px ${product.accentColor}55`
                                : `0 4px 12px ${product.accentColor}33`,
                        }}
                    >
                        {product.ctaType === "buy" ? (
                            <ShoppingCart className="h-4 w-4" />
                        ) : (
                            <MessageCircle className="h-4 w-4" />
                        )}
                        {product.cta}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   MAIN SECTION
   ============================================================ */
function OurProducts() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 px-5 sm:px-8 border-b border-slate-100">
            {/* Ambient background blobs */}
            <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-400/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-[2px] w-8 bg-red-600 sm:w-12" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600 sm:text-xs">
                            Our Products
                        </span>
                        <span className="h-[2px] w-8 bg-red-600 sm:w-12" />
                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
                        Explore Our{" "}
                        <span className="text-red-600">Product Range</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-500 leading-relaxed">
                        From hands-on kits for young learners to full-scale innovation labs for schools — discover
                        STEMSAGE products built to inspire the next generation of innovators.
                    </p>

                    <div className="mt-6 mx-auto h-[3px] w-16 rounded-full bg-red-600" />
                </div>

                {/* Product Grid — show only first 3 on home page */}
                <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.slice(0, 3).map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* See All Products Button */}
                <div className="mt-12 flex justify-center">
                    <Link
                        to="/store"
                        className="inline-flex items-center gap-3 rounded-full border-2 border-red-600 bg-white px-10 py-4 text-sm font-bold text-red-600 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20 hover:scale-105"
                    >
                        See All Products
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default OurProducts;
