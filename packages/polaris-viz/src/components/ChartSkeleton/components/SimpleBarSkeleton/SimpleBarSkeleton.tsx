import React from 'react';
import {
  useTheme,
  useUniqueId,
  ChartState,
  Dimensions,
} from '@shopify/polaris-viz-core';

import {ErrorText} from '../ErrorText';

import styles from './SimpleBarSkeleton.scss';

interface Props {
  dimensions: Dimensions;
  state: ChartState;
  errorText: string;
}

export function SimpleBarSkeleton({dimensions, state, errorText}: Props) {
  const {width, height} = dimensions;

  const {
    grid: {color: gridColor},
    bar: {borderRadius},
  } = useTheme();

  const id = useUniqueId('simple-bar-skeleton');

  const BarMarkup = () => (
    <span
      style={{
        display: 'inline-block',
        background: gridColor,
        borderRadius,
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
