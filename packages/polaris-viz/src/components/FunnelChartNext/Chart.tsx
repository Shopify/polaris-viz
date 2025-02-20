import type {ReactNode} from 'react';
import {Fragment, useMemo, useState} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {
  DataPoint,
  DataSeries,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  LinearGradientWithStops,
  useChartContext,
  clamp,
} from '@shopify/polaris-viz-core';

import {SCROLLBAR_WIDTH} from '../TooltipWrapper';
import {useFunnelBarScaling} from '../../hooks';
import {
  FunnelChartConnector,
  FunnelChartConnectorGradient,
} from '../shared/FunnelChartConnector';
import {FunnelChartSegment} from '../shared';
import {ChartElements} from '../ChartElements';

import {
  FunnelChartLabels,
  FunnelTooltip,
  Tooltip,
  TooltipWithPortal,
} from './components';
import {
  LABELS_HEIGHT,
  LINE_GRADIENT,
  LINE_OFFSET,
  LINE_WIDTH,
  GAP,
  SEGMENT_WIDTH_RATIO,
  TOOLTIP_HORIZONTAL_OFFSET,
  TOOLTIP_HEIGHT,
  TOOLTIP_WIDTH,
  TOOLTIP_RIGHT_POSITION_THRESHOLD,
} from './constants';
import {useBuildFunnelTrends} from './utilities/useBuildFunnelTrends';

export interface ChartProps {
  data: DataSeries[];
  tooltipLabels: {
    reached: string;
    dropped: string;
  };
  showTooltip?: boolean;
  seriesNameFormatter: LabelFormatter;
  labelFormatter: LabelFormatter;
  percentageFormatter?: (value: number) => string;
  renderScaleIconTooltipContent?: () => ReactNode;
}

export function Chart({
  data,
  tooltipLabels,
  showTooltip = true,
  seriesNameFormatter,
  labelFormatter,
  percentageFormatter = (value: number) => {
    return labelFormatter(value);
  },
  renderScaleIconTooltipContent,
}: ChartProps) {
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const {containerBounds} = useChartContext();
  const dataSeries = data[0].data;
  const calculatedTrends = useBuildFunnelTrends({data, percentageFormatter});
  const trends = calculatedTrends?.trends;
  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];
  const sanitizedYValues = yValues.map((value) => Math.max(0, value));

  const {
    width: drawableWidth,
    height: drawableHeight,
    x: chartX,
    y: chartY,
  } = containerBounds ?? {
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

  const handleChartBlur = (event: React.FocusEvent) => {
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget as Node;

    if (!currentTarget.contains(relatedTarget)) {
      setTooltipIndex(null);
    }
  };

  return (
    <ChartElements.Svg height={drawableHeight} width={drawableWidth}>
      <g onBlur={handleChartBlur}>
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
            trends={trends}
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
                  onMouseEnter={(index) =>
                    showTooltip && setTooltipIndex(index)
                  }
                  onMouseLeave={() => showTooltip && setTooltipIndex(null)}
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
        <TooltipWithPortal>{getTooltipMarkup()}</TooltipWithPortal>
      </g>
    </ChartElements.Svg>
  );

  function getTooltipMarkup() {
    if (!showTooltip || tooltipIndex == null || !dataSeries[tooltipIndex]) {
      return null;
    }

    const activeDataSeries = dataSeries[tooltipIndex];
    const xPosition = getXPosition(activeDataSeries);
    const yPosition = getYPosition(activeDataSeries);

    return (
      <FunnelTooltip x={xPosition} y={yPosition}>
        <Tooltip
          activeIndex={tooltipIndex}
          dataSeries={dataSeries}
          trends={trends}
          tooltipLabels={tooltipLabels}
          labelFormatter={labelFormatter}
          percentageFormatter={percentageFormatter}
        />
      </FunnelTooltip>
    );
  }

  function getXPosition(activeDataSeries: DataPoint) {
    const currentX = xScale(activeDataSeries.key.toString()) ?? 0;
    let xPosition;

    if (shouldPositionTooltipRight(activeDataSeries)) {
      xPosition = chartX + currentX + barWidth + TOOLTIP_HORIZONTAL_OFFSET;
    } else {
      const xOffset = (barWidth - TOOLTIP_WIDTH) / 2;
      xPosition = chartX + currentX + xOffset;
    }

    // Clamp the position to ensure tooltip stays within viewport
    return clamp({
      amount: xPosition,
      min: TOOLTIP_HORIZONTAL_OFFSET,
      max:
        window.innerWidth -
        TOOLTIP_WIDTH -
        TOOLTIP_HORIZONTAL_OFFSET -
        SCROLLBAR_WIDTH,
    });
  }

  function getYPosition(activeDataSeries: DataPoint) {
    const barHeight = getBarHeight(activeDataSeries.value ?? 0);
    const yPosition = chartY + drawableHeight - barHeight;

    if (shouldPositionTooltipRight(activeDataSeries)) {
      return yPosition;
    }

    return yPosition - TOOLTIP_HEIGHT;
  }

  function getBarHeightPercentage(value: number) {
    const barHeight = getBarHeight(value ?? 0);
    const maxBarHeight = getBarHeight(highestYValue);
    return (barHeight / maxBarHeight) * 100;
  }

  function shouldPositionTooltipRight(activeDataSeries: DataPoint) {
    return (
      tooltipIndex === 0 ||
      getBarHeightPercentage(activeDataSeries.value ?? 0) >
        TOOLTIP_RIGHT_POSITION_THRESHOLD
    );
  }
}
