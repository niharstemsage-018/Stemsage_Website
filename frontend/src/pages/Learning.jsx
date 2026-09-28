import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

import bannerBg from "../assets/services/Courses.png";
import eduKitBg from "../assets/Edu-kit.webp";

function Learning() {
  return (
    <main className="w-full bg-white font-sans text-slate-800">
      {/* ─── Top Background Banner ─── */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden bg-slate-900">
        <img
          src={bannerBg}
          alt="STEMSAGE Learning Banner"
          className="h-full w-full object-cover object-center opacity-85 blur-[1px]"
          onError={(e) => { e.currentTarget.src = eduKitBg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* ─── Floating White Intro Box ─── */}
      <div className="relative z-10 mx-auto -mt-28 sm:-mt-36 md:-mt-48 max-w-4xl px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 shadow-xl px-6 py-10 sm:px-12 sm:py-14 md:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 mb-6">
            Learning Hub <span className="text-red-600 font-medium">Coming Soon</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal mb-8">
            We are hard at work building an all-in-one interactive STEM learning hub. Soon you'll be able to access guided robotics, IoT, 3D design, and coding modules right here.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-xs sm:text-sm font-bold text-slate-700 transition-all duration-300 hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Feature Cards Grid ─── */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-300 overflow-hidden shadow-xs p-8 text-center flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-3xl text-white mb-5">
              🚀
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Interactive Courses</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Structured STEM modules tailored for hands-on, step-by-step learning.</p>
          </div>

          <div className="bg-white border border-slate-300 overflow-hidden shadow-xs p-8 text-center flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-3xl text-white mb-5">
              🛠️
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Live Workshops</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Experiential, mentor-guided sessions for real-world application.</p>
          </div>

          <div className="bg-white border border-slate-300 overflow-hidden shadow-xs p-8 text-center flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-3xl text-white mb-5">
              🔬
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Project Labs</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Build portfolio-ready hardware & software creations from scratch.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Learning;
