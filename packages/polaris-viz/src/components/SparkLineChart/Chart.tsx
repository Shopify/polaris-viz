import React from 'react';
import {scaleLinear} from 'd3-scale';

import type {
  Dimensions,
  SparkLineChartProps,
} from '../../../../polaris-viz-core/src';
import {useSparkLine} from '../../../../polaris-viz-core/src';
import {useThemeSeriesColors, useTheme} from '../../hooks/';
import {XMLNS} from '../../constants';

import styles from './SparkLineChart.scss';
import {Series} from './components';

interface Props extends SparkLineChartProps {
  dimensions?: Dimensions;
}

const SVG_MARGIN = 2;

export function Chart({
  data,
  dimensions,
  accessibilityLabel,
  isAnimated = false,
  offsetLeft = 0,
  offsetRight = 0,
  theme,
}: Props) {
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
            color: seriesColors[index],
            ...series,
          };

          return (
            <g key={index}>
              <Series
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                isAnimated={isAnimated}
                svgDimensions={{height, width}}
                theme={selectedTheme}
              />
            </g>
          );
        })}
      </svg>
    </React.Fragment>
  );
}
