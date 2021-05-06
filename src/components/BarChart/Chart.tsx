import React, {useState, useMemo, useCallback} from 'react';
import {useTransition} from 'react-spring';

import {usePrefersReducedMotion} from '../../hooks';
import {
  LINE_HEIGHT,
  MIN_BAR_HEIGHT,
  BARS_TRANSITION_CONFIG,
  MASK_HIGHLIGHT_COLOR,
  MASK_SUBDUE_COLOR,
} from '../../constants';
import {
  eventPoint,
  getTextWidth,
  getBarXAxisDetails,
  getAnimationTrail,
  uniqueId,
  getColorValue,
  isGradientType,
} from '../../utilities';
import {Bar} from '../../components';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {TooltipContainer} from '../TooltipContainer';
import {LinearGradient} from '../LinearGradient';

import {AnnotationLine} from './components';
import {
  BarChartData,
  RenderTooltipContentData,
  BarOptions as BarChartBarOptions,
  GridOptions,
  XAxisOptions,
  YAxisOptions,
  AnnotationLookupTable,
} from './types';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
  SPACING,
} from './constants';
import styles from './Chart.scss';

type BarOptions = Omit<BarChartBarOptions, 'innerMargin' | 'outerMargin'> & {
  innerMargin: number;
  outerMargin: number;
};

interface Props {
  data: BarChartData[];
  annotationsLookupTable: AnnotationLookupTable;
  chartDimensions: DOMRect;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  emptyStateText?: string;
  isAnimated?: boolean;
  barOptions: BarOptions;
  gridOptions: GridOptions;
  xAxisOptions: XAxisOptions;
  yAxisOptions: YAxisOptions;
}

