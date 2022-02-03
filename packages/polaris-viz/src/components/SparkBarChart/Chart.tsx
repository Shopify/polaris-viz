import React from 'react';

import {
  SparkBarChartProps,
  SparkBarSeries,
} from '../../../../polaris-viz-core/src';
import {XMLNS} from '../../constants';

import styles from './SparkBarChart.scss';

const ANIMATION_MARGIN = 17;

export function Chart({
  data,
  dimensions,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme,
}: SparkBarChartProps) {
  const {width, height} = dimensions ?? {width: 0, height: 0};
  const viewboxHeight = height + ANIMATION_MARGIN * 2;

  return (
    <React.Fragment>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg
        xmlns={XMLNS}
        aria-hidden
        viewBox={`0 -${ANIMATION_MARGIN} ${width} ${viewboxHeight}`}
        style={{
          transform: `translateY(-${ANIMATION_MARGIN}px)`,
        }}
        height={viewboxHeight}
        width={width}
      >
        <SparkBarSeries
          data={data}
          dimensions={dimensions}
          accessibilityLabel={accessibilityLabel}
          isAnimated={isAnimated}
          dataOffsetRight={dataOffsetRight}
          dataOffsetLeft={dataOffsetLeft}
          theme={theme}
        />
      </svg>
    </React.Fragment>
  );
}
