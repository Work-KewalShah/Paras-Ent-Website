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
  { key: 'preDawn', icon: 'cloud-moon', bgTop: '#26215C', bgBottom: '#042C53', line: '#AFA9EC', dot: '#CECBF6' },
  { key: 'sunrise', icon: 'sunrise', bgTop: '#D85A30', bgBottom: '#4A1B0C', line: '#FAC775', dot: '#FAEEDA' },
  { key: 'daytime', icon: 'sun', bgTop: '#85B7EB', bgBottom: '#0C447C', line: '#E6F1FB', dot: '#FFFFFF' },
  { key: 'dusk', icon: 'sunset-2', bgTop: '#712B13', bgBottom: '#26215C', line: '#ED93B1', dot: '#F4C0D1' },
  { key: 'sunset', icon: 'sunset', bgTop: '#993C1D', bgBottom: '#4B1528', line: '#FAC775', dot: '#F0997B' },
  { key: 'night', icon: 'moon', bgTop: '#042C53', bgBottom: '#04342C', line: '#5DCAA5', dot: '#9FE1CB' },
];

export const DEFAULT_THEME_INDEX = 2; // Daytime
