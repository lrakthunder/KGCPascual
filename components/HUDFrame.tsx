
import React from 'react';

export const HUDFrame: React.FC<{ children: React.ReactNode, theme: 'dark' | 'light' }> = ({ children, theme }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className={`relative w-full h-full border-4 ${isDark ? 'border-cyan-500/30' : 'border-blue-600/30'} flex flex-col transition-colors duration-500 overflow-visible md:overflow-hidden bg-transparent`}>
      {/* Corner Brackets */}
      <div className={`absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 ${isDark ? 'border-cyan-400' : 'border-blue-600'}`}></div>
      <div className={`absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 ${isDark ? 'border-cyan-400' : 'border-blue-600'}`}></div>
      <div className={`absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 ${isDark ? 'border-cyan-400' : 'border-blue-600'}`}></div>
      <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 ${isDark ? 'border-cyan-400' : 'border-blue-600'}`}></div>
      
      <div className="flex-1 relative z-10 overflow-hidden flex flex-col pt-1 md:pt-3">
        {children}
      </div>

      {/* Decorative Side Elements */}
      <div className="absolute left-4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent hidden md:block"></div>
      <div className="absolute right-4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent hidden md:block"></div>
    </div>
  );
};
