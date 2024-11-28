import {useEffect, useRef} from 'react';
import {changeColorOpacity, useChartContext} from '@shopify/polaris-viz-core';

import styles from './Shimmer.scss';

export function Shimmer({backgroundColor}: {backgroundColor: string}) {
  const semiTransparentBackground = changeColorOpacity(backgroundColor, 0);
  const {
    containerBounds: {height, width},
  } = useChartContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.style.setProperty('--shimmerWidth', `${width}px`);
    ref.current.style.setProperty('--shimmerHeight', `${height}px`);
  }, [width, height]);

  const [min, max] = [width, height];
  const angle = Math.asin(max / min) / (Math.PI / 180);

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
