import React from "react";
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
    Baby,
} from "lucide-react";

/* ============================================================
   PRODUCT DATA
   ============================================================ */
const products = [
    {
        id: "01",
        badge: "STEM Kit",
        icon: FlaskConical,
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
        cta: "Buy Now",
        ctaType: "buy",
        ctaLink: "/store",
        featured: false,
    },
    {
        id: "02",
        badge: "Innovation Kit",
        icon: Cpu,
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
        cta: "Buy Now",
        ctaType: "buy",
        ctaLink: "/store",
        featured: true,
    },
    {
        id: "03",
        badge: "Montessori Lab",
        icon: Baby,
        title: "Smart Mont Lab",
        subtitle: "Early Childhood STEM Learning",
        features: [
            "20+ Big Activity Sets",
            "12 STEM Activities per Year for Each Grade",
            "Nursery, LKG & UKG Curriculum",
            "Child-Friendly Furniture & Learning Materials",
        ],
        price: "Enquire for Price",
        priceType: "enquire",
        tags: ["Montessori", "Early Education", "STEM", "Lab Setup"],
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: false,
    },
    {
        id: "04",
        badge: "Maker Space",
        icon: Wrench,
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
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: false,
    },
    {
        id: "05",
        badge: "Curriculum",
        icon: GraduationCap,
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
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: true,
    },
    {
        id: "06",
        badge: "Master Class",
        icon: Zap,
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
        cta: "Enquire Now",
        ctaType: "enquire",
        ctaLink: "/contact",
        featured: false,
    },
];

/* ============================================================
   PRODUCT CARD
   ============================================================ */
export { products };
export function ProductCard({ product }) {
    const Icon = product.icon;

    return (
        <div
            className={`
                group relative flex flex-col rounded-xl bg-white border transition-all duration-300
                hover:shadow-lg hover:-translate-y-0.5
                ${product.featured
                    ? "border-red-200 shadow-sm ring-2 ring-red-500 ring-offset-1"
                    : "border-slate-200 shadow-sm hover:border-red-200"
                }
            `}
        >
            {/* Featured Ribbon */}
            {product.featured && (
                <div className="absolute -top-3 left-4 z-10 flex items-center gap-1 rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow shadow-red-600/30">
                    <Star className="h-2.5 w-2.5 fill-white" />
                    Most Popular
                </div>
            )}

            {/* Image Placeholder */}
            <div className={`relative overflow-hidden rounded-t-xl h-40 flex items-center justify-center ${product.featured ? "bg-red-50" : "bg-slate-100"}`}>
                <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-red-600/8" />
                <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="h-10 w-10 rounded-lg bg-slate-300 flex items-center justify-center">
                        <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">Product Image</span>
                </div>
                {/* Badge top-right */}
                <span className="absolute top-2 right-2 rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                    {product.badge}
                </span>
            </div>

            {/* Card Header */}
            <div className={`flex items-center gap-3 px-5 pt-4 pb-2.5 ${product.featured ? "bg-white" : "bg-white"}`}>
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow shadow-red-600/25 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-base font-extrabold leading-tight text-slate-900">
                        {product.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 leading-tight">
                        {product.subtitle}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-slate-100" />

            {/* Card Body */}
            <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                {/* Features */}
                <ul className="space-y-1.5">
                    {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                            <span className="text-sm font-medium text-slate-700 leading-snug">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                    {product.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600"
                        >
                            <Tag className="h-2.5 w-2.5 text-red-500" />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Divider */}
                <div className="my-3 h-px w-full bg-slate-100" />

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-3">
                    {/* Price */}
                    <div>
                        {product.priceType === "fixed" ? (
                            <>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Price
                                </p>
                                <p className="mt-0.5 text-xl font-black tracking-tight text-red-600">
                                    &#8377;{product.price}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Pricing
                                </p>
                                <p className="mt-0.5 text-sm font-bold text-slate-500">
                                    {product.price}
                                </p>
                            </>
                        )}
                    </div>

                    {/* CTA Button */}
                    <Link
                        to={product.ctaLink}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow shadow-red-600/20 transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-md hover:shadow-red-600/30"
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
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 px-5 sm:px-8 border-b border-slate-100">
            {/* Subtle background accent */}
            <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-slate-100 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center">

                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                        Explore Our{" "}
                        <span className="text-red-600">Product Range</span>
                    </h2>
                </div>

                {/* Product Grid */}
                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

