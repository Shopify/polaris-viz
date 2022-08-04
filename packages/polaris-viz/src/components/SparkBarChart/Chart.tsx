import React from 'react';
import {useTransition} from '@react-spring/web';
import {
  Dimensions,
  ANIMATION_MARGIN,
  SparkBarSeries,
  DEFAULT_THEME_NAME,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {XMLNS} from '../../constants';

import styles from './SparkBarChart.scss';
import type {SparkBarChartProps} from './SparkBarChart';

interface Props extends SparkBarChartProps {
  dimensions?: Dimensions;
}

export function Chart({
  data,
  dimensions,
  targetLine = {
    offsetLeft: 0,
    offsetRight: 0,
    value: 0,
  },
  accessibilityLabel,
  theme = DEFAULT_THEME_NAME,
}: Props) {
  const {shouldAnimate} = useChartContext();
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
        className={styles.Svg}
        height={viewboxHeight}
        width={width}
      >
        <SparkBarSeries
          data={data}
          targetLine={targetLine}
          height={height}
          shouldAnimate={shouldAnimate}
          theme={theme}
          useTransition={useTransition}
          width={width}
        />
      </svg>
    </React.Fragment>
  );
}
