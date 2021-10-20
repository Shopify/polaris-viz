import React, {useState, useRef, useMemo, useCallback} from 'react';
import {line} from 'd3-shape';

import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../../components/TooltipWrapper';
import {
  curveStepRounded,
  eventPointNative,
  uniqueId,
  clamp,
  isGradientType,
  changeColorOpacity,
  changeGradientOpacity,
} from '../../utilities';
import {
  useLinearXAxisDetails,
  useLinearXScale,
  useTheme,
  useLinearChartAnimations,
} from '../../hooks';
import {
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SPACING_TIGHT,
  LineChartMargin as Margin,
  SPACING_BASE_TIGHT,
  XMLNS,
} from '../../constants';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {LinearXAxis} from '../LinearXAxis';
import {YAxis} from '../YAxis';
import {Point} from '../Point';
import {Crosshair} from '../Crosshair';
import {LinearGradient} from '../LinearGradient';
import {DataType, Dimensions} from '../../types';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {MAX_ANIMATED_SERIES_LENGTH} from './constants';
import type {
  RenderTooltipContentData,
  TooltipData,
  XAxisOptions,
  YAxisOptions,
  SeriesWithDefaults,
} from './types';
import {useYScale} from './hooks';
import {Line, GradientArea} from './components';
import styles from './Chart.scss';

interface Props {
  dimensions: Dimensions;
  isAnimated: boolean;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  series: SeriesWithDefaults[];
  xAxisOptions: XAxisOptions;
  yAxisOptions: Required<YAxisOptions>;
  emptyStateText?: string;
  theme?: string;
}

const TOOLTIP_POSITION = {
  horizontal: TooltipHorizontalOffset.Left,
  vertical: TooltipVerticalOffset.Center,
};

