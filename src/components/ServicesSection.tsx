import React, { useState } from "react";
import { 
  Layers, 
  Building2, 
  Clapperboard, 
  Smartphone, 
  Globe, 
  Sparkles, 
  Film, 
  Brush, 
  VideoIcon,
  LineChart,
  PenTool,
  Cpu,
  Tv,
  Coffee,
  Camera
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import Earbuds_Render from "../assets/Earbuds_Render.mp4";
import product from "../assets/services/product.webp";
import arch from "../assets/services/arch.webp";
import vfx from "../assets/services/vfx.webp";
import vr from "../assets/services/vr.webp";
import ar from "../assets/services/ar.webp";
import interactive from "../assets/services/interactive.webp";
import motion from "../assets/services/motion.webp";
import cinematic from "../assets/services/cinematic.webp";
import concept from "../assets/services/concept.webp";
import ad from "../assets/services/ad.webp";
import data from "../assets/services/data.webp";
import logo from "../assets/services/logo.webp";
import broadcast from "../assets/services/broadcast.webp";
import photography from "../assets/services/photography.webp";
import explainer from "../assets/services/explainer.webp";
import { useEffect } from "react";






interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  video?: string;
}

const services: Service[] = [
  {
    id: "product",
    title: "3D Product Animation",
    description: "High-end promotional visuals for consumer electronics, automotive, and lifestyle products.",
    icon: <Layers className="w-6 h-6" />,
    image: product,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Earbuds_Render.mp4"
  },
  {
    id: "arch",
    title: "Architectural Visualization",
    description: "Realistic 3D interiors, exteriors, and urban environments for real estate and architectural firms.",
    icon: <Building2 className="w-6 h-6" />,
    image: arch,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/ArchViz_Render.mp4"
  },
  {
    id: "cinematic",
    title: "Cinematics",
    description: "Captivating game trailers, film title sequences, and promotional videos with cinematic quality.",
    icon: <Film className="w-6 h-6" />,
    image: cinematic,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Cinematic_Render.mp4"
  },
  {
    id: "concept",
    title: "3D Concept & Character Design",
    description: "Original character creation, concept development, and asset design for games and films.",
    icon: <Brush className="w-6 h-6" />,
    image: concept,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Character_Render.mp4"
  },
  {
    id: "vr",
    title: "VR Development",
    description: "Immersive virtual reality experiences for enterprise, education and entertainment.",
    icon: <Smartphone className="w-6 h-6" />,
    image: vr,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/VR.mp4"
  },
  {
    id: "ar",
    title: "AR Development",
    description: "Dynamic augmented reality experiences for advertisements, education and entertainment.",
    icon: <PenTool className="w-6 h-6" />,
    image: ar,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/AR_Render.mp4"
  },
  {
    id: "interactive",
    title: "Interactive Media",
    description: "Web-based 3D configurators, simulations, and interactive product displays for enhanced user engagement.",
    icon: <Globe className="w-6 h-6" />,
    image: interactive,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/InteractiveSeuquence.mp4"
  },
  {
    id: "motion",
    title: "Motion Graphics & UI Animation",
    description: "Dynamic interface animations, title sequences, and motion design for digital products and videos.",
    icon: <Sparkles className="w-6 h-6" />,
    image: motion,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Motion_graphic.mp4"
  },
  {
    id: "vfx",
    title: "VFX & CGI",
    description: "Seamless visual effects integration including explosions, particle simulations, and digital creatures.",
    icon: <Clapperboard className="w-6 h-6" />,
    image: vfx,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Vfx_Render.mp4"
  },
  {
    id: "ad",
    title: "Advertisement & Branding Videos",
    description: "High-impact promotional content, explainer videos, and brand identity animations.",
    icon: <VideoIcon className="w-6 h-6" />,
    image: ad,
    video: "https://static.videezy.com/system/resources/previews/000/055/996/original/VITALIC-PROMO-RETRO.mp4"
  },
  {
    id: "logo",
    title: "3D Logo Animation",
    description: "Dynamic and memorable logo animations that bring brand identities to life with depth and dimension.",
    icon: <PenTool className="w-6 h-6" />,
    image: logo,
    video: "https://static.videezy.com/system/resources/previews/000/042/910/original/GoldLogoAfterEffectsTemplate.mp4"
  },
/*   {
    id: "photography",
    title: "Product Photography",
    description: "Photorealistic 3D product renders that are indistinguishable from traditional photography.",
    icon: <Camera className="w-6 h-6" />,
    image: photography,
    video: "https://static.videezy.com/system/resources/previews/000/051/333/original/computer-monitor-laptop.mp4"
  }, */
  {
    id: "explainer",
    title: "3D Explainer Videos",
    description: "Clear, engaging explainer animations that break down complex products, services, or concepts.",
    icon: <Coffee className="w-6 h-6" />,
    image: explainer,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/ExplainerVideo.mp4"
  }
];

const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    services.forEach(service => {
      if (service.video) {
        const video = document.createElement("video");
        video.src = service.video;
        video.preload = "auto";
      }
    });
  }, []);

  return (
    <section id="service" className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className={`inline-block px-3 py-1 text-xs font-medium tracking-wider ${theme === 'dark' ? 'glass' : 'bg-gray-100 border border-gray-200'} rounded-full mb-4`}>
            OUR EXPERTISE
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient' : 'text-gray-800'}`}>
            What We Offer
          </h2>
          <p className={theme === 'dark' ? 'text-white/70 max-w-2xl mx-auto' : 'text-gray-600 max-w-2xl mx-auto'}>
            Comprehensive creative solutions for all your 3D, VFX, and media needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {services.map((service) => {
            const isHovered = hoveredService === service.id;
            
            return (
              <div 
                key={service.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 group cursor-pointer ${
                  hoveredService === null ? 'h-[200px]' : 
                  isHovered ? 'h-[350px] scale-110 z-20' : 
                  'h-[200px] scale-90 opacity-20'
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background image or video */}
                <div className="absolute inset-0 w-full h-full relative rounded-2xl overflow-hidden">
                  {isHovered && service.video ? (
                    <video 
                      src={service.video} 
                      autoPlay 
                      muted 
                      loop 
                      preload="auto" // This line ensures preloading
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      loading="lazy"
                    />
                  )}
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/40'} ${
                    isHovered ? 'opacity-30' : 'opacity-70'
                  } transition-all duration-300`}></div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'glass' : 'bg-white/80'
                  }`}>
                    {service.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-bold mb-1">{service.title}</h3>
                    {isHovered && (
                      <p className="text-white/80 text-sm line-clamp-2 animate-fade-in">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
