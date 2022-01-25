import React from 'react';
import {scaleLinear} from 'd3-scale';

import type {Dimensions} from '../../types';
import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import {useTheme} from '../../hooks';
import {XMLNS} from '../../constants';

import styles from './SparkLineChart.scss';
import {Series} from './components';
import type {SparkLineChartProps} from './SparkLineChart';

const SVG_MARGIN = 2;

interface Props extends SparkLineChartProps {
  dimensions?: Dimensions;
}

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

  const xValues = Array.prototype.concat.apply(
    [],
    data.map(({data}) => data.map(({key}) => key)),
  );

  const minXValues = Math.min(...xValues);
  const maxXValues = Math.max(...xValues);

  const yValues = Array.prototype.concat.apply(
    [],
    data.map(({data}) => data.map(({value}) => value)),
  );

  const yScale = scaleLinear()
    .range([height - SVG_MARGIN, SVG_MARGIN])
    .domain([Math.min(...yValues), Math.max(...yValues)]);

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
