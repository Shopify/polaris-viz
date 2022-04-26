import React, {useState, useMemo, useContext} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  ChartContext,
  estimateStringWidth,
  COLOR_VISION_GROUP_ITEM,
  COLOR_VISION_SINGLE_ITEM,
  getValuesFromDataSeries,
  VerticalBarSeries,
  IS_ANIMATED_DEFAULT,
  VERTICAL_BAR_SPACING,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import type {AnnotationLookupTable} from '../BarChart';
import type {RenderTooltipContentData} from '../../types';
import {useXAxisLabels} from '../../hooks/useXAxisLabels';
import {BarChartXAxisLabels} from '../BarChartXAxisLabels';
import {LegendContainer, useLegend} from '../LegendContainer';
import {GradientDefs} from '../shared';
import {
  BarChartMargin as Margin,
  LABEL_AREA_TOP_SPACING,
  XMLNS,
  Y_AXIS_CHART_SPACING,
} from '../../constants';
import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
import {
  eventPointNative,
  getStackedValues,
  getStackedMinMax,
} from '../../utilities';
import {YAxis} from '../YAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {BarMargin} from '../../types';
import {
  useBarChartTooltipContent,
  useColorVisionEvents,
  useTheme,
  useWatchColorVisionEvents,
  useReducedLabelIndexes,
  usePrefersReducedMotion,
} from '../../hooks';
import {AnnotationLine} from '../BarChart';

import {StackedBarGroups} from './components';
import {useXScale} from './hooks';
import {MIN_Y_LABEL_SPACE} from './constants';
import styles from './Chart.scss';

export interface Props {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: Dimensions;
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  dimensions,
  emptyStateText,
  isAnimated = IS_ANIMATED_DEFAULT,
  renderTooltipContent,
  showLegend,
  theme,
  type,
  xAxisOptions,
  yAxisOptions,
}: Props) {
  useColorVisionEvents(data.length > 1);

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const {characterWidths} = useContext(ChartContext);
  const [activeBarGroup, setActiveBarGroup] = useState<number>(-1);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const id = useMemo(() => uniqueId('VerticalBarChart'), []);
  const [labelHeight, setLabelHeight] = useState(0);

  useWatchColorVisionEvents({
    type: COLOR_VISION_GROUP_ITEM,
    onIndexChange: ({detail}) => {
      setActiveBarGroup(detail.index);
    },
  });

  const {legend, setLegendHeight, height, width} = useLegend({
    data,
    dimensions,
    showLegend,
  });

  const emptyState = data.length === 0;

  const labels = useXAxisLabels({data, xAxisOptions});

  const isStacked = type === 'stacked';
  const stackedValues = isStacked ? getStackedValues(data, labels) : null;

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: data[0] ? data[0].data.length : 0,
  });

  const drawableHeight =
    height - labelHeight - LABEL_AREA_TOP_SPACING - Margin.Top;

  const {min, max} = getStackedMinMax({
    stackedValues,
    data,
    integersOnly: yAxisOptions.integersOnly,
  });

  const {ticks: initialTicks} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max,
    min,
    minLabelSpace: MIN_Y_LABEL_SPACE,
  });

  const yAxisLabelWidth = useMemo(() => {
    const longest = Math.max(
      ...initialTicks.map(({formattedValue}) =>
        estimateStringWidth(formattedValue, characterWidths),
      ),
    );

    return longest;
  }, [characterWidths, initialTicks]);

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  const chartStartPosition =
    yAxisLabelWidth + Y_AXIS_CHART_SPACING + horizontalMargin;
  const drawableWidth = width - chartStartPosition - horizontalMargin * 2;

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

  const sortedData = getValuesFromDataSeries(data, labels);

  const areAllNegative = useMemo(() => {
    return ![...sortedData]
      .reduce((prev, cur) => prev.concat(cur), [])
      // If one value is greater than zero,
      // bail out of the loop
      .some((num) => num > 0);
  }, [sortedData]);

  const {xScale, gapWidth} = useXScale({
    drawableWidth,
    data: sortedData,
    innerMargin: BarMargin[selectedTheme.bar.innerMargin] as number,
    outerMargin: BarMargin[selectedTheme.bar.outerMargin] as number,
    labels,
  });

  const {ticks, yScale} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max,
    min,
    minLabelSpace: MIN_Y_LABEL_SPACE,
  });

  const barColors = data.map(({color}) => color!);

  const getTooltipMarkup = useBarChartTooltipContent({
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

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  return (
    <div className={styles.ChartContainer} style={{height, width}}>
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
          <BarChartXAxisLabels
            chartHeight={height}
            chartX={chartStartPosition}
            chartY={
              drawableHeight + LABEL_AREA_TOP_SPACING + (Margin.Top as number)
            }
            labels={labels}
            labelWidth={xScale.bandwidth()}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={reducedLabelIndexes}
            theme={theme}
            xScale={xScale}
          />
        )}

        <GradientDefs
          direction="vertical"
          gradientUnits={isStacked ? 'objectBoundingBox' : 'userSpaceOnUse'}
          id={id}
          seriesColors={barColors}
          size={isStacked ? '100%' : `${width}px`}
          theme={theme}
        />

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartStartPosition,
              y: Margin.Top,
            }}
            width={width}
            theme={theme}
          />
        ) : null}

        <g transform={`translate(0,${Margin.Top})`} aria-hidden="true">
          <YAxis
            ticks={ticks}
            textAlign="right"
            width={yAxisLabelWidth}
            theme={theme}
          />
        </g>

        <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
          {stackedValues != null ? (
            <StackedBarGroups
              accessibilityData={accessibilityData}
              activeBarGroup={activeBarGroup}
              colors={barColors}
              drawableHeight={drawableHeight}
              gapWidth={gapWidth}
              id={id}
              labels={labels}
              stackedValues={stackedValues}
              theme={theme}
              xScale={xScale}
              yScale={yScale}
            />
          ) : (
            <VerticalBarSeries
              accessibilityData={accessibilityData}
              activeBarGroup={activeBarGroup}
              colors={barColors}
              height={height}
              gapWidth={gapWidth}
              theme={theme}
              xScale={xScale}
              yScale={yScale}
              isAnimated={shouldAnimate}
              data={sortedData}
            />
          )}
        </g>
        <g transform={`translate(${chartStartPosition},${Margin.Top})`}>
          {Object.keys(annotationsLookupTable).map((key, dataIndex) => {
            const annotation = annotationsLookupTable[Number(key)];

            if (annotation == null) {
              return null;
            }

            const xPosition = xScale(key);
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const barWidth =
              xScale.bandwidth() / data.length - VERTICAL_BAR_SPACING;
            const leftOffset = barWidth * annotation.dataPointIndex;

            return (
              <AnnotationLine
                barSize={barWidth}
                color={annotation.color}
                drawableSize={drawableHeight}
                isAnimated={shouldAnimate}
                key={`annotation${dataIndex}${annotation.dataPointIndex}`}
                offset={annotation.offset}
                position={xPositionValue + leftOffset}
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
        parentRef={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onHeightChange={setLegendHeight}
          theme={theme}
        />
      )}
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
        svgY > drawableHeight + Number(Margin.Bottom) + labelHeight
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
