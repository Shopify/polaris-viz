import React, {useState, useMemo, useRef, useCallback} from 'react';
import throttle from 'lodash.throttle';
import {line, curveMonotoneX} from 'd3-shape';

import {useLinearXAxisDetails, useLinearXScale} from '../../hooks';
import {
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SPACING_TIGHT,
  Margin,
  SPACING_EXTRA_TIGHT,
} from '../../constants';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {LinearXAxis} from '../LinearXAxis';
import {YAxis} from '../YAxis';
import {Point} from '../Point';
import {eventPoint, uniqueId, clamp} from '../../utilities';
import {Crosshair} from '../Crosshair';
import {ActiveTooltip} from '../../types';
import {TooltipContainer} from '../TooltipContainer';

import {MAX_ANIMATED_SERIES_LENGTH} from './constants';
import {
  Series,
  RenderTooltipContentData,
  TooltipData,
  LineOptions,
  XAxisOptions,
  YAxisOptions,
  GridOptions,
  CrossHairOptions,
} from './types';
import {useYScale, useLineChartAnimations} from './hooks';
import {Line, GradientArea} from './components';
import styles from './Chart.scss';

interface Props {
  series: Required<Series>[];
  dimensions: DOMRect;
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

  const fontSize =
    dimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = series.length === 0;

  const marginTop = yAxisOptions.labelBackgroundColor
    ? Margin.Top + fontSize / 2
    : Margin.Top;

  const {ticks: initialTicks} = useYScale({
    fontSize,
    drawableHeight: dimensions.height - Margin.Top,
    series,
    formatYAxisLabel: yAxisOptions.labelFormatter,
  });

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    chartDimensions: dimensions,
    formatXAxisLabel: xAxisOptions.labelFormatter,
    initialTicks,
    xAxisLabels: xAxisOptions.hideXAxisLabels ? [] : xAxisOptions.xAxisLabels,
    useMinimalLabels: xAxisOptions.useMinimalLabels,
    overflowStyle: lineOptions.overflow,
  });

  const marginBottom = xAxisOptions.hideXAxisLabels
    ? SPACING_TIGHT
    : Number(Margin.Bottom) + xAxisDetails.maxXLabelHeight;

  const drawableHeight =
    dimensions.height - marginTop - marginBottom - xAxisOptions.marginTop;

  const formattedLabels = useMemo(
    () => xAxisOptions.xAxisLabels.map(xAxisOptions.labelFormatter),
    [xAxisOptions.labelFormatter, xAxisOptions.xAxisLabels],
  );

  const {axisMargin, ticks, yScale} = useYScale({
    fontSize,
    drawableHeight,
    series,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    overFlowStyle: lineOptions.overflow,
  });

  const dataMargin = lineOptions.overflow ? SPACING_EXTRA_TIGHT : axisMargin;

  const handleFocus = useCallback(
    (details: ActiveTooltip | null) => {
      if (details == null) {
        setTooltipDetails(null);
      } else {
        const {x, y, index} = details;
        setTooltipDetails({index, y, x: x + dataMargin});
      }
    },
    [dataMargin],
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

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - dataMargin;

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
      generator.curve(curveMonotoneX);
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

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  const getXPosition = ({isCrosshair} = {isCrosshair: false}) => {
    const offset = isCrosshair ? crossHairOptions.width / 2 : 0;

    return animatedCoordinates != null &&
      animatedCoordinates[longestSeriesIndex] != null &&
      animatePoints
      ? animatedCoordinates[longestSeriesIndex].interpolate(
          (coord: SVGPoint) => coord.x - offset,
        )
      : xScale(activeIndex == null ? 0 : activeIndex) - offset;
  };

  const handleMouseInteraction = throttle(
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
  );

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
    if (svgX < dataMargin) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - dataMargin));
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
        role={emptyState ? 'img' : 'table'}
        width="100%"
        height="100%"
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
          transform={`translate(${dataMargin},${dimensions.height -
            marginBottom})`}
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
            showAxisLine={xAxisOptions.showAxisLine}
          />
        </g>

        <g transform={`translate(0,${marginTop})`}>
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            showGridLines={gridOptions.showHorizontalLines}
            gridColor={gridOptions.color}
            labelColor={yAxisOptions.labelColor}
            axisMargin={axisMargin}
            overflowStyle={lineOptions.overflow}
            labelBackgroundColor={yAxisOptions.labelBackgroundColor}
          />
        </g>

        {emptyState ? null : (
          <g transform={`translate(${axisMargin},${marginTop})`}>
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

        <g transform={`translate(${dataMargin},${marginTop})`}>
          {reversedSeries.map((singleSeries, index) => {
            const {data, name, showArea, color} = singleSeries;
            const isLongestLine = index === longestSeriesIndex;

            const animatedYPostion =
              animatedCoordinates == null || animatedCoordinates[index] == null
                ? 0
                : animatedCoordinates[index].interpolate(
                    (coord: SVGPoint) => coord.y,
                  );

            const hidePoint =
              animatedCoordinates == null ||
              tooltipDetails == null ||
              (activeIndex != null && activeIndex >= data.length);

            return (
              <React.Fragment key={`${name}-${index}`}>
                <Line
                  series={singleSeries}
                  isAnimated={isAnimated}
                  index={index}
                  lineGenerator={lineGenerator}
                  lineOptions={lineOptions}
                />
                {animatePoints ? (
                  <Point
                    color={color}
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
                      color={color}
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

                {showArea ? (
                  <GradientArea
                    series={singleSeries}
                    yScale={yScale}
                    xScale={xScale}
                    isAnimated={isAnimated}
                    index={index}
                    hasSpline={lineOptions.hasSpline}
                  />
                ) : null}
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
