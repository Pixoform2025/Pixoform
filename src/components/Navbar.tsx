
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  title: string;
  path: string;
  dropdown?: { title: string; path: string }[];
}

const navLinks: NavLink[] = [
  { title: "Home", path: "#home" },
  {
    title: "Gallery",
    path: "#gallery",
    dropdown: [
      { title: "Product Viz", path: "#gallery-product" },
      { title: "Arch Viz", path: "#gallery-arch" },
      { title: "VFX", path: "#gallery-vfx" },
      { title: "Interactive Experiences", path: "#gallery-interactive" },
    ],
  },
  {
    title: "Services",
    path: "#services",
    dropdown: [
      { title: "3D Product Animation", path: "#service-product" },
      { title: "Architectural Visualization", path: "#service-arch" },
      { title: "VFX & CGI", path: "#service-vfx" },
      { title: "VR/AR Development", path: "#service-vr" },
      { title: "Interactive Media", path: "#service-interactive" },
      { title: "Motion Graphics & UI Animation", path: "#service-motion" },
      { title: "Cinematic Trailers", path: "#service-cinematic" },
      { title: "3D Concept & Character Design", path: "#service-concept" },
      { title: "Advertisement & Branding Videos", path: "#service-ad" },
    ],
  },
  { title: "Contact Us", path: "#contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as Element).closest(".dropdown-container")) {
      closeDropdowns();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrollPosition > 50
          ? "bg-black/70 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            className="text-2xl md:text-3xl font-extrabold tracking-tighter text-gradient animate-pulse-slow"
          >
            Pixoform
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.title} className="dropdown-container relative group">
                <div className="flex items-center space-x-1">
                  <a
                    href={link.path}
                    className={`text-sm font-medium transition-colors duration-300 animated-underline ${
                      link.title === "Contact Us"
                        ? "px-4 py-2 rounded-full glass hover:glass-dark"
                        : "hover:text-white/80"
                    }`}
                    onClick={() => link.dropdown && handleToggleDropdown(link.title)}
                  >
                    {link.title}
                  </a>
                  {link.dropdown && (
                    <button 
                      onClick={() => handleToggleDropdown(link.title)}
                      className="text-white/80 hover:text-white"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {link.dropdown && activeDropdown === link.title && (
                  <div className="absolute right-0 mt-2 glass-dark rounded-xl overflow-hidden w-64 shadow-xl animate-scale-in origin-top-right">
                    <div className="py-2">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.title}
                          href={item.path}
                          className="block px-6 py-3 text-sm hover:bg-white/5 transition-colors duration-200"
                          onClick={closeDropdowns}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="md:hidden text-white hover:text-white/80"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 space-y-8 h-full">
          {navLinks.map((link) => (
            <div key={link.title} className="space-y-4">
              <a
                href={link.path}
                className="text-xl font-medium"
                onClick={() => {
                  !link.dropdown && setIsOpen(false);
                  link.dropdown && handleToggleDropdown(link.title);
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{link.title}</span>
                  {link.dropdown && (
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${
                      activeDropdown === link.title ? "rotate-180" : ""
                    }`} />
                  )}
                </div>
              </a>

              {link.dropdown && activeDropdown === link.title && (
                <div className="pl-4 space-y-3 animate-fade-in">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.title}
                      href={item.path}
                      className="block text-base text-white/80 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
