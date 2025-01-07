import type {ReactNode} from 'react';
import {Fragment, useMemo} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  LinearGradientWithStops,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {useFunnelBarScaling} from '../../hooks';
import {
  FunnelChartConnector,
  FunnelChartConnectorGradient,
} from '../shared/FunnelChartConnector';
import {FunnelChartSegment} from '../shared';
import {ChartElements} from '../ChartElements';

import {FunnelChartLabels} from './components';
import {
  LABELS_HEIGHT,
  LINE_GRADIENT,
  LINE_OFFSET,
  LINE_WIDTH,
  GAP,
  SEGMENT_WIDTH_RATIO,
} from './constants';

export interface ChartProps {
  data: DataSeries[];
  seriesNameFormatter: LabelFormatter;
  labelFormatter: LabelFormatter;
  percentageFormatter?: (value: number) => string;
  renderScaleIconTooltipContent?: () => ReactNode;
}

export function Chart({
  data,
  seriesNameFormatter,
  labelFormatter,
  percentageFormatter = (value: number) => {
    return labelFormatter(value);
  },
  renderScaleIconTooltipContent,
}: ChartProps) {
  const {containerBounds} = useChartContext();
  const dataSeries = data[0].data;
  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];
  const sanitizedYValues = yValues.map((value) => Math.max(0, value));

  const {width: drawableWidth, height: drawableHeight} = containerBounds ?? {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  };

  const highestYValue = Math.max(...sanitizedYValues);

  const yScale = scaleLinear()
    .range([0, drawableHeight - LABELS_HEIGHT])
    .domain([0, highestYValue]);

  const {getBarHeight, shouldApplyScaling} = useFunnelBarScaling({
    yScale,
    values: sanitizedYValues,
  });

  const labels = useMemo(
    () => dataSeries.map(({key}) => seriesNameFormatter(key)),
    [dataSeries, seriesNameFormatter],
  );

  const totalStepWidth = drawableWidth / xValues.length;
  const connectorWidth = totalStepWidth * (1 - SEGMENT_WIDTH_RATIO);
  const drawableWidthWithLastConnector = drawableWidth + connectorWidth;

  const xScale = scaleBand()
    .domain(xValues)
    .range([0, drawableWidthWithLastConnector]);

  const labelXScale = scaleBand()
    .range([0, drawableWidthWithLastConnector])
    .domain(labels.map((_, index) => index.toString()));

  const sectionWidth = xScale.bandwidth();
  const barWidth = sectionWidth * SEGMENT_WIDTH_RATIO;
  const lineGradientId = useMemo(() => uniqueId('line-gradient'), []);

  const firstPoint = dataSeries[0];

  const calculatePercentage = (value: number, total: number) => {
    const sanitizedValue = Math.max(0, value);
    const sanitizedTotal = Math.max(0, total);
    return sanitizedTotal === 0 ? 0 : (sanitizedValue / sanitizedTotal) * 100;
  };

  const percentages = dataSeries.map((dataPoint) => {
    const firstValue = firstPoint?.value ?? 0;
    return percentageFormatter(
      calculatePercentage(dataPoint.value ?? 0, firstValue),
    );
  });

  const formattedValues = dataSeries.map((dataPoint) => {
    return labelFormatter(dataPoint.value);
  });

  return (
    <ChartElements.Svg height={drawableHeight} width={drawableWidth}>
      <g>
        <FunnelChartConnectorGradient />

        <LinearGradientWithStops
          gradient={LINE_GRADIENT}
          id={lineGradientId}
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
        />
        <g>
          <FunnelChartLabels
            formattedValues={formattedValues}
            labels={labels}
            labelWidth={sectionWidth}
            barWidth={barWidth}
            percentages={percentages}
            xScale={labelXScale}
            shouldApplyScaling={shouldApplyScaling}
            renderScaleIconTooltipContent={renderScaleIconTooltipContent}
          />
        </g>

        {dataSeries.map((dataPoint, index: number) => {
          const nextPoint = dataSeries[index + 1];
          const xPosition = xScale(dataPoint.key.toString());
          const x = xPosition == null ? 0 : xPosition;
          const isLast = index === dataSeries.length - 1;
          const barHeight = getBarHeight(dataPoint.value || 0);
          const nextBarHeight = getBarHeight(nextPoint?.value || 0);

          return (
            <Fragment key={dataPoint.key}>
              <g key={dataPoint.key} role="listitem">
                <FunnelChartSegment
                  ariaLabel={`${seriesNameFormatter(
                    dataPoint.key,
                  )}: ${labelFormatter(dataPoint.value)}`}
                  barHeight={barHeight}
                  barWidth={barWidth}
                  index={index}
                  isLast={isLast}
                  shouldApplyScaling={shouldApplyScaling}
                  x={x}
                >
                  {!isLast && (
                    <FunnelChartConnector
                      drawableHeight={drawableHeight}
                      height={drawableHeight}
                      index={index}
                      nextX={
                        (xScale(nextPoint?.key.toString()) ?? 0) - LINE_OFFSET
                      }
                      nextY={drawableHeight - nextBarHeight}
                      startX={x + barWidth + GAP}
                      startY={drawableHeight - barHeight}
                    />
                  )}
                </FunnelChartSegment>
                {index > 0 && (
                  <rect
                    y={0}
                    x={x - (LINE_OFFSET - LINE_WIDTH)}
                    width={LINE_WIDTH}
                    height={drawableHeight}
                    fill={`url(#${lineGradientId})`}
                  />
                )}
              </g>
            </Fragment>
          );
        })}
      </g>
    </ChartElements.Svg>
  );
}
