export interface Church {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  pastor?: string;
  category: ChurchCategory;
  affiliation?: string[];
  description?: string;
}

export type ChurchCategory = 
  | 'KJB' 
  | 'Non-KJV' 
  | 'Soulwinning' 
  | 'BBF' 
  | 'BMA' 
  | 'ABA'
  | 'SBC' 
  | 'Independent' 
  | 'Other';

export interface ChurchFilter {
  categories: ChurchCategory[];
  searchTerm: string;
  showAll: boolean;
}

export type MapMarkerColors = Record<ChurchCategory, string>;

export const CHURCH_COLORS: MapMarkerColors = {
  'KJB': '#2563eb',        // Blue
  'Non-KJV': '#dc2626',    // Red
  'Soulwinning': '#16a34a', // Green
  'BBF': '#ea580c',        // Orange
  'BMA': '#7c3aed',        // Purple
  'ABA': '#f59e0b',        // Amber
  'SBC': '#0891b2',        // Cyan
  'Independent': '#be185d', // Pink
  'Other': '#6b7280'       // Gray
};

export const CHURCH_LABELS: Record<ChurchCategory, string> = {
  'KJB': 'King James Bible',
  'Non-KJV': 'Non-King James Version',
  'Soulwinning': 'Soulwinning Churches',
  'BBF': 'Baptist Bible Fellowship',
  'BMA': 'Baptist Missionary Association',
  'ABA': 'American Baptist Association',
  'SBC': 'Southern Baptist Convention',
  'Independent': 'Independent Baptist',
  'Other': 'Other Baptist'
};