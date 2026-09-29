import React from "react";
import Footer from "../components/common/Footer";

import bannerBg from "../assets/services/Courses.png";
import eduKitBg from "../assets/Edu-kit.webp";

function Store() {
  return (
    <main className="w-full bg-white font-sans text-slate-800">
      {/* ─── Top Background Banner ─── */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden bg-slate-900">
        <img
          src={bannerBg}
          alt="STEMSAGE Store Banner"
          className="h-full w-full object-cover object-center opacity-85 blur-[1px]"
          onError={(e) => {
            e.currentTarget.src = eduKitBg;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* ─── Floating White Intro Box ─── */}
      <div className="relative z-10 mx-auto -mt-28 sm:-mt-36 md:-mt-48 max-w-4xl px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 shadow-xl px-6 py-10 sm:px-12 sm:py-14 md:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 mb-6">
            Store <span className="text-red-600 font-medium">Coming Soon</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal">
            Our store is currently under development. Stay tuned for something exciting.
          </p>
        </div>
      </div>

      {/* Spacer for clean bottom margin */}
      <div className="pb-24 sm:pb-32" />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Store;
