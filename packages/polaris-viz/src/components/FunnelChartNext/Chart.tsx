import type {ReactNode} from 'react';
import {Fragment, useMemo, useCallback, useState} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {
  DataSeries,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  LinearGradientWithStops,
  useChartContext,
} from '@shopify/polaris-viz-core';
import {createPortal} from 'react-dom';

import {TOOLTIP_ROOT_ID} from '../TooltipWrapper/constants';
import {useRootContainer} from '../../hooks/useRootContainer';
import {FunnelChartConnectorGradient} from '../shared/FunnelChartConnector';
import {FunnelChartSegment} from '../shared';
import {SingleTextLine} from '../Labels';
import {ChartElements} from '../ChartElements';

import {FunnelChartXAxisLabels, Tooltip, FunnelConnector} from './components/';
import {calculateDropOff} from './utilities/calculate-dropoff';
import type {FunnelChartNextProps} from './FunnelChartNext';
import {getFunnelBarHeight} from './utilities/get-funnel-bar-height';
import {FunnelTooltip} from './components/FunnelTooltip/FunnelTooltip';
import {
  FUNNEL_CONNECTOR_Y_OFFSET,
  TOOLTIP_WIDTH,
  LABELS_HEIGHT,
  PERCENTAGE_SUMMARY_HEIGHT,
  SCALING_RATIO_THRESHOLD,
  LINE_GRADIENT,
  PERCENTAGE_COLOR,
  LINE_OFFSET,
  LINE_WIDTH,
  GAP,
  SHORT_TOOLTIP_HEIGHT,
  TOOLTIP_HEIGHT,
} from './constants';

export interface ChartProps {
  data: DataSeries[];
  showConnectionPercentage: boolean;
  tooltipLabels: FunnelChartNextProps['tooltipLabels'];
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
}

