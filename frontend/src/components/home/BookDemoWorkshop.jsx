import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

function BookDemoWorkshop() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 px-5 sm:px-8 border-b border-slate-100">
            <div className="relative mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left Info Column: 6 cols */}
                    <div className="lg:col-span-6 text-left">
                        {/* Eyebrow */}
                        <p className="text-xl sm:text-2xl font-bold text-slate-800">
                            Explore <span className="text-red-600 font-extrabold">STEM</span> with us
                        </p>

                        {/* Main Title */}
                        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Book a demo <span className="text-red-600">workshop</span> now
                        </h2>

                        {/* Red Line Accent */}
                        <div className="mt-4 h-[3px] w-16 bg-red-600 rounded-full" />

                        {/* Description Paragraph */}
                        <p className="mt-6 text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                            Join us for an engaging demo workshop where you can experience our offerings firsthand!
                            Discover valuable insights and your questions answered by our experts.
                            Don't miss this opportunity to enhance your skills and knowledge. Book your spot today!
                        </p>

                        {/* Red CTA Button */}
                        <div className="mt-8">
                            <Link
                                to="/workshops"
                                className="inline-block rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base py-3.5 px-8 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] text-center"
                            >
                                Book demo workshop
                            </Link>
                        </div>
                    </div>

                    {/* Right Video Player Column: 6 cols */}
                    <div className="lg:col-span-6 relative w-full">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-slate-950 aspect-video group">
                            {/* Video Element */}
                            <video
                                ref={videoRef}
                                controls
                                poster="/images/hero-2.png"
                                className="w-full h-full object-cover"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src="/videos/demo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Play Button Overlay (visible when video is not playing) */}
                            {!isPlaying && (
                                <button
                                    type="button"
                                    onClick={handleVideoClick}
                                    className="absolute inset-0 m-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-600/90 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-600 pointer-events-auto"
                                    aria-label="Play video"
                                >
                                    <Play className="h-8 w-8 fill-current ml-1" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookDemoWorkshop;
