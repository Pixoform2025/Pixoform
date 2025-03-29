import React, { useEffect, useRef } from "react";
import videoFile from "../assets/RenderTest.mp4"; // Import video file

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollPosition = window.scrollY;
      const heroHeight = sectionRef.current.offsetHeight;
      const fadeStart = heroHeight * 0.2;
      const fadeEnd = heroHeight * 0.8;
      const opacity = 1 - Math.min(Math.max((scrollPosition - fadeStart) / (fadeEnd - fadeStart), 0), 1);

      sectionRef.current.style.opacity = opacity.toString();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (
  <section
    id="home"
    ref={sectionRef}
    className="relative w-full h-screen overflow-hidden"
  >
    {/* Video background */}
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/RenderTest.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>

    {/* Overlay content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8">
      <div className="text-center animate-slide-up">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter mb-3 sm:mb-4 text-gradient">
          PIXOFORM
        </h1>
        <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 mx-auto my-4 sm:my-6"></div>
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xs sm:max-w-md mx-auto">
          3D | VFX | Media Studio
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 sm:w-8 h-10 sm:h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
          <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white rounded-full animate-[pulse_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  </section>
);

  
};

export default HeroSection;
