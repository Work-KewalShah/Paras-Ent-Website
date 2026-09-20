'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import {
  lightBurstThemes,
  DEFAULT_THEME_INDEX,
  type LightBurstIcon,
  type LightBurstTheme,
} from '@/lib/content/light-burst-themes';

const LINE_COUNT = 160;
const ANGULAR_SPREAD = 1.1 * Math.PI;
const MIN_LENGTH = 90;
const LENGTH_RANGE = 160;
const CANVAS_HEIGHT = 480;

interface LineState {
  angle: number;
  baseLength: number;
  phase: number;
  offsetX: number;
  offsetY: number;
  velX: number;
  velY: number;
}

function generateLines(count: number): LineState[] {
  const lines: LineState[] = [];
  for (let i = 0; i < count; i++) {
    const t = Math.random() - 0.5; // -0.5..0.5
    const angle = -Math.PI / 2 + t * ANGULAR_SPREAD;
    lines.push({
      angle,
      baseLength: MIN_LENGTH + Math.random() * LENGTH_RANGE,
      phase: Math.random() * Math.PI * 2,
      offsetX: 0,
      offsetY: 0,
      velX: 0,
      velY: 0,
    });
  }
  return lines;
}

function ThemeIcon({ icon, className }: { icon: LightBurstIcon; className?: string }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };
  switch (icon) {
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...common}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      );
    case 'cloud-moon':
      return (
        <svg {...common}>
          <path d="M19 8.5A5.5 5.5 0 0013.68 3a4 4 0 105.4 5.55" />
          <path d="M6 19a3.5 3.5 0 01-.5-6.96A5 5 0 0115 13a3 3 0 01-1 5.83A3 3 0 0113 19H6z" />
        </svg>
      );
    case 'sunrise':
      return (
        <svg {...common}>
          <path d="M17 18a5 5 0 00-10 0" />
          <path d="M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M16 6l-4-4-4 4" />
        </svg>
      );
    case 'sunset':
      return (
        <svg {...common}>
          <path d="M17 18a5 5 0 00-10 0" />
          <path d="M12 9V2M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M16 5l-4 4-4-4" />
        </svg>
      );
    case 'sunset-2':
      return (
        <svg {...common}>
          <path d="M17 18a5 5 0 00-10 0" />
          <path d="M12 12V9M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1" />
          <circle cx="19" cy="4" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="5" cy="6" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  cssWidth: number,
  cssHeight: number,
  lines: LineState[],
  theme: LightBurstTheme
) {
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const gradient = ctx.createLinearGradient(0, 0, 0, cssHeight);
  gradient.addColorStop(0, theme.bgTop);
  gradient.addColorStop(1, theme.bgBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const baseX = cssWidth / 2;
  const baseY = cssHeight;

  for (const line of lines) {
    const length = line.baseLength;
    const naturalTipX = baseX + Math.cos(line.angle) * length;
    const naturalTipY = baseY + Math.sin(line.angle) * length;
    const tipX = naturalTipX + line.offsetX;
    const tipY = naturalTipY + line.offsetY;
    const displacement = Math.sqrt(line.offsetX * line.offsetX + line.offsetY * line.offsetY);

    const controlX = (baseX + naturalTipX) / 2 + line.offsetX;
    const controlY = (baseY + naturalTipY) / 2 + line.offsetY;

    const opacity = Math.min(0.85, 0.3 + displacement * 0.045);
    const width = 1 + Math.min(1.4, displacement * 0.05);

    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.quadraticCurveTo(controlX, controlY, tipX, tipY);
    ctx.strokeStyle = theme.line;
    ctx.globalAlpha = opacity;
    ctx.lineWidth = width;
    ctx.stroke();

    const dotRadius = 1.5 + Math.min(2, displacement * 0.06);
    const dotOpacity = Math.min(0.9, 0.45 + displacement * 0.06);
    ctx.beginPath();
    ctx.arc(tipX, tipY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = theme.dot;
    ctx.globalAlpha = dotOpacity;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export const LightBurst = () => {
  const { t } = useTranslation();
  const [activeThemeIndex, setActiveThemeIndex] = useState(DEFAULT_THEME_INDEX);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<LineState[] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!linesRef.current) {
      linesRef.current = generateLines(LINE_COUNT);
    }

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawFrame(ctx, cssWidth, cssHeight, linesRef.current, lightBurstThemes[activeThemeIndex]);
  }, [activeThemeIndex]);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {lightBurstThemes.map((theme, i) => (
            <Button
              key={theme.key}
              variant={activeThemeIndex === i ? 'primary' : 'secondary'}
              onClick={() => setActiveThemeIndex(i)}
              className="px-4 py-2 text-small"
            >
              <ThemeIcon icon={theme.icon} className="w-4 h-4 mr-2" />
              {t(`interactiveBurst.themes.${theme.key}`)}
            </Button>
          ))}
        </div>

        <div className="relative rounded-radius-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="block w-full"
            style={{ height: CANVAS_HEIGHT }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default LightBurst;
