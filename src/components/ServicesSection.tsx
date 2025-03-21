
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
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/021/534/original/rotating-pills-on-black-background-realistic-3d-animation.mp4"
  },
  {
    id: "arch",
    title: "Architectural Visualization",
    description: "Realistic 3D interiors, exteriors, and urban environments for real estate and architectural firms.",
    icon: <Building2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1545169411-3d0aa77469c4?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/050/604/original/211104_05_Glow_4k_026.mp4"
  },
  {
    id: "vfx",
    title: "VFX & CGI",
    description: "Seamless visual effects integration including explosions, particle simulations, and digital creatures.",
    icon: <Clapperboard className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1612544409030-e36a82d96022?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/055/508/original/210305_04_Energy_4k_001.mp4"
  },
  {
    id: "vr",
    title: "VR/AR Development",
    description: "Immersive virtual and augmented reality experiences for enterprise, education, and entertainment.",
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/056/919/original/37.mp4"
  },
  {
    id: "interactive",
    title: "Interactive Media",
    description: "Web-based 3D configurators, simulations, and interactive product displays for enhanced user engagement.",
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1932",
    video: "https://static.videezy.com/system/resources/previews/000/047/802/original/200819_03_Business_4k_002.mp4"
  },
  {
    id: "motion",
    title: "Motion Graphics & UI Animation",
    description: "Dynamic interface animations, title sequences, and motion design for digital products and videos.",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/041/622/original/NEON-GEOMETRIC.mp4"
  },
  {
    id: "cinematic",
    title: "Cinematic Trailers",
    description: "Captivating game trailers, film title sequences, and promotional videos with cinematic quality.",
    icon: <Film className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069",
    video: "https://static.videezy.com/system/resources/previews/000/052/115/original/210728_02_SciFi_4k_029.mp4"
  },
  {
    id: "concept",
    title: "3D Concept & Character Design",
    description: "Original character creation, concept development, and asset design for games and films.",
    icon: <Brush className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1616161560197-e155d8d77032?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/056/000/original/210903_03_Shapes_4k_044.mp4"
  },
  {
    id: "ad",
    title: "Advertisement & Branding Videos",
    description: "High-impact promotional content, explainer videos, and brand identity animations.",
    icon: <VideoIcon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1567443024551-f3e3a5e1a7a8?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/055/996/original/VITALIC-PROMO-RETRO.mp4"
  },
  {
    id: "data",
    title: "Data Visualization",
    description: "Converting complex data into engaging, easy-to-understand visual representations and animations.",
    icon: <LineChart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/045/582/original/20190820ChartsWipe4k03.mp4"
  },
  {
    id: "logo",
    title: "3D Logo Animation",
    description: "Dynamic and memorable logo animations that bring brand identities to life with depth and dimension.",
    icon: <PenTool className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
    video: "https://static.videezy.com/system/resources/previews/000/042/910/original/GoldLogoAfterEffectsTemplate.mp4"
  },
  {
    id: "simulation",
    title: "Physics Simulations",
    description: "Realistic physics-based simulations for product testing, scientific visualization, and creative effects.",
    icon: <Cpu className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065",
    video: "https://static.videezy.com/system/resources/previews/000/042/997/original/Water-Animation-Pack.mp4"
  },
  {
    id: "broadcast",
    title: "Broadcast Graphics",
    description: "Polished graphics, transitions, and animations for television, live events, and streaming productions.",
    icon: <Tv className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1568438350562-2cae6d394ad0?q=80&w=1935",
    video: "https://static.videezy.com/system/resources/previews/000/055/515/original/210408_02_Infographics_4k_039.mp4"
  },
  {
    id: "product-cgi",
    title: "Product CGI Photography",
    description: "Photorealistic 3D product renders that are indistinguishable from traditional photography.",
    icon: <Camera className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=1974",
    video: "https://static.videezy.com/system/resources/previews/000/051/333/original/computer-monitor-laptop.mp4"
  },
  {
    id: "explainer",
    title: "3D Explainer Videos",
    description: "Clear, engaging explainer animations that break down complex products, services, or concepts.",
    icon: <Coffee className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070",
    video: "https://static.videezy.com/system/resources/previews/000/050/573/original/5G_Technology.mp4"
  }
];

const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <section id="services" className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {services.map((service) => {
            const isHovered = hoveredService === service.id;
            const isNeighborHovered = 
              hoveredService !== null && 
              hoveredService !== service.id && 
              services.findIndex(s => s.id === hoveredService) - services.findIndex(s => s.id === service.id) <= 1 && 
              services.findIndex(s => s.id === hoveredService) - services.findIndex(s => s.id === service.id) >= -1;
            
            return (
              <div 
                key={service.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 group cursor-pointer ${
                  hoveredService === null ? 'h-[180px]' : 
                  isHovered ? 'h-[250px] scale-110 z-20' : 
                  isNeighborHovered ? 'h-[200px] scale-105 z-10' : 
                  'h-[160px] scale-95 opacity-70'
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
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/40'} group-hover:bg-black/30 transition-all duration-300`}></div>
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
