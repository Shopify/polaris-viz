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

import {Bar} from '../shared';
import {XMLNS} from '../../constants';

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

  const firstDataPoint = data[0];
  const barsGradient = isGradientType(firstDataPoint.color!)
    ? firstDataPoint.color
    : ([{color: firstDataPoint.color, offset: 0}] as GradientStop[]);

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  return (
    <svg role="list" viewBox={`0 0 ${width} ${height}`} xmlns={XMLNS}>
      <g mask={`url(#${maskId}-${theme}-grad)`}>
        <g key={`${maskId}`}>
          <LinearGradientWithStops
            gradient={barsGradient}
            id={`${gradientId}`}
          />
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`url(#${gradientId})`}
          />
        </g>
      </g>

      <mask id={`${maskId}-${theme}-grad`}>
        {dataSeries.map((dataPoint) => {
          const barHeight = yScale(dataPoint.value || 0);
          const xPosition = xScale(dataPoint.key as string);
          const x = xPosition == null ? 0 : xPosition;
          const barWidth = xScale.bandwidth();

          return (
            <React.Fragment key={dataPoint.key}>
              <Bar
                key={dataPoint.key}
                width={barWidth}
                height={barHeight}
                color="salmon"
                x={x}
                y={height - barHeight}
              />
            </React.Fragment>
          );
        })}
      </mask>
    </svg>
  );
}
