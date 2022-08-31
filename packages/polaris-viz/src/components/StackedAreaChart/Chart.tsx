import React, {useState, useMemo} from 'react';
import {line} from 'd3-shape';
import {
  DataSeries,
  DataPoint,
  XAxisOptions,
  YAxisOptions,
  useUniqueId,
  curveStepRounded,
  DataType,
  Dimensions,
  useYScale,
  COLOR_VISION_SINGLE_ITEM,
  BoundingRect,
  useChartPositions,
  LINE_HEIGHT,
} from '@shopify/polaris-viz-core';

import {
  Annotations,
  checkAvailableAnnotations,
  YAxisAnnotations,
} from '../Annotations';
import type {
  AnnotationLookupTable,
  GetXPosition,
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
import {ChartMargin, XMLNS, ANNOTATIONS_LABELS_OFFSET} from '../../constants';
import {eventPointNative} from '../../utilities';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {useStackedData} from './hooks';
import {StackedAreas, Points} from './components';
import {useStackedChartTooltipContent} from './hooks/useStackedChartTooltipContent';
import {yAxisMinMax} from './utilities/yAxisMinMax';
import styles from './Chart.scss';

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
  const [xAxisHeight, setXAxisHeight] = useState(LINE_HEIGHT);
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

  const tooltipId = useUniqueId('stackedAreaChart');
  const clipPathId = useUniqueId('areaChartClipPath');

  const hideXAxis = xAxisOptions.hide || selectedTheme.xAxis.hide;

  const {
    stackedValues,
    longestSeriesLength,
    labels: formattedLabels,
  } = useStackedData({
    data,
    xAxisOptions,
  });

  const zeroLineData = data.map((series) => ({
    ...series,
    data: series.data.map((point) => ({...point, value: 0})),
  }));

  const {stackedValues: zeroLineValues} = useStackedData({
    data: zeroLineData,
    xAxisOptions,
  });

  const {minY, maxY} = yAxisMinMax(stackedValues);

  const {yAxisLabelWidth} = useYScale({
    drawableHeight: height,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max: maxY,
    min: minY,
  });

  const {
    drawableWidth,
    drawableHeight,
    chartXPosition,
    chartYPosition,
    xAxisBounds,
    yAxisBounds,
  } = useChartPositions({
    annotationsHeight,
    height,
    width,
    xAxisHeight,
    yAxisWidth: yAxisLabelWidth,
  });

  const {xAxisDetails, xScale, labels} = useLinearLabelsAndDimensions({
    data,
    drawableWidth,
    hideXAxis,
    labels: formattedLabels,
    longestSeriesLength,
  });

  const {ticks, yScale} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max: maxY,
    min: minY,
  });

  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const getTooltipMarkup = useStackedChartTooltipContent({
    data,
    renderTooltipContent,
    seriesColors,
  });

  const lineGenerator = useMemo(() => {
    const generator = line<DataPoint>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({value}) => yScale(value ?? 0))
      .defined(({value}) => value != null);

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

  const getXPosition: GetXPosition = ({isCrosshair, index}) => {
    if (xScale == null) {
      return 0;
    }
    const offset = isCrosshair ? selectedTheme.crossHair.width / 2 : 0;

    if (
      index != null &&
      animatedCoordinates != null &&
      animatedCoordinates[index] != null &&
      animatedCoordinates[index]
    ) {
      return animatedCoordinates[index].to((coord) => coord.x - offset);
    }

    return xScale(activePointIndex == null ? 0 : activePointIndex) - offset;
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

  const halfXAxisLabelWidth = xAxisDetails.labelWidth / 2;

  return (
    <React.Fragment>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
        width={width}
        height={height}
        ref={setSvgRef}
        role="table"
        style={{height, width}}
      >
        {hideXAxis ? null : (
          <XAxis
            allowLineWrap={xAxisOptions.allowLineWrap}
            chartHeight={height}
            labels={labels}
            labelWidth={xAxisDetails.labelWidth}
            onHeightChange={setXAxisHeight}
            reducedLabelIndexes={xAxisDetails.reducedLabelIndexes}
            x={xAxisBounds.x}
            xScale={xScale}
            y={xAxisBounds.y}
          />
        )}

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
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
          x={yAxisBounds.x}
          y={yAxisBounds.y}
        />

        <VisuallyHiddenRows
          data={data}
          formatYAxisLabel={yAxisOptions.labelFormatter}
          xAxisLabels={labels}
        />

        <g
          transform={`translate(${
            chartXPosition + halfXAxisLabelWidth
          },${chartYPosition})`}
          className={styles.Group}
          area-hidden="true"
          clipPath={`url(#${clipPathId})`}
        >
          <StackedAreas
            stackedValues={stackedValues}
            zeroLineValues={zeroLineValues}
            xScale={xScale}
            yScale={yScale}
            colors={seriesColors}
            theme={theme}
          />
        </g>
        <clipPath id={clipPathId}>
          <rect width={width} height={drawableHeight} fill="black" />
        </clipPath>

        {activePointIndex == null ? null : (
          <g
            transform={`translate(${
              chartXPosition + halfXAxisLabelWidth
            },${chartYPosition})`}
          >
            <Crosshair
              x={getXPosition({isCrosshair: true, index: 0})}
              height={drawableHeight}
              theme={theme}
            />
          </g>
        )}

        <g
          transform={`translate(${
            chartXPosition + halfXAxisLabelWidth
          },${chartYPosition})`}
        >
          <Points
            activePointIndex={activePointIndex}
            animatedCoordinates={animatedCoordinates}
            colors={seriesColors}
            getXPosition={getXPosition}
            stackedValues={stackedValues}
            tooltipId={tooltipId}
            xScale={xScale}
            yScale={yScale}
          />
        </g>

        {hasXAxisAnnotations && (
          <g transform={`translate(${chartXPosition},0)`} tabIndex={-1}>
            <Annotations
              annotationsLookupTable={annotationsLookupTable}
              axisLabelWidth={xAxisDetails.labelWidth}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              labels={labels}
              onHeightChange={setAnnotationsHeight}
              xScale={xScale}
            />
          </g>
        )}

        {hasYAxisAnnotations && (
          <g
            transform={`translate(${chartXPosition},${chartYPosition})`}
            tabIndex={-1}
          >
            <YAxisAnnotations
              annotationsLookupTable={annotationsLookupTable}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
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
        id={tooltipId}
        margin={ChartMargin}
        onIndexChange={(index) => setActivePointIndex(index)}
        parentRef={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
        />
      )}
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
