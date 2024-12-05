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
import {FUNNEL_CONNECTOR_Y_OFFSET, TOOLTIP_WIDTH} from './constants';

export interface ChartProps {
  data: DataSeries[];
  showConnectionPercentage: boolean;
  tooltipLabels: FunnelChartNextProps['tooltipLabels'];
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
}

const LINE_OFFSET = 3;
const LINE_WIDTH = 1;
const TOOLTIP_HEIGHT = 90;
const SHORT_TOOLTIP_HEIGHT = 65;
const GAP = 1;

const PERCENTAGE_COLOR = 'rgba(48, 48, 48, 1)';
const LINE_GRADIENT = [
  {
    color: 'rgba(227, 227, 227, 1)',
    offset: 0,
  },
  {
    color: 'rgba(227, 227, 227, 0)',
    offset: 100,
  },
];

const LABELS_HEIGHT = 80;
const PERCENTAGE_SUMMARY_HEIGHT = 30;

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

  const sectionWidth = xScale.bandwidth();
  const barWidth = sectionWidth * 0.75;

  const getBarHeight = useCallback(
    (rawValue: number) => getFunnelBarHeight(rawValue, yScale),
    [yScale],
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

  return (
    <ChartElements.Svg height={drawableHeight} width={drawableWidth}>
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
        const nextBarHeight = getBarHeight(nextPoint?.value || 0);

        const percentCalculation = calculateDropOff(
          dataPoint?.value ?? 0,
          nextPoint?.value ?? 0,
        );

        const barHeight = getBarHeight(dataPoint.value || 0);
        const formattedPercent = formatPercentage(percentCalculation);
        const isLast = index === dataSeries.length - 1;

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
                tallestBarHeight={tallestBarHeight}
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
      const yPosition =
        chartY + drawableHeight - yScale(activeDataSeries.value ?? 0);

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
