import React, {useState, useMemo, useCallback} from 'react';

import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipPosition,
  TooltipPositionParams,
} from '../../components/TooltipWrapper';
import {eventPointNative} from '../../utilities/event-point';
import {getSeriesColorsFromCount} from '../../hooks/use-theme-series-colors';
import {usePrefersReducedMotion, useTheme} from '../../hooks';
import {
  BarChartMargin as Margin,
  LINE_HEIGHT,
  MIN_BAR_HEIGHT,
  MASK_HIGHLIGHT_COLOR,
  XMLNS,
  BAR_ANIMATION_HEIGHT_BUFFER,
  LOAD_ANIMATION_DURATION,
  MASK_SUBDUE_COLOR,
} from '../../constants';
import {
  getTextWidth,
  getBarXAxisDetails,
  uniqueId,
  isGradientType,
  shouldRotateZeroBars,
} from '../../utilities';
import {Bar} from '../Bar';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {LinearGradient} from '../LinearGradient';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {
  Dimensions,
  XAxisOptions,
  YAxisOptions,
  BarMargin,
  DataType,
} from '../../types';

import {AnnotationLine} from './components';
import type {
  BarChartData,
  RenderTooltipContentData,
  AnnotationLookupTable,
} from './types';
import {useYScale, useXScale, useMinimalLabelIndexes} from './hooks';
import {SMALL_FONT_SIZE, FONT_SIZE, SMALL_SCREEN, SPACING} from './constants';
import styles from './Chart.scss';

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

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

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

  const zeroPosition = yScale(0);

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

  const tooltipMarkup = useCallback(
    (activeIndex: number) => {
      if (activeIndex == null) {
        return null;
      }

      return renderTooltipContent({
        label: data[activeIndex].label,
        value: data[activeIndex].rawValue,
        annotation: annotationsLookupTable[activeIndex],
      });
    },
    [data, annotationsLookupTable, renderTooltipContent],
  );

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - zeroPosition);

      const needsMinHeight = selectedTheme.bar.zeroAsMinHeight
        ? rawHeight < MIN_BAR_HEIGHT
        : rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [selectedTheme.bar, yScale, zeroPosition],
  );

  const shouldAnimate = !prefersReducedMotion && isAnimated;

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
        className={styles.Svg}
        role={emptyState ? 'img' : 'list'}
        aria-label={emptyState ? emptyStateText : undefined}
        ref={setSvgRef}
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
              {data.map(({rawValue}, index) => {
                const xPosition = xScale(index.toString());
                const ariaLabel = `${xAxisOptions.labelFormatter(
                  data[index].label,
                )}: ${yAxisOptions.labelFormatter(data[index].rawValue)}`;
                const annotation = annotationsLookupTable[index];
                const height = getBarHeight(rawValue);

                return (
                  <g role="listitem" key={`bar-${index}`}>
                    <Bar
                      height={height}
                      x={xPosition == null ? 0 : xPosition}
                      rawValue={rawValue}
                      width={barWidth}
                      color={MASK_HIGHLIGHT_COLOR}
                      index={index}
                      ariaLabel={`${ariaLabel} ${
                        annotation ? annotation.ariaLabel : ''
                      }`}
                      tabIndex={0}
                      role="img"
                      hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
                      rotateZeroBars={rotateZeroBars}
                      animationDelay={
                        index * (LOAD_ANIMATION_DURATION / data.length)
                      }
                      zeroPosition={zeroPosition}
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
            y={BAR_ANIMATION_HEIGHT_BUFFER * -1}
            width={width}
            height={height + BAR_ANIMATION_HEIGHT_BUFFER * 2}
            fill={`url(#${gradientId})`}
          />
          {data.map(({barColor}, index) => {
            const xPosition = xScale(index.toString());
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const translateXValue = xPositionValue + chartStartPosition;

            const fillColor = typeof barColor === 'string' ? barColor : '';

            return barColor != null ? (
              <rect
                key={index}
                transform={`translate(${translateXValue},${Margin.Top})`}
                x="0"
                y="0"
                width={barWidth}
                height={height}
                fill={fillColor}
              />
            ) : null;
          })}
        </g>

        <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
          {data.map((_, index) => {
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

      <TooltipWrapper
        bandwidth={xScale.bandwidth()}
        chartDimensions={chartDimensions}
        focusElementDataType={DataType.Bar}
        getMarkup={tooltipMarkup}
        getPosition={getTooltipPosition}
        margin={Margin}
        onIndexChange={onIndexChange}
        parentRef={svgRef}
      />
    </div>
  );

  function onIndexChange(index: number) {
    const barElements = svgRef?.querySelectorAll(`[data-type=${DataType.Bar}]`);

    if (!barElements) {
      return;
    }

    if (index == null) {
      barElements.forEach((element: SVGPathElement) => {
        element.style.fill = MASK_HIGHLIGHT_COLOR;
      });
    } else {
      barElements.forEach((el: SVGPathElement) => {
        if (el.dataset.id === `bar-${index}`) {
          el.style.fill = MASK_HIGHLIGHT_COLOR;
        } else {
          el.style.fill = MASK_SUBDUE_COLOR;
        }
      });
    }
  }

  function formatPositionForTooltip(index: number): TooltipPosition {
    const xPosition = xScale(`${index}`) ?? 0;
    const value = data[index].rawValue;
    const tooltipXPosition = xPosition + chartStartPosition;

    return {
      x: tooltipXPosition,
      y: yScale(value),
      position: {
        horizontal: TooltipHorizontalOffset.Center,
        vertical:
          value < 0 ? TooltipVerticalOffset.Below : TooltipVerticalOffset.Above,
      },
      activeIndex: index,
    };
  }

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    if (eventType === 'mouse' && event) {
      const point = eventPointNative(event);

      if (point == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgX, svgY} = point;
      const currentPoint = svgX - chartStartPosition;
      const currentIndex = Math.floor(currentPoint / xScale.step());

      if (
        svgY <= Margin.Top ||
        svgY >
          drawableHeight +
            Number(Margin.Bottom) +
            xAxisDetails.maxXLabelHeight ||
        currentIndex < 0 ||
        currentIndex > data.length - 1
      ) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      return formatPositionForTooltip(currentIndex);
    } else if (index != null) {
      return formatPositionForTooltip(index);
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}
