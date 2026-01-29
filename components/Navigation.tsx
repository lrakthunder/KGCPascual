
import React from 'react';
import { Section } from '../types';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  theme: 'dark' | 'light';
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection, theme }) => {
  const isDark = theme === 'dark';
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
    <nav className="flex justify-between items-center py-3 lg:py-6 px-2 lg:px-4 border-b border-cyan-500/20 backdrop-blur-md">
      {/* Desktop nav (show on large screens only) */}
      <div className="hidden lg:flex justify-center items-center gap-2 lg:gap-8 w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { scrollToSection(item.id); }}
            className={`relative inline-block px-4 py-2 font-orbitron text-xs md:text-sm tracking-widest transition-all duration-300 group whitespace-nowrap
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
      </div>

      {/* Mobile / tablet burger (show below large screens) */}
      <div className="lg:hidden flex items-center">
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(prev => !prev)}
          className={`p-2 rounded-md border ${isDark ? 'border-cyan-600 text-cyan-300' : 'border-blue-200 text-blue-700'}`}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex">
          <div className={`ml-auto w-64 max-w-full h-full p-6 overflow-y-auto ${isDark ? 'bg-[#04121a] text-cyan-100' : 'bg-white text-blue-900'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className={`text-sm font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>MENU</div>
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { scrollToSection(item.id); setMobileOpen(false); }}
                  className={`text-left px-2 py-3 font-orbitron tracking-widest text-sm ${activeSection === item.id ? 'font-bold' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
