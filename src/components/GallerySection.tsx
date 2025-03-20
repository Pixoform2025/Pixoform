
import React, { useState } from "react";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "product-1",
    category: "product",
    title: "Premium Headphones",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2070"
  },
  {
    id: "product-2",
    category: "product",
    title: "Smartwatch Series",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964"
  },
  {
    id: "product-3",
    category: "product",
    title: "Electric Vehicle",
    image: "https://images.unsplash.com/photo-1556800572-1b8aedf82b5b?q=80&w=2070"
  },
  {
    id: "arch-1",
    category: "arch",
    title: "Modern Interior",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127"
  },
  {
    id: "arch-2",
    category: "arch",
    title: "Urban Residential Tower",
    image: "https://images.unsplash.com/photo-1545169411-3d0aa77469c4?q=80&w=2070"
  },
  {
    id: "arch-3",
    category: "arch",
    title: "Minimalist Home",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1974"
  },
  {
    id: "vfx-1",
    category: "vfx",
    title: "Sci-Fi Environment",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070"
  },
  {
    id: "vfx-2",
    category: "vfx",
    title: "Particle Effects",
    image: "https://images.unsplash.com/photo-1612544409031-f59f5a20ecdd?q=80&w=2070"
  },
  {
    id: "vfx-3",
    category: "vfx",
    title: "Character Animation",
    image: "https://images.unsplash.com/photo-1633460447889-81163549d387?q=80&w=1974"
  },
  {
    id: "interactive-1",
    category: "interactive",
    title: "VR Experience",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070"
  },
  {
    id: "interactive-2",
    category: "interactive",
    title: "AR Product Viewer",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070"
  },
  {
    id: "interactive-3",
    category: "interactive",
    title: "Interactive Installation",
    image: "https://images.unsplash.com/photo-1624969862293-b749659a91eb?q=80&w=2070"
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

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider glass rounded-full mb-4">
            OUR PORTFOLIO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Gallery
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10">
            Explore our diverse collection of work across different industries and mediums.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id 
                    ? "glass-dark font-medium" 
                    : "hover:bg-white/5"
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
              onClick={() => setSelectedItem(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-xl font-bold">{item.title}</h3>
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
          
          <div className="max-w-5xl max-h-[85vh] relative">
            <img 
              src={selectedItem.image} 
              alt={selectedItem.title} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-in"
            />
            <div className="absolute left-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
              <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
              <p className="text-white/70">
                {categories.find(c => c.id === selectedItem.category)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
