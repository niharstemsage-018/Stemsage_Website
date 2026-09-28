import { useState, useEffect } from "react";
import Footer from "../components/common/Footer";
import { X, ChevronLeft, ChevronRight, Maximize2, Heart } from "lucide-react";

import img1 from "../assets/gallery/image_01.jpg";
import img2 from "../assets/gallery/image_02.jpg";
import img3 from "../assets/gallery/image_03.jpg";
import img4 from "../assets/gallery/image_04.jpg";
import img5 from "../assets/gallery/image_05.jpg";
import img6 from "../assets/gallery/image_06.jpg";
import img7 from "../assets/gallery/image_07.jpg";
import img8 from "../assets/gallery/image_08.png";
import img9 from "../assets/gallery/image_09.jpg";
import img10 from "../assets/gallery/image_10.jpg";
import img11 from "../assets/gallery/image_11.jpg";

const galleryItems = [
  { id: 1, title: "STEM Workshop Presentation", src: img1 },
  { id: 2, title: "Hands-on Circuit Wiring", src: img2 },
  { id: 3, title: "Robotics & Microcontroller Debugging", src: img3 },
  { id: 4, title: "Design Thinking & Physical Computing", src: img4 },
  { id: 5, title: "Computer Lab Workstation Session", src: img5 },
  { id: 6, title: "Innovation Lab Setup", src: img6 },
  { id: 7, title: "Group Hardware Prototyping", src: img7 },
  { id: 8, title: "Electrical Measurements & Testing", src: img8 },
  { id: 9, title: "Wireless Telemetry & Sensor Dashboard", src: img9 },
  { id: 10, title: "Robotics Actuation & Kinematics", src: img10 },
  { id: 11, title: "Workshop Tooling & Soldering Station", src: img11 },
];

function Learning() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="w-full bg-white font-sans text-slate-800 min-h-screen">
      {/* ─── Minimal Header Title matching Wix Reference ─── */}
      <section className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-slate-900 tracking-tight inline-block border-b-2 border-slate-900 pb-1">
          STEM Workshops
        </h1>
      </section>

      {/* ─── Pinterest Masonry Gallery Grid ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="break-inside-avoid group relative overflow-hidden bg-slate-100 cursor-pointer border border-slate-200/60 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="bg-white/90 text-slate-900 rounded-full p-2.5 shadow-md">
                  <Maximize2 size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Fullscreen White Lightbox Modal (Matching Wix Reference) ─── */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          {/* Top Bar Actions */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
            <div className="flex items-center gap-4 text-slate-700">
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:text-black transition cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 size={20} />
              </button>
              <button
                type="button"
                onClick={() => setLiked(!liked)}
                className="p-1.5 hover:text-red-600 transition cursor-pointer"
                title="Like"
              >
                <Heart size={20} className={liked ? "fill-red-600 text-red-600" : ""} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="p-1.5 text-slate-800 hover:text-slate-500 transition cursor-pointer"
              aria-label="Close"
            >
              <X size={28} />
            </button>
          </div>

          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={handlePrevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-2 text-slate-700 hover:text-black transition cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={handleNextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-2 text-slate-700 hover:text-black transition cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>

          {/* Centered Large Image */}
          <div className="flex items-center justify-center w-full h-[85vh] max-w-[85vw] mx-auto pointer-events-none">
            <img
              src={galleryItems[selectedImageIndex].src}
              alt={galleryItems[selectedImageIndex].title}
              className="h-[80vh] max-h-[84vh] max-w-[82vw] w-auto object-contain transition-all duration-300 pointer-events-auto shadow-sm"
              style={{ minHeight: "65vh" }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Learning;
