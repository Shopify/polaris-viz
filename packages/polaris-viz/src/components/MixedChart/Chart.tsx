import React, {useMemo} from 'react';
import {
  useTheme,
  XAxisOptions,
  Y_AXIS_CHART_SPACING,
} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import {HorizontalGridLines} from '../../components/HorizontalGridLines';
import {YAxis} from '../YAxis';
import {useLegend} from '../LegendContainer';
import {XMLNS} from '../../constants';

import styles from './Chart.scss';
import type {MixedChartDataSeries} from './types';
import {useDualAxisTicks} from './hooks/useDualAxisTicks';
import {useDualAxisTicksWidth} from './hooks/useDualAxisTickWidths';
import {useDualAxisScale} from './hooks/useDualAxisScale';

export interface ChartProps {
  data: MixedChartDataSeries[];
  isAnimated: boolean;
  showLegend: boolean;
  theme: string;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({data, dimensions, showLegend, theme}: ChartProps) {
  const selectedTheme = useTheme(theme);

  const {height, width} = useLegend({
    data: data[0].series,
    dimensions,
    showLegend,
  });

  const drawableHeight = height;

  const {
    doBothChartsContainMixedValues,
    doesOneChartContainAllNegativeValues,
    leftTicks,
    primaryAxis,
    rightTicks,
    secondaryAxis,
    shouldPlaceZeroInMiddleOfChart,
    yScale,
  } = useDualAxisTicks({
    data,
    drawableHeight,
  });

  const {leftTickWidth, rightTickWidth} = useDualAxisTicksWidth(
    leftTicks,
    rightTicks,
  );

  // These are used once we want to render the charts
  // eslint-disable-next-line no-empty-pattern
  const {
    // barYScale,
    // lineYScale
  } = useDualAxisScale({
    doesOneChartContainAllNegativeValues,
    doBothChartsContainMixedValues,
    drawableHeight,
    primaryAxis,
    secondaryAxis,
    yScale,
    shouldPlaceZeroInMiddleOfChart,
  });

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  const chartXPosition =
    leftTickWidth + Y_AXIS_CHART_SPACING + horizontalMargin;
  const drawableWidth =
    width - chartXPosition - horizontalMargin * 2 - rightTickWidth;

  // These are used once we want to render the charts
  // eslint-disable-next-line no-empty-pattern
  const {
    // barChartData,
    // lineChartData
  } = useMemo(() => {
    const barChartDataIndex = data.findIndex(({shape}) => shape === 'Bar');

    return {
      barChartData: data[barChartDataIndex],
      lineChartData: data[barChartDataIndex === 0 ? 1 : 0],
    };
  }, [data]);

  return (
    <div
      className={styles.ChartContainer}
      style={{
        width,
        height,
      }}
    >
      <svg
        className={styles.SVG}
        role="list"
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
      >
        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={leftTicks}
            theme={theme}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: 0,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(${horizontalMargin},0)`} aria-hidden="true">
          <YAxis
            ticks={leftTicks}
            textAlign="right"
            width={leftTickWidth}
            theme={theme}
          />
        </g>

        <g
          transform={`translate(${
            chartXPosition + drawableWidth + Y_AXIS_CHART_SPACING
          },0)`}
          aria-hidden="true"
        >
          <YAxis
            ticks={rightTicks}
            textAlign="left"
            width={rightTickWidth}
            theme={theme}
          />
        </g>
      </svg>
    </div>
  );
}
