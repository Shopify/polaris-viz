import React, {useState, useMemo, useCallback} from 'react';
import {useTransition} from '@react-spring/web';

import {getSeriesColorsFromCount} from 'hooks/use-theme-series-colors';
import {usePrefersReducedMotion, useTheme} from 'hooks';
import {
  BarChartMargin as Margin,
  LINE_HEIGHT,
  MIN_BAR_HEIGHT,
  BARS_TRANSITION_CONFIG,
  MASK_HIGHLIGHT_COLOR,
  MASK_SUBDUE_COLOR,
  XMLNS,
} from 'consts';
import {
  eventPoint,
  getTextWidth,
  getBarXAxisDetails,
  getAnimationTrail,
  uniqueId,
  isGradientType,
  shouldRotateZeroBars,
} from 'utilities';

import {Dimensions, XAxisOptions, YAxisOptions, BarMargin} from 'types';

import {Bar} from 'components/Bar';
import {YAxis} from 'components/YAxis';
import {BarChartXAxis} from 'components/BarChartXAxis';
import {
  TooltipContainer,
  TooltipPosition as TooltipContainerPosition,
} from 'components/TooltipContainer';
import {LinearGradient} from 'components/LinearGradient';
import {HorizontalGridLines} from 'components/HorizontalGridLines';

import {AnnotationLine} from 'components/BarChart/components';
import type {
  BarChartData,
  RenderTooltipContentData,
  AnnotationLookupTable,
} from 'components/BarChart/types';
import {
  useYScale,
  useXScale,
  useMinimalLabelIndexes,
} from 'components/BarChart/hooks';
import {
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
  SPACING,
} from 'components/BarChart/constants';
import styles from 'components/BarChart/Chart.scss';

interface TooltipPosition {
  x: number;
  y: number;
  position: TooltipContainerPosition;
}
type RequiredXAxis = Pick<
  Required<XAxisOptions>,
  'labelFormatter' | 'useMinimalLabels'
> &
  XAxisOptions;

interface Props {
  data: BarChartData[];
  annotationsLookupTable: AnnotationLookupTable;
  chartDimensions: Dimensions;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  xAxisOptions: RequiredXAxis;
  yAxisOptions: Required<YAxisOptions>;
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
}

