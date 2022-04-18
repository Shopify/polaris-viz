import React, {useMemo} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import {
  uniqueId,
  isGradientType,
  LinearGradientWithStops,
  GradientStop,
} from '@shopify/polaris-viz-core';
import type {DataSeries, Dimensions} from '@shopify/polaris-viz-core';

import {useTheme} from '../../hooks';
import {Bar} from '../shared';
import {getAverageColor, changeColorOpacity} from '../../utilities';
import {XMLNS, MASK_HIGHLIGHT_COLOR} from '../../constants';

export interface ChartProps {
  data: DataSeries[];
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({data, dimensions, theme}: ChartProps) {
  const dataSeries = data[0].data;

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

  const {width, height} = dimensions || {width: 0, height: 0};

  const xScale = scaleBand()
    .domain(xValues)
    .range([0, width])
    .paddingInner(0.5);

  const [min, max] = extent(yValues);
  const yScale = scaleLinear().range([0, height]).domain([min!, max!]);

  const barWidth = xScale.bandwidth();

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
      <g mask={`url(#${maskId}-${theme}-grad)`}>
        <LinearGradientWithStops gradient={barsGradient} id={`${gradientId}`} />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#${gradientId})`}
        />
      </g>

      <mask id={`${maskId}-${theme}-grad`}>
        {dataSeries.map((dataPoint) => {
          const barHeight = yScale(dataPoint.value || 0);
          const xPosition = xScale(dataPoint.key as string);
          const x = xPosition == null ? 0 : xPosition;

          return (
            <React.Fragment key={dataPoint.key}>
              <Bar
                key={dataPoint.key}
                width={barWidth}
                height={barHeight}
                color={MASK_HIGHLIGHT_COLOR}
                x={x}
                y={height - barHeight}
              />
            </React.Fragment>
          );
        })}
      </mask>

      {dataSeries.map((dataPoint, index) => {
        const nextPoint = dataSeries[index + 1];
        const xPosition = xScale(dataPoint.key as string);
        const x = xPosition == null ? 0 : xPosition;
        const nextBarHeight = yScale(nextPoint?.value || 0);

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
                height={height}
                fill={`url(#${connectorGradientId})`}
              />
            </g>

            <mask id={`${connectorGradientId}-${index}`}>
              <Connector
                height={height}
                startX={x + barWidth}
                startY={height - nextBarHeight}
                nextX={xScale(nextPoint?.key as string)}
                nextY={height - nextBarHeight}
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
