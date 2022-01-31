import React, {useState, useMemo} from 'react';
import type {AnnotationLookupTable} from 'components/BarChart/types';

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
  getStackedValues,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {
  Dimensions,
  BarMargin,
  DataType,
  DataSeries,
  ChartType,
} from '../../types';
import {useBarChartTooltipContent, useTheme} from '../../hooks';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from '../BarChart';
import {AnnotationLine} from '../BarChart';

import {formatAriaLabel} from './utilities';
import {BarGroup, StackedBarGroup} from './components';
import {useYScale, useXScale, useMinimalLabelIndexes} from './hooks';
import {
  FONT_SIZE,
  SMALL_WIDTH,
  SMALL_FONT_SIZE,
  SPACING,
  BAR_SPACING,
} from './constants';
import styles from './Chart.scss';
import {useStackedGapsForVerticalChart} from './hooks/useStackedGapsForVerticalChart';

export interface Props {
  data: DataSeries[];
  dimensions?: Dimensions;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  dimensions,
  renderTooltipContent,
  xAxisOptions,
  yAxisOptions,
  isAnimated = false,
  emptyStateText,
  theme,
  type,
}: Props) {
  const selectedTheme = useTheme(theme);
  const [activeBarGroup, setActiveBarGroup] = useState<number | null>(null);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const fontSize = width < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;

  const emptyState = data.length === 0;

  const labels = useMemo(() => {
    const labels: string[] = [];

    data.forEach(({data}) => {
      data.forEach(({key}, index) => {
        labels[index] = xAxisOptions.labelFormatter?.(`${key}`) ?? `${key}`;
      });
    });

    return labels;
  }, [data, xAxisOptions]);

  const stackedValues =
    type === 'stacked' ? getStackedValues(data, labels) : null;

  const {minimalLabelIndexes} = useMinimalLabelIndexes({
    useMinimalLabels: xAxisOptions.useMinimalLabels,
    dataLength: data[0] ? data[0].data.length : 0,
  });

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
        xLabels: hideXAxis ? [] : labels,
        fontSize,
        width: width - selectedTheme.grid.horizontalMargin * 2,
        innerMargin: BarMargin[selectedTheme.bar.innerMargin],
        outerMargin: BarMargin[selectedTheme.bar.outerMargin],
        wrapLabels: xAxisOptions.wrapLabels ?? true,
        minimalLabelIndexes,
      }),
    [
      hideXAxis,
      yAxisLabelWidth,
      labels,
      fontSize,
      width,
      selectedTheme.grid.horizontalMargin,
      selectedTheme.bar.innerMargin,
      selectedTheme.bar.outerMargin,
      xAxisOptions,
      minimalLabelIndexes,
    ],
  );

  const sortedData = labels.map((_, index) => {
    return data
      .map((type) => type.data[index].value)
      .filter((value) => value !== null) as number[];
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
    labels,
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

  const getTooltipMarkup = useBarChartTooltipContent({
    annotationsLookupTable,
    renderTooltipContent,
    data,
    seriesColors: barColors,
  });

  const accessibilityData = useMemo(
    () =>
      labels.map((title, index) => {
        const content = data.map(({data, name}) => {
          return {
            label: name ?? '',
            value: yAxisOptions.labelFormatter(data[index].value ?? 0),
          };
        });
        return {title, data: content};
      }),
    [data, labels, yAxisOptions],
  );

  const gaps = useStackedGapsForVerticalChart({stackedValues, labels});

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
              minimalLabelIndexes={minimalLabelIndexes}
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
                    gaps={gaps}
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
        <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
          {Object.keys(annotationsLookupTable).map((key, dataIndex) => {
            const annotation = annotationsLookupTable[Number(key)];

            if (annotation == null) {
              return null;
            }

            const xPosition = xScale(key);
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const barWidth = xScale.bandwidth() / data.length - BAR_SPACING;
            const leftOffset = barWidth * annotation.dataPointIndex;

            return (
              <AnnotationLine
                barSize={barWidth}
                color={annotation.color}
                drawableSize={drawableHeight}
                key={`annotation${dataIndex}${annotation.dataPointIndex}`}
                offset={annotation.offset}
                position={xPositionValue + leftOffset}
                shouldAnimate={isAnimated}
                width={annotation.width}
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

    const highestValuePos =
      type === 'stacked'
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
