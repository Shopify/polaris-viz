import React, {useState, useMemo, useContext} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  ChartContext,
  estimateStringWidth,
  COLOR_VISION_GROUP_ITEM,
  COLOR_VISION_SINGLE_ITEM,
  BoundingRect,
  LOAD_ANIMATION_DURATION,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {PILL_HEIGHT, Annotations} from '../Annotations';
import type {
  RenderTooltipContentData,
  AnnotationLookupTable,
} from '../../types';
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
} from '../../hooks';

import {BarGroup, StackedBarGroups} from './components';
import {useXScale} from './hooks';
import {MIN_Y_LABEL_SPACE} from './constants';
import styles from './Chart.scss';

const ANNOTATIONS_LABELS_OFFSET = 10;

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
  theme: string;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  dimensions,
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  showLegend,
  theme,
  type,
  xAxisOptions,
  yAxisOptions,
}: Props) {
  useColorVisionEvents(data.length > 1);

  const selectedTheme = useTheme(theme);
  const {characterWidths} = useContext(ChartContext);
  const [activeBarGroup, setActiveBarGroup] = useState<number>(-1);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const id = useMemo(() => uniqueId('VerticalBarChart'), []);
  const [labelHeight, setLabelHeight] = useState(0);
  const [annotationsHeight, setAnnotationsHeight] = useState(PILL_HEIGHT);

  useWatchColorVisionEvents({
    type: COLOR_VISION_GROUP_ITEM,
    onIndexChange: ({detail}) => {
      setActiveBarGroup(detail.index);
    },
  });

  const {legend, setLegendHeight, height, width} = useLegend({
    data: [
      {
        shape: 'Bar',
        series: data,
      },
    ],
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
    height -
    annotationsHeight -
    labelHeight -
    LABEL_AREA_TOP_SPACING -
    Margin.Top;

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
  const chartXPosition =
    yAxisLabelWidth + Y_AXIS_CHART_SPACING + horizontalMargin;
  const chartYPosition = (Margin.Top as number) + annotationsHeight;
  const drawableWidth = width - chartXPosition - horizontalMargin * 2;
  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const chartBounds: BoundingRect = {
    width,
    height,
    x: chartXPosition,
    y: chartYPosition,
  };

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

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

  const hasAnnotations = Object.keys(annotationsLookupTable).length > 0;

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
            chartX={chartXPosition}
            chartY={drawableHeight + LABEL_AREA_TOP_SPACING + chartYPosition}
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
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: chartYPosition,
            }}
            width={width}
            theme={theme}
          />
        ) : null}

        <g transform={`translate(0,${chartYPosition})`} aria-hidden="true">
          <YAxis
            ticks={ticks}
            textAlign="right"
            width={yAxisLabelWidth}
            theme={theme}
          />
        </g>

        <g
          transform={`translate(${chartXPosition},${chartYPosition})`}
          tabIndex={-1}
        >
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
            sortedData.map((item, index) => {
              const xPosition = xScale(index.toString());
              const animationDelay =
                index * (LOAD_ANIMATION_DURATION / sortedData.length);

              return (
                <BarGroup
                  animationDelay={animationDelay}
                  isAnimated={isAnimated}
                  gapWidth={gapWidth}
                  key={index}
                  x={xPosition == null ? 0 : xPosition}
                  yScale={yScale}
                  data={item}
                  width={xScale.bandwidth()}
                  height={drawableHeight}
                  colors={barColors}
                  barGroupIndex={index}
                  hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
                  zeroAsMinHeight={selectedTheme.bar.zeroAsMinHeight}
                  accessibilityData={accessibilityData}
                  activeBarGroup={activeBarGroup}
                />
              );
            })
          )}
        </g>
        {hasAnnotations && (
          <g transform={`translate(${chartXPosition},0)`} tabIndex={-1}>
            <Annotations
              annotationsLookupTable={annotationsLookupTable}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              labels={labels}
              onHeightChange={setAnnotationsHeight}
              theme={theme}
              xScale={xScale}
            />
          </g>
        )}
      </svg>

      <TooltipWrapper
        bandwidth={xScale.bandwidth()}
        chartBounds={chartBounds}
        focusElementDataType={DataType.BarGroup}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={{...Margin, Top: chartYPosition}}
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

    const x = xPosition + chartXPosition;
    const y = yScale(highestValuePos) + chartYPosition;

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
      const currentPoint = svgX - chartXPosition;
      const activeIndex = Math.floor(currentPoint / xScale.step());

      if (
        activeIndex < 0 ||
        activeIndex > sortedData.length - 1 ||
        svgY <= chartYPosition ||
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
