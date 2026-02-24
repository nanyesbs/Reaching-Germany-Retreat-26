
export interface Country {
  name: string;
  flag: string;
  code: string;
}

export interface SocialAccount {
  platform: string;
  handle: string;
  type: 'personal' | 'ministerial';
}

export interface Participant {
  id: string;
  name: string;
  title: string;
  organization: string;
  orgDescription?: string;
  country: Country; // Residency/Current Region
  state?: string;
  city?: string;
  nationality: Country; // Origin/Heritage
  shortBio?: string;
  testimony: string;
  phone: string;
  isWhatsapp?: boolean;
  email: string;
  website: string;
  socialMedia?: SocialAccount[];
  photoUrl: string;
  promoPhotoUrl?: string;
  otherInfo?: string;
  events?: string[]; // Legacy sync field
  upcomingEvents?: string; // New registration field
  contactEmail?: string;
  dietaryRestrictions?: string;
  // Normalized fields for A-Z search/sort
  searchName: string;
  searchOrg: string;
  createdAt?: string; // ISO date string for registration tracking
}

export type ViewMode = 'directory' | 'admin' | 'registration';
export type LayoutMode = 'grid4' | 'grid2' | 'list';
