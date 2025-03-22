import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react";

interface Client {
  name: string;
  description: string;
  logoUrl: string;
  imageUrl: string;
  videoUrl: string;
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
    name: "Noise",
    description: "Product visualization and promotional content for smart wearables and audio devices.",
    logoUrl: "https://images.unsplash.com/photo-1563113010-6b6b295af0e9?q=80&w=987",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964",
    videoUrl: "https://www.youtube.com/watch?v=CbXhU05kOj4"
  },
  {
    name: "Urban Ladder",
    description: "Architectural visualization and 3D furniture modeling for e-commerce and marketing.",
    logoUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1958",
    videoUrl: "https://static.videezy.com/system/resources/previews/000/052/142/original/Modern_Sofa.mp4"
  },
];

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
    if (!scrollRef.current || !isScrolling) return;
    
    const scroll = scrollRef.current;
    let scrollAmount = scroll.scrollLeft;
    const step = 1;

    const infiniteScroll = () => {
      if (!isScrolling || !scrollRef.current) return;
      
      scrollAmount += step;
      scroll.scrollLeft = scrollAmount;

      if (scrollAmount >= scroll.scrollWidth / 2) {
        scroll.scrollLeft = 0;
        scrollAmount = 0;
      }

      requestAnimationFrame(infiniteScroll);
    };

    requestAnimationFrame(infiniteScroll);
    return () => setIsScrolling(false);
  }, [isScrolling]);

const handleMouseDown = (e: React.MouseEvent) => {
  if (!scrollRef.current) return;

  console.log("Mouse Down"); // Debugging  

  setIsScrolling(false);
  setIsDragging(true);
  setStartX(e.pageX - scrollRef.current.offsetLeft);
  setScrollLeft(scrollRef.current.scrollLeft);

  // Prevent unwanted pointer behavior
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";

  e.preventDefault(); // Prevent browser default drag behavior
};

const handleMouseMove = (e: React.MouseEvent) => {
  if (!isDragging || !scrollRef.current) return;

  console.log("Mouse Move"); // Debugging

  e.preventDefault(); // Stops unwanted selection behavior

  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = (startX - x) * 1.5; // Inverted scrolling (Apple-like)

  scrollRef.current.scrollLeft = scrollLeft + walk;
};

const handleMouseUp = () => {
  console.log("Mouse Up"); // Debugging

  setIsDragging(false);
  document.body.style.cursor = "default";
  document.body.style.userSelect = "auto";

  setTimeout(() => {
    if (!isDragging) setIsScrolling(true);
  }, 2000);
};

  
  
  // Disable pointer events during dragging to prevent interference
  useEffect(() => {
    if (isDragging) {
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.pointerEvents = "auto";
    }
  }, [isDragging]);
  
  
  

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
        </div>

        <div 
          ref={scrollRef} 
          className="overflow-hidden w-full cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsDragging(false)}
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
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <h3 className="text-xl font-bold">{client.name}</h3>
                  </div>
                  <p className={theme === 'dark' ? 'text-white/70 mb-6' : 'text-gray-600 mb-6'}>{client.description}</p>
                </div>

                <div className="relative h-48 overflow-hidden">
                  <img src={client.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute bottom-4 left-4">
                    <button className="text-sm font-medium text-white flex items-center hover:underline" onClick={() => showVideoPopup(client)}>
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedClient(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 rounded-full hover:bg-black/80" onClick={() => setSelectedClient(null)}>
              <X className="w-6 h-6" />
            </button>
            <div className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
              <div className="aspect-video">
                {selectedClient.videoUrl.includes("youtube.com") ? (
                  <iframe width="100%" height="100%" src={selectedClient.videoUrl.replace("watch?v=", "embed/")} allowFullScreen className="w-full h-full object-cover"/>
                ) : (
                  <video src={selectedClient.videoUrl} controls autoPlay className="w-full h-full object-cover"/>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientShowcase;
