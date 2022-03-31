import React, {useMemo} from 'react';
import {
  LABEL_AREA_TOP_SPACING,
  useTheme,
  Y_AXIS_CHART_SPACING,
} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import {HorizontalGridLines} from '../../components/HorizontalGridLines';
import {YAxis} from '../YAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {useColorVisionEvents, useYScale} from '../../hooks';
import {XMLNS, COLOR_VISION_SINGLE_ITEM} from '../../constants';

import styles from './Chart.scss';
import type {MixedChartDataSeries} from './types';
import {useDualAxisTicks} from './hooks/use-dual-axis-ticks';
import {useDualAxisTicksWidth} from './hooks/use-dual-axis-tick-widths';
import {MixedVerticalBarChart} from './components/MixedVerticalBarChart';
import {MixedLineChart} from './components/MixedLineChart';
import {useDualAxisScale} from './hooks/use-dual-axis-scale';

export interface ChartProps {
  data: MixedChartDataSeries[];
  isAnimated: boolean;
  showLegend: boolean;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({data, dimensions, showLegend, theme}: ChartProps) {
  const selectedTheme = useTheme(theme);

  const {legend, setLegendHeight, height, width} = useLegend({
    data: data[0].series,
    dimensions,
    showLegend,
  });

  useColorVisionEvents(data.length > 1);

  // const drawableHeight = height - LABEL_AREA_TOP_SPACING;
  const drawableHeight = height;

  const {
    doesOneChartContainAllNegativeValues,
    doBothChartsContainMixedValues,
    leftTicks,
    primaryAxis,
    rightTicks,
    secondaryAxis,
    yScale,
    shouldPlaceZeroInMiddleOfChart,
  } = useDualAxisTicks({
    data,
    drawableHeight,
  });
  const {leftTickWidth, rightTickWidth} = useDualAxisTicksWidth(
    leftTicks,
    rightTicks,
  );

  const {secondaryDrawableHeight, barYScale, lineYScale} = useDualAxisScale({
    doesOneChartContainAllNegativeValues,
    doBothChartsContainMixedValues,
    drawableHeight,
    primaryAxis,
    secondaryAxis,
    yScale,
    shouldPlaceZeroInMiddleOfChart,
  });

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  const chartStartPosition =
    leftTickWidth + Y_AXIS_CHART_SPACING + horizontalMargin;
  const drawableWidth =
    width - chartStartPosition - horizontalMargin * 2 - rightTickWidth;

  const {barChartData, lineChartData} = useMemo(() => {
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
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartStartPosition,
              y: 0,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(${horizontalMargin},0)`} aria-hidden="true">
          <rect height={drawableHeight} width={leftTickWidth} fill="blue" />
          <YAxis
            ticks={leftTicks}
            textAlign="right"
            width={leftTickWidth}
            theme={theme}
          />
        </g>

        <g transform={`translate(${chartStartPosition},0)`}>
          <rect
            height={drawableHeight}
            width={drawableWidth}
            fill="rgba(255,255,255,0.25)"
          />

          <MixedVerticalBarChart
            data={barChartData}
            drawableHeight={drawableHeight}
            drawableWidth={drawableWidth}
            theme={theme}
            yScale={barYScale}
            // xAxisOptions={}
          />

          <MixedLineChart
            data={lineChartData}
            drawableHeight={drawableHeight}
            drawableWidth={drawableWidth}
            theme={theme}
            yScale={lineYScale}
            // xAxisOptions={}
          />
        </g>

        <g
          transform={`translate(${
            chartStartPosition + drawableWidth + Y_AXIS_CHART_SPACING
          },0)`}
          aria-hidden="true"
        >
          <rect height={drawableHeight} width={rightTickWidth} fill="blue" />

          <YAxis
            ticks={rightTicks}
            textAlign="left"
            width={rightTickWidth}
            theme={theme}
          />
        </g>

        {/* <rect
          y={lineYScale(0)}
          height={10}
          width={drawableWidth}
          fill="white"
        />

        <rect
          y={lineYScale(100)}
          height={10}
          width={drawableWidth}
          fill="white"
        />

        <rect
          y={lineYScale(500)}
          height={10}
          width={drawableWidth}
          fill="white"
        /> */}
      </svg>

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onHeightChange={setLegendHeight}
          theme={theme}
        />
      )}
    </div>
  );
}
