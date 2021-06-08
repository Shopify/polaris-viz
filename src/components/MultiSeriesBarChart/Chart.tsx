import React, {useState, useMemo, useCallback} from 'react';

import {BarChartMargin as Margin} from '../../constants';
import {TooltipContainer} from '../TooltipContainer';
import {
  eventPoint,
  getTextWidth,
  getBarXAxisDetails,
  shouldRotateZeroBars,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import type {Dimensions} from '../../types';

import {getStackedValues, formatAriaLabel} from './utilities';
import type {
  Series,
  RenderTooltipContentData,
  BarOptions as MultiSeriesBarOptions,
  GridOptions,
  XAxisOptions,
  YAxisOptions,
} from './types';
import {BarGroup, StackedBarGroup} from './components';
import {useYScale, useXScale} from './hooks';
import {FONT_SIZE, SMALL_WIDTH, SMALL_FONT_SIZE, SPACING} from './constants';
import styles from './Chart.scss';

type BarOptions = Omit<MultiSeriesBarOptions, 'innerMargin' | 'outerMargin'> & {
  innerMargin: number;
  outerMargin: number;
};

interface Props {
  series: Required<Series>[];
  chartDimensions: Dimensions;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  barOptions: BarOptions;
  gridOptions: GridOptions;
  xAxisOptions: XAxisOptions;
  yAxisOptions: YAxisOptions;
  isAnimated?: boolean;
  emptyStateText?: string;
}

export function Chart({
  series,
  chartDimensions,
  renderTooltipContent,
  gridOptions,
  xAxisOptions,
  yAxisOptions,
  barOptions,
  isAnimated = false,
  emptyStateText,
}: Props) {
  const [activeBarGroup, setActiveBarGroup] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = series.length === 0;

  const stackedValues = barOptions.isStacked
    ? getStackedValues(series, xAxisOptions.labels)
    : null;

  const {ticks: initialTicks} = useYScale({
    drawableHeight: chartDimensions.height - Margin.Top - Margin.Bottom,
    data: series,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    stackedValues,
    integersOnly: yAxisOptions.integersOnly,
  });

  const yAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...initialTicks.map(({formattedValue}) =>
          getTextWidth({
            text: formattedValue,
            fontSize,
          }),
        ),
      ),
    [fontSize, initialTicks],
  );

  const axisMargin = SPACING + yAxisLabelWidth;
  const chartStartPosition = axisMargin + gridOptions.horizontalMargin;
  const drawableWidth =
    chartDimensions.width -
    Margin.Right -
    axisMargin -
    gridOptions.horizontalMargin * 2;

  const formattedXAxisLabels = useMemo(
    () => xAxisOptions.labels.map(xAxisOptions.labelFormatter),
    [xAxisOptions.labelFormatter, xAxisOptions.labels],
  );

  const rotateZeroBars = useMemo(
    () =>
      barOptions.zeroAsMinHeight &&
      series.every(({data}) => shouldRotateZeroBars(data)),
    [barOptions.zeroAsMinHeight, series],
  );

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth,
        xLabels: formattedXAxisLabels,
        fontSize,
        width: chartDimensions.width - gridOptions.horizontalMargin * 2,
        innerMargin: barOptions.innerMargin,
        outerMargin: barOptions.outerMargin,
      }),
    [
      yAxisLabelWidth,
      formattedXAxisLabels,
      fontSize,
      chartDimensions.width,
      gridOptions.horizontalMargin,
      barOptions.innerMargin,
      barOptions.outerMargin,
    ],
  );

  const sortedData = xAxisOptions.labels.map((_, index) => {
    return series.map((type) => type.data[index].rawValue);
  });

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data: sortedData,
    innerMargin: barOptions.innerMargin,
    outerMargin: barOptions.outerMargin,
    labels: formattedXAxisLabels,
  });

  const {maxXLabelHeight} = xAxisDetails;

  const drawableHeight =
    chartDimensions.height -
    Margin.Top -
    Margin.Bottom -
    xAxisDetails.maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data: series,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    stackedValues,
    integersOnly: yAxisOptions.integersOnly,
  });

  const barColors = series.map(({color}) => color);

  const tooltipContentMarkup = useMemo(() => {
    if (activeBarGroup == null) {
      return null;
    }

    const data = series.map(({data, color, name}) => {
      return {
        label: name,
        color,
        value: data[activeBarGroup].rawValue,
      };
    });

    return renderTooltipContent({
      data,
      title: xAxisOptions.labels[activeBarGroup],
    });
  }, [activeBarGroup, renderTooltipContent, series, xAxisOptions.labels]);

  const accessibilityData = useMemo(
    () =>
      xAxisOptions.labels.map((title, index) => {
        const data = series.map(({data, name}) => {
          return {
            label: name,
            value: yAxisOptions.labelFormatter(data[index].rawValue),
          };
        });
        return {title, data};
      }),
    [series, xAxisOptions.labels, yAxisOptions],
  );

  const handleFocus = useCallback(
    (index: number) => {
      const xScaleBandwidth = xScale.bandwidth();
      const xPosition = xScale(index.toString());

      if (index == null || xPosition == null) return;
      const highestValue = barOptions.isStacked
        ? sortedData[index].reduce(sumPositiveData, 0)
        : Math.max(...sortedData[index]);
      setActiveBarGroup(index);

      const xOffsetAmount =
        xPosition + chartStartPosition + xScaleBandwidth / 2;
      setTooltipPosition({
        x: xOffsetAmount,
        y: yScale(highestValue),
      });
    },
    [chartStartPosition, barOptions.isStacked, sortedData, xScale, yScale],
  );

  return (
    <div
      className={styles.ChartContainer}
      style={{
        height: chartDimensions.height,
        width: chartDimensions.width,
      }}
    >
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onMouseLeave={() => setActiveBarGroup(null)}
        onTouchEnd={() => setActiveBarGroup(null)}
        role={emptyState ? 'img' : 'list'}
        aria-label={emptyState ? emptyStateText : undefined}
      >
        <g
          transform={`translate(${chartStartPosition},${
            chartDimensions.height - Margin.Bottom - maxXLabelHeight
          })`}
          aria-hidden="true"
        >
          <BarChartXAxis
            labels={xAxisLabels}
            xScale={xScale}
            xAxisDetails={xAxisDetails}
            fontSize={fontSize}
            textColor={xAxisOptions.labelColor}
            gridColor={gridOptions.color}
            showTicks={xAxisOptions.showTicks}
          />
        </g>

        {gridOptions.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            color={gridOptions.color}
            transform={{
              x: gridOptions.horizontalOverflow ? 0 : chartStartPosition,
              y: Margin.Top,
            }}
            width={
              gridOptions.horizontalOverflow
                ? chartDimensions.width
                : drawableWidth
            }
          />
        ) : null}

        <g transform={`translate(0,${Margin.Top})`} aria-hidden="true">
          <YAxis
            ticks={ticks}
            fontSize={fontSize}
            labelColor={yAxisOptions.labelColor}
            textAlign={gridOptions.horizontalOverflow ? 'right' : 'left'}
            width={yAxisLabelWidth}
            backgroundColor={yAxisOptions.backgroundColor}
            outerMargin={gridOptions.horizontalMargin}
          />
        </g>

        <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
          {stackedValues != null
            ? stackedValues.map((stackData, stackIndex) => {
                return (
                  <StackedBarGroup
                    key={stackIndex}
                    groupIndex={stackIndex}
                    activeBarGroup={activeBarGroup}
                    data={stackData}
                    xScale={xScale}
                    yScale={yScale}
                    colors={barColors}
                    onFocus={handleFocus}
                    accessibilityData={accessibilityData}
                  />
                );
              })
            : sortedData.map((item, index) => {
                const xPosition = xScale(index.toString());
                const ariaLabel = formatAriaLabel(accessibilityData[index]);
                return (
                  <BarGroup
                    isAnimated={isAnimated}
                    key={index}
                    x={xPosition == null ? 0 : xPosition}
                    isSubdued={
                      activeBarGroup != null && index !== activeBarGroup
                    }
                    yScale={yScale}
                    data={item}
                    width={xScale.bandwidth()}
                    height={drawableHeight}
                    colors={barColors}
                    onFocus={handleFocus}
                    barGroupIndex={index}
                    ariaLabel={ariaLabel}
                    hasRoundedCorners={barOptions.hasRoundedCorners}
                    rotateZeroBars={rotateZeroBars}
                    zeroAsMinHeight={barOptions.zeroAsMinHeight}
                  />
                );
              })}
        </g>
      </svg>

      {tooltipPosition != null && activeBarGroup != null && !emptyState ? (
        <TooltipContainer
          activePointIndex={activeBarGroup}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={chartDimensions}
          margin={Margin}
          position="center"
        >
          {tooltipContentMarkup}
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
      currentIndex > sortedData.length - 1 ||
      svgY <= Margin.Top ||
      svgY > drawableHeight + Number(Margin.Bottom) + maxXLabelHeight
    ) {
      setActiveBarGroup(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString());
    const highestValue = barOptions.isStacked
      ? sortedData[currentIndex].reduce(sumPositiveData, 0)
      : Math.max(...sortedData[currentIndex]);
    const tooltipXPositon =
      xPosition == null
        ? 0
        : xPosition + chartStartPosition + xScale.bandwidth() / 2;

    setActiveBarGroup(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(highestValue),
    });
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}
