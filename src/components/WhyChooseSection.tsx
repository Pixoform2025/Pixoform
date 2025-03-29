
import React, { useState, useEffect } from "react";
import { Cpu, Zap, RotateCw, CrownIcon, Timer } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  value: number;
  label: string;
  suffix: string;
  duration: number;
}

const features: Feature[] = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Industry Standard Technology",
    description: "Utilizing the latest in real-time rendering with Unreal Engine and Unity for exceptional quality.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Hyper-Realistic 3D & VFX Work",
    description: "Creating stunningly realistic visuals that blur the line between virtual and reality.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Interactive & Immersive Experiences",
    description: "Building engaging VR/AR applications that transform how users interact with content.",
  },
  {
    icon: <CrownIcon className="w-6 h-6" />,
    title: "End-to-End Production Support",
    description: "Offering comprehensive services from concept development to final delivery.",
  },
  {
    icon: <RotateCw className="w-6 h-6" />,
    title: "Seamless Workflow & Fast Delivery",
    description: "Streamlined processes that deliver exceptional results on time and within budget.",
  },
];

const stats: Stat[] = [
  { value: 20, label: "Projects Completed", suffix: "+", duration: 2000 },
  { value: 2, label: "Years of Experience", suffix: "+", duration: 1500 },
  { value: 5, label: "Clients Served", suffix: "+", duration: 1800 },
];

const WhyChooseSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("why-choose");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, index) => {
      const duration = stat.duration;
      const increment = stat.value / (duration / 16); // 60fps target
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 16);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  const bgColor = theme === 'dark' 
    ? 'bg-gradient-to-b from-black to-slate-900' 
    : 'bg-gradient-to-b from-white to-gray-100';
  
  const cardBg = theme === 'dark' 
    ? 'glass' 
    : 'bg-white shadow-md';
  
  const textColor = theme === 'dark' 
    ? 'text-white' 
    : 'text-gray-800';
  
  const mutedTextColor = theme === 'dark' 
    ? 'text-white/70' 
    : 'text-gray-600';
  
  const headingColor = theme === 'dark' 
    ? 'text-gradient' 
    : 'text-gray-800';
  
  const badgeBg = theme === 'dark' 
    ? 'glass' 
    : 'bg-gray-100 border border-gray-200';

  return (
    <section id="why-choose" className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className={`inline-block px-3 py-1 text-xs font-medium tracking-wider ${badgeBg} rounded-full mb-4`}>
            WHY CHOOSE US
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${headingColor}`}>
            What Makes Pixoform Unique
          </h2>
          <p className={`${mutedTextColor} max-w-2xl mx-auto`}>
            We combine technical expertise with creative vision to deliver exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`${cardBg} rounded-2xl p-8 text-center hover-lift`}
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${headingColor}`}>
                {isVisible ? counters[index] : 0}{stat.suffix}
              </div>
              <p className={mutedTextColor}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`${cardBg} rounded-2xl p-6 hover-lift transition-all duration-300`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'glass' : 'bg-gray-100'} mb-6`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>{feature.title}</h3>
              <p className={mutedTextColor}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
