import {Fragment} from 'react';
import {scaleLinear} from 'd3-scale';
import {
  LineSeries,
  STROKE_DOT_ARRAY_WIDTH,
  useChartContext,
  useFilteredSparkLineData,
  useSparkLine,
  useThemeSeriesColors,
} from '@shopify/polaris-viz-core';

import {useTheme} from '../../hooks';
import {XMLNS} from '../../constants';

import styles from './SparkLineChart.scss';
import type {SparkLineChartProps} from './SparkLineChart';

const SVG_MARGIN = 2;

export function Chart({
  data,
  accessibilityLabel,
  offsetLeft = 0,
  offsetRight = 0,
}: SparkLineChartProps) {
  const {theme, containerBounds} = useChartContext();
  const selectedTheme = useTheme();

  const filteredData = useFilteredSparkLineData(data);
  const seriesColors = useThemeSeriesColors(filteredData, selectedTheme);

  const {width, height} = containerBounds;

  const {minXDomain, maxXDomain, yScale} = useSparkLine({
    data: filteredData,
    height,
  });

  return (
    <Fragment>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg xmlns={XMLNS} aria-hidden width={width} height={height}>
        {filteredData.map((series, index) => {
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
            strokeDasharray: series.isComparison
              ? STROKE_DOT_ARRAY_WIDTH
              : 'none',
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
                svgDimensions={{height, width}}
                theme={theme}
                type="spark"
              />
            </g>
          );
        })}
      </svg>
    </Fragment>
  );
}
