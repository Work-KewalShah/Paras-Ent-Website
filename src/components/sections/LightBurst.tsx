'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useSiteTheme } from '@/components/providers/SiteThemeProvider';
import {
  lightBurstThemes,
  DEFAULT_THEME_INDEX,
  type LightBurstIcon,
  type LightBurstTheme,
} from '@/lib/content/light-burst-themes';

const LINE_COUNT = 160;
const ANGULAR_SPREAD = 1.1 * Math.PI;
const MIN_LENGTH = 130;
const LENGTH_RANGE = 260;
const CANVAS_HEIGHT = 540;

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

const THEME_TRANSITION_MS = 450;

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface ThemeColorsRGB {
  bgTop: ColorRGB;
  bgBottom: ColorRGB;
  line: ColorRGB;
  dot: ColorRGB;
}

interface ResolvedColors {
  bgTop: string;
  bgBottom: string;
  line: string;
  dot: string;
}

interface ColorTransition {
  from: ThemeColorsRGB;
  to: ThemeColorsRGB;
  startTime: number;
}

function hexToRgb(hex: string): ColorRGB {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function themeToRgb(theme: LightBurstTheme): ThemeColorsRGB {
  return {
    bgTop: hexToRgb(theme.bgTop),
    bgBottom: hexToRgb(theme.bgBottom),
    line: hexToRgb(theme.line),
    dot: hexToRgb(theme.dot),
  };
}

function lerpColor(a: ColorRGB, b: ColorRGB, t: number): ColorRGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function lerpThemeColors(from: ThemeColorsRGB, to: ThemeColorsRGB, t: number): ThemeColorsRGB {
  return {
    bgTop: lerpColor(from.bgTop, to.bgTop, t),
    bgBottom: lerpColor(from.bgBottom, to.bgBottom, t),
    line: lerpColor(from.line, to.line, t),
    dot: lerpColor(from.dot, to.dot, t),
  };
}

function rgbToCss(c: ColorRGB): string {
  return `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;
}

function toResolvedColors(c: ThemeColorsRGB): ResolvedColors {
  return {
    bgTop: rgbToCss(c.bgTop),
    bgBottom: rgbToCss(c.bgBottom),
    line: rgbToCss(c.line),
    dot: rgbToCss(c.dot),
  };
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

const SCATTER_RADIUS = 140;
const SCATTER_FORCE = 3.8;
const VELOCITY_DAMPING = 0.88;
const OFFSET_DECAY = 0.94;
const CURVE_BOW_FACTOR = 0.6;

// Touch-hold-then-drag scroll-block exception (deliberate, scoped override of the
// Session 13 "touch must never block scroll" rule — see decisions.md). A quick
// tap-and-swipe scrolls normally, unchanged; only a touch held for HOLD_DELAY_MS
// before dragging blocks scroll, and only for the duration of that hold.
const HOLD_DELAY_MS = 250;
const PULSE_DURATION_MS = 350;
const PULSE_RADIUS = 160;
const PULSE_MAX_BOOST = 0.5;

interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

interface Pulse {
  x: number;
  y: number;
  intensity: number;
}

function updateLines(
  lines: LineState[],
  pointer: PointerState,
  cssWidth: number,
  cssHeight: number,
  timestamp: number
) {
  const baseX = cssWidth / 2;
  const baseY = cssHeight;

  for (const line of lines) {
    if (pointer.active) {
      const sway = Math.sin(timestamp * 0.0009 + line.phase) * 6;
      const length = line.baseLength + sway;
      const naturalTipX = baseX + Math.cos(line.angle) * length;
      const naturalTipY = baseY + Math.sin(line.angle) * length;
      const tipX = naturalTipX + line.offsetX;
      const tipY = naturalTipY + line.offsetY;

      const dx = tipX - pointer.x;
      const dy = tipY - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < SCATTER_RADIUS && distance > 0.0001) {
        const force = ((SCATTER_RADIUS - distance) / SCATTER_RADIUS) * SCATTER_FORCE;
        line.velX += (dx / distance) * force;
        line.velY += (dy / distance) * force;
      }
    }

    line.velX *= VELOCITY_DAMPING;
    line.velY *= VELOCITY_DAMPING;
    line.offsetX += line.velX;
    line.offsetY += line.velY;
    line.offsetX *= OFFSET_DECAY;
    line.offsetY *= OFFSET_DECAY;
  }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  cssWidth: number,
  cssHeight: number,
  lines: LineState[],
  colors: ResolvedColors,
  timestamp?: number,
  pulse?: Pulse | null
) {
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const gradient = ctx.createLinearGradient(0, 0, 0, cssHeight);
  gradient.addColorStop(0, colors.bgTop);
  gradient.addColorStop(1, colors.bgBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const baseX = cssWidth / 2;
  const baseY = cssHeight;

  for (const line of lines) {
    const sway = timestamp === undefined ? 0 : Math.sin(timestamp * 0.0009 + line.phase) * 6;
    const length = line.baseLength + sway;
    const naturalTipX = baseX + Math.cos(line.angle) * length;
    const naturalTipY = baseY + Math.sin(line.angle) * length;
    const tipX = naturalTipX + line.offsetX;
    const tipY = naturalTipY + line.offsetY;
    const displacement = Math.sqrt(line.offsetX * line.offsetX + line.offsetY * line.offsetY);

    const controlX = (baseX + naturalTipX) / 2 + line.offsetX * CURVE_BOW_FACTOR;
    const controlY = (baseY + naturalTipY) / 2 + line.offsetY * CURVE_BOW_FACTOR;

    let pulseBoost = 0;
    if (pulse) {
      const pdx = tipX - pulse.x;
      const pdy = tipY - pulse.y;
      const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
      if (pdist < PULSE_RADIUS) {
        pulseBoost = (1 - pdist / PULSE_RADIUS) * pulse.intensity;
      }
    }

    const opacity = Math.min(1, Math.min(0.85, 0.3 + displacement * 0.045) + pulseBoost * PULSE_MAX_BOOST);
    const width = 1 + Math.min(1.4, displacement * 0.05) + pulseBoost * 1.5;

    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.quadraticCurveTo(controlX, controlY, tipX, tipY);
    ctx.strokeStyle = colors.line;
    ctx.globalAlpha = opacity;
    ctx.lineWidth = width;
    ctx.stroke();

    const dotRadius = 1.5 + Math.min(2, displacement * 0.06);
    const dotOpacity = Math.min(1, Math.min(0.9, 0.45 + displacement * 0.06) + pulseBoost * PULSE_MAX_BOOST);
    ctx.beginPath();
    ctx.arc(tipX, tipY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = colors.dot;
    ctx.globalAlpha = dotOpacity;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export const LightBurst = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const { themeIndex: activeThemeIndex, setThemeIndex: setActiveThemeIndex } = useSiteTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<LineState[] | null>(null);
  const themeIndexRef = useRef(activeThemeIndex);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const currentColorsRGBRef = useRef<ThemeColorsRGB>(themeToRgb(lightBurstThemes[DEFAULT_THEME_INDEX]));
  const transitionRef = useRef<ColorTransition | null>(null);
  const redrawStaticRef = useRef<(() => void) | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const heldRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const pulseRef = useRef<{ x: number; y: number; startTime: number } | null>(null);

  useEffect(() => {
    themeIndexRef.current = activeThemeIndex;
    const targetColors = themeToRgb(lightBurstThemes[activeThemeIndex]);

    if (shouldReduceMotion) {
      // No cross-fade under reduced motion — snap straight to the new theme and
      // redraw the single static frame immediately.
      currentColorsRGBRef.current = targetColors;
      transitionRef.current = null;
      redrawStaticRef.current?.();
      return;
    }

    // Start the new transition from wherever the live colors currently are —
    // not from the previous theme's original values — so re-clicking mid-fade
    // continues smoothly instead of snapping back or jumping.
    transitionRef.current = {
      from: currentColorsRGBRef.current,
      to: targetColors,
      startTime: performance.now(),
    };
  }, [activeThemeIndex, shouldReduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!linesRef.current) {
      linesRef.current = generateLines(LINE_COUNT);
    }
    const lines = linesRef.current;

    let cssWidth = canvas.clientWidth;
    let cssHeight = canvas.clientHeight;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      cssWidth = canvas!.clientWidth;
      cssHeight = canvas!.clientHeight;
      canvas!.width = cssWidth * dpr;
      canvas!.height = cssHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();

    // Touch-hold-then-drag scroll-block gesture (Session 16 exception to the
    // Session 13 "touch must never block scroll" rule — see decisions.md).
    // Shared by both the reduced-motion and animated branches below, since
    // scroll-blocking must work in both, even though the pulse cue is
    // skipped under reduced motion. Mouse pointers never enter this code at
    // all — desktop behavior is completely unaffected.
    function setupHoldGesture() {
      let preventScrollAttached = false;

      function preventScrollOnMove(e: PointerEvent) {
        e.preventDefault();
      }

      function attachPreventScroll() {
        if (preventScrollAttached) return;
        canvas!.addEventListener('pointermove', preventScrollOnMove, { passive: false });
        preventScrollAttached = true;
      }

      function detachPreventScroll() {
        if (!preventScrollAttached) return;
        canvas!.removeEventListener('pointermove', preventScrollOnMove);
        preventScrollAttached = false;
      }

      function endHold() {
        if (holdTimerRef.current !== null) {
          window.clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }
        detachPreventScroll();
        heldRef.current = false;
        activePointerIdRef.current = null;
      }

      function onHoldPointerDown(e: PointerEvent) {
        if (e.pointerType !== 'touch') return;
        if (activePointerIdRef.current !== null) return; // already tracking a touch

        const rect = canvas!.getBoundingClientRect();
        pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
        activePointerIdRef.current = e.pointerId;

        holdTimerRef.current = window.setTimeout(() => {
          holdTimerRef.current = null;
          heldRef.current = true;
          attachPreventScroll();
          if (!shouldReduceMotion) {
            pulseRef.current = {
              x: pointerRef.current.x,
              y: pointerRef.current.y,
              startTime: performance.now(),
            };
          }
        }, HOLD_DELAY_MS);
      }

      function onHoldPointerEnd(e: PointerEvent) {
        if (e.pointerType !== 'touch') return;
        if (e.pointerId !== activePointerIdRef.current) return;
        endHold();
      }

      canvas!.addEventListener('pointerdown', onHoldPointerDown);
      canvas!.addEventListener('pointerup', onHoldPointerEnd);
      canvas!.addEventListener('pointercancel', onHoldPointerEnd);
      canvas!.addEventListener('pointerleave', onHoldPointerEnd);

      return () => {
        canvas!.removeEventListener('pointerdown', onHoldPointerDown);
        canvas!.removeEventListener('pointerup', onHoldPointerEnd);
        canvas!.removeEventListener('pointercancel', onHoldPointerEnd);
        canvas!.removeEventListener('pointerleave', onHoldPointerEnd);
        endHold();
      };
    }

    if (shouldReduceMotion) {
      // Static fallback: one draw at base positions, no sway, no scatter, no RAF,
      // no pointer tracking, no IntersectionObserver — nothing left running,
      // except the hold-gesture listeners (scroll-block still applies; pulse
      // cue is skipped since there's no RAF loop to animate it).
      const redrawStatic = () => {
        drawFrame(ctx, cssWidth, cssHeight, lines, lightBurstThemes[themeIndexRef.current]);
      };
      redrawStaticRef.current = redrawStatic;
      redrawStatic();

      function handleResizeStatic() {
        resizeCanvas();
        redrawStatic();
      }
      window.addEventListener('resize', handleResizeStatic);
      const teardownHoldGesture = setupHoldGesture();

      return () => {
        window.removeEventListener('resize', handleResizeStatic);
        teardownHoldGesture();
        redrawStaticRef.current = null;
      };
    }

    redrawStaticRef.current = null;
    window.addEventListener('resize', resizeCanvas);
    const teardownHoldGesture = setupHoldGesture();

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    }
    function onPointerLeave() {
      pointerRef.current.active = false;
    }
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointercancel', onPointerLeave);

    let rafId: number | null = null;
    let inView = false;

    function loop(timestamp: number) {
      if (!inView) {
        rafId = null;
        return;
      }

      const transition = transitionRef.current;
      if (transition) {
        const t = Math.min(1, (timestamp - transition.startTime) / THEME_TRANSITION_MS);
        currentColorsRGBRef.current = lerpThemeColors(transition.from, transition.to, t);
        if (t >= 1) {
          transitionRef.current = null;
        }
      }

      let pulse: Pulse | null = null;
      if (pulseRef.current) {
        const elapsed = timestamp - pulseRef.current.startTime;
        if (elapsed < PULSE_DURATION_MS) {
          pulse = { x: pulseRef.current.x, y: pulseRef.current.y, intensity: 1 - elapsed / PULSE_DURATION_MS };
        } else {
          pulseRef.current = null;
        }
      }

      updateLines(lines, pointerRef.current, cssWidth, cssHeight, timestamp);
      drawFrame(ctx!, cssWidth, cssHeight, lines, toResolvedColors(currentColorsRGBRef.current), timestamp, pulse);
      rafId = requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && rafId === null) {
          rafId = requestAnimationFrame(loop);
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );
    observer.observe(section);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointercancel', onPointerLeave);
      teardownHoldGesture();
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  return (
    <section id="themes" ref={sectionRef} className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block w-full rounded-radius-lg"
            style={{ height: CANVAS_HEIGHT }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 rounded-t-radius-lg pointer-events-none z-10"
            style={{
              height: '80px',
              background: 'linear-gradient(to bottom, var(--color-bg-primary, #0A0A0A) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default LightBurst;
