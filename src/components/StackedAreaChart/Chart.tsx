import React, {useState, useMemo, useRef, useCallback} from 'react';
import {line, stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';

import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionOffset,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
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
import {
  isGradientType,
  changeColorOpacity,
  changeGradientOpacity,
  uniqueId,
  curveStepRounded,
  eventPointNative,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {Point} from '../Point';
import {LinearXAxis} from '../LinearXAxis';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {
  StringLabelFormatter,
  NumberLabelFormatter,
  Dimensions,
  DataSeries,
  Data,
  DataType,
} from '../../types';

import {Spacing} from './constants';
import {useYScale} from './hooks';
import {StackedAreas} from './components';
import type {Series, RenderTooltipContentData} from './types';
import styles from './Chart.scss';

const TOOLTIP_POSITION: TooltipPositionOffset = {
  horizontal: TooltipHorizontalOffset.Left,
  vertical: TooltipVerticalOffset.Center,
};

interface Props {
  hideXAxis: boolean;
  xAxisOptions: {labels: string[]; wrapLabels?: boolean};
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
  hideXAxis,
  xAxisOptions,
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
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const tooltipId = useRef(uniqueId('stackedAreaChart'));

  const areaStack = useMemo(
    () =>
      stack()
        .keys(series.map(({name}) => name))
        .order(stackOrderReverse)
        .offset(stackOffsetNone),
    [series],
  );

  const xAxisLabels = xAxisOptions.labels;

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

  const stackedValues = useMemo(() => areaStack(formattedData), [
    areaStack,
    formattedData,
  ]);

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
    wrapLabels: xAxisOptions.wrapLabels ?? true,
  });

  const formattedXAxisLabels = xAxisLabels.map(formatXAxisLabel);

  const marginBottom =
    xAxisLabels == null || hideXAxis
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

  const getTooltipMarkup = useCallback(
    (index: number) => {
      const data = series.reduce<RenderTooltipContentData['data']>(
        function removeNullsAndFormatData(
          tooltipData,
          {name, data},
          seriesIndex,
        ) {
          const {rawValue} = data[index];
          if (rawValue == null) {
            return tooltipData;
          }

          tooltipData.push({
            color: colors[seriesIndex],
            label: name,
            value: rawValue,
          });
          return tooltipData;
        },
        [],
      );

      const title = xAxisLabels[index];

      return renderTooltipContent({
        data,
        title,
      });
    },
    [colors, series, xAxisLabels, renderTooltipContent],
  );

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
        ref={setSvgRef}
        role="table"
      >
        {hideXAxis ? null : (
          <g
            transform={`translate(${dataStartPosition},${
              dimensions.height - marginBottom
            })`}
          >
            <LinearXAxis
              xScale={xScale}
              labels={hideXAxis ? null : formattedXAxisLabels}
              xAxisDetails={xAxisDetails}
              drawableHeight={drawableHeight}
              fontSize={fontSize}
              drawableWidth={drawableWidth}
              ariaHidden
              theme={theme}
            />
          </g>
        )}

        <g transform={`translate(0,${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            width={axisMargin}
            textAlign="right"
            theme={theme}
          />
        </g>

        {selectedTheme.grid.showHorizontalLines && (
          <HorizontalGridLines
            ticks={ticks}
            transform={{
              x: dataStartPosition,
              y: Margin.Top,
            }}
            width={drawableWidth}
            theme={theme}
          />
        )}

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
                  stroke={selectedTheme.line.pointStroke}
                  color={pointColor}
                  cx={getXPosition({isCrosshair: false, index: stackIndex})}
                  cy={animatedYPostion}
                  active
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
                dataType={DataType.Point}
                key={`point-${dataIndex}-${x}}`}
                stroke={selectedTheme.line.pointStroke}
                color={colorWhite}
                cx={xScale(dataIndex)}
                cy={yScale(y)}
                active
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
      <TooltipWrapper
        alwaysUpdatePosition
        chartDimensions={dimensions}
        focusElementDataType={DataType.Point}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        id={tooltipId.current}
        margin={Margin}
        onIndexChange={(index) => setActivePointIndex(index)}
        parentRef={svgRef}
      />
    </React.Fragment>
  );

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    if (eventType === 'mouse' && event) {
      const point = eventPointNative(event!);

      if (point == null || xScale == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgX, svgY} = point;

      const closestIndex = Math.round(xScale.invert(svgX - dataStartPosition));

      return {
        x: svgX,
        y: svgY,
        position: TOOLTIP_POSITION,
        activeIndex: Math.min(longestSeriesLength, closestIndex),
      };
    } else if (index != null) {
      return {
        x: xScale?.(index) ?? 0,
        y: 0,
        position: TOOLTIP_POSITION,
        activeIndex: index,
      };
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}
