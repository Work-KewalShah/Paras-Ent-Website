export type LightBurstIcon = 'cloud-moon' | 'sunrise' | 'sun' | 'sunset-2' | 'sunset' | 'moon';

export interface LightBurstTheme {
  key: string;
  icon: LightBurstIcon;
  bgTop: string;
  bgBottom: string;
  line: string;
  dot: string;
}

export const lightBurstThemes: LightBurstTheme[] = [
  { key: 'preDawn', icon: 'cloud-moon', bgTop: '#1A1035', bgBottom: '#050510', line: '#9D7FEA', dot: '#C9B8FF' },
  { key: 'sunrise', icon: 'sunrise', bgTop: '#FF6B6B', bgBottom: '#FFD93D', line: '#FFF3B0', dot: '#FFFFFF' },
  { key: 'daytime', icon: 'sun', bgTop: '#85B7EB', bgBottom: '#0C447C', line: '#E6F1FB', dot: '#FFFFFF' },
  { key: 'dusk', icon: 'sunset-2', bgTop: '#C74B9E', bgBottom: '#2E1A47', line: '#F7B7E0', dot: '#FFFFFF' },
  { key: 'sunset', icon: 'sunset', bgTop: '#FF5E3A', bgBottom: '#4A0E4E', line: '#FFAA5C', dot: '#FFE0B2' },
  { key: 'night', icon: 'moon', bgTop: '#0B1E3D', bgBottom: '#050414', line: '#4FD8FF', dot: '#B8F4FF' },
];

export const DEFAULT_THEME_INDEX = 2; // Daytime
