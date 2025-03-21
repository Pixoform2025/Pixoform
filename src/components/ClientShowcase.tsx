
import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react";

interface Client {
  name: string;
  description: string;
  logoUrl: string;
  imageUrl: string;
  videoUrl: string; // Added for demo videos
}

const clients: Client[] = [
  {
    name: "Cipla",
    description: "3D product visualization for pharmaceutical products and interactive medical animations.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Cipla_Logo.svg/1200px-Cipla_Logo.svg.png",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/021/534/original/rotating-pills-on-black-background-realistic-3d-animation.mp4"
  },
  {
    name: "RD Pro Earphones",
    description: "High-end product visualization and animation for premium audio hardware.",
    logoUrl: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=1936",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1964",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/050/074/original/S_001_020.mp4"
  },
  {
    name: "Robokart",
    description: "3D visualization and animations for robotics products and educational kits.",
    logoUrl: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/039/564/original/robotic-arm.mp4"
  },
  {
    name: "Titan Watches",
    description: "Premium product rendering and animation for luxury timepieces.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Logo_of_Titan_Company.svg/1200px-Logo_of_Titan_Company.svg.png",
    imageUrl: "https://images.unsplash.com/photo-1542495392-8cd0d7c29c59?q=80&w=1974",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/044/479/original/200818_08_Watch_4k_013.mp4"
  },
  {
    name: "Noise",
    description: "Product visualization and promotional content for smart wearables and audio devices.",
    logoUrl: "https://images.unsplash.com/photo-1563113010-6b6b295af0e9?q=80&w=987",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/038/494/original/alb1020.mp4"
  },
  {
    name: "Urban Ladder",
    description: "Architectural visualization and 3D furniture modeling for e-commerce and marketing.",
    logoUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1958",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/052/142/original/Modern_Sofa.mp4"
  },
  {
    name: "Mahindra Electric",
    description: "3D animations and visualizations for electric vehicle technology and promotional material.",
    logoUrl: "https://www.carlogos.org/car-logos/mahindra-logo-2000x2000.png",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53b0c95?q=80&w=1972",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/048/170/original/Elextric_Vehicle-4K.mp4"
  }
];

// Duplicate clients for infinite scroll
const duplicatedClients = [...clients, ...clients];

const ClientShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
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
    if (!scrollRef.current || !isScrolling) return;
    
    const scroll = scrollRef.current;
    let scrollAmount = 0;
    const step = 0.5; // Slower scroll speed
    
    const infiniteScroll = () => {
      scrollAmount += step;
      scroll.scrollLeft = scrollAmount;
      
      // Reset scroll position when it reaches the end of first set
      if (scrollAmount >= scroll.scrollWidth / 2) {
        scrollAmount = 0;
        scroll.scrollLeft = 0;
      }
      
      if (isScrolling) {
        requestAnimationFrame(infiniteScroll);
      }
    };
    
    const animation = requestAnimationFrame(infiniteScroll);
    
    return () => cancelAnimationFrame(animation);
  }, [isScrolling]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrolling(false);
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) setIsScrolling(true);
    }, 3000); // Resume auto-scrolling after 3 seconds of inactivity
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTimeout(() => {
      setIsScrolling(true);
    }, 3000);
  };

  const showVideoPopup = (client: Client) => {
    setSelectedClient(client);
  };

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
          className="overflow-hidden w-full cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
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
                    <button 
                      className="text-sm font-medium text-white flex items-center hover:underline"
                      onClick={() => showVideoPopup(client)}
                    >
                      View Project
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video popup modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedClient(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 rounded-full hover:bg-black/80 transition-colors"
              onClick={() => setSelectedClient(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
              <div className="aspect-video">
                <video 
                  src={selectedClient.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-black/60' : 'bg-white'}`}>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 overflow-hidden rounded-lg mr-4">
                    <img 
                      src={selectedClient.logoUrl} 
                      alt={`${selectedClient.name} logo`} 
                      className="h-full w-full object-contain" 
                    />
                  </div>
                  <h3 className="text-xl font-bold">{selectedClient.name} Project</h3>
                </div>
                <p className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'}>
                  {selectedClient.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientShowcase;
