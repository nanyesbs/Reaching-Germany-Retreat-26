import React, { useState, useEffect } from 'react';
import { Lock, ChevronRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface EntryPageProps {
    onVerify: () => void;
}

const EntryPage: React.FC<EntryPageProps> = ({ onVerify }) => {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Constants
    const CORRECT_CODE = 'esbsdeutschlandretreat26';

    useEffect(() => {
        // Elegant fade-in effect on mount
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code) return;

        setLoading(true);
        setError(false);

        // Artificial delay for a "processing/decrypting" feel
        await new Promise(resolve => setTimeout(resolve, 800));

        if (code.toLowerCase().trim() === CORRECT_CODE) {
            localStorage.setItem('ls_access_authorized', 'true');
            onVerify();
        } else {
            setError(true);
            setLoading(false);
            // Haptic-like feedback: clear input on error
            setCode('');
        }
    };

    return (
        <div className="fixed inset-0 z-[500] bg-black flex items-center justify-center p-6 overflow-hidden select-none">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(187,148,70,0.05),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-heaven-gold/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-heaven-gold/20 to-transparent" />
            </div>

            <div
                className={`relative z-10 w-full max-w-md transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
            >
                {/* Language Switcher Overlay */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex justify-center w-full">
                    <LanguageSwitcher />
                </div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    {/* Header/Logo Section */}
                    <div className="flex flex-col items-center mb-12">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-brand-heaven-gold/20 blur-2xl rounded-full scale-150 animate-pulse" />
                            <div className="relative w-20 h-20 bg-black border border-brand-heaven-gold/30 rounded-full flex items-center justify-center shadow-glow">
                                {error ? (
                                    <AlertCircle size={32} className="text-red-500 animate-shake" />
                                ) : loading ? (
                                    <Loader2 size={32} className="text-brand-heaven-gold animate-spin" />
                                ) : (
                                    <Lock size={32} className="text-brand-heaven-gold" />
                                )}
                            </div>
                        </div>

                        <h1 className="text-center">
                            <span className="block text-[10px] font-avenir-bold text-brand-heaven-gold uppercase tracking-[0.5em] mb-4 opacity-60">
                                {t('entry.org', 'Europe Shall Be Saved')}
                            </span>
                            <span className="block text-xl md:text-2xl font-didot italic text-white tracking-tight leading-tight">
                                {t('entry.retreat', 'Reaching Germany Retreat')}
                            </span>
                        </h1>
                    </div>

                    {/* Access Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-brand-heaven-gold/5 rounded-2xl transition-all duration-300 ${error ? 'bg-red-500/10' : 'group-focus-within:bg-brand-heaven-gold/10'
                                }`} />
                            <input
                                type="password"
                                placeholder={t('entry.accessCode', 'ACCESS CODE')}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={`w-full bg-transparent border-none p-6 text-center text-sm font-avenir-bold tracking-[0.3em] text-white uppercase outline-none focus:ring-0 placeholder:text-white/20 transition-all ${error ? 'text-red-500 placeholder:text-red-500/20' : ''
                                    }`}
                                autoFocus
                            />
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand-heaven-gold transition-all duration-500 ${loading ? 'w-full' : 'w-12 group-focus-within:w-24'
                                } ${error ? 'bg-red-500 w-full' : ''}`} />
                        </div>

                        <button
                            disabled={loading || !code}
                            className={`w-full py-5 rounded-2xl font-avenir-bold text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-2 group ${loading || !code
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-brand-heaven-gold hover:text-white shadow-glow active:scale-95'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    <span>INITIALIZING...</span>
                                </>
                            ) : (
                                <>
                                    <span>{t('entry.enter', 'Enter')}</span>
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {error && (
                            <p className="text-[10px] font-avenir-bold text-red-500 text-center uppercase tracking-widest animate-fade-in">
                                {t('entry.invalidCode', 'Invalid Access Code')}
                            </p>
                        )}
                    </form>

                    {/* Security Note */}
                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-3 opacity-30">
                        <ShieldCheck size={12} className="text-brand-heaven-gold" />
                        <span className="text-[9px] font-avenir-medium text-white uppercase tracking-[0.2em]">
                            Encrypted Session Protocol
                        </span>
                    </div>
                </div>

                {/* Decorative footer */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/2 hover:border-white/10 transition-colors cursor-help group">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-heaven-gold animate-pulse shadow-glow" />
                        <span className="text-[9px] font-avenir-bold text-white/40 uppercase tracking-[0.2em]">
                            Summit 2026 Verification Active
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntryPage;
