'use client';

import { useTheme } from '@/components/ThemeProvider';

interface BrandMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BrandMark({ size = 32, color, className }: BrandMarkProps) {
  const { theme } = useTheme();
  const fillColor = color || (theme === 'light' ? '#EB0033' : '#FFFFFF');

  return (
    <img
      src="/ifood-icon.png"
      alt="iFood"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        filter: theme === 'light'
          ? 'brightness(0) saturate(100%) invert(12%) sepia(95%) saturate(6000%) hue-rotate(345deg) brightness(95%) contrast(110%)'
          : 'none',
        transition: 'filter 0.3s ease',
      }}
    />
  );
}
