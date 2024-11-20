import {Fragment} from 'react';
import {useTheme, useUniqueId, ChartState} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import type {Size} from '../../../SimpleNormalizedChart';
import {ErrorText} from '../ErrorText';

import styles from './SimpleNormalizedSkeleton.scss';

const SIZE_TO_PX = {
  small: 16,
  medium: 36,
  large: 56,
};

interface Props {
  containerDimensions: Dimensions;
  errorText: string;
  showLegend: boolean;
  size: Size;
  state: ChartState;
}

export function SimpleNormalizedSkeleton({
  containerDimensions,
  errorText,
  showLegend,
  size,
  state,
}: Props) {
  const {width, height} = containerDimensions;

  const {
    grid: {color: gridColor},
    bar: {borderRadius},
    chartContainer: {padding},
  } = useTheme();

  const id = useUniqueId('simple-bar-skeleton');

  return (
    <div
      className={styles.Container}
      style={{
        padding,
      }}
    >
      {state === ChartState.Loading && (
        <Fragment>
          {showLegend && (
            <div className={styles.Legend}>
              {new Array(3).fill(0).map((_, index) => (
                <div key={`${id}${index}`} className={styles.LegendItem}>
                  {new Array(3).fill(0).map((_, innerIndex) => (
                    <div
                      key={`${id}${index}${innerIndex}`}
                      className={styles.LegendItemComponent}
                      style={{background: gridColor}}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              background: gridColor,
              borderRadius,
              height: SIZE_TO_PX[size],
            }}
          />
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
