import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react";
import CiplaLogo from "../assets/Cipla_logo.png";
import Earbuds_Render from "../assets/Earbuds_Render.mp4";


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
    description: "3D visualization for Cipla's product launches & Event.",
    logoUrl: CiplaLogo,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
    videoUrl: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Cipla_Render.mp4?v=2"
  },
  {
    name: "RD Pro Earphones",
    description: "High-end product visualization and animation for premium audio hardware.",
    logoUrl: "https://rdpro.in/wp-content/uploads/2021/06/rd-logo.png",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1964",
    videoUrl: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Earbuds_Render.mp4?v=2"
  },
  {
    name: "Robokart",
    description: "3D VR visualization and animations for educational content.",
    logoUrl: "https://robokart.com/wp-content/uploads/2020/06/robokart-logo.png",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964",
    videoUrl: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Robokart_Render.mp4?v=2"
  },
  {
    name: "Noise",
    description: "Product visualization and promotional content for smart wearables and audio devices.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Noise_Logo.png",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964",
    videoUrl: "https://cdn.jsdelivr.net/gh/Pixoform2025/Pixoform@latest/src/assets/Noise_Render.mp4?v=2"
  },
];



const duplicatedClients = [...clients, ...clients, ...clients ];

const ClientShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { theme } = useTheme();

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || !isScrolling) return;

    const scroll = scrollRef.current;
    let scrollAmount = scroll.scrollLeft;
    const step = 1;
    let animationFrame: number;

    const infiniteScroll = () => {
      if (!isScrolling || !scrollRef.current) return;

      scrollAmount += step;
      scroll.scrollLeft = scrollAmount;

      if (scrollAmount >= scroll.scrollWidth / 2) {
        scroll.scrollLeft = 0;
        scrollAmount = 0;
      }

      animationFrame = requestAnimationFrame(infiniteScroll);
    };

    animationFrame = requestAnimationFrame(infiniteScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isScrolling]);

  const draggingRef = useRef(false); // Track dragging state independently

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrolling(false);
    setIsDragging(true);
    draggingRef.current = true;
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    draggingRef.current = false;
    setTimeout(() => {
      if (!draggingRef.current) setIsScrolling(true);
    }, 2000); // Auto restart after 2 seconds
  };



  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };



  const handleScrollBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (scrollRef.current) {
      setIsScrolling(false);
      scrollRef.current.scrollLeft = Number(e.target.value);
      setTimeout(() => setIsScrolling(true), 2000); // Reduced timeout to 2 seconds
    }
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
                className={`client-card flex-shrink-0 w-[300px] md:w-[350px] group ${theme === 'dark'
                  ? 'glass rounded-2xl overflow-hidden transition-all duration-500 hover:glass-dark hover-lift hover-glow'
                  : 'bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1'
                  }`}
                  onMouseEnter={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    if (video) {
                      video.currentTime = 0; // Restart video on hover
                      video.play();
                    }
                  }}  
                  onMouseLeave={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    if (video) {
                      video.pause();
                    }
                  }}  
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {/*<img src={client.logoUrl} alt={client.name} className="h-8 w-auto mr-4" />*/}
                    <h2 className="text-xl font-bold">{client.name}</h2>
                  </div>
                  <p className={theme === 'dark' ? 'text-white/70 mb-6' : 'text-gray-600 mb-6'}>{client.description}</p>
                </div>

                {/* Video Preview on Hover */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => showVideoPopup(client)}
                >
                  <img
                    src={client.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:opacity-0"
                    loading="lazy"
                  />

                  <video
                    src={client.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    muted
                    autoPlay
                    loop
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Video Popup Modal */}
{selectedClient && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" 
    onClick={() => setSelectedClient(null)}
  >
    <div 
      className="relative w-[70%] max-w-6xl bg-black rounded-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 rounded-full hover:bg-black/80"
        onClick={() => setSelectedClient(null)}
      >
        <X className="w-6 h-6" />
      </button>
      
      {/* Replaced iframe with a normal video player */}
      <video 
        src={selectedClient.videoUrl} 
        controls 
        autoPlay 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
)}


    </section>
  );
};


export default ClientShowcase;
