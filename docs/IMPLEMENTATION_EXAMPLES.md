# 💻 Design System - Exemplos de Implementação
## Código pronto para usar no iFood CMS

---

## 1. Setup Inicial

### globals.css

```css
/* ═══════════════════════════════════════════════════════════ */
/* CSS CUSTOM PROPERTIES                                        */
/* ═══════════════════════════════════════════════════════════ */

:root {
  /* COLORS */
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-100: #F0F0F0;
  --color-gray-300: #E0E0E0;
  --color-gray-600: #757575;
  --color-dark: #212121;
  --color-primary: #EB0033;
  --color-primary-hover: #D10029;
  --color-success: #4CAF50;
  --color-success-light: #E8F5E9;

  /* TYPOGRAPHY */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 18px;
  --font-size-body: 14px;
  --font-size-caption: 12px;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* SPACING */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* BORDER RADIUS */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* SHADOWS */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* TRANSITIONS */
  --transition-fast: 200ms ease-out;
  --transition-easeout: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ═══════════════════════════════════════════════════════════ */
/* RESET & BASE STYLES                                          */
/* ═══════════════════════════════════════════════════════════ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background-color: var(--color-white);
  color: var(--color-dark);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ═══════════════════════════════════════════════════════════ */
/* TYPOGRAPHY                                                   */
/* ═══════════════════════════════════════════════════════════ */

h1, h2, h3, h4, h5, h6 {
  text-balance: balance;
  line-height: 1.2;
}

p {
  text-pretty: pretty;
  line-height: 1.5;
}

/* Display text */
.display {
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-bold);
}

/* Heading 1 */
h1,
.h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-semibold);
}

/* Heading 2 */
h2,
.h2 {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-semibold);
}

/* Body */
body,
.body {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

/* Caption */
.caption {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  color: var(--color-gray-600);
}

/* ═══════════════════════════════════════════════════════════ */
/* ACCESSIBILITY                                                */
/* ═══════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus visible para navegação com teclado */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ═══════════════════════════════════════════════════════════ */
/* ANIMATIONS                                                   */
/* ═══════════════════════════════════════════════════════════ */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Utility animations */
.fade-in {
  animation: fadeIn var(--transition-fast) forwards;
}

.slide-up {
  animation: slideUp 300ms ease-out forwards;
}

.slide-in {
  animation: slideIn 300ms ease-out forwards;
}
```

---

## 2. Componentes React com CSS Modules

### Button.tsx

```tsx
// components/Button.tsx
import styles from './Button.module.css';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[`button--${variant}`]}
        ${styles[`button--${size}`]}
      `}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
```

### Button.module.css

```css
/* components/Button.module.css */

.button {
  position: relative;
  border: none;
  font-family: inherit;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
}

/* Tamanhos */
.button--sm {
  height: 32px;
  padding: 6px 12px;
  font-size: 12px;
}

.button--md {
  height: 40px;
  padding: 10px 16px;
  font-size: var(--font-size-body);
}

.button--lg {
  height: 48px;
  padding: 12px 24px;
  font-size: var(--font-size-h2);
}

/* Variantes */
.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.button--primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.button--secondary {
  background-color: var(--color-gray-100);
  color: var(--color-dark);
}

.button--secondary:hover:not(:disabled) {
  background-color: var(--color-gray-300);
  transform: translateY(-2px);
}

.button--ghost {
  background-color: transparent;
  color: var(--color-dark);
}

.button--ghost:hover:not(:disabled) {
  background-color: var(--color-gray-100);
}

/* Estados */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
  .button--primary:hover:not(:disabled),
  .button--secondary:hover:not(:disabled) {
    transform: none;
  }
}
```

### Card.tsx

```tsx
// components/Card.tsx
import styles from './Card.module.css';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export default function Card({
  children,
  className,
  onClick,
  interactive = true,
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${interactive ? styles['card--interactive'] : ''} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
```

### Card.module.css

```css
/* components/Card.module.css */

.card {
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.card--interactive {
  cursor: pointer;
}

.card--interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.card--interactive:active {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  .card--interactive:hover {
    transform: none;
  }
}
```

### Input.tsx

```tsx
// components/Input.tsx
import styles from './Input.module.css';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  label?: string;
}

export default function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  label,
}: InputProps) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
```

### Input.module.css

```css
/* components/Input.module.css */

.group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.label {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
}

.input {
  height: 40px;
  padding: 10px 12px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--font-size-body);
  color: var(--color-dark);
  background-color: var(--color-white);
  transition: all var(--transition-fast);
}

.input::placeholder {
  color: var(--color-gray-600);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(235, 0, 51, 0.1);
}

