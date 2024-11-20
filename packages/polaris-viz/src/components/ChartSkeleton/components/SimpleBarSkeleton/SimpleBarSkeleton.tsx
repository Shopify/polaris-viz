import {Fragment} from 'react';
import {
  useTheme,
  useUniqueId,
  ChartState,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {ErrorText} from '../ErrorText';

import styles from './SimpleBarSkeleton.scss';

interface Props {
  state: ChartState;
  errorText: string;
}

export function SimpleBarSkeleton({state, errorText}: Props) {
  const {
    containerBounds: {height, width},
  } = useChartContext();

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
        <Fragment>
          {new Array(4).fill(0).map((_, index) => (
            <div key={`${id}${index}`} className={styles.Item}>
              <BarMarkup />
              <BarMarkup />
            </div>
          ))}
        </Fragment>
      )}
      {state === ChartState.Error && (
        <svg viewBox={`0 0 ${width} ${height}`}>
          <ErrorText errorText={errorText} width={width} height={height} />
        </svg>
      )}
    </div>
  );
}
