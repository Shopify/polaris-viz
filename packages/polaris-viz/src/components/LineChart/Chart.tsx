import React, {useState, useRef} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  LineSeries,
  COLOR_VISION_SINGLE_ITEM,
  LineChartDataSeriesWithDefaults,
  clamp,
  DEFAULT_THEME_NAME,
  BoundingRect,
} from '@shopify/polaris-viz-core';
import type {
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {
  Annotations,
  checkAvailableAnnotations,
  YAxisAnnotations,
} from '../Annotations';
import type {
  RenderTooltipContentData,
  AnnotationLookupTable,
} from '../../types';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import {XAxis} from '../XAxis';
import {useLegend, LegendContainer} from '../LegendContainer';
import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../../components/TooltipWrapper';
import {eventPointNative} from '../../utilities';
import {
  useTheme,
  useColorVisionEvents,
  useWatchColorVisionEvents,
  useLinearLabelsAndDimensions,
} from '../../hooks';
import {
  LineChartMargin as Margin,
  XMLNS,
  LABEL_AREA_TOP_SPACING,
  ANNOTATIONS_LABELS_OFFSET,
} from '../../constants';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {YAxis} from '../YAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {useLineChartTooltipContent} from './hooks/useLineChartTooltipContent';
import {PointsAndCrosshair} from './components';
import {useFormatData} from './hooks';
import styles from './Chart.scss';
import {yAxisMinMax} from './utilities';

export interface ChartProps {
  renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
  annotationsLookupTable: AnnotationLookupTable;
  data: LineChartDataSeriesWithDefaults[];
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  emptyStateText?: string;
  theme?: string;
  dimensions?: Dimensions;
}

const TOOLTIP_POSITION = {
  horizontal: TooltipHorizontalOffset.Left,
  vertical: TooltipVerticalOffset.Center,
};

export function Chart({
  data,
  annotationsLookupTable,
  dimensions,
  renderTooltipContent,
  showLegend = true,
  emptyStateText,
  xAxisOptions,
  yAxisOptions,
  theme = DEFAULT_THEME_NAME,
}: ChartProps) {
  useColorVisionEvents(data.length > 1);

  const selectedTheme = useTheme(theme);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [labelHeight, setLabelHeight] = useState(0);
  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {legend, setLegendDimensions, height, width} = useLegend({
    data: [
      {
        shape: 'Line',
        series: data,
      },
    ],
    dimensions,
    showLegend,
  });

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

  const formattedLabels = useFormattedLabels({
    data: [data[0]],
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const tooltipId = useRef(uniqueId('lineChart'));
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const emptyState =
    data.length === 0 || data.every((series) => series.data.length === 0);

  const chartYPosition = (Margin.Top as number) + annotationsHeight;

  const drawableHeight =
    height - labelHeight - LABEL_AREA_TOP_SPACING - chartYPosition;

  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const {minY, maxY} = yAxisMinMax(data);

  const {yAxisLabelWidth, ticks, yScale} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max: maxY,
    min: minY,
  });

  const {reversedSeries, longestSeriesLength, longestSeriesIndex} =
    useFormatData(data);

  const {chartXPosition, drawableWidth, xAxisDetails, xScale, labels} =
    useLinearLabelsAndDimensions({
      data,
      longestSeriesLength,
      theme,
      width,
      labels: formattedLabels,
      xAxisOptions,
      yAxisLabelWidth,
    });

  const getTooltipMarkup = useLineChartTooltipContent({
    data,
    renderTooltipContent,
  });

  if (xScale == null || drawableWidth == null || yAxisLabelWidth == null) {
    return null;
  }

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    if (eventType === 'mouse') {
      const point = eventPointNative(event!);

      if (
        point == null ||
        xScale == null ||
        reversedSeries[longestSeriesIndex] == null
      ) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgX, svgY} = point;

      const closestIndex = Math.round(xScale.invert(svgX - chartXPosition));

      const activeIndex = clamp({
        amount: closestIndex,
        min: 0,
        max: reversedSeries[longestSeriesIndex].data.length - 1,
      });

      return {
        x: svgX,
        y: svgY,
        position: TOOLTIP_POSITION,
        activeIndex,
      };
    } else {
      const activeIndex = index ?? 0;

      return {
        x: xScale?.(activeIndex) ?? 0,
        y: 0,
        position: TOOLTIP_POSITION,
        activeIndex,
      };
    }
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
    <div className={styles.Container} style={{width, height}}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.Chart}
        role={emptyState ? 'img' : 'table'}
        xmlns={XMLNS}
        width={width}
        height={height}
        ref={setSvgRef}
        aria-label={emptyState ? emptyStateText : undefined}
      >
        {xAxisOptions.hide ? null : (
          <XAxis
            chartHeight={height}
            chartX={chartXPosition - xAxisDetails.labelWidth / 2}
            chartY={drawableHeight + LABEL_AREA_TOP_SPACING + chartYPosition}
            labels={labels}
            labelWidth={xAxisDetails.labelWidth}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={xAxisDetails.reducedLabelIndexes}
            xScale={xScale}
            ariaHidden
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
          ariaHidden
          x={selectedTheme.grid.horizontalMargin}
          y={chartYPosition}
        />

        {emptyState ? null : (
          <VisuallyHiddenRows
            data={data}
            formatYAxisLabel={yAxisOptions.labelFormatter}
            xAxisLabels={labels}
          />
        )}

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
              xScale={xScale}
            />
          </g>
        )}

        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          {reversedSeries.map((singleSeries, index) => {
            return (
              <LineSeries
                activeLineIndex={activeLineIndex}
                data={singleSeries}
                index={reversedSeries.length - 1 - index}
                key={`${name}-${index}`}
                svgDimensions={{height: drawableHeight, width: drawableWidth}}
                theme={theme}
                xScale={xScale}
                yScale={yScale}
                type="default"
              />
            );
          })}

          <PointsAndCrosshair
            activeIndex={activeIndex}
            drawableHeight={drawableHeight}
            emptyState={emptyState}
            longestSeriesIndex={longestSeriesIndex}
            reversedSeries={reversedSeries}
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
        onIndexChange={(index) => setActiveIndex(index)}
        parentRef={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
        />
      )}
    </div>
  );
}
