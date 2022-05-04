import React, {useRef, useEffect} from 'react';
import type {Dimensions} from '@shopify/polaris-viz-core';
import {
  useTheme,
  changeColorOpacity,
  paddingStringToObject,
} from '@shopify/polaris-viz-core';

import styles from './ChartSkeleton.scss';

type SkeletonState = 'loading' | 'error';

export interface ChartSkeletonProps {
  theme?: string;
  dimensions: Dimensions;
  state: SkeletonState;
}

export function ChartSkeleton({
  dimensions,
  theme = 'Default',
  state = 'loading',
}) {
  const {width, height} = dimensions;
  const numberOfTicks = 5;
  const {
    chartContainer: {backgroundColor, padding},
    grid: {color: gridColor},
  } = useTheme(theme);

  const {paddingLeft, paddingBottom, paddingTop} =
    paddingStringToObject(padding);

  const semiTransparentBackground = changeColorOpacity(backgroundColor, 0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.style.setProperty('--shimmerSize', `${width}px`);
  }, [width]);

  const drawableHeight = height - paddingBottom - paddingTop;

  return (
    <div className={styles.Container} ref={ref}>
      {state === 'loading' && (
        <div
          className={styles.Shimmer}
          style={{
            background: `linear-gradient(-40deg,
            ${semiTransparentBackground} 10%,
            ${semiTransparentBackground} 35%,
            ${backgroundColor} 50%,
            ${semiTransparentBackground} 85%,
            ${semiTransparentBackground} 90%)`,
          }}
        />
      )}
      <svg viewBox={`0 0 ${width} ${height}`}>
        {[...Array(numberOfTicks)].map((_, index) => {
          const y = index * ((drawableHeight - 12) / (numberOfTicks - 1));
          return (
            <g key={index}>
              <rect
                x={paddingLeft}
                y={y}
                width={32}
                height={12}
                ry={2}
                rx={2}
                fill={gridColor}
              />
              <rect x={0} y={y + 5} width={width} height={1} fill={gridColor} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
