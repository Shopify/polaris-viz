import React from 'react';
import {
  useTheme,
  ChartState,
  BORDER_RADIUS,
  useUniqueId,
} from '@shopify/polaris-viz-core';

import type {ChartSkeletonProps} from '../../ChartSkeleton';
import {ErrorText} from '../ErrorText';

import styles from './SimpleNormalizedSkeleton.scss';

export function SimpleNormalizedSkeleton({
  dimensions,
  state,
  errorText,
}: Omit<Required<ChartSkeletonProps>, 'type'>) {
  const {width, height} = dimensions;

  const {
    grid: {color: gridColor},
    bar: {hasRoundedCorners},
    chartContainer: {padding},
  } = useTheme();

  const id = useUniqueId('simple-bar-skeleton');

  const BarMarkup = () => (
    <span
      style={{
        background: gridColor,
        borderRadius: hasRoundedCorners
          ? `${BORDER_RADIUS.All}px`
          : BORDER_RADIUS.None,
      }}
    />
  );

  return (
    <div className={styles.SimpleNormalizedSkeleton} style={{padding}}>
      {state === ChartState.Loading && (
        <React.Fragment>
          <div className={styles.Legend}>
            {new Array(3).fill(0).map((_, index) => (
              <div key={`${id}${index}`} className={styles.LegendItem}>
                {new Array(3).fill(0).map((_, innerIndex) => (
                  <BarMarkup key={`${id}${index}${innerIndex}`} />
                ))}
              </div>
            ))}
          </div>
          <BarMarkup />
        </React.Fragment>
      )}
      {state === ChartState.Error && (
        <svg viewBox={`0 0 ${width} ${height}`}>
          <ErrorText errorText={errorText} width={width} height={height} />
        </svg>
      )}
    </div>
  );
}
