import type {ReactNode} from 'react';
import {useState, useRef, Fragment} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  LineSeries,
  COLOR_VISION_SINGLE_ITEM,
  clamp,
  DEFAULT_THEME_NAME,
  useChartPositions,
  useChartContext,
  LINE_HEIGHT,
  SMALL_CHART_HEIGHT,
} from '@shopify/polaris-viz-core';
import type {
  XAxisOptions,
  YAxisOptions,
  LineChartDataSeriesWithDefaults,
  BoundingRect,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {useExternalHideEvents} from '../../hooks/ExternalEvents';
import {useIndexForLabels} from '../../hooks/useIndexForLabels';
import {
  Annotations,
  checkAvailableAnnotations,
  YAxisAnnotations,
} from '../Annotations';
import type {
  AnnotationLookupTable,
  LineChartSlotProps,
  RenderHiddenLegendLabel,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import {XAxis} from '../XAxis';
import {useLegend, LegendContainer} from '../LegendContainer';
import type {
  TooltipPosition,
  TooltipPositionParams,
} from '../../components/TooltipWrapper';
import {
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
  ChartMargin,
  ANNOTATIONS_LABELS_OFFSET,
  Y_AXIS_LABEL_OFFSET,
  CROSSHAIR_ID,
} from '../../constants';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {YAxis} from '../YAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {ChartElements} from '../ChartElements';

import {useLineChartTooltipContent} from './hooks/useLineChartTooltipContent';
import {PointsAndCrosshair} from './components';
import {useFormatData} from './hooks';
import {getAlteredLineChartPosition, yAxisMinMax} from './utilities';

export interface ChartProps {
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  annotationsLookupTable: AnnotationLookupTable;
  data: LineChartDataSeriesWithDefaults[];
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  hideLegendOverflow: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: BoundingRect;
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
  slots?: {
    chart?: (props: LineChartSlotProps) => JSX.Element;
  };
  theme?: string;
}

export function Chart({
  annotationsLookupTable,
  emptyStateText,
  data,
  dimensions,
  renderLegendContent,
  renderTooltipContent,
  renderHiddenLegendLabel,
  seriesNameFormatter,
  showLegend = true,
  hideLegendOverflow = true,
  slots,
  theme = DEFAULT_THEME_NAME,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  useColorVisionEvents({
    enabled: data.length > 1,
    dimensions,
  });

  const selectedTheme = useTheme(theme);
  const {isPerformanceImpacted} = useChartContext();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const isSmallChart = Boolean(
    dimensions && dimensions?.height < SMALL_CHART_HEIGHT,
  );

  const hideXAxis =
    xAxisOptions.hide || selectedTheme.xAxis.hide || isSmallChart;

  const [xAxisHeight, setXAxisHeight] = useState(hideXAxis ? 0 : LINE_HEIGHT);

  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {legend, setLegendDimensions, height, width} = useLegend({
    data: [
      {
        shape: 'Line',
        series: data,
      },
    ],
    dimensions,
    showLegend: showLegend && !isSmallChart,
    seriesNameFormatter,
  });

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveLineIndex(detail.index),
  });

  const {hiddenIndexes: hiddenLineIndexes} = useExternalHideEvents();

  const indexForLabels = useIndexForLabels(data);

  const {formattedLabels, unformattedLabels} = useFormattedLabels({
    data: [data[indexForLabels]],
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const tooltipId = useRef(uniqueId('lineChart'));
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const emptyState =
    data.length === 0 || data.every((series) => series.data.length === 0);

  const {minY, maxY} = yAxisMinMax(data);

  const yScaleOptions = {
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    fixedWidth: yAxisOptions.fixedWidth,
    maxYOverride: yAxisOptions.maxYOverride,
    max: maxY,
    min: minY,
  };

  const {yAxisLabelWidth} = useYScale({
    ...yScaleOptions,
    drawableHeight: height,
    verticalOverflow: selectedTheme.grid.verticalOverflow,
  });

  const {longestSeriesLength, longestSeriesIndex} = useFormatData(data);

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
    ...yScaleOptions,
    drawableHeight,
    verticalOverflow: selectedTheme.grid.verticalOverflow,
  });

  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const getTooltipMarkup = useLineChartTooltipContent({
    data,
    renderTooltipContent,
    indexForLabels,
    hiddenIndexes: hiddenLineIndexes,
    seriesNameFormatter,
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

      if (point == null || xScale == null || data[longestSeriesIndex] == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgX} = point;

      const closestIndex = Math.round(xScale.invert(svgX - chartXPosition));

      const activeIndex = clamp({
        amount: closestIndex,
        min: 0,
        max: data[longestSeriesIndex].data.length - 1,
      });

      return {
        x: (event as MouseEvent).pageX,
        y: (event as MouseEvent).pageY,
        activeIndex,
      };
    } else {
      const activeIndex = index ?? 0;

      const x = xScale?.(activeIndex) ?? 0;

      return {
        x: x + (dimensions?.x ?? 0),
        y: dimensions?.y ?? 0,
        activeIndex,
      };
    }
  }

  function moveCrosshair(index: number | null) {
    setActiveIndex(0);

    if (index == null) {
      return;
    }

    const crosshair = document.getElementById(
      `${tooltipId.current}-${CROSSHAIR_ID}`,
    );

    if (crosshair == null) {
      return;
    }

    crosshair.setAttribute(
      'x',
      `${xScale(index) - selectedTheme.crossHair.width / 2}`,
    );
  }

  const chartBounds: BoundingRect = {
    width,
    height,
    x: dimensions?.x ?? chartXPosition,
    y: dimensions?.y ?? chartYPosition,
  };

  const {hasXAxisAnnotations, hasYAxisAnnotations} = checkAvailableAnnotations(
    annotationsLookupTable,
  );

  const halfXAxisLabelWidth = xAxisDetails.labelWidth / 2;

  return (
    <Fragment>
      <ChartElements.Svg
        emptyState={emptyState}
        emptyStateText={emptyStateText}
        height={height}
        role="table"
        setRef={setSvgRef}
        width={width}
      >
        {hideXAxis ? null : (
          <XAxis
            allowLineWrap={xAxisOptions.allowLineWrap}
            ariaHidden
            isLinearChart
            labels={labels}
            labelWidth={xAxisDetails.labelWidth}
            onHeightChange={setXAxisHeight}
            reducedLabelIndexes={xAxisDetails.reducedLabelIndexes}
            x={xAxisBounds.x - halfXAxisLabelWidth}
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
          width={yAxisLabelWidth + Y_AXIS_LABEL_OFFSET}
          textAlign="right"
          ariaHidden
          x={yAxisBounds.x}
          y={yAxisBounds.y}
        />

        {emptyState ? null : (
          <VisuallyHiddenRows
            data={data}
            formatYAxisLabel={yAxisOptions.labelFormatter}
            xAxisLabels={labels}
          />
        )}
        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          {slots?.chart?.({
            yScale,
            xScale,
            drawableWidth,
            drawableHeight,
            theme,
          })}

          {data.map((singleSeries, index) => {
            if (singleSeries.metadata?.isVisuallyHidden === true) {
              return null;
            }

            return (
              <LineSeries
                activeLineIndex={activeLineIndex}
                data={singleSeries}
                hiddenIndexes={hiddenLineIndexes}
                index={index}
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
            data={data}
            drawableHeight={drawableHeight}
            emptyState={emptyState}
            hiddenIndexes={hiddenLineIndexes}
            longestSeriesIndex={longestSeriesIndex}
            theme={theme}
            tooltipId={tooltipId.current}
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
              labels={unformattedLabels}
              labelFormatter={xAxisOptions.labelFormatter}
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
      </ChartElements.Svg>

      {longestSeriesLength !== -1 && (
        <TooltipWrapper
          alwaysUpdatePosition
          chartBounds={chartBounds}
          focusElementDataType={DataType.Point}
          getAlteredPosition={getAlteredLineChartPosition}
          getMarkup={getTooltipMarkup}
          getPosition={getTooltipPosition}
          id={tooltipId.current}
          margin={ChartMargin}
          onIndexChange={(index) => {
            if (index != null && isPerformanceImpacted) {
              moveCrosshair(index);
            } else {
              setActiveIndex(index);
            }
          }}
          parentRef={svgRef}
          usePortal
        />
      )}

      {showLegend && !isSmallChart && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          renderHiddenLegendLabel={renderHiddenLegendLabel}
          dimensions={dimensions}
          enableHideOverflow={hideLegendOverflow}
        />
      )}
    </Fragment>
  );
}