.input:disabled {
  background-color: var(--color-gray-100);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## 3. Componentes Compostos

### StatCard.tsx

```tsx
// components/StatCard.tsx
import styles from './StatCard.module.css';
import Card from './Card';

interface StatCardProps {
  number: number;
  label: string;
  meta?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export default function StatCard({
  number,
  label,
  meta,
  trend = 'neutral',
}: StatCardProps) {
  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '•',
  };

  const trendColor = {
    up: '#4CAF50',
    down: '#F44336',
    neutral: '#757575',
  };

  return (
    <Card interactive={false}>
      <div className={styles.statCard}>
        <div className={styles.number}>{number}</div>
        <div className={styles.label}>{label}</div>
        {meta && (
          <div
            className={styles.meta}
            style={{ color: trendColor[trend] }}
          >
            <span>{trendIcon[trend]}</span>
            <span>{meta}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
```

### StatCard.module.css

```css
/* components/StatCard.module.css */

.statCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  text-align: center;
  gap: var(--spacing-xs);
}

.number {
  font-size: 32px;
  font-weight: var(--font-weight-bold);
  color: var(--color-dark);
  line-height: 1;
}

.label {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--color-dark);
}

.meta {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
```

### EmptyState.tsx

```tsx
// components/EmptyState.tsx
import styles from './EmptyState.module.css';
import Button from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon = '✨',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>{icon}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action && (
        <Button onClick={action.onClick} size="md">
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

### EmptyState.module.css

```css
/* components/EmptyState.module.css */

.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--radius-lg);
  background-color: var(--color-gray-50);
}

.icon {
  font-size: 48px;
  opacity: 0.3;
  animation: slideUp 400ms ease-out;
}

.title {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  animation: slideUp 400ms ease-out 50ms backwards;
}

.description {
  font-size: var(--font-size-body);
  color: var(--color-gray-600);
  text-align: center;
  max-width: 300px;
  animation: slideUp 400ms ease-out 100ms backwards;
}
```

---

## 4. Layouts

### HeroSection.tsx

```tsx
// components/HeroSection.tsx
import styles from './HeroSection.module.css';
import Button from './Button';
import { ReactNode } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function HeroSection({
  title,
  subtitle,
  children,
  action,
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {children && (
          <div className={styles.stats}>
            {children}
          </div>
        )}

        {action && (
          <Button onClick={action.onClick} size="md">
            {action.label}
          </Button>
        )}
      </div>
    </section>
  );
}
```

### HeroSection.module.css

```css
/* components/HeroSection.module.css */

.hero {
  min-height: 240px;
  padding: var(--spacing-2xl) var(--spacing-xl);
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 1280px;
  width: 100%;
}

.title {
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark);
  text-balance: balance;
  animation: slideUp 300ms ease-out;
}

.subtitle {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  color: var(--color-gray-600);
  animation: slideUp 300ms ease-out 50ms backwards;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--spacing-md);
  animation: slideUp 300ms ease-out 100ms backwards;
}

@media (max-width: 768px) {
  .hero {
    min-height: 180px;
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .title {
    font-size: 24px;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
```

### PageGrid.tsx

```tsx
// components/PageGrid.tsx
import styles from './PageGrid.module.css';
import { ReactNode } from 'react';

interface PageGridProps {
  children: ReactNode;
  columns?: number;
}

export default function PageGrid({
  children,
  columns = 4,
}: PageGridProps) {
  return (
    <div
      className={styles.grid}
      style={{
        '--grid-columns': columns,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

### PageGrid.module.css

```css
/* components/PageGrid.module.css */

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  max-width: 1280px;
  margin: 0 auto;
}

/* Stagger animation para items */
.grid > * {
  animation: slideUp 300ms ease-out forwards;
}

.grid > :nth-child(1) { animation-delay: 0ms; }
.grid > :nth-child(2) { animation-delay: 50ms; }
.grid > :nth-child(3) { animation-delay: 100ms; }
.grid > :nth-child(4) { animation-delay: 150ms; }
.grid > :nth-child(5) { animation-delay: 200ms; }
.grid > :nth-child(n+6) { animation-delay: 250ms; }

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    padding: var(--spacing-md);
  }
}
```

---

## 5. Exemplo Completo: Home Page

```tsx
// app/page.tsx
import HeroSection from '@/components/HeroSection';
import PageGrid from '@/components/PageGrid';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Button from '@/components/Button';

export default function Home() {
  return (
    <main>
      {/* Hero Section com Stats */}
      <HeroSection
        title="Bem-vindo de volta, Daniel!"
        subtitle="Você tem 7 páginas em andamento"
        action={{
          label: '+ Create New Page',
          onClick: () => console.log('Create new page'),
        }}
      >
        <StatCard number={7} label="Pages" meta="↑ 2 this week" trend="up" />
        <StatCard number={2} label="Experiments" meta="Active" />
        <StatCard number={3} label="Drafts" meta="-1 today" trend="down" />
      </HeroSection>

      {/* Pages Grid */}
      <PageGrid columns={4}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
              Page {i}
            </h3>
            <p style={{ fontSize: '14px', color: '#757575' }}>
              Short description of page content
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #E0E0E0',
            }}>
              <span style={{ fontSize: '12px', color: '#4CAF50' }}>
                ● Published
              </span>
              <span style={{ fontSize: '12px', color: '#757575' }}>
                2h ago
              </span>
            </div>
          </Card>
        ))}
      </PageGrid>
    </main>
  );
}
```

---

## 6. Utilitários & Helpers

### useAnimation.ts

```ts
// lib/useAnimation.ts
import { useEffect } from 'react';

export function useAnimationOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
```

### colors.ts

```ts
// lib/colors.ts
export const colors = {
  white: '#FFFFFF',
  gray: {
    50: '#F5F5F5',
    100: '#F0F0F0',
    300: '#E0E0E0',
    600: '#757575',
  },
  dark: '#212121',
  primary: '#EB0033',
  primary_hover: '#D10029',
  success: '#4CAF50',
} as const;

export type Colors = typeof colors;
```

---

Este documento fornece todos os componentes prontos para usar. Adapte conforme necessário!