export function Chart({
  data,
  showConnectionPercentage,
  tooltipLabels,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const {containerBounds} = useChartContext();

  const dataSeries = data[0].data;

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

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

  const labels = useMemo(
    () => dataSeries.map(({key}) => xAxisOptions.labelFormatter(key)),
    [dataSeries, xAxisOptions],
  );

  const xScale = scaleBand().domain(xValues).range([0, drawableWidth]);

  const labelXScale = scaleBand()
    .range([0, drawableWidth])
    .domain(labels.map((_, index) => index.toString()));

  const highestYValue = Math.max(...yValues);
  const lowestYValue = Math.min(...yValues);
  const connectionPercentageHeight = showConnectionPercentage
    ? FUNNEL_CONNECTOR_Y_OFFSET / 2
    : 0;

  const yScale = scaleLinear()
    .range([
      0,
      drawableHeight -
        LABELS_HEIGHT -
        PERCENTAGE_SUMMARY_HEIGHT -
        connectionPercentageHeight,
    ])
    .domain([0, highestYValue]);

  const tallestBarHeight = yScale(highestYValue);
  const smallestBarHeight = yScale(lowestYValue);

  const heightRatio = smallestBarHeight / tallestBarHeight;
  const shouldApplyScaling = heightRatio <= SCALING_RATIO_THRESHOLD;

  const sectionWidth = xScale.bandwidth();
  const barWidth = sectionWidth * 0.75;

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const barHeight = getFunnelBarHeight(rawValue, yScale);

      if (!shouldApplyScaling || barHeight === tallestBarHeight) {
        return barHeight;
      }

      // Scale up segments to ensure smallest is at least 25% of tallest
      const minHeightRatio = 0.25;
      const currentRatio = smallestBarHeight / tallestBarHeight;
      const scaleFactor = minHeightRatio / currentRatio;

      // Ensure we don't scale larger than the first segment
      return Math.min(barHeight * scaleFactor, tallestBarHeight * 0.9);
    },
    [yScale, shouldApplyScaling, smallestBarHeight, tallestBarHeight],
  );

  const lineGradientId = useMemo(() => uniqueId('line-gradient'), []);

  const lastPoint = dataSeries.at(-1);
  const firstPoint = dataSeries[0];

  const percentages = dataSeries.map((dataPoint) => {
    const yAxisValue = dataPoint.value;

    const percentCalculation =
      firstPoint?.value && yAxisValue
        ? (yAxisValue / firstPoint.value) * 100
        : 0;

    return formatPercentage(percentCalculation);
  });

  const formattedValues = dataSeries.map((dataPoint) => {
    return yAxisOptions.labelFormatter(dataPoint.value);
  });

  const mainPercentage = formatPercentage(
    ((lastPoint?.value ?? 0) / (firstPoint?.value ?? 0)) * 100,
  );

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

        <SingleTextLine
          color={PERCENTAGE_COLOR}
          fontWeight={600}
          targetWidth={drawableWidth}
          fontSize={24}
          text={mainPercentage}
          willTruncate={false}
        />

        {xAxisOptions.hide === false && (
          <g transform={`translate(0,${PERCENTAGE_SUMMARY_HEIGHT})`}>
            <FunnelChartXAxisLabels
              formattedValues={formattedValues}
              labels={labels}
              labelWidth={sectionWidth}
              percentages={percentages}
              xScale={labelXScale}
            />
          </g>
        )}

        {dataSeries.map((dataPoint, index: number) => {
          const nextPoint = dataSeries[index + 1];
          const xPosition = xScale(dataPoint.key.toString());
          const x = xPosition == null ? 0 : xPosition;
          const isLast = index === dataSeries.length - 1;
          const barHeight = getBarHeight(dataPoint.value || 0);
          const nextBarHeight = getBarHeight(nextPoint?.value || 0);
          const percentCalculation = calculateDropOff(
            dataPoint?.value ?? 0,
            nextPoint?.value ?? 0,
          );
          const formattedPercent = formatPercentage(percentCalculation);

          return (
            <Fragment key={dataPoint.key}>
              <g key={dataPoint.key} role="listitem">
                <FunnelChartSegment
                  ariaLabel={`${xAxisOptions.labelFormatter(
                    dataPoint.key,
                  )}: ${yAxisOptions.labelFormatter(dataPoint.value)}`}
                  barHeight={barHeight}
                  barWidth={barWidth}
                  drawableHeight={drawableHeight}
                  index={index}
                  isLast={isLast}
                  onMouseEnter={(index) => setTooltipIndex(index)}
                  onMouseLeave={() => setTooltipIndex(null)}
                  shouldApplyScaling={shouldApplyScaling}
                  x={x}
                >
                  {!isLast && (
                    <FunnelConnector
                      drawableHeight={drawableHeight}
                      height={drawableHeight}
                      index={index}
                      nextX={
                        (xScale(nextPoint?.key as string) ?? 0) - LINE_OFFSET
                      }
                      nextY={drawableHeight - nextBarHeight}
                      percentCalculation={formattedPercent}
                      showConnectionPercentage={showConnectionPercentage}
                      startX={x + barWidth + GAP}
                      startY={drawableHeight - barHeight}
                      width={sectionWidth - barWidth}
                    />
                  )}
                </FunnelChartSegment>
                {index > 0 && (
                  <rect
                    y={PERCENTAGE_SUMMARY_HEIGHT}
                    x={x - (LINE_OFFSET - LINE_WIDTH)}
                    width={LINE_WIDTH}
                    height={drawableHeight - PERCENTAGE_SUMMARY_HEIGHT}
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
    if (tooltipIndex == null) {
      return null;
    }

    const tooltipHeight =
      tooltipIndex === dataSeries.length - 1
        ? SHORT_TOOLTIP_HEIGHT
        : TOOLTIP_HEIGHT;

    const activeDataSeries = dataSeries[tooltipIndex];

    if (activeDataSeries == null) {
      return null;
    }

    const xPosition = getXPosition();
    const yPosition = getYPosition();

    return (
      <FunnelTooltip x={xPosition} y={yPosition}>
        <Tooltip
          activeIndex={tooltipIndex}
          dataSeries={dataSeries}
          isLast={tooltipIndex === dataSeries.length - 1}
          tooltipLabels={tooltipLabels}
          yAxisOptions={yAxisOptions}
        />
      </FunnelTooltip>
    );

    function getXPosition() {
      if (tooltipIndex === 0) {
        // Push the tooltip beside the bar
        return chartX + barWidth + 10;
      }

      // Center the tooltip over the bar
      const xOffset = (barWidth - TOOLTIP_WIDTH) / 2;
      return chartX + (xScale(activeDataSeries.key.toString()) ?? 0) + xOffset;
    }

    function getYPosition() {
      const barHeight = getBarHeight(activeDataSeries.value ?? 0);
      const yPosition = chartY + drawableHeight - barHeight;

      if (tooltipIndex === 0) {
        return yPosition;
      }

      return yPosition - tooltipHeight;
    }
  }

  function formatPercentage(value: number) {
    return `${yAxisOptions.labelFormatter(isNaN(value) ? 0 : value)}%`;
  }
}

function TooltipWithPortal({children}: {children: ReactNode}) {
  const container = useRootContainer(TOOLTIP_ROOT_ID);

  return createPortal(children, container);
}
