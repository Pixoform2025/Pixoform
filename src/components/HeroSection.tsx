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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-0">
        <video
          ref={videoRef}
          className="absolute object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@main/src/assets/Earbuds_Render.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="text-center animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-4 text-gradient">
            PIXOFORM
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 mx-auto my-6"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto">
            3D | VFX | Media Studio
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-[pulse_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