export function Chart({
  data,
  annotationsLookupTable,
  chartDimensions,
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColorsFromCount(1, selectedTheme);

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [
    tooltipPosition,
    setTooltipPosition,
  ] = useState<TooltipPosition | null>(null);
  const {minimalLabelIndexes} = useMinimalLabelIndexes({
    useMinimalLabels: xAxisOptions.useMinimalLabels,
    dataLength: data.length,
  });

  const fontSize =
    chartDimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = data.length === 0;

  const {ticks: initialTicks} = useYScale({
    drawableHeight:
      chartDimensions.height - Margin.Top - Margin.Bottom - LINE_HEIGHT,
    data,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
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

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth: approxYAxisLabelWidth,
        fontSize,
        xLabels: hideXAxis
          ? []
          : data.map(({label}) => xAxisOptions.labelFormatter(label)),
        width: chartDimensions.width - selectedTheme.grid.horizontalMargin * 2,
        innerMargin: BarMargin[selectedTheme.bar.innerMargin],
        outerMargin: BarMargin[selectedTheme.bar.outerMargin],
        minimalLabelIndexes,
      }),
    [
      hideXAxis,
      approxYAxisLabelWidth,
      fontSize,
      data,
      chartDimensions.width,
      selectedTheme.grid.horizontalMargin,
      selectedTheme.bar.innerMargin,
      selectedTheme.bar.outerMargin,
      minimalLabelIndexes,
      xAxisOptions,
    ],
  );

  const drawableHeight =
    chartDimensions.height -
    Margin.Top -
    Margin.Bottom -
    xAxisDetails.maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
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
  const chartStartPosition = axisMargin + selectedTheme.grid.horizontalMargin;
  const drawableWidth =
    chartDimensions.width -
    Margin.Right -
    axisMargin -
    selectedTheme.grid.horizontalMargin * 2;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data,
    innerMargin: BarMargin[selectedTheme.bar.innerMargin],
    outerMargin: BarMargin[selectedTheme.bar.outerMargin],
    formatXAxisLabel: xAxisOptions.labelFormatter,
  });

  const barWidth = useMemo(() => xScale.bandwidth(), [xScale]);

  const rotateZeroBars = useMemo(
    () => selectedTheme.bar.zeroAsMinHeight && shouldRotateZeroBars(data),
    [selectedTheme.bar.zeroAsMinHeight, data],
  );

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

      const needsMinHeight = selectedTheme.bar.zeroAsMinHeight
        ? rawHeight < MIN_BAR_HEIGHT
        : rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [selectedTheme.bar, yScale],
  );

  const handleFocus = useCallback(
    ({index, cx, cy}: {index: number; cx: number; cy: number}) => {
      if (index == null) return;
      setActiveBar(index);
      setTooltipPosition({
        x: cx + chartStartPosition + xScale.bandwidth() / 2,
        y: cy,
        position: {
          horizontal: 'center',
          vertical: 'above',
        },
      });
    },
    [chartStartPosition, xScale],
  );

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const transitions = useTransition(data, {
    default: {immediate: !shouldAnimate},
    keys: (dataPoint) => dataPoint.label,
    from: {height: 0},
    leave: {height: 0},
    enter: ({rawValue}) => ({height: getBarHeight(rawValue)}),
    update: ({rawValue}) => ({height: getBarHeight(rawValue)}),
    trail: shouldAnimate ? getAnimationTrail(data.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  const {width, height} = chartDimensions;

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const clipId = useMemo(() => uniqueId('clip'), []);

  const gradient = isGradientType(seriesColor)
    ? seriesColor
    : [
        {
          color: seriesColor,
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
        xmlns={XMLNS}
        width={width}
        height={height}
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
            <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
              {transitions(({height}, item, _transition, index) => {
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
                      hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
                      rotateZeroBars={rotateZeroBars}
                    />
                  </g>
                );
              })}
            </g>
          </mask>
        </defs>
        {hideXAxis ? null : (
          <g
            transform={`translate(${chartStartPosition},${
              chartDimensions.height -
              Margin.Bottom -
              xAxisDetails.maxXLabelHeight
            })`}
            aria-hidden="true"
          >
            <BarChartXAxis
              labels={xAxisLabels}
              xScale={xScale}
              fontSize={fontSize}
              xAxisDetails={xAxisDetails}
              minimalLabelIndexes={minimalLabelIndexes}
              theme={theme}
            />
          </g>
        )}

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            theme={theme}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartStartPosition,
              y: Margin.Top,
            }}
            width={
              selectedTheme.grid.horizontalOverflow
                ? chartDimensions.width
                : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(0,${Margin.Top})`} aria-hidden="true">
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            textAlign={selectedTheme.grid.horizontalOverflow ? 'left' : 'right'}
            width={yAxisLabelWidth}
            theme={theme}
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
          {transitions((_props, item, _transition, index) => {
            const xPosition = xScale(index.toString());
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const translateXValue = xPositionValue + chartStartPosition;

            const barColor =
              typeof item.barColor === 'string' ? item.barColor : null;

            return barColor != null ? (
              <rect
                key={index}
                transform={`translate(${translateXValue},${Margin.Top})`}
                x="0"
                y="0"
                width={barWidth}
                height={height}
                fill={barColor}
              />
            ) : null;
          })}
          ;
        </g>

        <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
          {transitions((_props, _item, _transition, index) => {
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
          margin={Margin}
          bandwidth={xScale.bandwidth()}
          position={tooltipPosition.position}
        >
          {tooltipMarkup}
        </TooltipContainer>
      ) : null}
    </div>
  );

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    const point = eventPoint(event);

    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    const currentPoint = svgX - chartStartPosition;
    const currentIndex = Math.floor(currentPoint / xScale.step());

    if (
      currentIndex < 0 ||
      currentIndex > data.length - 1 ||
      svgY <= Margin.Top ||
      svgY >
        drawableHeight + Number(Margin.Bottom) + xAxisDetails.maxXLabelHeight
    ) {
      setActiveBar(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString()) ?? 0;
    const value = data[currentIndex].rawValue;
    const tooltipXPositon = xPosition + chartStartPosition;

    setActiveBar(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(value),
      position: {horizontal: 'center', vertical: value < 0 ? 'below' : 'above'},
    });
  }
}
