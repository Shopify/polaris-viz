import React, {useEffect, useMemo, useRef} from 'react';
import {changeColorOpacity} from '@shopify/polaris-viz-core';

import styles from './Shimmer.scss';

export function Shimmer({
  backgroundColor,
  width,
  height,
}: {
  backgroundColor: string;
  width: number;
  height: number;
}) {
  const semiTransparentBackground = changeColorOpacity(backgroundColor, 0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.style.setProperty('--shimmerWidth', `${width}px`);
    ref.current.style.setProperty('--shimmerHeight', `${height}px`);
  }, [width, height]);

  const angle = useMemo(() => {
    const [min, max] = [width, height].sort();
    return Math.asin(min / max) / (Math.PI / 180);
  }, [width, height]);

  return (
    <div
      ref={ref}
      className={styles.Shimmer}
      style={{
        backgroundImage: `linear-gradient(-${angle}deg,
            ${semiTransparentBackground} 10%,
            ${semiTransparentBackground} 35%,
            ${backgroundColor} 50%,
            ${semiTransparentBackground} 65%,
            ${semiTransparentBackground} 100%)`,
      }}
    />
  );
}
