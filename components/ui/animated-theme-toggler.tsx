"use client";

import { useState, useEffect, useRef, useId, useCallback } from "react";

/**
 * Animated Theme Toggler — sun↔moon morph.
 *
 * Sun rays shrink and rotate away.
 * Center circle swells into a moon body.
 * A mask carves the crescent. CSS spring-like transitions throughout.
 * A soft switch-click sounds on toggle.
 *
 * Pure React + CSS transitions — no external animation library.
 */

export interface AnimatedThemeTogglerProps {
  isDark: boolean;
  onToggle: () => void;
  sound?: boolean;
}

/* ── Audio ── */

let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function ensureBuf(ac: AudioContext): AudioBuffer {
  if (_buf && _buf.sampleRate === ac.sampleRate) return _buf;
  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.006);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const sine = Math.sin(2 * Math.PI * 3400 * t);
    const noise = Math.random() * 2 - 1;
    ch[i] = (sine * 0.6 + noise * 0.4) * (1 - t) ** 3;
  }
  _buf = buf;
  return buf;
}

function tick(last: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - last.current < 80) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    gain.gain.value = 0.08;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Component ── */

export function AnimatedThemeToggler({
  isDark,
  onToggle,
  sound = true,
}: AnimatedThemeTogglerProps) {
  const rawId = useId();
  const maskId = `att${rawId.replace(/:/g, "")}`;
  const lastSnd = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Skip initial animation on mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleClick = useCallback(() => {
    onToggle();
    if (sound) tick(lastSnd);
  }, [onToggle, sound]);

  const transition = mounted
    ? "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
    : "none";

  return (
    <button
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "currentColor",
        borderRadius: 8,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(0.86)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
      aria-label="Toggle theme"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          overflow: "visible",
          transform: `rotate(${isDark ? 270 : 0}deg)`,
          transition,
        }}
      >
        {/* Mask carves the crescent from the center circle */}
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            cx={isDark ? 17 : 33}
            cy={isDark ? 8 : 0}
            r="9"
            fill="black"
            style={{ transition }}
          />
        </mask>

        {/* Center body — small sun circle or large crescent moon */}
        <circle
          cx="12"
          cy="12"
          r={isDark ? 9 : 5}
          fill="currentColor"
          stroke="none"
          mask={`url(#${maskId})`}
          style={{ transition }}
        />

        {/* Rays — shrink and rotate when dark */}
        <g
          style={{
            opacity: isDark ? 0 : 1,
            transform: `scale(${isDark ? 0 : 1}) rotate(${isDark ? -30 : 0}deg)`,
            transformOrigin: "12px 12px",
            transition,
          }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="5.64" y1="5.64" x2="4.22" y2="4.22" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          <line x1="5.64" y1="18.36" x2="4.22" y2="19.78" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        </g>
      </svg>
    </button>
  );
}

export default AnimatedThemeToggler;
