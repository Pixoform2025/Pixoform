
import React, { useEffect, useRef } from "react";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would be for the real implementation with actual video
    // For now we'll use a placeholder approach
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slightly slower for more cinematic feel
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
      
      if (sectionRef.current) {
        sectionRef.current.style.opacity = opacity.toString();
      }
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
      {/* Video background - in a real implementation, replace with actual video */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-0">
        <video
          ref={videoRef}
          className="absolute object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070"
        >
          {/* For the demo, we don't have the actual video, but would use something like this */}
          <source src="/videos/showreel.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
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
