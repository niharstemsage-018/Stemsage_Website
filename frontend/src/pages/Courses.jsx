import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { X } from "lucide-react";
import Footer from "../components/common/Footer";

import bannerBg from "../assets/services/Courses.png";
import eduKitBg from "../assets/Edu-kit.webp";

const courseTracks = [
  {
    id: "electronics",
    title: "Electronics",
    text: "Learn circuit design, microcontrollers, components, digital electronics, and practical troubleshooting with step-by-step hands-on guides.",
    items: ["Basic electronics", "Fundamentals of Electronics", "Digital Electronics"],
  },
  {
    id: "iot",
    title: "Internet of Things",
    text: "Connect physical microcontrollers and sensors to the web. Master Arduino programming, Wi-Fi modules, cloud dashboards, and automation.",
    items: [
      "Arduino Masterclass",
      "Play with Sensors",
      "IOT Masterclass",
      "Industrial IOT Training & Workshops",
    ],
  },
  {
    id: "robotics",
    title: "Robotics",
    text: "Build and program autonomous mobile robots, obstacle avoiders, line followers, and explore physics simulation robotics.",
    items: ["DIY Robotics", "Advanced Robotics Masterclass", "SRC (Simulation Robotics Class)"],
  },
  {
    id: "3d-design",
    title: "3D Designing & Animations",
    text: "Go from concept sketch to finished 3D printed prototype. Master CAD modeling, enclosure design, slicing, and 3D animations.",
    items: ["3D Designing Masterclass", "3D Animation Super Course"],
  },
];

/* ─── Coming Soon Modal ─── */
function CourseComingSoonModal({ title, onClose }) {
  if (!title) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden bg-white p-6 sm:p-8 shadow-2xl text-center border border-slate-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 text-3xl">
          🚀
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider mb-3">
          Coming Soon
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          This course is currently under development by our engineering team. Stay tuned for upcoming schedule releases and curriculum updates!
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              alert(`Thank you for your interest in "${title}"! We will notify you upon launch.`);
              onClose();
            }}
            type="button"
            className="w-full py-3 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
          >
            Notify Me Upon Release
          </button>
          <button
            onClick={onClose}
            type="button"
            className="w-full py-2.5 px-4 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  useEffect(() => {
    const courseParam = searchParams.get("course");
    if (courseParam) {
      setActiveCourseModal(courseParam);
    }
  }, [searchParams]);

  const closeModal = () => {
    setActiveCourseModal(null);
    setSearchParams({});
  };

  return (
    <main className="w-full bg-white font-sans text-slate-800">
      {/* ─── Top Background Banner (Matching Services page style) ─── */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden bg-slate-900">
        <img
          src={bannerBg}
          alt="STEMSAGE Courses Banner"
          className="h-full w-full object-cover object-center opacity-85 blur-[1px]"
          onError={(e) => { e.currentTarget.src = eduKitBg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* ─── Floating White Intro Box (Matching Services / About screenshot style) ─── */}
      <div className="relative z-10 mx-auto -mt-28 sm:-mt-36 md:-mt-48 max-w-4xl px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 shadow-xl px-6 py-10 sm:px-12 sm:py-14 md:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 mb-6">
            Courses <span className="text-red-600 font-medium">Coming Soon</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal">
            At STEMSAGE, we are dedicated to fostering hands-on STEM education. We are designing comprehensive, interactive courses in Electronics, IoT, Robotics, and 3D Design. Stay tuned as we prepare to launch our live learning tracks!
          </p>
        </div>
      </div>

      {/* Spacer for clean bottom margin */}
      <div className="pb-24 sm:pb-32" />

      {/* Modal */}
      <CourseComingSoonModal title={activeCourseModal} onClose={closeModal} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Courses;