export function Chart({
  series,
  dimensions,
  renderTooltipContent,
  emptyStateText,
  isAnimated,
  xAxisOptions,
  yAxisOptions,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const tooltipId = useRef(uniqueId('lineChart'));
  const gradientId = useRef(uniqueId('lineChartGradient'));
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const fontSize =
    dimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = series.length === 0;

  const {ticks: initialTicks} = useYScale({
    fontSize,
    drawableHeight: dimensions.height - Margin.Top,
    series,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
  });

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    width: dimensions.width - selectedTheme.grid.horizontalMargin * 2,
    formatXAxisLabel: xAxisOptions.labelFormatter,
    initialTicks,
    xAxisLabels: hideXAxis ? [] : xAxisOptions.xAxisLabels,
    useMinimalLabels: xAxisOptions.useMinimalLabels,
    wrapLabels: xAxisOptions.wrapLabels,
  });

  const marginBottom = hideXAxis
    ? SPACING_TIGHT
    : Number(Margin.Bottom) + xAxisDetails.maxXLabelHeight;

  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const formattedLabels = useMemo(
    () => xAxisOptions.xAxisLabels.map(xAxisOptions.labelFormatter),
    [xAxisOptions.labelFormatter, xAxisOptions.xAxisLabels],
  );

  const {axisMargin, ticks, yScale} = useYScale({
    fontSize,
    drawableHeight,
    series,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
  });

  const getTooltipMarkup = useCallback(
    (index: number) => {
      const data = series.reduce<TooltipData[]>(
        (accumulator, {data, name, color, lineStyle}) => {
          const currentDataPoint = data[index];
          if (currentDataPoint != null) {
            accumulator.push({
              point: {
                label: currentDataPoint.label,
                value: currentDataPoint.rawValue,
              },
              name,
              color,
              lineStyle,
            });
          }
          return accumulator;
        },
        [],
      );

      if (data == null) {
        return null;
      }

      return renderTooltipContent({data});
    },
    [renderTooltipContent, series],
  );

  const reversedSeries = useMemo(() => series.slice().reverse(), [series]);

  const marginBetweenLabelsAndData = SPACING_BASE_TIGHT;

  const dataStartPosition =
    axisMargin +
    Number(selectedTheme.grid.horizontalMargin) +
    marginBetweenLabelsAndData;

  const drawableWidth =
    axisMargin == null
      ? null
      : dimensions.width -
        Margin.Right -
        axisMargin -
        selectedTheme.grid.horizontalMargin * 2 -
        marginBetweenLabelsAndData;

  const longestSeriesIndex = useMemo(
    () =>
      reversedSeries.reduce((maxIndex, currentSeries, currentIndex) => {
        return reversedSeries[maxIndex].data.length < currentSeries.data.length
          ? currentIndex
          : maxIndex;
      }, 0),
    [reversedSeries],
  );

  const longestSeriesLength = reversedSeries[longestSeriesIndex]
    ? reversedSeries[longestSeriesIndex].data.length - 1
    : 0;

  const {xScale} = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  const lineGenerator = useMemo(() => {
    const generator = line<{rawValue: number}>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({rawValue}) => yScale(rawValue));

    if (selectedTheme.line.hasSpline) {
      generator.curve(curveStepRounded);
    }
    return generator;
  }, [selectedTheme.line.hasSpline, xScale, yScale]);

  const animatePoints =
    isAnimated && longestSeriesLength <= MAX_ANIMATED_SERIES_LENGTH;

  const {animatedCoordinates} = useLinearChartAnimations<SeriesWithDefaults>({
    series: reversedSeries,
    lineGenerator,
    activeIndex,
    isAnimated: animatePoints,
  });

  const getXPosition = ({isCrosshair} = {isCrosshair: false}) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    if (
      animatedCoordinates != null &&
      animatedCoordinates[longestSeriesIndex] != null &&
      animatePoints
    ) {
      return animatedCoordinates[longestSeriesIndex].to(
        (coord) => coord.x - offset,
      );
    }
    return xScale(activeIndex == null ? 0 : activeIndex) - offset;
  };

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    if (eventType === 'mouse') {
      const point = eventPointNative(event!);

      if (point == null || xScale == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgX, svgY} = point;

      const closestIndex = Math.round(xScale.invert(svgX - dataStartPosition));

      const activeIndex = clamp({
        amount: closestIndex,
        min: 0,
        max: reversedSeries[longestSeriesIndex].data.length - 1,
      });

      return {
        x: svgX,
        y: svgY,
        position: TOOLTIP_POSITION,
        activeIndex,
      };
    } else {
      const activeIndex = index ?? 0;

      return {
        x: xScale?.(activeIndex) ?? 0,
        y: 0,
        position: TOOLTIP_POSITION,
        activeIndex,
      };
    }
  }

  return (
    <div className={styles.Container}>
      <svg
        className={styles.Chart}
        role={emptyState ? 'img' : 'table'}
        xmlns={XMLNS}
        width={dimensions.width}
        height={dimensions.height}
        ref={setSvgRef}
        aria-label={emptyState ? emptyStateText : undefined}
      >
        {xAxisOptions.hide ? null : (
          <g
            transform={`translate(${dataStartPosition},${
              dimensions.height - marginBottom
            })`}
          >
            <LinearXAxis
              xAxisDetails={xAxisDetails}
              xScale={xScale}
              labels={hideXAxis ? null : formattedLabels}
              drawableWidth={drawableWidth}
              fontSize={fontSize}
              drawableHeight={drawableHeight}
              ariaHidden
              theme={theme}
            />
          </g>
        )}

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            theme={theme}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : dataStartPosition,
              y: Margin.Top,
            }}
            width={
              selectedTheme.grid.horizontalOverflow
                ? dimensions.width
                : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            width={axisMargin}
            textAlign={selectedTheme.grid.horizontalOverflow ? 'left' : 'right'}
            theme={theme}
          />
        </g>

        {emptyState ? null : (
          <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
            <Crosshair
              x={getXPosition({isCrosshair: true})}
              height={drawableHeight}
              opacity={activeIndex == null ? 0 : 1}
              theme={theme}
            />
          </g>
        )}

        {emptyState ? null : (
          <VisuallyHiddenRows
            formatYAxisLabel={yAxisOptions.labelFormatter}
            xAxisLabels={formattedLabels}
            series={series}
          />
        )}

        <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
          {reversedSeries.map((singleSeries, index) => {
            const {name, color, areaColor} = singleSeries;
            const seriesGradientId = `${gradientId.current}-${index}`;

            const lineColor = isGradientType(color)
              ? `url(#${seriesGradientId})`
              : color;

            return (
              <React.Fragment key={`${name}-${index}`}>
                {isGradientType(color) ? (
                  <defs>
                    <LinearGradient
                      id={seriesGradientId}
                      gradient={color}
                      gradientUnits="userSpaceOnUse"
                      y1="100%"
                      y2="0%"
                    />
                  </defs>
                ) : null}
                <Line
                  series={singleSeries}
                  color={lineColor}
                  isAnimated={isAnimated}
                  index={index}
                  lineGenerator={lineGenerator}
                  theme={theme}
                >
                  {areaColor != null ? (
                    <GradientArea
                      series={singleSeries}
                      yScale={yScale}
                      xScale={xScale}
                      hasSpline={selectedTheme.line.hasSpline}
                    />
                  ) : null}
                </Line>
              </React.Fragment>
            );
          })}

          {reversedSeries.map((singleSeries, index) => {
            const {data, name, color} = singleSeries;
            const isLongestLine = index === longestSeriesIndex;
            const pointGradientId = `${gradientId.current}-point-${index}`;

            const animatedYPosition =
              animatedCoordinates == null || animatedCoordinates[index] == null
                ? 0
                : animatedCoordinates[index].to((coord) => coord.y);

            const hidePoint =
              animatedCoordinates == null ||
              (activeIndex != null && activeIndex >= data.length);

            const pointColor = isGradientType(color)
              ? `url(#${pointGradientId})`
              : changeColorOpacity(color);

            return (
              <React.Fragment key={`${name}-${index}`}>
                {isGradientType(color) ? (
                  <defs>
                    <LinearGradient
                      id={pointGradientId}
                      gradient={changeGradientOpacity(color)}
                      gradientUnits="userSpaceOnUse"
                      y1="100%"
                      y2="0%"
                    />
                  </defs>
                ) : null}

                {animatePoints ? (
                  <Point
                    color={pointColor}
                    stroke={selectedTheme.line.pointStroke}
                    cx={getXPosition()}
                    cy={animatedYPosition}
                    active={activeIndex != null}
                    index={index}
                    tabIndex={-1}
                    isAnimated={animatePoints}
                    visuallyHidden={hidePoint}
                    ariaHidden
                  />
                ) : null}

                {data.map(({rawValue}, dataIndex) => {
                  return (
                    <Point
                      dataType={DataType.Point}
                      key={`${name}-${index}-${dataIndex}`}
                      stroke={selectedTheme.line.pointStroke}
                      color={pointColor}
                      cx={xScale(dataIndex)}
                      cy={yScale(rawValue)}
                      active={activeIndex === dataIndex}
                      index={dataIndex}
                      tabIndex={isLongestLine ? 0 : -1}
                      ariaLabelledby={tooltipId.current}
                      isAnimated={false}
                      ariaHidden={false}
                      visuallyHidden={animatePoints}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </g>
      </svg>

      <TooltipWrapper
        alwaysUpdatePosition
        chartDimensions={dimensions}
        focusElementDataType={DataType.Point}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        id={tooltipId.current}
        margin={Margin}
        onIndexChange={(index) => setActiveIndex(index)}
        parentRef={svgRef}
      />
    </div>
  );
}
