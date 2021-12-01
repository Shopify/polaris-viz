import React, {useState, useMemo, useCallback} from 'react';

import {BarChartMargin as Margin, XMLNS} from '../../constants';
import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
import {
  getTextWidth,
  getBarXAxisDetails,
  shouldRotateZeroBars,
  eventPointNative,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {Dimensions, BarMargin, DataType, DataSeries} from '../../types';
import {useTheme} from '../../hooks';

import {getStackedValues, formatAriaLabel} from './utilities';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from './types';
import {BarGroup, StackedBarGroup} from './components';
import {useYScale, useXScale} from './hooks';
import {FONT_SIZE, SMALL_WIDTH, SMALL_FONT_SIZE, SPACING} from './constants';
import styles from './Chart.scss';

export interface Props {
  data: DataSeries[];
  dimensions?: Dimensions;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  xAxisOptions: XAxisOptions;
  yAxisOptions: YAxisOptions;
  isStacked?: boolean;
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
}

export function Chart({
  data,
  dimensions,
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
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const fontSize = width < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = data.length === 0;

  const stackedValues = isStacked
    ? getStackedValues(data, xAxisOptions.labels)
    : null;

  const {ticks: initialTicks} = useYScale({
    drawableHeight: height - Margin.Top - Margin.Bottom,
    data,
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
    width - Margin.Right - axisMargin - selectedTheme.grid.horizontalMargin * 2;

  const formattedXAxisLabels = useMemo(
    () => xAxisOptions.labels.map(xAxisOptions.labelFormatter),
    [xAxisOptions.labelFormatter, xAxisOptions.labels],
  );

  const rotateZeroBars = useMemo(
    () =>
      selectedTheme.bar.zeroAsMinHeight &&
      data.every(({data}) => shouldRotateZeroBars(data)),
    [selectedTheme.bar.zeroAsMinHeight, data],
  );

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth,
        xLabels: hideXAxis ? [] : formattedXAxisLabels,
        fontSize,
        width: width - selectedTheme.grid.horizontalMargin * 2,
        innerMargin: BarMargin[selectedTheme.bar.innerMargin],
        outerMargin: BarMargin[selectedTheme.bar.outerMargin],
        wrapLabels: xAxisOptions.wrapLabels ?? true,
      }),
    [
      hideXAxis,
      yAxisLabelWidth,
      formattedXAxisLabels,
      fontSize,
      width,
      selectedTheme.grid.horizontalMargin,
      selectedTheme.bar.innerMargin,
      selectedTheme.bar.outerMargin,
      xAxisOptions,
    ],
  );

  const sortedData = xAxisOptions.labels.map((_, index) => {
    return data
      .map((type) => type.data[index].value)
      .filter(Boolean) as number[];
  });

  const areAllNegative = useMemo(() => {
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
    height - Margin.Top - Margin.Bottom - xAxisDetails.maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    stackedValues,
    integersOnly: yAxisOptions.integersOnly,
  });

  const barColors = data.map(({color}) => color!);

  const getTooltipMarkup = useCallback(
    (index: number) => {
      if (index == null) {
        return null;
      }

      const content = data.map(({data, color, name}) => {
        return {
          label: name ?? '',
          color: color!,
          value: data[index].value ?? 0,
        };
      });

      return renderTooltipContent({
        data: content,
        title: xAxisOptions.labels[index],
      });
    },
    [renderTooltipContent, data, xAxisOptions.labels],
  );

  const accessibilityData = useMemo(
    () =>
      xAxisOptions.labels.map((title, index) => {
        const content = data.map(({data, name}) => {
          return {
            label: name ?? '',
            value: yAxisOptions.labelFormatter(data[index].value ?? 0),
          };
        });
        return {title, data: content};
      }),
    [data, xAxisOptions.labels, yAxisOptions],
  );

  return (
    <div
      className={styles.ChartContainer}
      style={{
        height,
        width,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
        width={width}
        height={height}
        className={styles.Svg}
        role={emptyState ? 'img' : 'list'}
        aria-label={emptyState ? emptyStateText : undefined}
        ref={setSvgRef}
      >
        {hideXAxis ? null : (
          <g
            transform={`translate(${chartStartPosition},${
              height - Margin.Bottom - maxXLabelHeight
            })`}
            aria-hidden="true"
          >
            <BarChartXAxis
              drawableHeight={drawableHeight}
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
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
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

      <TooltipWrapper
        bandwidth={xScale.bandwidth()}
        chartDimensions={{width, height}}
        focusElementDataType={DataType.BarGroup}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={Margin}
        onIndexChange={(index) => setActiveBarGroup(index)}
        parentRef={svgRef}
      />
    </div>
  );

  function formatPositionForTooltip(index: number | null): TooltipPosition {
    if (index == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const xPosition = xScale(`${index}`) ?? 0;
    const sortedDataPos = sortedData[index].map((num) => Math.abs(num));

    const highestValuePos = isStacked
      ? sortedData[index].reduce(sumPositiveData, 0)
      : Math.max(...sortedDataPos);

    const x = xPosition + chartStartPosition;
    const y = yScale(highestValuePos) + (Margin.Top as number);

    return {
      x,
      y: Math.abs(y),
      position: {
        horizontal: TooltipHorizontalOffset.Center,
        vertical: areAllNegative
          ? TooltipVerticalOffset.Below
          : TooltipVerticalOffset.Above,
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
      const activeIndex = Math.floor(currentPoint / xScale.step());

      if (
        activeIndex < 0 ||
        activeIndex > sortedData.length - 1 ||
        svgY <= Margin.Top ||
        svgY > drawableHeight + Number(Margin.Bottom) + maxXLabelHeight
      ) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      return formatPositionForTooltip(activeIndex);
    } else if (index != null) {
      return formatPositionForTooltip(index);
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}
