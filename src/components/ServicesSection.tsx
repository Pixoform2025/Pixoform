
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
  VideoIcon 
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const services: Service[] = [
  {
    id: "product",
    title: "3D Product Animation",
    description: "High-end promotional visuals for consumer electronics, automotive, and lifestyle products.",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070"
  },
  {
    id: "arch",
    title: "Architectural Visualization",
    description: "Realistic 3D interiors, exteriors, and urban environments for real estate and architectural firms.",
    icon: <Building2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1545169411-3d0aa77469c4?q=80&w=2070"
  },
  {
    id: "vfx",
    title: "VFX & CGI",
    description: "Seamless visual effects integration including explosions, particle simulations, and digital creatures.",
    icon: <Clapperboard className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1612544409030-e36a82d96022?q=80&w=2070"
  },
  {
    id: "vr",
    title: "VR/AR Development",
    description: "Immersive virtual and augmented reality experiences for enterprise, education, and entertainment.",
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070"
  },
  {
    id: "interactive",
    title: "Interactive Media",
    description: "Web-based 3D configurators, simulations, and interactive product displays for enhanced user engagement.",
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1932"
  },
  {
    id: "motion",
    title: "Motion Graphics & UI Animation",
    description: "Dynamic interface animations, title sequences, and motion design for digital products and videos.",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
  },
  {
    id: "cinematic",
    title: "Cinematic Trailers",
    description: "Captivating game trailers, film title sequences, and promotional videos with cinematic quality.",
    icon: <Film className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069"
  },
  {
    id: "concept",
    title: "3D Concept & Character Design",
    description: "Original character creation, concept development, and asset design for games and films.",
    icon: <Brush className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1616161560197-e155d8d77032?q=80&w=2070"
  },
  {
    id: "ad",
    title: "Advertisement & Branding Videos",
    description: "High-impact promotional content, explainer videos, and brand identity animations.",
    icon: <VideoIcon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1567443024551-f3e3a5e1a7a8?q=80&w=2070"
  }
];

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider glass rounded-full mb-4">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            What We Offer
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Comprehensive creative solutions for all your 3D, VFX, and media needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className="glass rounded-2xl overflow-hidden group hover-lift transition-all duration-300"
              onMouseEnter={() => setActiveService(service)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                  activeService?.id === service.id ? 'bg-white text-black' : 'glass'
                }`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 mb-6 flex-grow">{service.description}</p>
                
                <div className="relative overflow-hidden rounded-xl h-40 mt-auto">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="h-1 w-0 bg-white rounded-full transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
