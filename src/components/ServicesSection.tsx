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
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@main/src/assets/Earbuds_Render.mp4"
  },
  {
    id: "arch",
    title: "Architectural Visualization",
    description: "Realistic 3D interiors, exteriors, and urban environments for real estate and architectural firms.",
    icon: <Building2 className="w-6 h-6" />,
    image: arch,
    video: "https://static.videezy.com/system/resources/previews/000/050/604/original/211104_05_Glow_4k_026.mp4"
  },
  {
    id: "vfx",
    title: "VFX & CGI",
    description: "Seamless visual effects integration including explosions, particle simulations, and digital creatures.",
    icon: <Clapperboard className="w-6 h-6" />,
    image: vfx,
    video: "https://static.videezy.com/system/resources/previews/000/055/508/original/210305_04_Energy_4k_001.mp4"
  },
  {
    id: "vr",
    title: "VR/AR Development",
    description: "Immersive virtual and augmented reality experiences for enterprise, education, and entertainment.",
    icon: <Smartphone className="w-6 h-6" />,
    image: vr,
    video: "https://static.videezy.com/system/resources/previews/000/056/919/original/37.mp4"
  },
  {
    id: "interactive",
    title: "Interactive Media",
    description: "Web-based 3D configurators, simulations, and interactive product displays for enhanced user engagement.",
    icon: <Globe className="w-6 h-6" />,
    image: interactive,
    video: "https://static.videezy.com/system/resources/previews/000/047/802/original/200819_03_Business_4k_002.mp4"
  },
  {
    id: "motion",
    title: "Motion Graphics & UI Animation",
    description: "Dynamic interface animations, title sequences, and motion design for digital products and videos.",
    icon: <Sparkles className="w-6 h-6" />,
    image: motion,
    video: "https://static.videezy.com/system/resources/previews/000/041/622/original/NEON-GEOMETRIC.mp4"
  },
  {
    id: "cinematic",
    title: "Cinematic Trailers",
    description: "Captivating game trailers, film title sequences, and promotional videos with cinematic quality.",
    icon: <Film className="w-6 h-6" />,
    image: cinematic,
    video: "https://static.videezy.com/system/resources/previews/000/052/115/original/210728_02_SciFi_4k_029.mp4"
  },
  {
    id: "concept",
    title: "3D Concept & Character Design",
    description: "Original character creation, concept development, and asset design for games and films.",
    icon: <Brush className="w-6 h-6" />,
    image: concept,
    video: "https://static.videezy.com/system/resources/previews/000/056/000/original/210903_03_Shapes_4k_044.mp4"
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
  {
    id: "photography",
    title: "Product CGI Photography",
    description: "Photorealistic 3D product renders that are indistinguishable from traditional photography.",
    icon: <Camera className="w-6 h-6" />,
    image: photography,
    video: "https://static.videezy.com/system/resources/previews/000/051/333/original/computer-monitor-laptop.mp4"
  },
  {
    id: "explainer",
    title: "3D Explainer Videos",
    description: "Clear, engaging explainer animations that break down complex products, services, or concepts.",
    icon: <Coffee className="w-6 h-6" />,
    image: explainer,
    video: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@main/src/assets/ExplanationVideo.mp4"
  }
];

const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { theme } = useTheme();

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-10">
          {services.map((service) => {
            const isHovered = hoveredService === service.id;
            
            return (
              <div 
                key={service.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 group cursor-pointer ${
                  hoveredService === null ? 'h-[200px]' : 
                  isHovered ? 'h-[350px] scale-110 z-20' : 
                  'h-[250px] scale-90 opacity-20'
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background image or video */}
                <div className="absolute inset-0 w-full h-full">
                  {isHovered && service.video ? (
                    <video 
                      src={service.video} 
                      autoPlay 
                      muted 
                      loop 
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
