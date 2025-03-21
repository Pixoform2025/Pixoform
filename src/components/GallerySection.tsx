
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface GalleryImage {
  url: string;
  alt: string;
}

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  images: GalleryImage[];
}

const galleryItems: GalleryItem[] = [
  {
    id: "product-1",
    category: "product",
    title: "Premium Headphones",
    images: [
      { url: "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2070", alt: "Premium Headphones 1" },
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1974", alt: "Premium Headphones 2" },
      { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1936", alt: "Premium Headphones 3" }
    ]
  },
  {
    id: "product-2",
    category: "product",
    title: "Smartwatch Series",
    images: [
      { url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964", alt: "Smartwatch 1" },
      { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999", alt: "Smartwatch 2" },
      { url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127", alt: "Smartwatch 3" }
    ]
  },
  {
    id: "product-3",
    category: "product",
    title: "Electric Vehicle",
    images: [
      { url: "https://images.unsplash.com/photo-1556800572-1b8aedf82b5b?q=80&w=2070", alt: "Electric Vehicle 1" },
      { url: "https://images.unsplash.com/photo-1620891549827-3f153a1a6672?q=80&w=1964", alt: "Electric Vehicle 2" },
      { url: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2069", alt: "Electric Vehicle 3" }
    ]
  },
  {
    id: "arch-1",
    category: "arch",
    title: "Modern Interior",
    images: [
      { url: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127", alt: "Modern Interior 1" },
      { url: "https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=2070", alt: "Modern Interior 2" },
      { url: "https://images.unsplash.com/photo-1616137122295-b2d1ccac5831?q=80&w=2070", alt: "Modern Interior 3" }
    ]
  },
  {
    id: "arch-2",
    category: "arch",
    title: "Urban Residential Tower",
    images: [
      { url: "https://images.unsplash.com/photo-1545169411-3d0aa77469c4?q=80&w=2070", alt: "Urban Residential Tower 1" },
      { url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070", alt: "Urban Residential Tower 2" },
      { url: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2020", alt: "Urban Residential Tower 3" }
    ]
  },
  {
    id: "arch-3",
    category: "arch",
    title: "Minimalist Home",
    images: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1974", alt: "Minimalist Home 1" },
      { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070", alt: "Minimalist Home 2" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070", alt: "Minimalist Home 3" }
    ]
  },
  {
    id: "vfx-1",
    category: "vfx",
    title: "Sci-Fi Environment",
    images: [
      { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070", alt: "Sci-Fi Environment 1" },
      { url: "https://images.unsplash.com/photo-1569503689347-a5cdc14e1aca?q=80&w=1974", alt: "Sci-Fi Environment 2" },
      { url: "https://images.unsplash.com/photo-1518782040528-93d439c2a71c?q=80&w=2070", alt: "Sci-Fi Environment 3" }
    ]
  },
  {
    id: "vfx-2",
    category: "vfx",
    title: "Particle Effects",
    images: [
      { url: "https://images.unsplash.com/photo-1612544409031-f59f5a20ecdd?q=80&w=2070", alt: "Particle Effects 1" },
      { url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070", alt: "Particle Effects 2" },
      { url: "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?q=80&w=2062", alt: "Particle Effects 3" }
    ]
  },
  {
    id: "vfx-3",
    category: "vfx",
    title: "Character Animation",
    images: [
      { url: "https://images.unsplash.com/photo-1633460447889-81163549d387?q=80&w=1974", alt: "Character Animation 1" },
      { url: "https://images.unsplash.com/photo-1558180577-0a4e35f4b28f?q=80&w=2070", alt: "Character Animation 2" },
      { url: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?q=80&w=2071", alt: "Character Animation 3" }
    ]
  },
  {
    id: "interactive-1",
    category: "interactive",
    title: "VR Experience",
    images: [
      { url: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070", alt: "VR Experience 1" },
      { url: "https://images.unsplash.com/photo-1622979135202-b61cd388e727?q=80&w=1932", alt: "VR Experience 2" },
      { url: "https://images.unsplash.com/photo-1596149615493-f0739de31c2d?q=80&w=1974", alt: "VR Experience 3" }
    ]
  },
  {
    id: "interactive-2",
    category: "interactive",
    title: "AR Product Viewer",
    images: [
      { url: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070", alt: "AR Product Viewer 1" },
      { url: "https://images.unsplash.com/photo-1621274147744-cfb5832943c7?q=80&w=2080", alt: "AR Product Viewer 2" },
      { url: "https://images.unsplash.com/photo-1622979136013-151f25df82dc?q=80&w=1932", alt: "AR Product Viewer 3" }
    ]
  },
  {
    id: "interactive-3",
    category: "interactive",
    title: "Interactive Installation",
    images: [
      { url: "https://images.unsplash.com/photo-1624969862293-b749659a91eb?q=80&w=2070", alt: "Interactive Installation 1" },
      { url: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=2070", alt: "Interactive Installation 2" },
      { url: "https://images.unsplash.com/photo-1624431776859-d7981e827bfa?q=80&w=2036", alt: "Interactive Installation 3" }
    ]
  }
];

type CategoryType = "all" | "product" | "arch" | "vfx" | "interactive";

const categories = [
  { id: "all", label: "All Works" },
  { id: "product", label: "Product Visualization" },
  { id: "arch", label: "Architectural Visualization" },
  { id: "vfx", label: "VFX & CGI" },
  { id: "interactive", label: "Interactive Experiences" }
];

const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useTheme();

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Auto-scroll images in viewer
  useEffect(() => {
    if (!selectedItem) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    
    return () => clearInterval(timer);
  }, [selectedItem, currentImageIndex]);

  const nextImage = () => {
    if (!selectedItem) return;
    setCurrentImageIndex(prev => 
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedItem) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };

  return (
    <section id="gallery" className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className={`inline-block px-3 py-1 text-xs font-medium tracking-wider ${theme === 'dark' ? 'glass' : 'bg-gray-100 border border-gray-200'} rounded-full mb-4`}>
            OUR PORTFOLIO
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient' : 'text-gray-800'}`}>
            Gallery
          </h2>
          <p className={theme === 'dark' ? 'text-white/70 max-w-2xl mx-auto mb-10' : 'text-gray-600 max-w-2xl mx-auto mb-10'}>
            Explore our diverse collection of work across different industries and mediums.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id 
                    ? theme === 'dark' 
                      ? "glass-dark font-medium" 
                      : "bg-gray-800 text-white font-medium"
                    : theme === 'dark'
                      ? "hover:bg-white/5"
                      : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category.id as CategoryType)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-${item.category}`}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer hover-lift"
              onClick={() => {
                setSelectedItem(item);
                setCurrentImageIndex(0);
              }}
            >
              <img 
                src={item.images[0].url} 
                alt={item.images[0].alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
              <div className={`absolute inset-0 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent' 
                  : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end`}>
                <div className="p-6 w-full">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/70 text-sm">
                    {categories.find(c => c.id === item.category)?.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen gallery viewer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-black/30"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-black/30"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="max-w-5xl max-h-[85vh] relative">
            <img 
              src={selectedItem.images[currentImageIndex].url} 
              alt={selectedItem.images[currentImageIndex].alt} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-in"
            />
            <div className="absolute left-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
              <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
              <p className="text-white/70">
                {categories.find(c => c.id === selectedItem.category)?.label}
              </p>
              <div className="flex mt-4 justify-center gap-2">
                {selectedItem.images.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/30'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
