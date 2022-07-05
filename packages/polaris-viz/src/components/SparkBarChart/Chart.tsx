import React from 'react';
import {useTransition} from '@react-spring/web';
import {
  Dimensions,
  ANIMATION_MARGIN,
  SparkBarSeries,
  DEFAULT_THEME_NAME,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {XMLNS} from '../../constants';

import styles from './SparkBarChart.scss';
import type {SparkBarChartProps} from './SparkBarChart';

interface Props extends SparkBarChartProps {
  dimensions?: Dimensions;
  isAnimated?: boolean;
}

export function Chart({
  data,
  dimensions,
  accessibilityLabel,
  isAnimated = DEFAULT_CHART_PROPS.isAnimated,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme = DEFAULT_THEME_NAME,
}: Props) {
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
          dataOffsetLeft={dataOffsetLeft}
          dataOffsetRight={dataOffsetRight}
          height={height}
          shouldAnimate={isAnimated}
          theme={theme}
          useTransition={useTransition}
          width={width}
        />
      </svg>
    </React.Fragment>
  );
}
