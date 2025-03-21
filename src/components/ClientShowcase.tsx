
import React, { useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Client {
  name: string;
  description: string;
  logoUrl: string;
  imageUrl: string;
}

const clients: Client[] = [
  {
    name: "Cipla",
    description: "3D product visualization for pharmaceutical products and interactive medical animations.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Cipla_Logo.svg/1200px-Cipla_Logo.svg.png",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070"
  },
  {
    name: "RD Pro Earphones",
    description: "High-end product visualization and animation for premium audio hardware.",
    logoUrl: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=1936",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1964"
  },
  {
    name: "Robokart",
    description: "3D visualization and animations for robotics products and educational kits.",
    logoUrl: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964"
  },
  {
    name: "Titan Watches",
    description: "Premium product rendering and animation for luxury timepieces.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Logo_of_Titan_Company.svg/1200px-Logo_of_Titan_Company.svg.png",
    imageUrl: "https://images.unsplash.com/photo-1542495392-8cd0d7c29c59?q=80&w=1974"
  },
  {
    name: "Noise",
    description: "Product visualization and promotional content for smart wearables and audio devices.",
    logoUrl: "https://images.unsplash.com/photo-1563113010-6b6b295af0e9?q=80&w=987",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964"
  },
  {
    name: "Urban Ladder",
    description: "Architectural visualization and 3D furniture modeling for e-commerce and marketing.",
    logoUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1958"
  },
  {
    name: "Mahindra Electric",
    description: "3D animations and visualizations for electric vehicle technology and promotional material.",
    logoUrl: "https://www.carlogos.org/car-logos/mahindra-logo-2000x2000.png",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53b0c95?q=80&w=1972"
  }
];

// Duplicate clients for infinite scroll
const duplicatedClients = [...clients, ...clients];

const ClientShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleParallax = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const clientElements = containerRef.current.querySelectorAll('.client-card');
      
      clientElements.forEach((element, index) => {
        const translateY = scrollPosition * 0.1 * (index % 2 === 0 ? 0.05 : -0.05);
        (element as HTMLElement).style.transform = `translateY(${translateY}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    const scroll = scrollRef.current;
    let scrollAmount = 0;
    const step = 1; // Controls the speed
    
    const infiniteScroll = () => {
      scrollAmount += step;
      scroll.scrollLeft = scrollAmount;
      
      // Reset scroll position when it reaches the end of first set
      if (scrollAmount >= scroll.scrollWidth / 2) {
        scrollAmount = 0;
        scroll.scrollLeft = 0;
      }
      
      requestAnimationFrame(infiniteScroll);
    };
    
    const animation = requestAnimationFrame(infiniteScroll);
    
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section id="clients" className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-black to-slate-900' : 'bg-gradient-to-b from-white to-gray-100'}`}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className={`inline-block px-3 py-1 text-xs font-medium tracking-wider ${theme === 'dark' ? 'glass' : 'bg-gray-100 border border-gray-200'} rounded-full mb-4`}>
            PROUD COLLABORATIONS
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient' : 'text-gray-800'}`}>
            Trusted by Leading Brands
          </h2>
          <p className={theme === 'dark' ? 'text-white/70 max-w-2xl mx-auto' : 'text-gray-600 max-w-2xl mx-auto'}>
            We've partnered with innovative brands across industries to create stunning visual experiences.
          </p>
        </div>
        
        <div 
          ref={scrollRef} 
          className="overflow-hidden w-full"
        >
          <div ref={containerRef} className="flex gap-8 py-4 w-max">
            {duplicatedClients.map((client, index) => (
              <div 
                key={`${client.name}-${index}`}
                className={`client-card flex-shrink-0 w-[300px] md:w-[350px] group ${
                  theme === 'dark' 
                    ? 'glass rounded-2xl overflow-hidden transition-all duration-500 hover:glass-dark hover-lift hover-glow' 
                    : 'bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 overflow-hidden rounded-lg mr-4">
                      <img 
                        src={client.logoUrl} 
                        alt={`${client.name} logo`} 
                        className="h-full w-full object-contain" 
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{client.name}</h3>
                  </div>
                  <p className={theme === 'dark' ? 'text-white/70 mb-6' : 'text-gray-600 mb-6'}>
                    {client.description}
                  </p>
                </div>
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={client.imageUrl} 
                    alt={`${client.name} project`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-black/70 to-transparent' : 'bg-gradient-to-t from-black/50 to-transparent'}`}></div>
                  <div className="absolute bottom-4 left-4">
                    <a href="#" className="text-sm font-medium text-white flex items-center hover:underline">
                      View Project
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;
