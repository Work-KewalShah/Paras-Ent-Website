export type LightBurstIcon = 'cloud-moon' | 'sunrise' | 'sun' | 'sunset-2' | 'sunset' | 'moon';

// Theme-specific ambient background layer, rendered behind the burst lines.
// Purely decorative — never interacts with pointer/scatter physics. See
// decisions.md for the full design rationale and per-type behavior.
export type AmbientType = 'birds' | 'stars' | 'dust' | 'embers' | 'fireflies';

export interface AmbientConfig {
  type: AmbientType;
  count: number;
  color: string;
  speed?: number; // dust/embers/fireflies base speed (px/frame)
  minOpacity?: number; // stars twinkle range
  maxOpacity?: number; // stars twinkle range
}

export interface LightBurstTheme {
  key: string;
  icon: LightBurstIcon;
  bgTop: string;
  bgBottom: string;
  line: string;
  dot: string;
  ambient: AmbientConfig;
}

export const lightBurstThemes: LightBurstTheme[] = [
  {
    key: 'preDawn', icon: 'cloud-moon', bgTop: '#1A1035', bgBottom: '#050510', line: '#9D7FEA', dot: '#C9B8FF',
    ambient: { type: 'stars', count: 26, color: '#E8E0FF', minOpacity: 0.16, maxOpacity: 0.24 },
  },
  {
    key: 'sunrise', icon: 'sunrise', bgTop: '#FF6B6B', bgBottom: '#FFD93D', line: '#FFF3B0', dot: '#FFFFFF',
    ambient: { type: 'dust', count: 24, color: '#FFF3D6', speed: 0.22 },
  },
  {
    key: 'daytime', icon: 'sun', bgTop: '#85B7EB', bgBottom: '#0C447C', line: '#E6F1FB', dot: '#FFFFFF',
    ambient: { type: 'birds', count: 3, color: '#F0F0F5' },
  },
  {
    key: 'dusk', icon: 'sunset-2', bgTop: '#C74B9E', bgBottom: '#2E1A47', line: '#F7B7E0', dot: '#FFFFFF',
    ambient: { type: 'fireflies', count: 14, color: '#E8F06A', speed: 0.18 },
  },
  {
    key: 'sunset', icon: 'sunset', bgTop: '#FF5E3A', bgBottom: '#4A0E4E', line: '#FFAA5C', dot: '#FFE0B2',
    ambient: { type: 'embers', count: 24, color: '#FF8A50', speed: 0.55 },
  },
  {
    key: 'night', icon: 'moon', bgTop: '#0B1E3D', bgBottom: '#050414', line: '#4FD8FF', dot: '#B8F4FF',
    ambient: { type: 'stars', count: 55, color: '#FFFFFF', minOpacity: 0.5, maxOpacity: 0.75 },
  },
];

export const DEFAULT_THEME_INDEX = 2; // Daytime
