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
    title: "Clients",
    path: "#clients",
  },
  {
    title: "Services",
    path: "#service",
    dropdown: [
      { title: "3D Product Animation", path: "#service" },
      { title: "Architectural Visualization", path: "#service" },
      { title: "VFX & CGI", path: "#service" },
      { title: "VR/AR Development", path: "#service" },
      { title: "Interactive Media", path: "#service" },
      { title: "Motion Graphics & UI Animation", path: "#service" },
      { title: "Cinematic Trailers", path: "#service" },
      { title: "3D Concept & Character Design", path: "#service" },
      { title: "Advertisement & Branding Videos", path: "#service" },
    ],
  },
  { title: "Contact Us", path: "#contact" },
];

const Navbar: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Adjust navbar height dynamically
  useEffect(() => {
    if (navRef.current && dropdownRef.current) {
      const dropdownHeight = dropdownRef.current.offsetHeight || 0;
      navRef.current.style.height = expanded ? `${80 + dropdownHeight}px` : "80px";
    }
  }, [expanded, activeDropdown]);

  const handleToggleDropdown = (title: string | null) => {
    setActiveDropdown(title);
    setExpanded(!!title);
  };

  // 🔹 Shrink navbar when moving to a non-dropdown item
  const handleNavItemHover = (link: NavLink) => {
    if (!link.dropdown) {
      setExpanded(false);
      setActiveDropdown(null);
      if (navRef.current) navRef.current.style.height = "80px";
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-150 ease-in-out ${
        expanded
          ? "bg-white/80 dark:bg-black/90 backdrop-blur-lg"
          : scrollPosition > 50
          ? "h-16 bg-white/60 dark:bg-black/80 backdrop-blur-md"
          : "h-20 bg-white/60 dark:bg-black/80 backdrop-blur-lg"
      }`}
      onMouseLeave={() => {
        setExpanded(false);
        setActiveDropdown(null);
        if (navRef.current) navRef.current.style.height = "80px";
      }}
      style={{ height: expanded ? "auto" : "80px", transition: "height 0.15s ease-in-out" }}
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
                onMouseEnter={() => handleToggleDropdown(link.dropdown ? link.title : null)}
                onMouseLeave={() => handleNavItemHover(link)}
              >
                <div className="flex items-center space-x-1 cursor-pointer relative">
                  <a
                    href={link.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      link.title === "Contact Us"
                        ? "px-4 py-2 rounded-full bg-white/10 hover:bg-white/20"
                        : "hover:text-black dark:hover:text-white/80"
                    }`}
                  >
                    {link.title}
                  </a>
                  {link.dropdown && <ChevronDown className="h-4 w-4 text-black dark:text-white/80" />}
                </div>

                {link.dropdown && activeDropdown === link.title && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-xl shadow-xl transition-opacity duration-150 ease-in-out opacity-100"
                  >
                    <div className="absolute inset-0 rounded-xl backdrop-blur-lg border border-white/20 bg-white/80 dark:bg-black/80"></div>
                    <div className="relative z-10 bg-white/90 dark:bg-black/90 text-black dark:text-white rounded-xl">
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <a key={item.title} href={item.path} className="block px-6 py-3 text-sm hover:bg-white/10">
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
