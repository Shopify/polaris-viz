import React, {useMemo, useState, useCallback} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import {
  DataSeries,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
  uniqueId,
  isGradientType,
  LinearGradientWithStops,
  GradientStop,
  RoundedBorder,
} from '@shopify/polaris-viz-core';

import {BarChartXAxisLabels} from '../BarChartXAxisLabels';
import {Bar} from '../shared';
import {useTheme, useReducedLabelIndexes} from '../../hooks';
import {getAverageColor, changeColorOpacity} from '../../utilities';
import {XMLNS, MASK_HIGHLIGHT_COLOR, MIN_BAR_HEIGHT} from '../../constants';

export interface ChartProps {
  data: DataSeries[];
  dimensions?: Dimensions;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions?: Required<YAxisOptions>;
  theme?: string;
}

export function Chart({data, dimensions, theme, xAxisOptions}: ChartProps) {
  const [labelHeight, setLabelHeight] = useState(0);
  const dataSeries = data[0].data;

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

  const {width, height} = dimensions || {width: 0, height: 0};

  const labels = useMemo(
    () => dataSeries.map(({key}) => xAxisOptions.labelFormatter(key)),
    [dataSeries, xAxisOptions],
  );

  const xScale = scaleBand()
    .domain(xValues)
    .range([0, width])
    .paddingInner(0.5);

  const labelXScale = scaleBand()
    .range([0, width])
    .paddingInner(0.5)
    .paddingOuter(0)
    .domain(labels.map((_, index) => index.toString()));

  const drawableHeight = height - labelHeight;

  const yScale = scaleLinear()
    .range([0, drawableHeight])
    .domain([0, Math.max(...yValues)]);

  const barWidth = xScale.bandwidth();

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
      const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [yScale],
  );

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: data[0] ? data[0].data.length : 0,
  });

  const firstDataPoint = data[0];
  const barsGradient = isGradientType(firstDataPoint.color!)
    ? firstDataPoint.color
    : ([{color: firstDataPoint.color, offset: 0}] as GradientStop[]);

  const averageColor = getAverageColor(
    barsGradient[0].color,
    barsGradient.length > 1 ? barsGradient[1].color : barsGradient[0].color,
  );

  const connectorGradientId = useMemo(() => uniqueId('connector-gradient'), []);

  const {
    chartContainer: {backgroundColor},
  } = useTheme(theme);

  const connectorGradient = [
    {
      color: changeColorOpacity(averageColor, 0.3),
      offset: 0,
    },
    {
      color: backgroundColor,
      offset: 100,
    },
  ];

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  return (
    <svg role="list" viewBox={`0 0 ${width} ${height}`} xmlns={XMLNS}>
      <BarChartXAxisLabels
        chartHeight={height}
        chartX={0}
        chartY={drawableHeight}
        labels={labels}
        labelWidth={barWidth}
        onHeightChange={setLabelHeight}
        reducedLabelIndexes={reducedLabelIndexes}
        theme={theme}
        xScale={labelXScale}
      />

      <g mask={`url(#${maskId}-${theme}-grad)`}>
        <LinearGradientWithStops gradient={barsGradient} id={`${gradientId}`} />
        <rect
          x={0}
          y={0}
          width={width}
          height={drawableHeight}
          fill={`url(#${gradientId})`}
        />
      </g>

      <mask id={`${maskId}-${theme}-grad`}>
        {dataSeries.map((dataPoint) => {
          const barHeight = getBarHeight(dataPoint.value || 0);
          const xPosition = xScale(dataPoint.key as string);
          const x = xPosition == null ? 0 : xPosition;

          return (
            <React.Fragment key={dataPoint.key}>
              <Bar
                width={barWidth}
                height={barHeight}
                color={MASK_HIGHLIGHT_COLOR}
                x={x}
                y={drawableHeight - barHeight}
                roundedBorder={RoundedBorder.Top}
              />
            </React.Fragment>
          );
        })}
      </mask>

      {dataSeries.map((dataPoint, index) => {
        const nextPoint = dataSeries[index + 1];
        const xPosition = xScale(dataPoint.key as string);
        const x = xPosition == null ? 0 : xPosition;
        const nextBarHeight = getBarHeight(nextPoint?.value || 0);

        return (
          <React.Fragment key={dataPoint.key}>
            <g mask={`url(#${connectorGradientId}-${index})`}>
              <LinearGradientWithStops
                gradient={connectorGradient}
                id={connectorGradientId}
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              />
              <rect
                x={x + barWidth}
                y={0}
                width={barWidth}
                height={drawableHeight}
                fill={`url(#${connectorGradientId})`}
              />
            </g>

            <mask id={`${connectorGradientId}-${index}`}>
              <Connector
                height={drawableHeight}
                startX={x + barWidth}
                startY={drawableHeight - nextBarHeight}
                nextX={xScale(nextPoint?.key as string)}
                nextY={drawableHeight - nextBarHeight}
                nextPoint={nextPoint}
              />
            </mask>
          </React.Fragment>
        );
      })}
    </svg>
  );
}

function Connector({
  height,
  nextPoint,
  nextX,
  nextY,
  startX,
  startY,
  fill = MASK_HIGHLIGHT_COLOR,
}) {
  if (nextPoint == null) {
    return null;
  }

  return (
    <path
      d={`M${startX} ${startY} L ${nextX} ${nextY} V ${height} H ${startX} Z`}
      fill={fill}
    />
  );
}
