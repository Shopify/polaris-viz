import React, {useState, useMemo, useRef} from 'react';
import {line, stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';

import {LinearGradient} from '../LinearGradient';
import {
  useLinearXAxisDetails,
  useLinearXScale,
  useLinearChartAnimations,
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
  XMLNS,
} from '../../constants';
import {TooltipContainer} from '../TooltipContainer';
import {
  eventPoint,
  isGradientType,
  changeColorOpacity,
  changeGradientOpacity,
  uniqueId,
  curveStepRounded,
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
  DataSeries,
  Data,
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
  isAnimated: boolean;
  theme?: string;
}

type SeriesForAnimation = Required<Partial<DataSeries<Data, null>>>;

export function Chart({
  xAxisLabels,
  series,
  dimensions,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
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

  const lineGenerator = useMemo(() => {
    const generator = line<{rawValue: number}>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({rawValue}) => yScale(rawValue));

    if (selectedTheme.line.hasSpline) {
      generator.curve(curveStepRounded);
    }

    return generator;
  }, [xScale, yScale, selectedTheme.line.hasSpline]);

  const seriesForAnimation = useMemo(() => {
    return stackedValues.map((value) => {
      return {
        name: '',
        color: null,
        data: value.map((val) => {
          return {
            label: '',
            rawValue: val[1],
          };
        }),
      };
    });
  }, [stackedValues]);

  const {animatedCoordinates} = useLinearChartAnimations<SeriesForAnimation>({
    series: seriesForAnimation,
    lineGenerator,
    activeIndex: activePointIndex,
    isAnimated: true,
  });

  const getXPosition = (
    {isCrosshair, index} = {isCrosshair: false, index: activePointIndex},
  ) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    if (
      index !== null &&
      animatedCoordinates != null &&
      activePointIndex != null &&
      animatedCoordinates[index]
    ) {
      return animatedCoordinates[index].to((coord) => coord.x - offset);
    }

    return xScale(index == null ? 0 : index) - offset;
  };

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  return (
    <React.Fragment>
      <svg
        className={styles.Chart}
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
            theme={theme}
          />
        </g>

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            width={axisMargin}
            textAlign="right"
            theme={theme}
          />
        </g>

        <HorizontalGridLines
          ticks={ticks}
          transform={{
            x: dataStartPosition,
            y: Margin.Top,
          }}
          width={drawableWidth}
          theme={theme}
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
          isAnimated={isAnimated && !prefersReducedMotion}
          theme={theme}
        />

        {activePointIndex == null ? null : (
          <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
            <Crosshair
              x={getXPosition({isCrosshair: true, index: 0})}
              height={drawableHeight}
              theme={theme}
            />
          </g>
        )}

        <g transform={`translate(${dataStartPosition},${Margin.Top})`}>
          {stackedValues.map((_, stackIndex) => {
            if (activePointIndex == null) {
              return null;
            }

            const id = `${tooltipId.current}-point-${stackIndex}`;
            const color = colors[stackIndex];

            const animatedYPostion =
              animatedCoordinates == null ||
              animatedCoordinates[stackIndex] == null
                ? 0
                : animatedCoordinates[stackIndex].to((coord) => coord.y);

            const pointColor = isGradientType(color)
              ? `url(#${id})`
              : changeColorOpacity(color);

            return (
              <React.Fragment key={stackIndex}>
                {isGradientType(color) && (
                  <defs>
                    <LinearGradient
                      id={id}
                      gradient={changeGradientOpacity(color)}
                      gradientUnits="userSpaceOnUse"
                      y1="100%"
                      y2="0%"
                    />
                  </defs>
                )}
                <Point
                  stroke={colorWhite}
                  color={pointColor}
                  cx={getXPosition({isCrosshair: false, index: stackIndex})}
                  cy={animatedYPostion}
                  active
                  onFocus={handleFocus}
                  index={stackIndex}
                  tabIndex={stackIndex === 0 ? 0 : -1}
                  isAnimated={isAnimated && !prefersReducedMotion}
                />
              </React.Fragment>
            );
          })}
          {stackedValues[0].map(([x, y], dataIndex) => {
            // These are the points used for tabbing and
            // a11y. We only render a single series otherwise
            // the tabbing would loop through each set of points
            // for each series.
            return (
              <Point
                key={`point-${dataIndex}-${x}}`}
                stroke={colorWhite}
                color={colorWhite}
                cx={xScale(dataIndex)}
                cy={yScale(y)}
                active
                onFocus={handleFocus}
                index={dataIndex}
                tabIndex={0}
                ariaLabelledby={tooltipId.current}
                isAnimated={false}
                ariaHidden={false}
                visuallyHidden
              />
            );
          })}
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
