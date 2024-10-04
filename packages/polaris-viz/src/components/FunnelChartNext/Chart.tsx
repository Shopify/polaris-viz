import {Fragment, useMemo, useCallback, useState} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import type {
  BoundingRect,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  LinearGradientWithStops,
  DataType,
} from '@shopify/polaris-viz-core';

import type {TooltipPosition, TooltipPositionParams} from '../TooltipWrapper';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipWrapper,
} from '../TooltipWrapper';
import {SingleTextLine} from '../Labels';
import {ChartElements} from '../ChartElements';
import {MIN_BAR_HEIGHT} from '../../constants';

import {
  FunnelChartXAxisLabels,
  FunnelSegment,
  Tooltip,
  SmallTooltip,
} from './components/';
import {getTooltipPosition} from './utilities/get-tooltip-position';
import {calculateDropOff} from './utilities/calculate-dropoff';
import {
  BLUE_09,
  CONNECTOR_GRADIENT,
  FUNNEL_CONNECTOR_Y_OFFSET,
} from './constants';
import type {FunnelChartNextProps} from './FunnelChartNext';

export interface ChartProps {
  data: DataSeries[];
  showSummary: boolean;
  tooltipLabels: FunnelChartNextProps['tooltipLabels'];
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: BoundingRect;
}

const LINE_OFFSET = 3;
const LINE_WIDTH = 1;

const GAP = 1;

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
  dimensions,
  showSummary,
  tooltipLabels,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const dataSeries = data[0].data;

  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

  const {width: drawableWidth, height: drawableHeight} = dimensions ?? {
    width: 0,
    height: 0,
  };

  const chartBounds: BoundingRect = {
    width: drawableWidth,
    height: drawableHeight,
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

  const percentageSummaryHeight = showSummary ? PERCENTAGE_SUMMARY_HEIGHT : 0;
  const labelsHeight = xAxisOptions.hide
    ? FUNNEL_CONNECTOR_Y_OFFSET
    : LABELS_HEIGHT;

  const yScale = scaleLinear()
    .range([
      0,
      drawableHeight -
        labelsHeight -
        percentageSummaryHeight -
        percentageSummaryHeight,
    ])
    .domain([0, Math.max(...yValues)]);

  const sectionWidth = xScale.bandwidth();
  const barWidth = sectionWidth * 0.75;

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
      const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [yScale],
  );

  const connectorGradientId = useMemo(() => uniqueId('connector-gradient'), []);
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

  return (
    <ChartElements.Svg
      height={drawableHeight}
      width={drawableWidth}
      setRef={setSvgRef}
    >
      <LinearGradientWithStops
        gradient={CONNECTOR_GRADIENT}
        id={connectorGradientId}
        x1="100%"
        x2="0%"
        y1="0%"
        y2="0%"
      />

      <LinearGradientWithStops
        gradient={LINE_GRADIENT}
        id={lineGradientId}
        x1="0%"
        x2="0%"
        y1="0%"
        y2="100%"
      />

      {showSummary && (
        <SingleTextLine
          color="rgba(48, 48, 48, 1)"
          fontWeight={600}
          targetWidth={drawableWidth}
          fontSize={24}
          text={formatPercentage(
            ((lastPoint?.value ?? 0) / (firstPoint?.value ?? 0)) * 100,
          )}
          willTruncate={false}
        />
      )}

      {xAxisOptions.hide === false && (
        <g transform={`translate(0,${percentageSummaryHeight})`}>
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
        const xPosition = xScale(dataPoint.key as string);
        const x = xPosition == null ? 0 : xPosition;
        const nextBarHeight = getBarHeight(nextPoint?.value || 0);

        const percentCalculation = calculateDropOff(
          dataPoint?.value ?? 0,
          nextPoint?.value ?? 0,
        );

        const barHeight = getBarHeight(dataPoint.value || 0);

        return (
          <Fragment key={dataPoint.key}>
            <g key={dataPoint.key} role="listitem">
              <FunnelSegment
                ariaLabel={`${xAxisOptions.labelFormatter(
                  dataPoint.key,
                )}: ${yAxisOptions.labelFormatter(dataPoint.value)}`}
                barHeight={barHeight}
                barWidth={barWidth}
                connector={{
                  height: drawableHeight,
                  width: sectionWidth - barWidth,
                  startX: x + barWidth + GAP,
                  startY: drawableHeight - barHeight,
                  nextX: (xScale(nextPoint?.key as string) ?? 0) - LINE_OFFSET,
                  nextY: drawableHeight - nextBarHeight,
                  nextPoint,
                  fill: `url(#${connectorGradientId})`,
                }}
                color={BLUE_09}
                drawableHeight={drawableHeight}
                index={index}
                isLast={index === dataSeries.length - 1}
                percentCalculation={formatPercentage(percentCalculation)}
                x={x}
              />
              {index > 0 && (
                <rect
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
      <TooltipWrapper
        bandwidth={xScale.bandwidth()}
        chartBounds={chartBounds}
        focusElementDataType={DataType.BarGroup}
        getMarkup={getTooltipMarkup}
        getPosition={getPosition}
        margin={{Top: 0, Left: 0, Bottom: 0, Right: 0}}
        parentRef={svgRef}
        chartDimensions={dimensions}
        usePortal
      />
    </ChartElements.Svg>
  );

  function getTooltipMarkup(index: number) {
    if (xAxisOptions.hide) {
      return (
        <SmallTooltip
          activeIndex={index}
          dataSeries={dataSeries}
          percentages={percentages}
          yAxisOptions={yAxisOptions}
        />
      );
    }

    return (
      <Tooltip
        activeIndex={index}
        dataSeries={dataSeries}
        isLast={index === dataSeries.length - 1}
        tooltipLabels={tooltipLabels}
        yAxisOptions={yAxisOptions}
      />
    );
  }

  function formatPercentage(value: number) {
    return `${yAxisOptions.labelFormatter(value)}%`;
  }

  function formatPositionForTooltip(index: number | null): TooltipPosition {
    // Don't render the tooltip for the first bar
    if ((index === 0 && xAxisOptions.hide === false) || index == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const xOffset = (sectionWidth - barWidth) / 2;
    const x = labelXScale(`${index}`) ?? 0;

    const y = drawableHeight - yScale(dataSeries[index].value ?? 0);

    return {
      x: x - xOffset + (dimensions?.x ?? 0),
      y: Math.abs(y) + (dimensions?.y ?? 0),
      position: {
        horizontal: TooltipHorizontalOffset.Center,
        vertical: TooltipVerticalOffset.Above,
      },
      activeIndex: index,
    };
  }

  function getPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    return getTooltipPosition({
      tooltipPosition: {event, index, eventType},
      formatPositionForTooltip,
      maxIndex: dataSeries.length - 1,
      step: xScale.step(),
      yMax: drawableHeight,
    });
  }
}
