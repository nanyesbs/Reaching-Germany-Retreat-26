
import { Participant, Country } from './types';

export const ADMIN_PASSWORD = 'LS26@ESBSJesus!';
export const BRAND_GOLD = '#BB9446'; // Heaven Gold
export const BRAND_GOLD_LIGHT = '#D3B962'; // Gold
export const BRAND_GOLD_DARK = '#9C7B3A';
export const BRAND_BLACK = '#050505';

export const SUMMIT_START = '2026-07-03';
export const SUMMIT_END = '2026-07-31';

export const HIGH_QUALITY_PLACEHOLDER = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop";

export const getIdentityPlaceholder = (name: string): string => {
  try {
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'LS';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${BRAND_GOLD};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${BRAND_GOLD_DARK};stop-opacity:1" />
          </linearGradient>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:${BRAND_GOLD};stop-opacity:0.15" />
            <stop offset="100%" style="stop-color:black;stop-opacity:0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="#0A0A0A"/>
        <circle cx="50" cy="50" r="48" fill="url(#innerGlow)"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#goldGradient)" stroke-width="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#goldGradient)" stroke-width="1.5" />
        <text 
          x="50%" 
          y="50%" 
          fill="url(#goldGradient)" 
          font-family="'Bodoni Moda', serif" 
          font-weight="400" 
          font-size="32" 
          text-anchor="middle" 
          dominant-baseline="central" 
          style="letter-spacing: 0px; text-transform: uppercase; font-style: italic;"
        >
          ${initials}
        </text>
      </svg>
    `.trim();

    const base64 = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${base64}`;
  } catch (error) {
    return HIGH_QUALITY_PLACEHOLDER;
  }
};

export const COUNTRY_LIST: Country[] = [
  { name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { name: 'France', flag: '🇫🇷', code: 'FR' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES' },
  { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
  { name: 'Hungary', flag: '🇭🇺', code: 'HU' },
  { name: 'Czech Republic', flag: '🇨🇿', code: 'CZ' },
  { name: 'Bulgaria', flag: '🇧🇬', code: 'BG' },
  { name: 'Ireland', flag: '🇮🇪', code: 'IE' },
  { name: 'United States', flag: '🇺🇸', code: 'US' },
  { name: 'Slovenia', flag: '🇸🇮', code: 'SI' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE' },
  { name: 'Luxembourg', flag: '🇱🇺', code: 'LU' },
  { name: 'Brazil', flag: '🇧🇷', code: 'BR' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'CH' },
  { name: 'Denmark', flag: '🇩🇰', code: 'DK' },
  { name: 'Norway', flag: '🇳🇴', code: 'NO' },
  { name: 'Finland', flag: '🇫🇮', code: 'FI' },
  { name: 'Ukraine', flag: '🇺🇦', code: 'UA' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
  { name: 'Sweden', flag: '🇸🇪', code: 'SE' },
  { name: 'Austria', flag: '🇦🇹', code: 'AT' },
  { name: 'Belgium', flag: '🇧🇪', code: 'BE' },
  { name: 'Greece', flag: '🇬🇷', code: 'GR' },
  { name: 'Poland', flag: '🇵🇱', code: 'PL' },
  { name: 'Romania', flag: '🇷🇴', code: 'RO' },
  { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'SCT' }
];

export const COUNTRY_SYNONYMS: Record<string, string> = {
  'great britain': 'GB',
  'uk': 'GB',
  'usa': 'US',
  'united states of america': 'US',
  'uae': 'AE',
  'holland': 'NL',
  'brasil': 'BR'
};

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: '1',
    name: 'Matthias Greve',
    title: 'CEO',
    organization: 'Alpha & Omega Stiftung',
    country: { name: 'Germany', flag: '🇩🇪', code: 'DE' },
    nationality: { name: 'Germany', flag: '🇩🇪', code: 'DE' },
    testimony: 'After 41 years of high-tech innovation, my greatest joy is seeing the Spirit transform lives across Europe in 2026.',
    phone: '+49 123 456789',
    email: 'matthias@example.org',
    website: 'https://alpha-omega.org',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop',
    promoPhotoUrl: 'https://images.unsplash.com/photo-1542744095-2ad48424b66a?q=80&w=1200&h=600&fit=crop',
    orgDescription: 'A foundation dedicated to tech-driven kingdom advancement.',
    otherInfo: 'Strategic advisor for multiple pan-European initiatives.',
    searchName: 'MATTHIAS GREVE',
    searchOrg: 'ALPHA OMEGA STIFTUNG'
  }
];

export const ALPHABET_GROUPS = {
  LATIN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  GERMAN: ["Ä", "Ö", "Ü"],
  SPANISH: ["Ñ"],
  FRENCH: ["Ç", "É", "È"], // Common starters, kept minimal for UI sanity, can be expanded.
  RUSSIAN: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("")
};
