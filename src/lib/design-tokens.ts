/**
 * AYAAN.DEV — Design System Tokens
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * The single source of truth for every visual decision.
 *
 * Principles:
 *   1. Purposeful contrast — dark mode is the hero, light mode is the companion
 *   2. 8px spatial rhythm — every measurement divisible by 8
 *   3. Restrained palette — cyan anchor, semantic accents, neutral canvas
 *   4. Typographic hierarchy — 9 levels, responsive, Inter-first
 *   5. Motion with meaning — every animation serves communication
 */

// ─── Color System ──────────────────────────────────────────────────────
export const colors = {
  // Core brand
  brand: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee', // Primary interactive
    500: '#06b6d4', // Primary brand
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Neutrals — Slate family
  neutral: {
    0: '#ffffff',
    25: '#fcfcfd',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    850: '#172033',
    900: '#0f172a',
    925: '#0b1120',
    950: '#030712', // App background (dark)
  },

  // Semantic — Section accents
  semantic: {
    emerald: { base: '#10b981', light: '#d1fae5', dark: '#064e3b', surface: 'rgba(16,185,129,0.08)' },
    blue:    { base: '#3b82f6', light: '#dbeafe', dark: '#1e3a5f', surface: 'rgba(59,130,246,0.08)' },
    purple:  { base: '#8b5cf6', light: '#ede9fe', dark: '#3b1f7a', surface: 'rgba(139,92,246,0.08)' },
    amber:   { base: '#f59e0b', light: '#fef3c7', dark: '#78350f', surface: 'rgba(245,158,11,0.08)' },
    pink:    { base: '#ec4899', light: '#fce7f3', dark: '#831843', surface: 'rgba(236,72,153,0.08)' },
    rose:    { base: '#f43f5e', light: '#ffe4e6', dark: '#881337', surface: 'rgba(244,63,94,0.08)' },
    green:   { base: '#22c55e', light: '#dcfce7', dark: '#14532d', surface: 'rgba(34,197,94,0.08)' },
  },

  // Feedback
  feedback: {
    success: '#22c55e',
    warning: '#f59e0b',
    error:   '#ef4444',
    info:    '#3b82f6',
  },

  // Dark Mode Surfaces
  dark: {
    bg:       '#030712',
    elevated: '#0b1120',
    surface:  '#111827',
    card:     '#1e293b',
    border:   'rgba(255,255,255,0.06)',
    borderHover: 'rgba(255,255,255,0.12)',
    glass:    'rgba(3,7,18,0.80)',
    glassBorder: 'rgba(255,255,255,0.08)',
  },

  // Light Mode Surfaces
  light: {
    bg:       '#ffffff',
    elevated: '#f8fafc',
    surface:  '#f1f5f9',
    card:     '#ffffff',
    border:   '#e2e8f0',
    borderHover: '#cbd5e1',
    glass:    'rgba(255,255,255,0.80)',
    glassBorder: 'rgba(0,0,0,0.06)',
  },
} as const;

// ─── Typography Scale ──────────────────────────────────────────────────
// 9-level system using Inter. Major Third (1.25) modular scale.
export const typography = {
  fontFamily: {
    sans:  "'Inter', system-ui, -apple-system, sans-serif",
    mono:  "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
    display: "'Inter', system-ui, sans-serif",
  },

  // level → [fontSize, lineHeight, letterSpacing, fontWeight]
  scale: {
    // Display — hero headlines
    'display-xl': { size: 'clamp(3rem, 5vw + 1rem, 4.5rem)',   lineHeight: '1.05', tracking: '-0.03em', weight: 900 },
    'display':    { size: 'clamp(2.25rem, 4vw + 0.5rem, 3.75rem)', lineHeight: '1.1',  tracking: '-0.025em', weight: 900 },

    // Headings
    'heading-1':  { size: 'clamp(1.875rem, 3vw, 2.25rem)', lineHeight: '1.15', tracking: '-0.02em', weight: 800 },
    'heading-2':  { size: 'clamp(1.5rem, 2.5vw, 1.875rem)',lineHeight: '1.2',  tracking: '-0.015em', weight: 700 },
    'heading-3':  { size: 'clamp(1.25rem, 2vw, 1.5rem)',   lineHeight: '1.3',  tracking: '-0.01em', weight: 700 },

    // Body
    'body-lg':    { size: '1.125rem',  lineHeight: '1.75', tracking: '-0.01em', weight: 400 },
    'body':       { size: '1rem',      lineHeight: '1.75', tracking: '-0.005em', weight: 400 },
    'body-sm':    { size: '0.875rem',  lineHeight: '1.65', tracking: '0em', weight: 400 },

    // Utility
    'caption':    { size: '0.75rem',   lineHeight: '1.5',  tracking: '0.02em', weight: 500 },
    'overline':   { size: '0.6875rem', lineHeight: '1.3',  tracking: '0.08em', weight: 700 },
  },
} as const;

