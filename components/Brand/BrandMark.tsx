'use client';

interface BrandMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BrandMark({ size = 32, className }: BrandMarkProps) {
  return (
    <img
      src="/ifood-icon.png"
      alt="iFood"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
