
import React from 'react';

interface HeaderProps {
  darkMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  return (
    <header className="relative w-full h-[35vh] md:h-[40vh] flex flex-col items-center justify-center overflow-hidden bg-black dark:bg-white transition-colors duration-500 pt-10 md:pt-0">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: 'url("/header-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={`absolute inset-0 z-10 bg-gradient-to-b from-transparent ${darkMode ? 'via-white/70 to-white' : 'via-black/70 to-black'}`} />

      {/* SVG Logo (Top Right) */}
      <div className="absolute top-8 right-8 z-20 hidden lg:block">
        <img
          src={darkMode ? "/logo-dark.png" : "/logo-light.png"}
          alt="Reaching Germany Retreat 26 Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl flex flex-col items-center">
        <span className="text-[9px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] font-light text-white/80 dark:text-black/80 uppercase mb-3 md:mb-4 animate-fade-in">
          EUROPE SHALL BE SAVED
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-7xl font-extrabold text-white dark:text-black uppercase leading-tight mb-4 md:mb-6">
          REACHING <br />
          <span className="tracking-tighter">GERMANY RETREAT 26</span>
        </h1>

        <div className="w-16 md:w-24 h-[1px] md:h-[2px] bg-[#BB9446] mb-3" />

        <p className="text-[10px] md:text-lg font-normal text-white/90 dark:text-black/90 tracking-[0.2em] md:tracking-widest uppercase">
          24.02.26 – 26.02.26
        </p>
      </div>
    </header>
  );
};

export default Header;
