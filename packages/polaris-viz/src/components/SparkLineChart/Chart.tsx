import React from 'react';
import {scaleLinear} from 'd3-scale';
import {
  IS_ANIMATED_DEFAULT,
  LineSeries,
  useSparkLine,
} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {useTheme} from '../../hooks';
import {XMLNS} from '../../constants';

import styles from './SparkLineChart.scss';
import type {SparkLineChartProps} from './SparkLineChart';

const SVG_MARGIN = 2;

interface Props extends SparkLineChartProps {
  dimensions?: Dimensions;
}

export function Chart({
  data,
  dimensions,
  accessibilityLabel,
  isAnimated = IS_ANIMATED_DEFAULT,
  offsetLeft = 0,
  offsetRight = 0,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const {width, height} = dimensions ?? {height: 0, width: 0};

  const {minXDomain, maxXDomain, yScale} = useSparkLine({
    data,
    height,
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
            .domain([minXDomain, maxXDomain]);

          const seriesWithColor = {
            color: seriesColors[index],
            ...series,
          };

          return (
            <g key={index}>
              <LineSeries
                key={index}
                index={index}
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                isAnimated={isAnimated}
                svgDimensions={{height, width}}
                theme={theme}
                type="spark"
              />
            </g>
          );
        })}
      </svg>
    </React.Fragment>
  );
}
