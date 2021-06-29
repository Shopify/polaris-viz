import React, {useState, useRef, useMemo, useCallback} from 'react';
import throttle from 'lodash.throttle';
import {line} from 'd3-shape';

import {
  curveStepRounded,
  eventPoint,
  uniqueId,
  clamp,
  isGradientType,
  makeColorOpaque,
  makeGradientOpaque,
} from '../../utilities';
import {useLinearXAxisDetails, useLinearXScale} from '../../hooks';
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
import type {ActiveTooltip, Dimensions} from '../../types';
import {TooltipContainer} from '../TooltipContainer';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {MAX_ANIMATED_SERIES_LENGTH} from './constants';
import type {
  RenderTooltipContentData,
  TooltipData,
  LineOptions,
  XAxisOptions,
  YAxisOptions,
  GridOptions,
  CrossHairOptions,
  SeriesWithDefaults,
} from './types';
import {useYScale, useLineChartAnimations} from './hooks';
import {Line, GradientArea} from './components';
import styles from './Chart.scss';

interface Props {
  series: SeriesWithDefaults[];
  dimensions: Dimensions;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  emptyStateText?: string;
  isAnimated: boolean;
  lineOptions: LineOptions;
  xAxisOptions: XAxisOptions;
  yAxisOptions: YAxisOptions;
  gridOptions: GridOptions;
  crossHairOptions: CrossHairOptions;
}

