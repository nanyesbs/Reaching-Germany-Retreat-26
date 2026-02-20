
import React from 'react';

interface HeaderProps {
  darkMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  return (
    <header className="relative w-full h-[40vh] flex flex-col items-center justify-center overflow-hidden bg-black dark:bg-white transition-colors duration-500">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40 grayscale"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={`absolute inset-0 z-10 bg-gradient-to-b from-transparent ${darkMode ? 'via-white/50 to-white' : 'via-black/50 to-black'}`} />

      {/* SVG Logo (Top Right) */}
      <div className="absolute top-8 right-8 z-20 hidden md:block">
        <img
          src={darkMode ? "/logo-dark.png" : "/logo-light.png"}
          alt="Leaders' Summit Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl flex flex-col items-center">
        <span className="text-[10px] md:text-xs tracking-[0.5em] font-light text-white/80 dark:text-black/80 uppercase mb-4 animate-fade-in">
          EUROPE SHALL BE SAVED
        </span>

        <h1 className="text-4xl md:text-7xl font-extrabold text-white dark:text-black uppercase leading-tight mb-6">
          LEADERS' <br />
          <span className="tracking-tighter">SUMMIT '26</span>
        </h1>

        <div className="w-24 h-[2px] bg-[#BB9446] mb-3" />

        <p className="text-sm md:text-lg font-normal text-white/90 dark:text-black/90 tracking-widest uppercase">
          27.01.26 – 28.01.26 | Stuttgart, DE
        </p>
      </div>
    </header>
  );
};

export default Header;
