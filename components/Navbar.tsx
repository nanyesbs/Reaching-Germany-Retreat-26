import React, { useState } from 'react';
import { LayoutGrid, ShieldCheck, Moon, Sun, PlusCircle, Link as LinkIcon, Map as MapIcon, Menu, X } from 'lucide-react';
import { ViewMode } from '../types';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
    isAdminAuthorized: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
    viewMode,
    setViewMode,
    darkMode,
    setDarkMode,
    isAdminAuthorized
}) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { mode: 'directory' as ViewMode, label: t('nav.directory', 'Directory'), icon: LayoutGrid },
        { mode: 'map' as ViewMode, label: t('nav.map', 'Map'), icon: MapIcon },
        { mode: 'admin' as ViewMode, label: t('nav.admin', 'Admin'), icon: ShieldCheck, showAdminDot: true },
        { mode: 'registration' as ViewMode, label: t('nav.registration', 'New Bio'), icon: PlusCircle, isButton: true },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleNavClick = (mode: ViewMode) => {
        setViewMode(mode);
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 dark:bg-white/80 backdrop-blur-xl border-b border-white/10 dark:border-black/5 px-4 md:px-8 py-3 md:py-4">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="h-8 md:h-10 w-auto shrink-0">
                        <img
                            src={darkMode ? "/logo-dark.png" : "/logo-light.png"}
                            alt="Reaching Germany Retreat 26 Logo"
                            className="h-full w-auto object-contain cursor-pointer"
                            onClick={() => handleNavClick('directory')}
                        />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-avenir-bold text-white dark:text-black uppercase tracking-[0.2em] md:tracking-[0.3em] hidden sm:line-clamp-1">
                        {t('nav.tagline', 'Reaching Germany Retreat 26')}
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex gap-6 items-center">
                        <LanguageSwitcher />
                        {navItems.map((item) => (
                            <button
                                key={item.mode}
                                onClick={() => setViewMode(item.mode)}
                                className={`text-[10px] font-avenir-bold uppercase flex items-center gap-2 transition-all ${item.isButton
                                    ? `px-4 py-1.5 rounded-button border ${viewMode === item.mode ? 'bg-brand-heaven-gold border-brand-heaven-gold text-white shadow-glow-sm' : 'border-white/10 dark:border-black/10 text-brand-heaven-gold hover:bg-brand-heaven-gold/10'}`
                                    : viewMode === item.mode ? 'text-brand-heaven-gold' : 'text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black'
                                    }`}
                            >
                                <item.icon size={14} /> {item.label}
                                {item.showAdminDot && isAdminAuthorized && <span className="w-1 h-1 rounded-full bg-green-500" />}
                            </button>
                        ))}
                        <a
                            href="https://linktr.ee/esbs_leaders_summit_26"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-avenir-bold uppercase flex items-center gap-2 px-4 py-1.5 rounded-button border border-white/10 dark:border-black/10 text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black hover:border-white/20 dark:hover:border-black/20 transition-all"
                        >
                            <LinkIcon size={14} /> Linktree
                        </a>
                    </div>

                    <div className="w-[1px] h-4 bg-white/10 dark:bg-black/10 mx-2" />

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-brand-heaven-gold hover:scale-110 active:scale-95 transition-all"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="flex lg:hidden items-center gap-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-brand-heaven-gold p-2"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={toggleMenu}
                        className="text-white dark:text-black p-2"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Slide-Down Bar */}
            <div className={`fixed inset-x-0 top-[56px] md:top-[72px] bottom-0 z-[90] bg-black/95 dark:bg-white/95 backdrop-blur-2xl transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="flex flex-col p-8 gap-6 h-full overflow-y-auto">
                    <div className="pb-6 border-b border-white/10 dark:border-black/5">
                        <LanguageSwitcher />
                    </div>
                    {navItems.map((item) => (
                        <button
                            key={item.mode}
                            onClick={() => handleNavClick(item.mode)}
                            className={`w-full py-4 text-sm font-avenir-bold uppercase flex items-center justify-between transition-all ${viewMode === item.mode ? 'text-brand-heaven-gold' : 'text-white/60 dark:text-black/60'
                                }`}
                        >
                            <span className="flex items-center gap-4">
                                <item.icon size={20} />
                                {item.label}
                            </span>
                            {item.showAdminDot && isAdminAuthorized && <span className="w-2 h-2 rounded-full bg-green-500 shadow-glow" />}
                            {viewMode === item.mode && <ChevronRight size={16} className="text-brand-heaven-gold" />}
                        </button>
                    ))}
                    <a
                        href="https://linktr.ee/esbs_leaders_summit_26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 text-sm font-avenir-bold uppercase flex items-center gap-4 text-white/60 dark:text-black/60"
                    >
                        <LinkIcon size={20} />
                        Linktree
                    </a>

                    <div className="mt-auto pt-10 text-center">
                        <p className="text-[10px] font-avenir-bold text-brand-heaven-gold uppercase tracking-[0.3em] opacity-40">
                            Reaching Germany Retreat 26
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Simple icon for mobile menu indicators
const ChevronRight = ({ size, className }: { size: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export default Navbar;
