
import React, { useState, useEffect } from 'react';
import { HUDFrame } from './components/HUDFrame';
import { Navigation } from './components/Navigation';
import { Section, Project, JourneyItem, Skill } from './types';
import { ProjectCard } from './components/ProjectCard';
import { JourneyItemComponent } from './components/ExperienceItem';
import { JarvisChat } from './components/JarvisChat';
import { ContactModal } from './components/ContactModal';
import { PROJECTS, JOURNEY, SKILLS, USER_BIO } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [systemLoading, setSystemLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSystemLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'projects', 'journey', 'background', 'contact'] as Section[];
      const scrollContainer = document.getElementById('scroll-container');
      
      if (!scrollContainer) return;
      
      const scrollPosition = scrollContainer.scrollTop + 120; // offset to match scroll-to positioning
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const scrollContainer = document.getElementById('scroll-container');
    scrollContainer?.addEventListener('scroll', handleScroll);
    
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (systemLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-orbitron text-cyan-500">
        <div className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <div className="text-xl tracking-[0.5em] animate-pulse">INITIALIZING JARVIX...</div>
        <div className="mt-4 text-[10px] text-cyan-800 font-mono">CALIBRATING HUD • LOADING CORE MODULES • SECURITY BYPASS ACTIVE</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-[#050b14] text-cyan-100' : 'bg-gray-100 text-gray-900'} p-4 md:p-8 flex items-center justify-center overflow-hidden`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 hologram-grid opacity-20 pointer-events-none"></div>
      <div className="scanline"></div>

      <div className="w-full h-[90vh] relative z-20 pr-24">
        <HUDFrame theme={theme}>
          {/* Header Area */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 pt-4 border-b border-cyan-500/10">
            <div className="flex flex-col items-start mb-4 md:mb-0">
              <h1 className={`text-2xl md:text-3xl font-orbitron font-black tracking-tighter ${theme === 'dark' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-blue-700'}`}>
                KARL PASCUAL <span className="text-xs font-light text-cyan-600/50">v4.0.2</span>
              </h1>
              <span className="text-[10px] font-mono opacity-50">LOCATION: 7.097370° N, 124.867085° W</span>
            </div>

            <Navigation activeSection={activeSection} setActiveSection={setActiveSection} theme={theme} />

            <div className="flex items-center gap-4 py-4 md:py-0">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-700'}`}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 6.364l.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Main Content Scroll Area */}
          <div id="scroll-container" className="flex-1 overflow-y-auto px-6 md:px-12 py-8 custom-scrollbar scroll-smooth">
            {/* Overview Section */}
            <section id="overview" className="min-h-screen pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-[fadeIn_0.5s_ease-out]">
                <div className="lg:col-span-2 space-y-8">
                  <div className={`p-8 border-l-4 ${theme === 'dark' ? 'border-cyan-500 bg-cyan-950/20' : 'border-blue-600 bg-blue-50'} relative overflow-hidden`}>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-4 leading-tight">
                      BUILDING THE <br/>
                      <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-700'}`}>DIGITAL FRONTIER</span>
                    </h2>
                    <p className={`text-lg md:text-xl font-light max-w-2xl leading-relaxed text-justify ${theme === 'dark' ? 'text-cyan-100/80' : 'text-gray-700'}`}>
                      {USER_BIO}
                    </p>
                    {/* Background visual element */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                       <svg viewBox="0 0 100 100" className="w-full h-full fill-current"><path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"/></svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-900/10' : 'border-blue-200 bg-white'} rounded`}>
                       <span className="text-[10px] font-orbitron block mb-2 opacity-60">CORE CAPABILITIES</span>
                       <ul className="space-y-2 text-sm font-mono">
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-400"></div> Full-Stack Web Development</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-400"></div> Database Design & Optimization</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-400"></div> UI/UX Implementation</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-400"></div> Application Performance Tuning</li>
                       </ul>
                    </div>
                    <div className={`p-4 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-900/10' : 'border-blue-200 bg-white'} rounded`}>
                       <span className="text-[10px] font-orbitron block mb-2 opacity-60">SYSTEM TELEMETRY</span>
                       <div className="space-y-4">
                         {SKILLS.slice(0, 4).map(skill => (
                           <div key={skill.name}>
                             <div className="flex justify-between text-[10px] mb-1 font-mono uppercase">
                               <span>{skill.name}</span>
                               <span>{skill.level}%</span>
                             </div>
                             <div className="h-1 bg-cyan-950 rounded-full overflow-hidden">
                               <div className="h-full bg-cyan-400 glow-pulse" style={{ width: `${skill.level}%` }}></div>
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1 h-[500px] lg:h-auto">
                   <JarvisChat isDark={theme === 'dark'} />
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-screen pb-16">
              <h2 className={`text-3xl font-orbitron font-black mb-8 tracking-wide ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-700'}`}>
                PROJECTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
                {PROJECTS.map(p => (
                  <ProjectCard key={p.id} project={p} isDark={theme === 'dark'} />
                ))}
              </div>
            </section>

            {/* Journey Section */}
            <section id="journey" className="min-h-screen pb-16">
              <h2 className={`text-3xl font-orbitron font-black mb-8 tracking-wide ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-700'}`}>
                JOURNEY
              </h2>
              <div className="max-w-4xl mx-auto space-y-12 animate-[fadeIn_0.5s_ease-out]">
                {JOURNEY.map(item => (
                  <JourneyItemComponent key={item.id} item={item} isDark={theme === 'dark'} />
                ))}
              </div>
            </section>

            {/* Background Section */}
            <section id="background" className="min-h-screen pb-16">
              <h2 className={`text-3xl font-orbitron font-black mb-8 tracking-wide ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-700'}`}>
                BACKGROUND
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="space-y-8">
                  <h3 className="text-xl font-orbitron font-bold border-b border-cyan-500/30 pb-2">TECHNICAL SKILLS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {['CORE', 'FRONTEND', 'BACKEND', 'TOOLS'].map(cat => (
                      <div key={cat}>
                        <h4 className="text-[10px] font-orbitron mb-4 text-cyan-500 opacity-60 tracking-widest">{cat}</h4>
                        <div className="space-y-4">
                          {SKILLS.filter(s => s.category === cat).map(skill => (
                            <div key={skill.name}>
                              <div className="flex justify-between text-[10px] mb-1 font-mono">
                                <span>{skill.name}</span>
                                <span>{skill.level}%</span>
                              </div>
                              <div className={`h-1 ${theme === 'dark' ? 'bg-cyan-950' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                                <div className="h-full bg-cyan-400" style={{ width: `${skill.level}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <h3 className="text-xl font-orbitron font-bold border-b border-cyan-500/30 pb-2">EDUCATIONAL BACKGROUND</h3>
                  <div className={`p-6 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-950/20' : 'border-blue-200 bg-white'}`}>
                    <h4 className="text-lg font-orbitron text-cyan-400 mb-1">B.S. COMPUTER SCIENCE</h4>
                    <p className="text-xs font-mono opacity-60 mb-1">UNIVERSITY OF SOUTHERN MINDANAO • 2013-2018</p>
                    <p className="text-xs font-mono opacity-60 mb-6">Kabacan, North Cotabato, Philippines</p>
                    <h4 className="text-lg font-orbitron text-cyan-400 mb-1">PRIMARY AND SECONDARY EDUCATION</h4>
                    <p className="text-xs font-mono opacity-60 mb-1">NOTRE DAME OF KABACAN • 2003-2013</p>
                    <p className="text-xs font-mono opacity-60">Kabacan, North Cotabato, Philippines</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen pb-16">
              <h2 className={`text-3xl font-orbitron font-black mb-8 tracking-wide ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-700'}`}>
                CONTACT
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out] max-w-5xl mx-auto">
                {/* Email Card */}
                <div className={`group relative p-6 border ${theme === 'dark' ? 'border-cyan-500/20 hover:border-cyan-400 bg-cyan-900/10' : 'border-blue-500/20 hover:border-blue-500 bg-blue-50'} transition-all duration-300 overflow-hidden`}>
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-500/20 text-[8px] font-mono tracking-tighter text-cyan-400">
                    ID: 0001
                  </div>
                  
                  <h3 className={`text-lg font-orbitron font-bold mb-2 tracking-wide ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>
                    Email or Phone
                  </h3>
                  
                  <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>
                    Let's discuss your project. Feel free to reach out via email or click the button on the lower right to send a message.
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-cyan-500/10">
                    <span className={`text-xs font-mono ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      karlgilbertpascual@gmail.com 
                    </span>
                    <span className={`text-xs font-mono ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      +63 975 7522 026
                    </span>
                  </div>

                  {/* Decorative Scanning Line for hover */}
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="h-px w-full bg-cyan-400/50 absolute top-0 animate-[scanline_4s_linear_infinite]"></div>
                  </div>
                </div>

                {/* Location Card */}
                <div className={`group relative p-6 border ${theme === 'dark' ? 'border-cyan-500/20 hover:border-cyan-400 bg-cyan-900/10' : 'border-blue-500/20 hover:border-blue-500 bg-blue-50'} transition-all duration-300 overflow-hidden`}>
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-500/20 text-[8px] font-mono tracking-tighter text-cyan-400">
                    ID: 0002
                  </div>
                  
                  <h3 className={`text-lg font-orbitron font-bold mb-2 tracking-wide ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>
                    Location
                  </h3>
                  
                  <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>
                    Based in Philippines
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-cyan-500/10">
                    <span className={`text-xs font-mono ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      Available for remote work
                    </span>
                  </div>

                  {/* Decorative Scanning Line for hover */}
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="h-px w-full bg-cyan-400/50 absolute top-0 animate-[scanline_4s_linear_infinite]"></div>
                  </div>
                </div>

                {/* Availability Card */}
                <div className={`group relative p-6 border ${theme === 'dark' ? 'border-cyan-500/20 hover:border-cyan-400 bg-cyan-900/10' : 'border-blue-500/20 hover:border-blue-500 bg-blue-50'} transition-all duration-300 overflow-hidden`}>
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-500/20 text-[8px] font-mono tracking-tighter text-cyan-400">
                    ID: 0003
                  </div>
                  
                  <h3 className={`text-lg font-orbitron font-bold mb-2 tracking-wide ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>
                    Availability
                  </h3>
                  
                  <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>
                    Currently Available. Ready for new projects.
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-cyan-500/10">
                    <span className={`text-xs font-mono ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      Open to opportunities
                    </span>
                  </div>

                  {/* Decorative Scanning Line for hover */}
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="h-px w-full bg-cyan-400/50 absolute top-0 animate-[scanline_4s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <h3 className={`text-xl font-orbitron font-bold mb-4 tracking-wide ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>
                Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-900/10' : 'border-blue-200 bg-white'} text-center`}>
                  {/* <div className="text-xl">✨</div> */}
                  <div className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>6</div>
                  <div className={`text-xs font-mono uppercase ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>Years Experience</div>
                </div>
                <div className={`p-4 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-900/10' : 'border-blue-200 bg-white'} text-center`}>
                  {/* <div className="text-xl">💫</div> */}
                  <div className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>12+</div>
                  <div className={`text-xs font-mono uppercase ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>Projects Completed</div>
                </div>
                <div className={`p-4 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-900/10' : 'border-blue-200 bg-white'} text-center`}>
                  {/* <div className="text-xl">⭐</div> */}
                  <div className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>15+</div>
                  <div className={`text-xs font-mono uppercase ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>Technologies</div>
                </div>
                <div className={`p-4 border ${theme === 'dark' ? 'border-cyan-500/20 bg-cyan-900/10' : 'border-blue-200 bg-white'} text-center`}>
                  {/* <div className="text-xl">❄️</div> */}
                  <div className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-800'}`}>100%</div>
                  <div className={`text-xs font-mono uppercase ${theme === 'dark' ? 'text-cyan-100/70' : 'text-gray-600'}`}>Client Satisfaction</div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Bar */}
          <div className="flex justify-between items-center px-6 py-2 border-t border-cyan-500/10 text-[10px] font-mono tracking-widest opacity-40">
            <span>© 2026 KARL GILBERT PASCUAL</span>
            <div className="flex gap-4">
              <span className="animate-pulse">THUNDER_NET CONNECTED</span>
            </div>
          </div>
        </HUDFrame>
      </div>

      {/* Floating Comms Button */}
      <button 
        onClick={() => setIsContactOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform group"
      >
        <svg className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></div>
      </button>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} isDark={theme === 'dark'} />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .clip-path-polygon-[0%_0%,100%_0%,90%_100%,10%_100%] {
          clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
        }
      `}</style>
    </div>
  );
};

export default App;
