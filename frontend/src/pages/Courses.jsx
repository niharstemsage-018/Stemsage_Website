import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import Footer from "../components/common/Footer";
import { getCourses } from "../services/courseService";

import bannerBg from "../assets/services/Courses.png";
import eduKitBg from "../assets/Edu-kit.webp";

/* ============================================================
   FALLBACK COURSE TRACKS DATA (used when API fails)
   ============================================================ */
// eslint-disable-next-line no-unused-vars
const fallbackCourseTracks = [
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
  const activeCourseModal = searchParams.get("course");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load courses from API
  useEffect(() => {
    let cancelled = false;
    async function loadCourses() {
      try {
        setLoading(true);
        const apiCourses = await getCourses();
        if (!cancelled) {
          if (apiCourses && apiCourses.length > 0) {
            setCourses(apiCourses);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch courses:", err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadCourses();
    return () => { cancelled = true; };
  }, []);

  const closeModal = () => {
    setSearchParams({});
  };

  // Check if there are active courses
  const hasActiveCourses = courses.length > 0;

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

      {/* ─── Floating White Intro Box ─── */}
      <div className="relative z-10 mx-auto -mt-28 sm:-mt-36 md:-mt-48 max-w-4xl px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 shadow-xl px-6 py-10 sm:px-12 sm:py-14 md:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 mb-6">
            {hasActiveCourses ? "Our Courses" : "Courses <span className=\"text-red-600 font-medium\">Coming Soon</span>"}
          </h1>
          {hasActiveCourses ? (
            <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal">
              Explore our comprehensive, hands-on STEM courses designed for learners at every level.
            </p>
          ) : (
            <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal">
              At STEMSAGE, we are dedicated to fostering hands-on STEM education. We are designing comprehensive, interactive courses in Electronics, IoT, Robotics, and 3D Design. Stay tuned as we prepare to launch our live learning tracks!
            </p>
          )}
        </div>
      </div>

      {/* ─── Courses Grid / Loader ─── */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      ) : hasActiveCourses ? (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="group relative flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:border-red-200 hover:-translate-y-0.5">
                <div className="w-full h-48 overflow-hidden bg-slate-100 shrink-0 relative">
                  {course.coverImage ? (
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 text-xs font-semibold">
                      Course Image
                    </div>
                  )}
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex-1 flex flex-col justify-between px-5 pt-4 pb-5">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">{course.title}</h3>
                    <p className="mt-2 text-sm font-medium text-slate-600 leading-snug">{course.description}</p>
                  </div>
                  <div className="mt-5">
                    <Link
                      to={`/courses?course=${course.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-2.5 px-4 transition-all duration-300 shadow hover:shadow-md hover:scale-[1.02]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

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
