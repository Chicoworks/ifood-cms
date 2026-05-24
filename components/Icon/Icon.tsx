'use client';

import { useEffect, useState } from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const cache = new Map<string, string>();

export function Icon({ name, size = 20, className }: IconProps) {
  const [svg, setSvg] = useState<string>(cache.get(name) || '');

  useEffect(() => {
    if (cache.has(name)) {
      setSvg(cache.get(name)!);
      return;
    }

    fetch(`/icons/${name}.svg`)
      .then(r => r.text())
      .then(text => {
        // Replace width/height with the desired size
        const processed = text
          .replace(/width="24"/, `width="${size}"`)
          .replace(/height="24"/, `height="${size}"`);
        cache.set(name, processed);
        setSvg(processed);
      })
      .catch(() => {});
  }, [name, size]);

  if (!svg) return <span style={{ width: size, height: size, display: 'inline-block' }} />;

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', width: size, height: size, color: 'inherit' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
