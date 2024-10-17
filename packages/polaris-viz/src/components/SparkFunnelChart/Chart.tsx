import {Fragment, useCallback} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {
  BoundingRect,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {getFunnelBarHeight} from '../FunnelChartNext';
import {FunnelChartConnectorGradient} from '../shared/FunnelChartConnector';
import {FunnelChartConnector, FunnelChartSegment} from '../shared';
import {ChartElements} from '../ChartElements';

import type {SparkFunnelChartProps} from './SparkFunnelChart';

export interface ChartProps {
  data: DataSeries[];
  tooltipLabels: SparkFunnelChartProps['tooltipLabels'];
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: BoundingRect;
}

const LINE_OFFSET = 1;
const GAP = 1;

export function Chart({data, dimensions}: ChartProps) {
  const dataSeries = data[0].data;

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

  const {width: drawableWidth, height: drawableHeight} = dimensions ?? {
    width: 0,
    height: 0,
  };

  const xScale = scaleBand().domain(xValues).range([0, drawableWidth]);

  const yScale = scaleLinear()
    .range([0, drawableHeight])
    .domain([0, Math.max(...yValues)]);

  const sectionWidth = xScale.bandwidth();
  const barWidth = sectionWidth * 0.75;

  const getBarHeight = useCallback(
    (rawValue: number) => getFunnelBarHeight(rawValue, yScale),
    [yScale],
  );

  return (
    <ChartElements.Svg height={drawableHeight} width={drawableWidth}>
      <FunnelChartConnectorGradient />

      {dataSeries.map((dataPoint, index: number) => {
        const nextPoint = dataSeries[index + 1];
        const xPosition = xScale(dataPoint.key as string);
        const x = xPosition == null ? 0 : xPosition;
        const nextBarHeight = getBarHeight(nextPoint?.value || 0);

        const barHeight = getBarHeight(dataPoint.value || 0);
        const isLast = index === dataSeries.length - 1;

        return (
          <Fragment key={dataPoint.key}>
            <g key={dataPoint.key} role="listitem">
              <FunnelChartSegment
                ariaLabel={`${dataPoint.key}: ${dataPoint.value}`}
                barHeight={barHeight}
                barWidth={barWidth}
                drawableHeight={drawableHeight}
                index={index}
                isLast={isLast}
                x={x}
              >
                {!isLast && (
                  <FunnelChartConnector
                    drawableHeight={drawableHeight}
                    height={drawableHeight}
                    index={index}
                    nextX={
                      (xScale(nextPoint?.key as string) ?? 0) - LINE_OFFSET
                    }
                    nextY={drawableHeight - nextBarHeight}
                    startX={x + barWidth + GAP}
                    startY={drawableHeight - barHeight}
                  />
                )}
              </FunnelChartSegment>
            </g>
          </Fragment>
        );
      })}
    </ChartElements.Svg>
  );
}
