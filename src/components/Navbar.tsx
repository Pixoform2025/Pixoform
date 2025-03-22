import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navHeight, setNavHeight] = useState(80);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      const dropdownHeight = dropdownRef.current.offsetHeight;
      setNavHeight(expanded ? 80 + dropdownHeight : 80);
    }
  }, [expanded, activeDropdown]);

  const handleToggleDropdown = (title: string | null) => {
    setActiveDropdown(title);
    setExpanded(!!title);

    if (navRef.current && dropdownRef.current) {
      const dropdownHeight = dropdownRef.current.offsetHeight;
      navRef.current.style.height = `${80 + dropdownHeight}px`;
    }
  };

  const handleNavLeave = (e: React.MouseEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node)) {
      setExpanded(false);
      setActiveDropdown(null);
      if (navRef.current) {
        navRef.current.style.height = "80px";
      }
    }
  };

  const handleItemClick = (path: string) => {
    document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
    setExpanded(false);
    setActiveDropdown(null);
    if (navRef.current) {
      navRef.current.style.height = "80px";
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        expanded
          ? "bg-white/80 dark:bg-black/90 backdrop-blur-lg"
          : scrollPosition > 50
          ? "h-16 bg-white/60 dark:bg-black/80 backdrop-blur-md"
          : "h-20 bg-white/60 dark:bg-black/80 backdrop-blur-lg"
      }`}
      onMouseLeave={handleNavLeave}
      style={{ height: `${navHeight}px`, transition: "height 0.3s ease-in-out" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl md:text-3xl font-extrabold tracking-tighter text-gradient animate-pulse-slow">
            Pixoform
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.title}
                className="relative group"
                onMouseEnter={() => {
                  if (link.dropdown) {
                    handleToggleDropdown(link.title);
                  } else {
                    setExpanded(false);
                    setActiveDropdown(null);
                  }
                }}
              >
                <div className="flex items-center space-x-1">
                  <a
                    href={link.path}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      link.title === "Contact Us" ? "px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" : "hover:text-black dark:hover:text-white/80"
                    }`}
                    onClick={() => {
                      handleItemClick(link.path);
                      setExpanded(false);
                      setActiveDropdown(null);
                    }}
                  >
                    {link.title}
                  </a>
                  {link.dropdown && (
                    <button>
                      <ChevronDown className="h-4 w-4 text-black dark:text-white/80" />
                    </button>
                  )}
                </div>

                {link.dropdown && activeDropdown === link.title && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl transition-all duration-300 ease-in-out origin-top-right"
                  >
                    <div className="absolute inset-0 rounded-xl backdrop-blur-lg border border-white/20 bg-white/80 dark:bg-black/80"></div>

                    <div className="relative z-10 bg-white/90 dark:bg-black/90 text-black dark:text-white rounded-xl">
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.title}
                            href={item.path}
                            className="block px-6 py-3 text-sm hover:bg-white/10 transition-colors duration-200"
                            onClick={() => handleItemClick(item.path)}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
