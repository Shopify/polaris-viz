import {useState, Fragment} from 'react';
import {
  useYScale,
  LineSeries,
  DEFAULT_THEME_NAME,
  useChartPositions,
  uniqueId,
} from '@shopify/polaris-viz-core';
import type {
  XAxisOptions,
  YAxisOptions,
  LineChartDataSeriesWithDefaults,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {useIndexForLabels} from '../../hooks/useIndexForLabels';
import {XAxis} from '../XAxis';
import {useLegend} from '../LegendContainer';
import {useTheme, useLinearLabelsAndDimensions} from '../../hooks';
import {ChartElements} from '../ChartElements';

import {PointsAndCrosshair} from './components';
import {useFormatData, useFormattedLabels} from './hooks';
import {yAxisMinMax} from './utilities';

export interface ChartProps {
  data: LineChartDataSeriesWithDefaults[];
  emptyStateText?: string;
  seriesNameFormatter: LabelFormatter;
  theme?: string;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  fixedActiveIndex: number;
}

export function Chart({
  emptyStateText,
  data,
  seriesNameFormatter,
  theme = DEFAULT_THEME_NAME,
  xAxisOptions,
  yAxisOptions,
  fixedActiveIndex,
}: ChartProps) {
  const selectedTheme = useTheme(theme);

  const [xAxisHeight, setXAxisHeight] = useState(0);

  const {height, width} = useLegend({
    data: [
      {
        shape: 'Line',
        series: data,
      },
    ],
    showLegend: false,
    seriesNameFormatter,
  });

  const indexForLabels = useIndexForLabels(data);

  const {formattedLabels} = useFormattedLabels({
    data: [data[indexForLabels]],
    labelFormatter: xAxisOptions.labelFormatter,
    indexToKeep: [0, fixedActiveIndex, data[indexForLabels]?.data.length - 1],
  });

  const emptyState =
    data.length === 0 || data.every((series) => series.data.length === 0);

  const {minY, maxY} = yAxisMinMax(data);

  const yScaleOptions = {
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    fixedWidth: yAxisOptions.fixedWidth,
    maxYOverride: yAxisOptions.maxYOverride,
    max: maxY,
    min: minY,
    ticksOverride: yAxisOptions.ticksOverride,
  };

  const {longestSeriesLength, longestSeriesIndex} = useFormatData(data);

  const {
    drawableWidth,
    drawableHeight,
    chartXPosition,
    chartYPosition,
    xAxisBounds,
  } = useChartPositions({
    annotationsHeight: 0,
    height,
    width,
    xAxisHeight,
    yAxisWidth: 0,
  });

  const {xAxisDetails, xScale, labels} = useLinearLabelsAndDimensions({
    data,
    drawableWidth,
    hideXAxis: false,
    labels: formattedLabels,
    longestSeriesLength,
  });

  const {yScale} = useYScale({
    ...yScaleOptions,
    drawableHeight,
    verticalOverflow: selectedTheme.grid.verticalOverflow,
  });

  if (xScale == null || drawableWidth == null) {
    return null;
  }

  const halfXAxisLabelWidth = xAxisDetails.labelWidth / 2;
  const fillColor = data[data.length - 1].color as string;

  return (
    <Fragment>
      <ChartElements.Svg
        emptyState={emptyState}
        emptyStateText={emptyStateText}
        height={height}
        role="table"
        width={width}
      >
        <XAxis
          allowLineWrap={xAxisOptions.allowLineWrap}
          ariaHidden
          labels={labels}
          labelWidth={xAxisDetails.labelWidth}
          onHeightChange={setXAxisHeight}
          x={xAxisBounds.x - halfXAxisLabelWidth}
          xScale={xScale}
          y={xAxisBounds.y}
          activeIndex={fixedActiveIndex}
          fillColor={fillColor}
        />

        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          {data.map((singleSeries, index) => {
            return (
              <LineSeries
                activeLineIndex={-1}
                data={singleSeries}
                index={index}
                key={`${name}-${index}`}
                svgDimensions={{height: drawableHeight, width: drawableWidth}}
                theme={theme}
                xScale={xScale}
                yScale={yScale}
                type="default"
              />
            );
          })}

          <PointsAndCrosshair
            activeIndex={fixedActiveIndex}
            data={data}
            drawableHeight={drawableHeight}
            emptyState={emptyState}
            longestSeriesIndex={longestSeriesIndex}
            theme={theme}
            tooltipId={uniqueId('lineChartCumulative')}
            xScale={xScale}
            yScale={yScale}
          />
        </g>
      </ChartElements.Svg>
    </Fragment>
  );
}
