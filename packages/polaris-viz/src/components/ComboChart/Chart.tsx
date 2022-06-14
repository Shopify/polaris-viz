import React, {useMemo, useState} from 'react';
import {
  LABEL_AREA_TOP_SPACING,
  useTheme,
  XAxisOptions,
  Y_AXIS_CHART_SPACING,
} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';
import type {DataGroup} from '@shopify/polaris-viz-core/src/types';

import {useReducedLabelIndexes} from '../../hooks';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {YAxis} from '../YAxis';
import {useLegend} from '../LegendContainer';
import {XMLNS} from '../../constants';

import {useDualAxisTicks} from './hooks/useDualAxisTicks';
import {useDualAxisTicksWidth} from './hooks/useDualAxisTickWidths';
import {useDualAxisScale} from './hooks/useDualAxisScale';
import {useXScale} from './hooks/useXScale';
import styles from './Chart.scss';
import {ComboChartXAxisLabels} from './components';

export interface ChartProps {
  data: DataGroup[];
  isAnimated: boolean;
  showLegend: boolean;
  theme: string;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({
  data,
  dimensions,
  showLegend,
  theme,
  xAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);

  const [labelHeight, setLabelHeight] = useState(0);

  const {height, width} = useLegend({
    data: data[0].series,
    dimensions,
    showLegend,
  });

  const drawableHeight =
    height - labelHeight - LABEL_AREA_TOP_SPACING - /* Margin.Top*/ 0;

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
  const chartYPosition = 0;
  const labelsYPosition =
    chartYPosition + drawableHeight + LABEL_AREA_TOP_SPACING;

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

  const {xScale, labels} = useXScale({drawableWidth, data, xAxisOptions});

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: labels.length,
  });

  const hideXAxis = false;

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

        {hideXAxis ? null : (
          <ComboChartXAxisLabels
            chartHeight={height}
            chartX={chartXPosition}
            chartY={labelsYPosition}
            labels={labels}
            labelWidth={drawableWidth / labels.length}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={reducedLabelIndexes}
            theme={theme}
            xScale={xScale}
          />
        )}

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
