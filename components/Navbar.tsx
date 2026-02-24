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

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 dark:bg-white/80 backdrop-blur-xl border-b border-white/10 dark:border-black/5 px-4 md:px-8 py-4">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-auto">
                        <img
                            src={darkMode ? "/logo-dark.png" : "/logo-light.png"}
                            alt="Reaching Germany Retreat 26 Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                    <span className="text-[10px] font-avenir-bold text-white dark:text-black uppercase tracking-[0.3em] hidden sm:block">
                        {t('nav.tagline', 'Reaching Germany Retreat 26')}
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex gap-6">
                        <div className="hidden sm:block">
                            <LanguageSwitcher />
                        </div>
                        <button
                            onClick={() => setViewMode('directory')}
                            className={`text-[10px] font-avenir-bold uppercase flex items-center gap-2 transition-all ${viewMode === 'directory' ? 'text-brand-heaven-gold' : 'text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black'}`}
                        >
                            <LayoutGrid size={14} /> {t('nav.directory', 'Directory')}
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`text-[10px] font-avenir-bold uppercase flex items-center gap-2 transition-all ${viewMode === 'map' ? 'text-brand-heaven-gold' : 'text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black'}`}
                        >
                            <MapIcon size={14} /> {t('nav.map', 'Map')}
                        </button>
                        <button
                            onClick={() => setViewMode('admin')}
                            className={`text-[10px] font-avenir-bold uppercase flex items-center gap-2 transition-all ${viewMode === 'admin' ? 'text-brand-heaven-gold' : 'text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black'}`}
                        >
                            <ShieldCheck size={14} /> {t('nav.admin', 'Admin')} {isAdminAuthorized && <span className="w-1 h-1 rounded-full bg-green-500" />}
                        </button>
                        <button
                            onClick={() => setViewMode('registration')}
                            className={`text-[10px] font-avenir-bold uppercase flex items-center gap-2 px-4 py-1.5 rounded-button border transition-all ${viewMode === 'registration' ? 'bg-brand-heaven-gold border-brand-heaven-gold text-white shadow-glow-sm' : 'border-white/10 dark:border-black/10 text-brand-heaven-gold hover:bg-brand-heaven-gold/10'}`}
                        >
                            <PlusCircle size={14} /> {t('nav.registration', 'New Bio')}
                        </button>
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
            </div>
        </nav>
    );
};

export default Navbar;
