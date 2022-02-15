import React from 'react';
import {scaleLinear} from 'd3-scale';
import type {Dimensions, SparkLineChartProps} from '@shopify/polaris-viz-core';
import {
  useSparkLine,
  useThemeSeriesColors,
  useTheme,
  LineSeries,
} from '@shopify/polaris-viz-core';

import {XMLNS} from '../../constants';
import {usePrefersReducedMotion} from '../../hooks';

import styles from './SparkLineChart.scss';

interface Props extends SparkLineChartProps {
  dimensions?: Dimensions;
}

const SVG_MARGIN = 2;

export function Chart({
  data,
  dimensions,
  accessibilityLabel,
  isAnimated = true,
  offsetLeft = 0,
  offsetRight = 0,
  theme = 'Default',
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const shouldAnimate = isAnimated && !prefersReducedMotion;
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const {width, height} = dimensions ?? {height: 0, width: 0};

  const {minXValues, maxXValues, yScale} = useSparkLine({
    data,
    height,
    svgMargin: SVG_MARGIN,
  });

  return (
    <React.Fragment>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg xmlns={XMLNS} aria-hidden width={width} height={height}>
        {data.map((series, index) => {
          const singleOffsetLeft = series.isComparison ? 0 : offsetLeft;
          const singleOffsetRight = series.isComparison ? 0 : offsetRight;

          const xScale = scaleLinear()
            .range([
              singleOffsetLeft + SVG_MARGIN,
              width - singleOffsetRight - SVG_MARGIN,
            ])
            .domain([minXValues, maxXValues]);

          const seriesWithColor = {
            ...series,
            color: seriesColors[index],
          };

          return (
            <g key={index}>
              <LineSeries
                index={index}
                key={index}
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                isAnimated={shouldAnimate}
                svgDimensions={{height, width}}
                theme={theme}
              />
            </g>
          );
        })}
      </svg>
    </React.Fragment>
  );
}