// ─── Spacing (8px base) ────────────────────────────────────────────────
export const spacing = {
  0:   '0px',
  0.5: '2px',     // Micro — icon gaps
  1:   '4px',     // Tight — badge padding
  1.5: '6px',
  2:   '8px',     // Base unit
  3:   '12px',    // Small gaps
  4:   '16px',    // Component padding
  5:   '20px',
  6:   '24px',    // Card padding
  8:   '32px',    // Section gaps
  10:  '40px',
  12:  '48px',    // Large section gaps
  16:  '64px',    // Section vertical padding (mobile)
  20:  '80px',    // Section vertical padding (tablet)
  24:  '96px',    // Section vertical padding (desktop)
  32:  '128px',   // Hero padding
} as const;

// ─── Border Radius ─────────────────────────────────────────────────────
export const radius = {
  none: '0px',
  sm:   '6px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
  pill: '9999px',
} as const;

// ─── Shadows ───────────────────────────────────────────────────────────
export const shadows = {
  sm:   '0 1px 2px rgba(0,0,0,0.05)',
  md:   '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
  lg:   '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
  xl:   '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)',
  '2xl':'0 25px 50px -12px rgba(0,0,0,0.15)',
  glow: {
    cyan:   '0 0 20px rgba(6,182,212,0.25)',
    purple: '0 0 20px rgba(139,92,246,0.25)',
    blue:   '0 0 20px rgba(59,130,246,0.25)',
    emerald:'0 0 20px rgba(16,185,129,0.25)',
    pink:   '0 0 20px rgba(236,72,153,0.25)',
  },
  glass: {
    dark:  '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
    light: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
  },
} as const;

// ─── Breakpoints (12-column grid) ──────────────────────────────────────
export const breakpoints = {
  sm:  '640px',   // 1 → 2 columns
  md:  '768px',   // Mobile → Desktop nav
  lg:  '1024px',  // 2 → 3 columns
  xl:  '1280px',  // Max content width
  '2xl': '1536px',
} as const;

export const grid = {
  columns: 12,
  gutter:  '24px', // 3 × 8px
  maxWidth: '1280px',
  containerPadding: {
    mobile:  '16px', // 2 × 8px
    tablet:  '24px', // 3 × 8px
    desktop: '32px', // 4 × 8px
  },
} as const;

// ─── Motion / Animation ────────────────────────────────────────────────
export const motion = {
  duration: {
    instant:  '0ms',
    fast:     '150ms',
    normal:   '250ms',
    slow:     '400ms',
    slower:   '600ms',
    entrance: '500ms',
    exit:     '200ms',
  },
  easing: {
    default:    'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn:     'cubic-bezier(0.4, 0, 1, 1)',
    easeOut:    'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut:  'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce:     'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  spring: {
    snappy:  { stiffness: 400, damping: 30 },
    gentle:  { stiffness: 200, damping: 20 },
    bouncy:  { stiffness: 300, damping: 15 },
  },
} as const;

// ─── Z-Index Scale ─────────────────────────────────────────────────────
export const zIndex = {
  base:       0,
  content:    10,
  overlay:    20,
  sticky:     30,
  nav:        40,
  modal:      50,
  toast:      60,
  cursor:     70,
  matrix:     100,
} as const;

// ─── Component Tokens ──────────────────────────────────────────────────
export const components = {
  button: {
    primary: {
      bg: colors.brand[400],
      hover: colors.brand[500],
      active: colors.brand[600],
      text: '#ffffff',
      shadow: `0 4px 14px rgba(6,182,212,0.25)`,
      radius: radius['xl'],
      paddingX: spacing[8],
      paddingY: spacing[4],
    },
    secondary: {
      dark:  { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.10)', text: '#e2e8f0', hover: 'rgba(255,255,255,0.10)' },
      light: { bg: 'rgba(0,0,0,0.04)', border: '#e2e8f0', text: '#334155', hover: 'rgba(0,0,0,0.08)' },
    },
    ghost: {
      text: colors.brand[400],
      hover: colors.brand[500],
      bg: 'transparent',
    },
  },

  card: {
    radius: radius['3xl'],
    padding: spacing[8],
    dark:  { bg: colors.dark.surface, border: colors.dark.border, hoverBorder: colors.dark.borderHover },
    light: { bg: colors.light.card, border: colors.light.border, hoverBorder: colors.light.borderHover },
  },

  chip: {
    radius: radius.pill,
    paddingX: spacing[3],
    paddingY: spacing[1.5],
    fontSize: typography.scale.caption.size,
    fontWeight: 700,
  },

  nav: {
    height: { desktop: '80px', mobile: '64px' },
    blur: '20px',
  },

  sectionIcon: {
    size: '48px',
    radius: radius.xl,
    shadow: (color: string) => `0 8px 24px ${color}40`,
  },

  input: {
    radius: radius.lg,
    paddingX: spacing[4],
    paddingY: spacing[3],
    fontSize: typography.scale.body.size,
    dark:  { bg: colors.dark.surface, border: colors.dark.border, focus: colors.brand[400] },
    light: { bg: colors.light.elevated, border: colors.light.border, focus: colors.brand[500] },
  },
} as const;
