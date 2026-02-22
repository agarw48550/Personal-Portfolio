# Design System — Ayaan Agarwal Portfolio

> A comprehensive design system built with Apple-level precision for a portfolio that functions as both a scrollable website and an interactive OS desktop environment.

---

## Table of Contents

1. [Principles](#principles)
2. [Foundations](#foundations)
   - [Color System](#color-system)
   - [Typography](#typography)
   - [Spacing & Grid](#spacing--grid)
   - [Shadows & Elevation](#shadows--elevation)
   - [Motion](#motion)
3. [Components](#components)
4. [Patterns](#patterns)
5. [Design Tokens](#design-tokens)
6. [Do's & Don'ts](#dos--donts)
7. [Developer Guide](#developer-guide)

---

## Principles

| # | Principle | Description |
|---|-----------|-------------|
| 1 | **Clarity** | Content drives every decision. Typography is legible, contrast ratios meet WCAG 2.2 AA, and interactive elements are unmistakable. |
| 2 | **Deference** | The UI serves the content — never competes with it. Glass surfaces, muted borders, and restrained color keep focus on the work. |
| 3 | **Depth** | Layered surfaces, subtle shadows, and motion create a spatial hierarchy that guides the eye naturally. |
| 4 | **Consistency** | Every component draws from the same token set. One source of truth (`design-tokens.ts`) governs all visual decisions. |
| 5 | **Personality** | The hacker-aesthetic terminal, OS simulation, and matrix background are *preserved quirks* — they make this portfolio memorable without sacrificing usability. |

---

## Foundations

### Color System

#### Brand — Cyan Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-brand` | `#22d3ee` | Primary accent, CTAs, active states |
| `--ds-brand-light` | `#67e8f9` | Hover states |
| `--ds-brand-dark` | `#06b6d4` | Pressed/active |
| `--ds-brand-surface` | `rgba(34,211,238,0.08)` | Subtle backgrounds |
| `--ds-brand-glow` | `rgba(34,211,238,0.25)` | Box-shadow accents |

#### Semantic Accents

| Token | Color | Role |
|-------|-------|------|
| `--ds-emerald` | `#34d399` | Service, success, positive |
| `--ds-blue` | `#3b82f6` | Leadership, information |
| `--ds-purple` | `#8b5cf6` | Internships, creative |
| `--ds-amber` | `#f59e0b` | News, warnings |
| `--ds-pink` | `#ec4899` | Projects |
| `--ds-rose` | `#f43f5e` | Destructive, errors |

Each semantic color has four sub-tokens: base, `-surface`, `-light`, `-dark`.

#### Surfaces (Dark Mode — Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-bg` | `#0a0a12` | Page background |
| `--ds-bg-surface` | `#0f0f1a` | Section alternation |
| `--ds-bg-elevated` | `#141422` | Cards, modals |
| `--ds-bg-inset` | `#0d0d18` | Inset content areas |
| `--ds-bg-card` | `#16162a` | Card backgrounds |
| `--ds-border` | `rgba(255,255,255,0.08)` | Default border |
| `--ds-glass` | `rgba(15,15,25,0.8)` | Frosted glass panels |

#### Surfaces (Light Mode)

| Token | Value |
|-------|-------|
| `--ds-bg` | `#fafafa` |
| `--ds-bg-surface` | `#f5f5f5` |
| `--ds-bg-elevated` | `#ffffff` |
| `--ds-border` | `rgba(0,0,0,0.08)` |
| `--ds-glass` | `rgba(255,255,255,0.8)` |

#### Text Colors

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--ds-text` | `#f1f5f9` | `#0f172a` | Primary text |
| `--ds-text-secondary` | `#94a3b8` | `#475569` | Body copy |
| `--ds-text-muted` | `#64748b` | `#94a3b8` | Captions, labels |

---

### Typography

**Scale:** Major Third (1.250) with responsive `clamp()` sizing.

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `.ds-display-xl` | `clamp(2.5rem, 5vw, 4.5rem)` | 900 | Hero headline |
| `.ds-display` | `clamp(2rem, 4vw, 3.5rem)` | 800 | Section hero (Jarvis, Contact) |
| `.ds-heading-1` | `clamp(1.75rem, 3vw, 2.5rem)` | 800 | Section titles |
| `.ds-heading-2` | `clamp(1.25rem, 2vw, 1.75rem)` | 700 | Card titles |
| `.ds-heading-3` | `clamp(1rem, 1.5vw, 1.25rem)` | 700 | Sub-headings |
| `.ds-body-lg` | `clamp(1rem, 1.2vw, 1.125rem)` | 400 | Lead paragraphs |
| `.ds-body` | `0.9375rem` | 400 | Default body |
| `.ds-body-sm` | `0.875rem` | 400 | Secondary text |
| `.ds-caption` | `0.8125rem` | 400 | Captions |
| `.ds-overline` | `0.6875rem` | 700 | Overlines, tech tags |

**Font Stacks:**
- Sans: `var(--font-geist-sans)` → Geist Sans
- Mono: `var(--font-geist-mono)` → Geist Mono

**Accessibility:** All text passes WCAG 2.2 AA contrast ratios in both themes.

---

### Spacing & Grid

**Base Unit:** 8px

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | Reset |
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Default gap |
| `space-3` | 12px | Small padding |
| `space-4` | 16px | Component padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Card padding |
| `space-12` | 48px | Large spacing |
| `space-16` | 64px | Section padding |
| `space-24` | 96px | Section vertical rhythm |
| `space-32` | 128px | Hero vertical rhythm |

**Grid:** 12 columns, 24px gutter, 1280px max-width. Container uses `mx-auto max-w-7xl`.

**Section Rhythm:** `py-24 md:py-32 px-6 md:px-8` for every major section.

---

### Shadows & Elevation

| Token | Usage |
|-------|-------|
| `--ds-shadow-sm` | Subtle card borders |
| `--ds-shadow-md` | Default elevation |
| `--ds-shadow-lg` | Prominent cards |
| `--ds-shadow-xl` | Modals |
| `--ds-shadow-2xl` | OS windows, dock |
| `--ds-shadow-glow` | Brand-colored glow effect |
| `--ds-shadow-card` | Standard card elevation |

**Glass Surfaces:** `backdrop-blur-xl` + `var(--ds-glass)` background + `var(--ds-border)` border.

---

### Motion

| Duration | Value | Usage |
|----------|-------|-------|
| Fast | `150ms` | Hover states, micro-interactions |
| Normal | `200ms` | State transitions |
| Slow | `300ms` | Page transitions |
| Spring | `stiffness: 300, damping: 30` | Natural physical motion |

**Reduced Motion:** All animations respect `prefers-reduced-motion: reduce` — durations forced to 0.01ms.

**Standard Presets:**
- `fadeUp`: opacity 0→1 + y 20→0
- `stagger(i)`: fadeUp with 80ms incremental delay

---

## Components

### 30+ Component Inventory

#### Layout Components
| # | Component | File | Description |
|---|-----------|------|-------------|
| 1 | **Desktop Shell** | `Desktop.tsx` | Fixed viewport OS environment |
| 2 | **Top Bar** | `TopBar.tsx` | macOS-style menu bar |
| 3 | **Dock** | `Dock.tsx` | App launcher with magnetic magnification |
| 4 | **Window** | `Window.tsx` | Draggable/resizable with traffic lights |
| 5 | **Website View** | `WebsiteView.tsx` | Scrollable portfolio layout |
| 6 | **Mobile Bottom Nav** | `MobileBottomNav.tsx` | iOS-style tab bar |

#### App Components
| # | Component | File | Description |
|---|-----------|------|-------------|
| 7 | **About App** | `AboutApp.tsx` | Tabbed profile view |
| 8 | **Projects App** | `ProjectsApp.tsx` | Filterable project grid + modal |
| 9 | **Skills App** | `SkillsApp.tsx` | Hacker terminal aesthetic |
| 10 | **Contact App** | `ContactApp.tsx` | Sidebar + form layout |
| 11 | **Terminal App** | `TerminalApp.tsx` | Interactive CLI |
| 12 | **Timeline App** | `TimelineApp.tsx` | Chronological milestone view |
| 13 | **Blogs App** | `BlogsApp.tsx` | Substack embed |

#### Interactive Components
| # | Component | Class/File | States |
|---|-----------|------------|--------|
| 14 | **Button — Primary** | `.ds-btn-primary` | Default, hover, active, disabled |
| 15 | **Button — Secondary** | `.ds-btn-secondary` | Default, hover, active |
| 16 | **Button — Ghost** | `.ds-btn-ghost` | Default, hover |
| 17 | **Button — SM** | `.ds-btn-sm` | Size variant |
| 18 | **Button — LG** | `.ds-btn-lg` | Size variant |
| 19 | **Button — Icon** | `.ds-btn-icon` | Square icon button |
| 20 | **Chip** | `.ds-chip` | Colored identity badges |
| 21 | **Input** | `.ds-input` | Text, email, textarea |
| 22 | **Section Icon** | `.ds-section-icon` | Colored icon badge |

#### Surface Components
| # | Component | Class | Description |
|---|-----------|-------|-------------|
| 23 | **Card** | `.ds-card` | Standard elevated container |
| 24 | **Card Interactive** | `.ds-card-interactive` | Hover-lift card |
| 25 | **Glass Panel** | `.glass-panel` | Frosted glass surface |
| 26 | **Glass Subtle** | `.glass-subtle` | Minimal frosted surface |

#### Specialized Components
| # | Component | Description |
|---|-----------|-------------|
| 27 | **Block-to-Code** | Scratch → Python animation |
| 28 | **Jarvis Terminal** | Auto-typing demo terminal |
| 29 | **Scroll Progress** | Reading progress bar |
| 30 | **Matrix Background** | Animated matrix rain |
| 31 | **Custom Cursor** | Interactive cursor follower |
| 32 | **Theme Toggle** | Dark/light mode switcher |
| 33 | **Konami Code** | Easter egg listener |

---

### Component Anatomy Examples

#### Button Primary (`.ds-btn.ds-btn-primary`)

```
┌─────────────────────────────────┐
│  [icon]  Label Text  [icon]     │  ← inline-flex, center-aligned
│                                 │  ← padding: 12px 24px
│  background: var(--ds-brand)    │  ← border-radius: 12px
│  color: #000                    │  ← font-weight: 700
│  shadow: brand-glow             │  ← hover: brightness(1.1)
└─────────────────────────────────┘
```

**States:**
- Default: `background: var(--ds-brand)`, `color: #000`
- Hover: `filter: brightness(1.1)`, slight scale
- Active: `transform: scale(0.98)`
- Disabled: `opacity: 0.5`, `pointer-events: none`

#### Card Interactive (`.ds-card-interactive`)

```
┌──────────────────────────────────┐
│                                  │  ← border-radius: 24px
│  Content                         │  ← border: 1px solid var(--ds-border)
│                                  │  ← background: var(--ds-bg-elevated)
│                                  │  ← shadow: var(--ds-shadow-card)
└──────────────────────────────────┘
    ↕ hover: translateY(-8px) + shadow-lg
```

#### Chip (`.ds-chip`)

```
┌─────────────────┐
│ [•] Label Text  │  ← padding: 4px 12px
│                 │  ← border-radius: 999px (pill)
│                 │  ← font-size: overline (11px)
│                 │  ← border: 1px solid [semantic-color]
└─────────────────┘
```

---

### Accessibility Specifications

All components meet **WCAG 2.2 AA**:

- **Color contrast**: ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- **Focus indicators**: `focus-visible` ring with 2px offset
- **Touch targets**: Minimum 44×44px on mobile
- **Skip navigation**: Hidden link at page top
- **ARIA labels**: All interactive elements labeled
- **Reduced motion**: Animations respect `prefers-reduced-motion`
- **Screen reader**: `.sr-only` utility for visually hidden content
- **Semantic HTML**: Proper heading hierarchy, landmark regions

---

## Patterns

### Section Layout Pattern

```tsx
<section id="section-name" className="py-24 md:py-32 px-6 md:px-8">
  <div className="container mx-auto max-w-7xl">
    <div className="flex items-center gap-4 mb-16">
      <div className="ds-section-icon" style={{ background: 'var(--ds-brand)' }}>
        <Icon size={24} />
      </div>
      <h2 className="ds-heading-1">Section Title</h2>
    </div>
    {/* Content */}
  </div>
</section>
```

### Animated Entry Pattern

```tsx
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.5, delay: i * 0.08 },
});
```

### Glass Surface Pattern

```tsx
<div
  className="backdrop-blur-xl rounded-2xl"
  style={{
    background: 'var(--ds-glass)',
    border: '1px solid var(--ds-border)',
  }}
>
```

### OS Window Pattern

```
Window Shell (react-rnd)
├── Header (traffic lights + title)
│   ├── Close (red)
│   ├── Minimize (yellow)
│   └── Maximize (green)
├── Content (app component)
└── Glass background + shadow
```

---

## Design Tokens

All tokens are defined in two locations:

1. **`src/lib/design-tokens.ts`** — TypeScript object (296 lines), the single source of truth
2. **`src/app/globals.css`** — CSS custom properties consumed by components

### Token Architecture

```
design-tokens.ts (JS source of truth)
       ↓
globals.css :root { --ds-* }  (CSS custom properties)
       ↓
Components (via var(--ds-*) in style= or Tailwind classes)
```

### Token Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Colors | `--ds-` | `--ds-brand`, `--ds-emerald` |
| Backgrounds | `--ds-bg-` | `--ds-bg-elevated` |
| Text | `--ds-text-` | `--ds-text-secondary` |
| Borders | `--ds-border` | Single token |
| Shadows | `--ds-shadow-` | `--ds-shadow-glow` |
| Glass | `--ds-glass` | Single token |

---

## Do's & Don'ts

### ✅ Do

- **Use design tokens** for all colors, spacing, and typography
- **Use `style={{ color: 'var(--ds-*)' }}`** for dynamic token references
- **Use `.ds-*` utility classes** for buttons, chips, inputs, cards
- **Apply section rhythm** `py-24 md:py-32 px-6 md:px-8` consistently
- **Use `container mx-auto max-w-7xl`** for all content containers
- **Use `stagger(i)` animation preset** for lists and grids
- **Test both dark and light themes** after every change
- **Preserve quirks** — the terminal aesthetic, matrix rain, OS simulation are features, not bugs
- **Use semantic HTML** — proper headings, landmark regions, ARIA labels

### ❌ Don't

- **Don't hardcode colors** like `#0a192f`, `text-cyan-400`, `bg-gray-800`
- **Don't use `ring-*` in inline styles** — Tailwind ring utilities only work in className
- **Don't skip the glass pattern** — every floating UI element needs `backdrop-blur` + `var(--ds-glass)`
- **Don't add animations** without `prefers-reduced-motion` support
- **Don't create one-off color values** — extend the token set if needed
- **Don't use `create_file`** to overwrite existing files — use `replace_string_in_file` or Python scripts
- **Don't use terminal heredocs** for large content — they fail on special characters

---

## Developer Guide

### Quick Start

```bash
npm install
npm run dev    # localhost:3000
```

### File Structure

```
src/
├── app/
│   ├── globals.css          # Design token CSS layer
│   ├── layout.tsx           # Root layout, fonts, metadata
│   └── page.tsx             # View mode switcher
├── components/
│   ├── desktop/             # OS desktop shell
│   ├── website/             # Scrollable website view
│   └── apps/                # OS window app content
└── lib/
    ├── design-tokens.ts     # Token definitions (source of truth)
    ├── store.ts             # Zustand state management
    ├── utils.ts             # cn() utility
    └── i18n.ts              # Internationalization
```

### Adding a New Component

1. Import tokens via CSS variables: `var(--ds-*)`
2. Use `.ds-*` utility classes from `globals.css`
3. Follow the section layout pattern
4. Add `aria-label` and keyboard support
5. Test in both themes and both view modes (website + desktop)

### Theme Switching

The system uses a `theme` state in Zustand (`useStore`) that toggles a `.light` class on the root element. All `--ds-*` tokens auto-switch via CSS class overrides.

```tsx
const { theme, setTheme } = useStore();
const isDark = theme === 'dark';
```

### View Modes

Two parallel UIs share the same data and design tokens:

| Mode | Component | Description |
|------|-----------|-------------|
| `website` | `WebsiteView.tsx` | Traditional scrollable portfolio |
| `desktop` | `Desktop.tsx` | macOS-style windowed OS environment |

Switching: `setViewMode('desktop')` / `setViewMode('website')`

### i18n

Three languages supported: English (`en`), Chinese (`zh`), Hindi (`hi`).

```tsx
const { t, language, setLanguage } = useLanguage();
// t.appContent.about.bio1, t.desktop.menu.file, etc.
```

### Build & Deploy

```bash
npx next build       # Production build
vercel --prod        # Deploy to Vercel
git push origin main # Push to GitHub
```

---

*Built with precision. Deployed with confidence.*
*© 2025 Ayaan Agarwal*
