import React, {useState, useMemo, useRef} from 'react';
import {stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';

import {LinearGradient} from '../LinearGradient';
import {
  useLinearXAxisDetails,
  useLinearXScale,
  usePrefersReducedMotion,
  useTheme,
  useThemeSeriesColors,
} from '../../hooks';
import {
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
  SPACING_TIGHT,
  FONT_SIZE,
  LineChartMargin as Margin,
  colorWhite,
} from '../../constants';
import {TooltipContainer} from '../TooltipContainer';
import {
  eventPoint,
  isGradientType,
  makeColorOpaque,
  makeGradientOpaque,
  uniqueId,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {Point} from '../Point';
import {LinearXAxis} from '../LinearXAxis';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {HorizontalGridLines} from '../HorizontalGridLines';
import type {
  StringLabelFormatter,
  NumberLabelFormatter,
  ActiveTooltip,
  Dimensions,
} from '../../types';

import {Spacing} from './constants';
import {useYScale} from './hooks';
import {StackedAreas} from './components';
import type {Series, RenderTooltipContentData} from './types';
import styles from './Chart.scss';

interface Props {
  xAxisLabels: string[];
  series: Series[];
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  dimensions: Dimensions;
  opacity: number;
  isAnimated: boolean;
  theme?: string;
}

export function Chart({
  xAxisLabels,
  series,
  dimensions,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  opacity,
  isAnimated,
  theme,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const colors = useThemeSeriesColors(series, selectedTheme);

  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const tooltipId = useRef(uniqueId('stackedAreaChart'));

  const areaStack = useMemo(
    () =>
      stack()
        .keys(series.map(({name}) => name))
        .order(stackOrderReverse)
        .offset(stackOffsetNone),
    [series],
  );

  const formattedData = useMemo(
    () =>
      xAxisLabels.map((_, labelIndex) =>
        series.reduce((acc, {name, data}) => {
          const {rawValue} = data[labelIndex];

          const dataPoint = {[name]: rawValue};
          return Object.assign(acc, dataPoint);
        }, {}),
      ),
    [xAxisLabels, series],
  );

  const fontSize =
    dimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const stackedValues = useMemo(
    () => areaStack(formattedData),
    [areaStack, formattedData],
  );

  const {ticks: initialTicks} = useYScale({
    fontSize,
    drawableHeight: dimensions.height - Margin.Top,
    stackedValues,
    formatYAxisLabel,
  });

  const xAxisDetails = useLinearXAxisDetails({
    series,
    fontSize,
    width: dimensions.width,
    formatXAxisLabel,
    initialTicks,
    xAxisLabels: xAxisLabels == null ? [] : xAxisLabels,
  });

  const formattedXAxisLabels = xAxisLabels.map(formatXAxisLabel);

  const marginBottom =
    xAxisLabels == null
      ? SPACING_TIGHT
      : xAxisDetails.maxXLabelHeight + Number(Margin.Bottom);

  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const {axisMargin, ticks, yScale} = useYScale({
    fontSize,
    drawableHeight,
    stackedValues,
    formatYAxisLabel,
  });

  const dataStartPosition = axisMargin + Spacing.Base;

  const drawableWidth = dimensions.width - Margin.Right - dataStartPosition;

  const longestSeriesLength =
    Math.max(...stackedValues.map((stack) => stack.length)) - 1;

  const {xScale} = useLinearXScale({drawableWidth, longestSeriesLength});

  const tooltipMarkup = useMemo(() => {
    if (activePointIndex == null) {
      return null;
    }

    const data = series.reduce<RenderTooltipContentData['data']>(
      function removeNullsAndFormatData(tooltipData, {name, data}, index) {
        const {rawValue} = data[activePointIndex];
        if (rawValue == null) {
          return tooltipData;
        }

        tooltipData.push({color: colors[index], label: name, value: rawValue});
        return tooltipData;
      },
      [],
    );

    const title = xAxisLabels[activePointIndex];

    return renderTooltipContent({
      data,
      title,
    });
  }, [colors, activePointIndex, series, xAxisLabels, renderTooltipContent]);

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  return (
    <React.Fragment>
      <svg
        className={styles.Chart}
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onTouchEnd={() => setActivePointIndex(null)}
        onMouseLeave={() => setActivePointIndex(null)}
        role="table"
      >
        <g
          transform={`translate(${dataStartPosition},${
            dimensions.height - marginBottom
          })`}
        >
          <LinearXAxis
            xScale={xScale}
            labels={formattedXAxisLabels}
            xAxisDetails={xAxisDetails}
            drawableHeight={drawableHeight}
            fontSize={fontSize}
            drawableWidth={drawableWidth}
            ariaHidden
            labelColor={selectedTheme.xAxis.labelColor}
            showTicks={selectedTheme.xAxis.showTicks}
            gridColor={selectedTheme.grid.color}
          />
        </g>

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            width={axisMargin}
            textAlign="right"
            labelColor={selectedTheme.xAxis.labelColor}
          />
        </g>

        <HorizontalGridLines
          ticks={ticks}
          color={selectedTheme.grid.color}
          transform={{
            x: dataStartPosition,
            y: Margin.Top,
          }}
          width={drawableWidth}
        />

        <VisuallyHiddenRows
          formatYAxisLabel={formatYAxisLabel}
          xAxisLabels={formattedXAxisLabels}
          series={series}
        />

        <StackedAreas
          width={drawableWidth}
          height={drawableHeight}
          transform={`translate(${dataStartPosition},${Margin.Top})`}
          stackedValues={stackedValues}
          xScale={xScale}
          yScale={yScale}
          colors={colors}
          opacity={opacity}
          isAnimated={isAnimated && !prefersReducedMotion}
        />

        {activePointIndex == null ? null : (
          <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
            <Crosshair
              x={xScale(activePointIndex) - selectedTheme.crossHair.width / 2}
              height={drawableHeight}
              fill={selectedTheme.crossHair.color}
              width={selectedTheme.crossHair.width}
            />
          </g>
        )}

        <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
          {stackedValues.map((value, stackIndex) =>
            value.map(([, startingDataPoint], index) => {
              const id = `${tooltipId.current}-point-${index}`;
              const color = colors[stackIndex];

              const pointColor = isGradientType(color)
                ? `url(#${id})`
                : makeColorOpaque(color);

              return (
                <React.Fragment key={index}>
                  {isGradientType(color) && (
                    <defs>
                      <LinearGradient
                        id={id}
                        gradient={makeGradientOpaque(color)}
                        gradientUnits="userSpaceOnUse"
                        y1="100%"
                        y2="0%"
                      />
                    </defs>
                  )}
                  <Point
                    stroke={colorWhite}
                    color={pointColor}
                    cx={xScale(index)}
                    cy={yScale(startingDataPoint)}
                    active={index === activePointIndex}
                    onFocus={handleFocus}
                    index={index}
                    tabIndex={stackIndex === 0 ? 0 : -1}
                    ariaLabelledby={tooltipId.current}
                    isAnimated={isAnimated && !prefersReducedMotion}
                  />
                </React.Fragment>
              );
            }),
          )}
        </g>
      </svg>
      {tooltipPosition == null || activePointIndex == null ? null : (
        <TooltipContainer
          id={tooltipId.current}
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={dimensions}
          margin={Margin}
        >
          {tooltipMarkup}
        </TooltipContainer>
      )}
    </React.Fragment>
  );

  function handleFocus({index, x, y}: ActiveTooltip) {
    if (index == null) return;
    setActivePointIndex(index);
    setTooltipPosition({
      x: x + dataStartPosition,
      y,
    });
  }

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    if (axisMargin == null || xScale == null) {
      return;
    }

    const point = eventPoint(event);
    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    if (svgX < dataStartPosition) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - dataStartPosition));
    setActivePointIndex(Math.min(longestSeriesLength, closestIndex));
    setTooltipPosition({
      x: svgX,
      y: svgY,
    });
  }
}
