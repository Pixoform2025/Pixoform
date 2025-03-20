
import React from "react";
import { Instagram, Twitter, Facebook, Linkedin, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <a href="#home" className="text-2xl font-bold tracking-tighter text-gradient">
              Pixoform
            </a>
            <p className="text-white/60 mt-4 max-w-md">
              Crafting immersive visual experiences through cutting-edge 3D, VFX, and interactive media solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-dark transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-dark transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-dark transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-dark transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/60 hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-white/60 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#clients" className="text-white/60 hover:text-white transition-colors">Clients</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2">
              <li><a href="#service-product" className="text-white/60 hover:text-white transition-colors">3D Product Animation</a></li>
              <li><a href="#service-arch" className="text-white/60 hover:text-white transition-colors">Architectural Visualization</a></li>
              <li><a href="#service-vfx" className="text-white/60 hover:text-white transition-colors">VFX & CGI</a></li>
              <li><a href="#service-vr" className="text-white/60 hover:text-white transition-colors">VR/AR Development</a></li>
              <li><a href="#service-interactive" className="text-white/60 hover:text-white transition-colors">Interactive Media</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/60">
                <a href="mailto:pixoform@gmail.com" className="hover:text-white transition-colors">
                  pixoform@gmail.com
                </a>
              </li>
              <li className="text-white/60">
                <a href="tel:+917045131964" className="hover:text-white transition-colors">
                  +91 7045131964
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Pixoform. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 glass p-3 rounded-full hover:glass-dark transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
