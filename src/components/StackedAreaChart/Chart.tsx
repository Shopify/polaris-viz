import React, {useState, useMemo, useRef} from 'react';
import {stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';
import {colorSky, colorWhite} from '@shopify/polaris-tokens';

import {
  useLinearXAxisDetails,
  useLinearXScale,
  usePrefersReducedMotion,
} from '../../hooks';
import {
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
  SPACING_TIGHT,
  FONT_SIZE,
  CROSSHAIR_WIDTH,
  LineChartMargin as Margin,
  XMLNS,
} from '../../constants';
import {TooltipContainer} from '../TooltipContainer';
import {eventPoint, uniqueId, getColorValue} from '../../utilities';
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
import styles from './Chart.scss';
import type {Series, RenderTooltipContentData} from './types';

interface Props {
  xAxisLabels: string[];
  series: Required<Series>[];
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  dimensions: Dimensions;
  opacity: number;
  isAnimated: boolean;
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
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();

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

  const colors = useMemo(() => series.map(({color}) => color), [series]);

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
      function removeNullsAndFormatData(tooltipData, {color, name, data}) {
        const {rawValue} = data[activePointIndex];
        if (rawValue == null) {
          return tooltipData;
        }

        tooltipData.push({color, label: name, value: rawValue});
        return tooltipData;
      },
      [],
    );

    const title = xAxisLabels[activePointIndex];

    return renderTooltipContent({
      data,
      title,
    });
  }, [activePointIndex, series, xAxisLabels, renderTooltipContent]);

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <svg
        xmlns={XMLNS}
        width={dimensions.width}
        height={dimensions.height}
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
          />
        </g>

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            width={axisMargin}
            textAlign="right"
          />
        </g>

        <HorizontalGridLines
          ticks={ticks}
          color={colorSky}
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
              x={xScale(activePointIndex) - CROSSHAIR_WIDTH / 2}
              height={drawableHeight}
              opacity={0.5}
            />
          </g>
        )}

        <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
          {stackedValues.map((value, stackIndex) =>
            value.map(([, startingDataPoint], index) => (
              <Point
                stroke={colorWhite}
                key={index}
                color={getColorValue(colors[stackIndex])}
                cx={xScale(index)}
                cy={yScale(startingDataPoint)}
                active={index === activePointIndex}
                onFocus={handleFocus}
                index={index}
                tabIndex={stackIndex === 0 ? 0 : -1}
                ariaLabelledby={tooltipId.current}
                isAnimated={isAnimated && !prefersReducedMotion}
              />
            )),
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
    </div>
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
