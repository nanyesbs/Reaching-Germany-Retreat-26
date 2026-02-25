import React from 'react';
import { LayoutGrid, ShieldCheck, Moon, Sun, PlusCircle, Link as LinkIcon, Map as MapIcon } from 'lucide-react';
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

    const navItems = [
        { mode: 'directory' as ViewMode, label: t('nav.directory', 'Directory'), icon: LayoutGrid },
        { mode: 'map' as ViewMode, label: t('nav.map', 'Map'), icon: MapIcon },
        { mode: 'admin' as ViewMode, label: t('nav.admin', 'Admin'), icon: ShieldCheck, showAdminDot: true },
        { mode: 'registration' as ViewMode, label: t('nav.registration', 'New Bio'), icon: PlusCircle },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 dark:bg-white/90 backdrop-blur-xl border-b border-white/10 dark:border-black/5">

            {/* ── Row 1: Logo + Controls ── */}
            <div className="px-4 md:px-8 py-3 md:py-4 max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 md:h-10 w-auto shrink-0">
                        <img
                            src={darkMode ? "/logo-dark.png" : "/logo-light.png"}
                            alt="Reaching Germany Retreat 26 Logo"
                            className="h-full w-auto object-contain cursor-pointer"
                            onClick={() => setViewMode('directory')}
                        />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-avenir-bold text-white dark:text-black uppercase tracking-[0.2em] md:tracking-[0.3em] hidden sm:block">
                        {t('nav.tagline', 'Reaching Germany Retreat 26')}
                    </span>
                </div>

                {/* Desktop full nav */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex gap-6 items-center">
                        <LanguageSwitcher />
                        {navItems.map((item) => (
                            <button
                                key={item.mode}
                                onClick={() => setViewMode(item.mode)}
                                className={`text-[10px] font-avenir-bold uppercase flex items-center gap-2 transition-all ${viewMode === item.mode ? 'text-brand-heaven-gold' : 'text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black'
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
                    <button onClick={() => setDarkMode(!darkMode)} className="text-brand-heaven-gold hover:scale-110 active:scale-95 transition-all">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile right controls: language switcher + dark mode */}
                <div className="flex lg:hidden items-center gap-2">
                    <LanguageSwitcher />
                    <button onClick={() => setDarkMode(!darkMode)} className="text-brand-heaven-gold p-1.5">
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>

            {/* ── Row 2: Mobile Tab Bar (folder-style) ── */}
            <div className="lg:hidden border-t border-white/5 dark:border-black/5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                <div className="flex min-w-max px-2">
                    {navItems.map((item) => (
                        <button
                            key={item.mode}
                            onClick={() => setViewMode(item.mode)}
                            className={`relative flex flex-col items-center gap-1 px-5 py-2 text-[8px] font-avenir-bold uppercase tracking-wider transition-all ${viewMode === item.mode
                                    ? 'text-brand-heaven-gold'
                                    : 'text-white/40 dark:text-black/35'
                                }`}
                        >
                            <item.icon size={15} />
                            <span>{item.label}</span>
                            {viewMode === item.mode && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-brand-heaven-gold rounded-full" />
                            )}
                            {item.showAdminDot && isAdminAuthorized && (
                                <span className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-green-500" />
                            )}
                        </button>
                    ))}
                    <a
                        href="https://linktr.ee/esbs_leaders_summit_26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 px-5 py-2 text-[8px] font-avenir-bold uppercase tracking-wider text-white/40 dark:text-black/35"
                    >
                        <LinkIcon size={15} />
                        <span>Links</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
