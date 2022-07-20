import React, {useState, useMemo, useRef} from 'react';
import {line} from 'd3-shape';
import {
  DataSeries,
  DataPoint,
  XAxisOptions,
  YAxisOptions,
  uniqueId,
  curveStepRounded,
  DataType,
  Dimensions,
  useYScale,
  COLOR_VISION_SINGLE_ITEM,
  BoundingRect,
} from '@shopify/polaris-viz-core';

import {
  Annotations,
  checkAvailableAnnotations,
  YAxisAnnotations,
} from '../Annotations';
import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
} from '../../types';
import {XAxis} from '../XAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionOffset,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
import {
  useLinearChartAnimations,
  useTheme,
  useThemeSeriesColors,
  useColorVisionEvents,
  useLinearLabelsAndDimensions,
} from '../../hooks';
import {
  LineChartMargin as Margin,
  XMLNS,
  LABEL_AREA_TOP_SPACING,
  ANNOTATIONS_LABELS_OFFSET,
} from '../../constants';
import {eventPointNative} from '../../utilities';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {useStackedData} from './hooks';
import {StackedAreas, Points} from './components';
import styles from './Chart.scss';
import {useStackedChartTooltipContent} from './hooks/useStackedChartTooltipContent';
import {yAxisMinMax} from './utilities/yAxisMinMax';

const TOOLTIP_POSITION: TooltipPositionOffset = {
  horizontal: TooltipHorizontalOffset.Left,
  vertical: TooltipVerticalOffset.Center,
};

export interface Props {
  annotationsLookupTable: AnnotationLookupTable;
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  theme: string;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({
  annotationsLookupTable,
  xAxisOptions,
  data,
  dimensions,
  renderTooltipContent,
  showLegend,
  theme,
  yAxisOptions,
}: Props) {
  useColorVisionEvents(data.length > 1);

  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [labelHeight, setLabelHeight] = useState(0);
  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {legend, setLegendDimensions, height, width} = useLegend({
    colors: seriesColors,
    data: [
      {
        shape: 'Line',
        series: data,
      },
    ],
    dimensions,
    showLegend,
  });

  const tooltipId = useRef(uniqueId('stackedAreaChart'));

  const hideXAxis = xAxisOptions.hide || selectedTheme.xAxis.hide;

  const {stackedValues, longestSeriesLength, labels} = useStackedData({
    data,
    xAxisOptions,
  });

  const chartYPosition = (Margin.Top as number) + annotationsHeight;
  const drawableHeight =
    height - chartYPosition - labelHeight - LABEL_AREA_TOP_SPACING;

  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const {minY, maxY} = yAxisMinMax(stackedValues);

  const {yAxisLabelWidth, ticks, yScale} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max: maxY,
    min: minY,
  });

  const {chartXPosition, drawableWidth, xAxisDetails, xScale} =
    useLinearLabelsAndDimensions({
      data,
      longestSeriesLength,
      theme,
      width,
      labels,
      xAxisOptions,
      yAxisLabelWidth,
    });

  const getTooltipMarkup = useStackedChartTooltipContent({
    data,
    renderTooltipContent,
    seriesColors,
  });

  const lineGenerator = useMemo(() => {
    const generator = line<DataPoint>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({value}) => yScale(value ?? 0));

    if (selectedTheme.line.hasSpline) {
      generator.curve(curveStepRounded);
    }

    return generator;
  }, [xScale, yScale, selectedTheme.line.hasSpline]);

  const seriesForAnimation: DataSeries[] = useMemo(() => {
    return stackedValues.map((value) => {
      return {
        name: '',
        data: value.map((val) => {
          return {
            key: '',
            value: val[1],
          };
        }),
      };
    });
  }, [stackedValues]);

  const {animatedCoordinates} = useLinearChartAnimations({
    data: seriesForAnimation,
    lineGenerator,
    activeIndex: activePointIndex,
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

  if (xScale == null || drawableWidth == null || yAxisLabelWidth == null) {
    return null;
  }

  const chartBounds: BoundingRect = {
    width,
    height,
    x: chartXPosition,
    y: chartYPosition,
  };

  const {hasXAxisAnnotations, hasYAxisAnnotations} = checkAvailableAnnotations(
    annotationsLookupTable,
  );

  return (
    <div className={styles.Container} style={{height, width}}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.Chart}
        xmlns={XMLNS}
        width={width}
        height={height}
        ref={setSvgRef}
        role="table"
        style={{height, width}}
      >
        {hideXAxis ? null : (
          <XAxis
            chartHeight={height}
            chartX={chartXPosition - xAxisDetails.labelWidth / 2}
            chartY={chartYPosition + drawableHeight + LABEL_AREA_TOP_SPACING}
            labels={labels}
            labelWidth={xAxisDetails.labelWidth}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={xAxisDetails.reducedLabelIndexes}
            theme={theme}
            xScale={xScale}
          />
        )}

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            theme={theme}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: chartYPosition,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        <YAxis
          ticks={ticks}
          width={yAxisLabelWidth}
          textAlign="right"
          theme={theme}
          x={selectedTheme.grid.horizontalMargin}
          y={chartYPosition}
        />

        <VisuallyHiddenRows
          data={data}
          formatYAxisLabel={yAxisOptions.labelFormatter}
          xAxisLabels={labels}
        />

        <g
          transform={`translate(${chartXPosition},${chartYPosition})`}
          className={styles.Group}
          area-hidden="true"
        >
          <StackedAreas
            stackedValues={stackedValues}
            xScale={xScale}
            yScale={yScale}
            colors={seriesColors}
            theme={theme}
          />
        </g>

        {hasXAxisAnnotations && (
          <g
            transform={`translate(${
              chartXPosition - xAxisDetails.labelWidth / 2
            },0)`}
            tabIndex={-1}
          >
            <Annotations
              annotationsLookupTable={annotationsLookupTable}
              axisLabelWidth={xAxisDetails.labelWidth}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              labels={labels}
              onHeightChange={setAnnotationsHeight}
              theme={theme}
              xScale={xScale}
            />
          </g>
        )}

        {activePointIndex == null ? null : (
          <g transform={`translate(${chartXPosition},${chartYPosition})`}>
            <Crosshair
              x={getXPosition({isCrosshair: true, index: 0})}
              height={drawableHeight}
              theme={theme}
            />
          </g>
        )}

        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          <Points
            activePointIndex={activePointIndex}
            animatedCoordinates={animatedCoordinates}
            colors={seriesColors}
            getXPosition={getXPosition}
            stackedValues={stackedValues}
            theme={theme}
            tooltipId={tooltipId.current}
            xScale={xScale}
            yScale={yScale}
          />
        </g>

        {hasYAxisAnnotations && (
          <g
            transform={`translate(${
              chartXPosition - xAxisDetails.labelWidth / 2
            },${chartYPosition})`}
            tabIndex={-1}
          >
            <YAxisAnnotations
              annotationsLookupTable={annotationsLookupTable}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth + xAxisDetails.labelWidth * 1.25}
              theme={theme}
              ticks={ticks}
              yScale={yScale}
            />
          </g>
        )}
      </svg>

      <TooltipWrapper
        alwaysUpdatePosition
        chartBounds={chartBounds}
        focusElementDataType={DataType.Point}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        id={tooltipId.current}
        margin={Margin}
        onIndexChange={(index) => setActivePointIndex(index)}
        parentRef={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          theme={theme}
        />
      )}
    </div>
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

      const closestIndex = Math.round(xScale.invert(svgX - chartXPosition));

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
