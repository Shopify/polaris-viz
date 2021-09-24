import React, {useState, useMemo, useCallback} from 'react';

import {
  BarChartMargin as Margin,
  XMLNS,
  BAR_ANIMATION_HEIGHT_BUFFER,
} from '../../constants';
import {
  TooltipContainer,
  TooltipPosition as TooltipContainerPosition,
} from '../TooltipContainer';
import {
  eventPoint,
  getTextWidth,
  getBarXAxisDetails,
  shouldRotateZeroBars,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {Dimensions, BarMargin} from '../../types';
import {useTheme} from '../../hooks';

import {getStackedValues, formatAriaLabel} from './utilities';
import type {
  Series,
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from './types';
import {BarGroup, StackedBarGroup} from './components';
import {useYScale, useXScale} from './hooks';
import {FONT_SIZE, SMALL_WIDTH, SMALL_FONT_SIZE, SPACING} from './constants';
import styles from './Chart.scss';

interface TooltipPosition {
  x: number;
  y: number;
  position: TooltipContainerPosition;
}

interface Props {
  series: Required<Series>[];
  chartDimensions: Dimensions;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  xAxisOptions: XAxisOptions;
  yAxisOptions: YAxisOptions;
  isStacked?: boolean;
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
}

export function Chart({
  series,
  chartDimensions,
  renderTooltipContent,
  xAxisOptions,
  yAxisOptions,
  isStacked = false,
  isAnimated = false,
  emptyStateText,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const [activeBarGroup, setActiveBarGroup] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = series.length === 0;

  const stackedValues = isStacked
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
  const chartStartPosition = axisMargin + selectedTheme.grid.horizontalMargin;
  const drawableWidth =
    chartDimensions.width -
    Margin.Right -
    axisMargin -
    selectedTheme.grid.horizontalMargin * 2;

  const formattedXAxisLabels = useMemo(
    () => xAxisOptions.labels.map(xAxisOptions.labelFormatter),
    [xAxisOptions.labelFormatter, xAxisOptions.labels],
  );

  const rotateZeroBars = useMemo(
    () =>
      selectedTheme.bar.zeroAsMinHeight &&
      series.every(({data}) => shouldRotateZeroBars(data)),
    [selectedTheme.bar.zeroAsMinHeight, series],
  );

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth,
        xLabels: hideXAxis ? [] : formattedXAxisLabels,
        fontSize,
        width: chartDimensions.width - selectedTheme.grid.horizontalMargin * 2,
        innerMargin: BarMargin[selectedTheme.bar.innerMargin],
        outerMargin: BarMargin[selectedTheme.bar.outerMargin],
      }),
    [
      hideXAxis,
      yAxisLabelWidth,
      formattedXAxisLabels,
      fontSize,
      chartDimensions.width,
      selectedTheme.grid.horizontalMargin,
      selectedTheme.bar.innerMargin,
      selectedTheme.bar.outerMargin,
    ],
  );

  const sortedData = xAxisOptions.labels.map((_, index) => {
    return series.map((type) => type.data[index].rawValue);
  });

  const areAllAllNegative = useMemo(() => {
    return ![...sortedData]
      .reduce((prev, cur) => prev.concat(cur), [])
      // If one value is greater than zero,
      // bail out of the loop
      .some((num) => num > 0);
  }, [sortedData]);

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data: sortedData,
    innerMargin: BarMargin[selectedTheme.bar.innerMargin],
    outerMargin: BarMargin[selectedTheme.bar.outerMargin],
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
      const highestValue = isStacked
        ? sortedData[index].reduce(sumPositiveData, 0)
        : Math.max(...sortedData[index]);
      setActiveBarGroup(index);

      const xOffsetAmount =
        xPosition + chartStartPosition + xScaleBandwidth / 2;
      setTooltipPosition({
        x: xOffsetAmount,
        y: yScale(highestValue),
        position: {
          horizontal: 'center',
          vertical: 'above',
        },
      });
    },
    [chartStartPosition, isStacked, sortedData, xScale, yScale],
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
        xmlns={XMLNS}
        width={chartDimensions.width}
        height={chartDimensions.height}
        style={{overflow: 'visible'}}
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onMouseLeave={() => setActiveBarGroup(null)}
        onTouchEnd={() => setActiveBarGroup(null)}
        role={emptyState ? 'img' : 'list'}
        aria-label={emptyState ? emptyStateText : undefined}
      >
        {hideXAxis ? null : (
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
              theme={theme}
            />
          </g>
        )}

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartStartPosition,
              y: Margin.Top,
            }}
            width={
              selectedTheme.grid.horizontalOverflow
                ? chartDimensions.width
                : drawableWidth
            }
            theme={theme}
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
                    hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
                    rotateZeroBars={rotateZeroBars}
                    zeroAsMinHeight={selectedTheme.bar.zeroAsMinHeight}
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
          position={tooltipPosition.position}
          bandwidth={xScale.bandwidth()}
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

    if (activeBarGroup === currentIndex) {
      return;
    } else {
      setActiveBarGroup(currentIndex);
    }

    if (
      currentIndex < 0 ||
      currentIndex > sortedData.length - 1 ||
      svgY <= Margin.Top ||
      svgY > drawableHeight + Number(Margin.Bottom) + maxXLabelHeight
    ) {
      setActiveBarGroup(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString()) ?? 0;

    const sortedDataPos = sortedData[currentIndex].map((num) => Math.abs(num));

    const highestValuePos = isStacked
      ? sortedData[currentIndex].reduce(sumPositiveData, 0)
      : Math.max(...sortedDataPos);

    const left = xPosition + chartStartPosition;
    const top = yScale(highestValuePos) + (Margin.Top as number);

    const tooltipPosition: TooltipPosition = {
      x: left,
      y: Math.abs(top),
      position: {
        horizontal: 'center',
        vertical: areAllAllNegative ? 'below' : 'above',
      },
    };

    setTooltipPosition(tooltipPosition);
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}
