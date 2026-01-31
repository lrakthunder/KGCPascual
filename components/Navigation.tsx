
import React from 'react';
import { Section } from '../types';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  theme: 'dark' | 'light';
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection, theme }) => {
  const isDark = theme === 'dark';
  const navItems: { id: Section, label: string }[] = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'background', label: 'BACKGROUND' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollToSection = (sectionId: Section) => {
    const element = document.getElementById(sectionId);
    const scrollContainer = document.getElementById('scroll-container');
    
    if (element && scrollContainer) {
      const offsetTop = element.offsetTop - 120; // Offset to account for header
      scrollContainer.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };

  return (
    <nav className="flex justify-center items-center py-6 px-4 gap-2 md:gap-8 border-b border-cyan-500/20 backdrop-blur-md">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`relative px-4 py-2 font-orbitron text-xs md:text-sm tracking-widest transition-all duration-300 group
            ${activeSection === item.id 
              ? (isDark ? 'text-cyan-300' : 'text-blue-600') 
              : (isDark ? 'text-cyan-700 hover:text-cyan-400' : 'text-blue-400 hover:text-blue-700')}
          `}
        >
          {item.label}
          <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></div>
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-cyan-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      ))}
    </nav>
  );
};
