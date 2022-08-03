import React from 'react';
import {
  useTheme,
  ChartState,
  BORDER_RADIUS,
  useUniqueId,
} from '@shopify/polaris-viz-core';

import type {ChartSkeletonProps} from '../../ChartSkeleton';
import {ErrorText} from '../ErrorText';

import styles from './SimpleBarSkeleton.scss';

export function SimpleBarSkeleton({
  dimensions,
  state,
  errorText,
}: Omit<Required<ChartSkeletonProps>, 'type'>) {
  const {width, height} = dimensions;

  const {
    grid: {color: gridColor},
    bar: {hasRoundedCorners},
  } = useTheme();

  const id = useUniqueId('simple-bar-skeleton');

  const BarMarkup = () => (
    <span
      style={{
        display: 'inline-block',
        background: gridColor,
        borderRadius: hasRoundedCorners
          ? `${BORDER_RADIUS.All}px`
          : BORDER_RADIUS.None,
      }}
    />
  );

  return (
    <div className={styles.SimpleBarSkeleton}>
      {state === ChartState.Loading && (
        <React.Fragment>
          {new Array(4).fill(0).map((_, index) => (
            <div key={`${id}${index}`} className={styles.Item}>
              <BarMarkup />
              <BarMarkup />
            </div>
          ))}
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