export function Chart({
  data,
  annotationsLookupTable,
  chartDimensions,
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  barOptions,
  gridOptions,
  xAxisOptions,
  yAxisOptions,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = data.length === 0;

  const {ticks: initialTicks} = useYScale({
    drawableHeight:
      chartDimensions.height - MARGIN.Top - MARGIN.Bottom - LINE_HEIGHT,
    data,
    formatYAxisLabel: yAxisOptions.labelFormatter,
  });

  const approxYAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...initialTicks.map(({formattedValue}) =>
          getTextWidth({text: formattedValue, fontSize}),
        ),
      ),
    [fontSize, initialTicks],
  );

  const minimalLabelIndexes =
    xAxisOptions.useMinimalLabels && data.length > 3
      ? [0, Math.floor(data.length / 2), data.length - 1]
      : null;

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth: approxYAxisLabelWidth,
        fontSize,
        xLabels: data.map(({label}) => xAxisOptions.labelFormatter(label)),
        chartDimensions,
        innerMargin: barOptions.innerMargin,
        outerMargin: barOptions.outerMargin,
        minimalLabelIndexes,
      }),
    [
      approxYAxisLabelWidth,
      fontSize,
      data,
      chartDimensions,
      barOptions.innerMargin,
      barOptions.outerMargin,
      minimalLabelIndexes,
      xAxisOptions,
    ],
  );

  const drawableHeight =
    chartDimensions.height -
    MARGIN.Top -
    MARGIN.Bottom -
    xAxisDetails.maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatYAxisLabel: yAxisOptions.labelFormatter,
  });

  const yAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...ticks.map(({formattedValue}) =>
          getTextWidth({text: formattedValue, fontSize}),
        ),
      ),
    [fontSize, ticks],
  );

  const axisMargin = SPACING + yAxisLabelWidth;
  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data,
    innerMargin: barOptions.innerMargin,
    outerMargin: barOptions.outerMargin,
    formatXAxisLabel: xAxisOptions.labelFormatter,
  });

  const barWidth = useMemo(() => xScale.bandwidth(), [xScale]);

  const tooltipMarkup = useMemo(() => {
    if (activeBar == null) {
      return null;
    }

    return renderTooltipContent({
      label: data[activeBar].label,
      value: data[activeBar].rawValue,
      annotation: annotationsLookupTable[activeBar],
    });
  }, [activeBar, data, annotationsLookupTable, renderTooltipContent]);

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
      const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;
      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [yScale],
  );

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const transitions = useTransition(data, (dataPoint) => dataPoint.label, {
    from: {height: 0},
    leave: {height: 0},
    enter: ({rawValue}) => ({height: getBarHeight(rawValue)}),
    update: ({rawValue}) => ({height: getBarHeight(rawValue)}),
    immediate: !shouldAnimate,
    trail: shouldAnimate ? getAnimationTrail(data.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  const {width, height} = chartDimensions;

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const clipId = useMemo(() => uniqueId('clip'), []);

  const gradient = isGradientType(barOptions.color)
    ? barOptions.color
    : [
        {
          color: getColorValue(barOptions.color),
          offset: 0,
        },
      ];

  return (
    <div
      className={styles.ChartContainer}
      style={{
        height,
        width,
      }}
    >
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onMouseLeave={() => setActiveBar(null)}
        onTouchEnd={() => setActiveBar(null)}
        role={emptyState ? 'img' : 'list'}
        aria-label={emptyState ? emptyStateText : undefined}
      >
        <defs>
          <LinearGradient
            id={gradientId}
            gradient={gradient}
            gradientUnits="userSpaceOnUse"
            y1="100%"
            y2="0%"
          />

          <mask id={clipId}>
            <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
              {transitions.map(({item, props: {height}}, index) => {
                const xPosition = xScale(index.toString());
                const ariaLabel = `${xAxisOptions.labelFormatter(
                  data[index].label,
                )}: ${yAxisOptions.labelFormatter(data[index].rawValue)}`;
                const isSubdued = activeBar != null && index !== activeBar;
                const annotation = annotationsLookupTable[index];

                return (
                  <g role="listitem" key={index}>
                    <Bar
                      height={height}
                      key={index}
                      x={xPosition == null ? 0 : xPosition}
                      yScale={yScale}
                      rawValue={item.rawValue}
                      width={barWidth}
                      color={
                        isSubdued ? MASK_SUBDUE_COLOR : MASK_HIGHLIGHT_COLOR
                      }
                      onFocus={handleFocus}
                      index={index}
                      ariaLabel={`${ariaLabel} ${
                        annotation ? annotation.ariaLabel : ''
                      }`}
                      tabIndex={0}
                      role="img"
                      hasRoundedCorners={barOptions.hasRoundedCorners}
                    />
                  </g>
                );
              })}
            </g>
          </mask>
        </defs>
        <g
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            xAxisDetails.maxXLabelHeight})`}
          aria-hidden="true"
        >
          <BarChartXAxis
            labels={xAxisLabels}
            xScale={xScale}
            fontSize={fontSize}
            xAxisDetails={xAxisDetails}
            textColor={xAxisOptions.labelColor}
            gridColor={gridOptions.color}
            showTicks={xAxisOptions.showTicks}
            minimalLabelIndexes={minimalLabelIndexes}
          />
        </g>

        <g
          transform={`translate(${axisMargin},${MARGIN.Top})`}
          aria-hidden="true"
        >
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            labelColor={yAxisOptions.labelColor}
            showGridLines={gridOptions.showHorizontalLines}
            gridColor={gridOptions.color}
          />
        </g>

        <g mask={`url(#${clipId})`}>
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={`url(#${gradientId})`}
          />
          {transitions.map(({item}, index) => {
            const xPosition = xScale(index.toString());
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const translateXValue = xPositionValue + axisMargin;
            const barColor =
              item.barOptions != null && item.barOptions.color != null
                ? item.barOptions.color
                : null;
            return barColor != null ? (
              <rect
                key={index}
                transform={`translate(${translateXValue},${MARGIN.Top})`}
                x="0"
                y="0"
                width={barWidth}
                height={height}
                fill={getColorValue(barColor)}
              />
            ) : null;
          })}
          ;
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {transitions.map((_, index) => {
            const xPosition = xScale(index.toString());
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const annotation = annotationsLookupTable[index];

            return annotation != null ? (
              <AnnotationLine
                key={`annotation${index}`}
                xPosition={xPositionValue}
                barWidth={barWidth}
                drawableHeight={drawableHeight}
                shouldAnimate={shouldAnimate}
                width={annotation.width}
                color={annotation.color}
                xOffset={annotation.xOffset}
              />
            ) : null;
          })}
        </g>
      </svg>

      {tooltipPosition != null && activeBar != null && !emptyState ? (
        <TooltipContainer
          activePointIndex={activeBar}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={chartDimensions}
          margin={MARGIN}
          position="center"
        >
          {tooltipMarkup}
        </TooltipContainer>
      ) : null}
    </div>
  );

  function handleFocus({
    index,
    cx,
    cy,
  }: {
    index: number;
    cx: number;
    cy: number;
  }) {
    if (index == null) return;
    setActiveBar(index);
    setTooltipPosition({
      x: cx + axisMargin + xScale.bandwidth() / 2,
      y: cy,
    });
  }

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    const point = eventPoint(event);

    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    const currentPoint = svgX - axisMargin;
    const currentIndex = Math.floor(currentPoint / xScale.step());

    if (
      currentIndex < 0 ||
      currentIndex > data.length - 1 ||
      svgY <= MARGIN.Top ||
      svgY > drawableHeight + MARGIN.Bottom + xAxisDetails.maxXLabelHeight
    ) {
      setActiveBar(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString());
    const value = data[currentIndex].rawValue;
    const tooltipXPositon =
      xPosition == null ? 0 : xPosition + axisMargin + xScale.bandwidth() / 2;

    setActiveBar(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(value),
    });
  }
}
