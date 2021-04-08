import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import throttle from 'lodash.throttle';
import {OpaqueInterpolation, useSpring, SpringConfig} from 'react-spring';

import {
  useLinearXAxisDetails,
  useLinearXScale,
  usePrefersReducedMotion,
} from '../../hooks';
import {
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SPACING_TIGHT,
  Margin,
  CROSSHAIR_WIDTH,
} from '../../constants';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {LinearXAxis} from '../LinearXAxis';
import {YAxis} from '../YAxis';
import {Point} from '../Point';
import {eventPoint, uniqueId} from '../../utilities';
import {Crosshair} from '../Crosshair';
import {
  StringLabelFormatter,
  NumberLabelFormatter,
  ActiveTooltip,
} from '../../types';
import {TooltipContainer} from '../TooltipContainer';

import {Series, RenderTooltipContentData, TooltipData} from './types';
import {useYScale} from './hooks';
import {Line, GradientArea} from './components';
import styles from './Chart.scss';
import {SPRING_CONFIG} from './constants';

interface Props {
  series: Required<Series>[];
  xAxisLabels: string[];
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  dimensions: DOMRect;
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  hideXAxisLabels: boolean;
  hasSpline: boolean;
  isAnimated: boolean;
}
export interface AnimationValues {
  activeIndex: null | number;
  animatedXPosition: null | OpaqueInterpolation<number | null>;
  points: {cx: number; cy: number}[];
}

export function Chart({
  series,
  dimensions,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  hideXAxisLabels,
  hasSpline,
  isAnimated,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const animationValues = useRef<AnimationValues>({
    activeIndex: null,
    points: [],
    animatedXPosition: null,
  });

  const [tooltipDetails, setTooltipDetails] = useState<ActiveTooltip | null>(
    null,
  );

  const tooltipId = useRef(uniqueId('lineChart'));

  const fontSize =
    dimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const {ticks: initialTicks} = useYScale({
    fontSize,
    drawableHeight: dimensions.height - Margin.Top,
    series,
    formatYAxisLabel,
  });

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    chartDimensions: dimensions,
    formatXAxisLabel,
    initialTicks,
    xAxisLabels: xAxisLabels == null || hideXAxisLabels ? [] : xAxisLabels,
  });

  const marginBottom =
    xAxisLabels == null
      ? SPACING_TIGHT
      : Number(Margin.Bottom) + xAxisDetails.maxXLabelHeight;

  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const formattedLabels = useMemo(() => xAxisLabels.map(formatXAxisLabel), [
    formatXAxisLabel,
    xAxisLabels,
  ]);

  const {axisMargin, ticks, yScale} = useYScale({
    fontSize,
    drawableHeight,
    series,
    formatYAxisLabel,
  });

  const handleFocus = useCallback(
    (details: ActiveTooltip | null) => {
      if (details == null) {
        setTooltipDetails(null);
      } else {
        const {x, y, index} = details;
        setTooltipDetails({index, y, x: x + axisMargin});

        if (isAnimated) {
          animationValues.current.activeIndex = index;
        }
      }
    },
    [axisMargin, isAnimated],
  );

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;

  const longestSeriesLength = useMemo(
    () =>
      series.reduce<number>(
        (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
        0,
      ),
    [series],
  );

  const {xScale} = useLinearXScale({drawableWidth, longestSeriesLength});

  const animatedIndex =
    animationValues.current.activeIndex == null
      ? 0
      : animationValues.current.activeIndex;

  const {animatedXPosition} = useSpring<{
    config: SpringConfig;
    animatedXPosition: number | null;
  }>({
    config: SPRING_CONFIG,
    animatedXPosition: xScale === null ? null : xScale(animatedIndex),
  });

  const activeIndex =
    tooltipDetails === null || tooltipDetails.index == null
      ? null
      : tooltipDetails.index;

  useEffect(() => {
    animationValues.current.activeIndex = activeIndex;

    animationValues.current.animatedXPosition = animatedXPosition;
  }, [tooltipDetails, animatedXPosition, activeIndex]);

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

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

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
    if (axisMargin == null || xScale == null) {
      return;
    }

    if (event === null) {
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

    const closestIndex = Math.round(xScale.invert(svgX - axisMargin));
    const activeIndex = Math.min(longestSeriesLength, closestIndex);
    animationValues.current.activeIndex = activeIndex;

    setTooltipDetails({
      x: svgX,
      y: svgY,
      index: activeIndex,
    });
  }

  return (
    <div className={styles.Container}>
      <svg
        role="table"
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
      >
        <g
          transform={`translate(${axisMargin},${dimensions.height -
            marginBottom})`}
        >
          <LinearXAxis
            xAxisDetails={xAxisDetails}
            xScale={xScale}
            labels={hideXAxisLabels ? null : formattedLabels}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
            drawableHeight={drawableHeight}
            ariaHidden
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <Crosshair
            x={
              isAnimated
                ? animatedXPosition.interpolate((xPos) =>
                    xPos === null ? null : xPos - CROSSHAIR_WIDTH / 2,
                  )
                : xScale(activeIndex === null ? 0 : activeIndex) -
                  CROSSHAIR_WIDTH / 2
            }
            height={drawableHeight}
            opacity={tooltipDetails === null ? 0 : 1}
          />
        </g>

        <VisuallyHiddenRows
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={formattedLabels}
          series={series}
        />

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {reversedSeries.map((singleSeries, index) => {
            const {data, name, showArea, color} = singleSeries;
            const isFirstLine = index === series.length - 1;

            return (
              <React.Fragment key={`${name}-${index}`}>
                <Line
                  animationValues={animationValues}
                  series={singleSeries}
                  xScale={xScale}
                  yScale={yScale}
                  hasSpline={hasSpline}
                  isAnimated={isAnimated && !prefersReducedMotion}
                  index={index}
                  activeIndex={animationValues.current.activeIndex}
                />
                <Point
                  color={singleSeries.color}
                  cx={animatedXPosition.interpolate((xPos) => {
                    return xPos === null ? null : xPos;
                  })}
                  cy={
                    animationValues.current.points[index] &&
                    animationValues.current.points[index].cy
                  }
                  active={tooltipDetails !== null}
                  index={index}
                  tabIndex={-1}
                  isAnimated={isAnimated}
                  ariaHidden
                  visuallyHidden={tooltipDetails === null || !isAnimated}
                />

                {data.map(({rawValue}, dataIndex) => {
                  return (
                    <Point
                      key={`${name}-${index}-${dataIndex}`}
                      color={color}
                      cx={xScale(dataIndex)}
                      cy={yScale(rawValue)}
                      active={animationValues.current.activeIndex === dataIndex}
                      onFocus={handleFocus}
                      index={dataIndex}
                      tabIndex={isFirstLine ? 0 : -1}
                      ariaLabelledby={tooltipId.current}
                      isAnimated={isAnimated && !prefersReducedMotion}
                      ariaHidden={false}
                      visuallyHidden={
                        (isAnimated && !prefersReducedMotion) ||
                        tooltipDetails === null
                      }
                    />
                  );
                })}

                {showArea ? (
                  <GradientArea
                    series={singleSeries}
                    yScale={yScale}
                    xScale={xScale}
                    hasSpline={hasSpline}
                    isAnimated={isAnimated && !prefersReducedMotion}
                    index={index}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </g>
      </svg>

      {tooltipDetails == null ? null : (
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