export function Chart({
  series,
  dimensions,
  renderTooltipContent,
  emptyStateText,
  isAnimated,
  lineOptions,
  xAxisOptions,
  yAxisOptions,
  gridOptions,
  crossHairOptions,
}: Props) {
  const [tooltipDetails, setTooltipDetails] = useState<ActiveTooltip | null>(
    null,
  );

  const tooltipId = useRef(uniqueId('lineChart'));
  const gradientId = useRef(uniqueId('lineChartGradient'));

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

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    width: dimensions.width - gridOptions.horizontalMargin * 2,
    formatXAxisLabel: xAxisOptions.labelFormatter,
    initialTicks,
    xAxisLabels: xAxisOptions.hideXAxisLabels ? [] : xAxisOptions.xAxisLabels,
    useMinimalLabels: xAxisOptions.useMinimalLabels,
  });

  const marginBottom = xAxisOptions.hideXAxisLabels
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

  const handleFocus = useCallback(
    (details: ActiveTooltip | null) => {
      if (details == null) {
        setTooltipDetails(null);
      } else {
        const {x, y, index} = details;
        setTooltipDetails({index, y, x: x + axisMargin});
      }
    },
    [axisMargin],
  );

  const tooltipMarkup = useMemo(() => {
    if (tooltipDetails == null) {
      return null;
    }

    const data = series.reduce<TooltipData[]>(
      (accumulator, {data, name, color, lineStyle}) => {
        const currentDataPoint = data[tooltipDetails.index];
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
  }, [renderTooltipContent, series, tooltipDetails]);

  const reversedSeries = useMemo(() => series.slice().reverse(), [series]);

  const marginBetweenLabelsAndData = SPACING_BASE_TIGHT;

  const dataStartPosition =
    axisMargin +
    Number(gridOptions.horizontalMargin) +
    marginBetweenLabelsAndData;

  const drawableWidth =
    axisMargin == null
      ? null
      : dimensions.width -
        Margin.Right -
        axisMargin -
        gridOptions.horizontalMargin * 2 -
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

    if (lineOptions.hasSpline) {
      generator.curve(curveStepRounded);
    }
    return generator;
  }, [lineOptions.hasSpline, xScale, yScale]);

  const activeIndex =
    tooltipDetails == null || tooltipDetails.index == null
      ? null
      : tooltipDetails.index;

  const animatePoints =
    isAnimated && longestSeriesLength <= MAX_ANIMATED_SERIES_LENGTH;

  const {animatedCoordinates} = useLineChartAnimations({
    series: reversedSeries,
    lineGenerator,
    activeIndex,
    isAnimated: animatePoints,
  });

  const getXPosition = ({isCrosshair} = {isCrosshair: false}) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? crossHairOptions.width / 2 : 0;

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

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleMouseInteraction = useCallback(
    throttle(
      (
        event:
          | React.MouseEvent<SVGSVGElement>
          | React.TouchEvent<SVGSVGElement>
          | null,
      ) => {
        handleInteraction(event);
      },
      50,
      {leading: true},
    ),
    [dimensions],
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  function handleInteraction(
    event:
      | React.MouseEvent<SVGSVGElement>
      | React.TouchEvent<SVGSVGElement>
      | null,
  ) {
    if (axisMargin == null || xScale == null || emptyState) {
      return;
    }

    if (event == null) {
      setTooltipDetails(null);
      return;
    }

    const point = eventPoint(event);

    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    if (svgX < axisMargin) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - dataStartPosition));
    const clampedClosestIndex = clamp({
      amount: closestIndex,
      min: 0,
      max: reversedSeries[longestSeriesIndex].data.length - 1,
    });

    setTooltipDetails({
      x: svgX,
      y: svgY,
      index: clampedClosestIndex,
    });
  }

  return (
    <div className={styles.Container}>
      <svg
        xmlns={XMLNS}
        role={emptyState ? 'img' : 'table'}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={(event) => {
          event.persist();
          handleMouseInteraction(event);
        }}
        onTouchMove={(event) => {
          event.persist();
          handleInteraction(event);
        }}
        onTouchEnd={() => handleInteraction(null)}
        onMouseLeave={() => handleMouseInteraction(null)}
        aria-label={emptyState ? emptyStateText : undefined}
      >
        <g
          transform={`translate(${dataStartPosition},${
            dimensions.height - marginBottom
          })`}
        >
          <LinearXAxis
            xAxisDetails={xAxisDetails}
            xScale={xScale}
            labels={xAxisOptions.hideXAxisLabels ? null : formattedLabels}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            drawableHeight={drawableHeight}
            ariaHidden
            showGridLines={gridOptions.showVerticalLines}
            gridColor={gridOptions.color}
            showTicks={xAxisOptions.showTicks}
            labelColor={xAxisOptions.labelColor}
          />
        </g>

        {gridOptions.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            color={gridOptions.color}
            transform={{
              x: gridOptions.horizontalOverflow ? 0 : dataStartPosition,
              y: Margin.Top,
            }}
            width={
              gridOptions.horizontalOverflow ? dimensions.width : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            width={axisMargin}
            labelColor={yAxisOptions.labelColor}
            textAlign={gridOptions.horizontalOverflow ? 'left' : 'right'}
            backgroundColor={yAxisOptions.backgroundColor}
            outerMargin={gridOptions.horizontalMargin}
          />
        </g>

        {emptyState ? null : (
          <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
            <Crosshair
              x={getXPosition({isCrosshair: true})}
              height={drawableHeight}
              opacity={tooltipDetails == null ? 0 : crossHairOptions.opacity}
              fill={crossHairOptions.color}
              width={crossHairOptions.width}
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
                {areaColor != null ? (
                  <GradientArea
                    series={singleSeries}
                    yScale={yScale}
                    xScale={xScale}
                    isAnimated={isAnimated}
                    index={index}
                    hasSpline={lineOptions.hasSpline}
                  />
                ) : null}

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
                  lineOptions={lineOptions}
                />
              </React.Fragment>
            );
          })}

          {reversedSeries.map((singleSeries, index) => {
            const {data, name, color} = singleSeries;
            const isLongestLine = index === longestSeriesIndex;
            const pointGradientId = `${gradientId.current}-point-${index}`;

            const animatedYPostion =
              animatedCoordinates == null || animatedCoordinates[index] == null
                ? 0
                : animatedCoordinates[index].to((coord) => coord.y);

            const hidePoint =
              animatedCoordinates == null ||
              tooltipDetails == null ||
              (activeIndex != null && activeIndex >= data.length);

            const pointColor = isGradientType(color)
              ? `url(#${pointGradientId})`
              : makeColorOpaque(color);

            return (
              <React.Fragment key={`${name}-${index}`}>
                {isGradientType(color) ? (
                  <defs>
                    <LinearGradient
                      id={pointGradientId}
                      gradient={makeGradientOpaque(color)}
                      gradientUnits="userSpaceOnUse"
                      y1="100%"
                      y2="0%"
                    />
                  </defs>
                ) : null}

                {animatePoints ? (
                  <Point
                    color={pointColor}
                    stroke={lineOptions.pointStroke}
                    cx={getXPosition()}
                    cy={animatedYPostion}
                    active={tooltipDetails != null}
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
                      key={`${name}-${index}-${dataIndex}`}
                      stroke={lineOptions.pointStroke}
                      color={pointColor}
                      cx={xScale(dataIndex)}
                      cy={yScale(rawValue)}
                      active={activeIndex === dataIndex}
                      onFocus={handleFocus}
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

      {tooltipDetails == null || emptyState ? null : (
        <TooltipContainer
          activePointIndex={tooltipDetails.index}
          currentX={tooltipDetails.x}
          currentY={tooltipDetails.y}
          chartDimensions={dimensions}
          margin={Margin}
          id={tooltipId.current}
        >
          {tooltipMarkup}
        </TooltipContainer>
      )}
    </div>
  );
}
