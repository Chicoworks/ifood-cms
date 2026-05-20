'use client';

interface BrandMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BrandMark({ size = 32, color = '#EB0033', className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      {/* Outer arc — opens to the right */}
      <path
        d="M20 8a28 28 0 0 0 0 48"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Middle arc */}
      <path
        d="M24 18a16 16 0 0 0 0 28"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner dot */}
      <circle
        cx="28"
        cy="32"
        r="4.5"
        fill={color}
      />
    </svg>
  );
}
