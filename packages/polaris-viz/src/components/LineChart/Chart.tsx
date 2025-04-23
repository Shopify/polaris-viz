import type {ReactNode} from 'react';
import {useState, useRef, Fragment, useMemo} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  LineSeries,
  COLOR_VISION_SINGLE_ITEM,
  DEFAULT_THEME_NAME,
  useChartPositions,
  useChartContext,
  LINE_HEIGHT,
  SMALL_CHART_HEIGHT,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import type {
  XAxisOptions,
  YAxisOptions,
  LineChartDataSeriesWithDefaults,
  BoundingRect,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {hasHiddenComparisonSeries} from '../../utilities/hasHiddenComparisonSeries';
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
  RenderAnnotationContentData,
  RenderHiddenLegendLabel,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import {XAxis} from '../XAxis';
import {useLegend, LegendContainer} from '../LegendContainer';
import {TooltipWrapper} from '../../components/TooltipWrapper';
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
import {yAxisMinMax} from './utilities';

export interface ChartProps {
  annotationsLookupTable: AnnotationLookupTable;
  data: LineChartDataSeriesWithDefaults[];
  emptyStateText?: string;
  hideLegendOverflow: boolean;
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
  renderLegendContent?: RenderLegendContent;
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  slots?: {
    chart?: (props: LineChartSlotProps) => JSX.Element;
  };
  theme?: string;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
}

export function Chart({
  annotationsLookupTable,
  emptyStateText,
  data,
  renderAnnotationContent,
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
  const selectedTheme = useTheme(theme);
  const {
    isPerformanceImpacted,
    containerBounds,
    isTouchDevice,
    comparisonIndexes,
    comparisonSeriesIndexes,
  } = useChartContext();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  useColorVisionEvents({
    enabled: data.length > 1 && !isTouchDevice,
  });

  const isSmallChart = containerBounds.height < SMALL_CHART_HEIGHT;

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
    ticksOverride: yAxisOptions.ticksOverride,
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

  const animationDelays = useMemo(() => {
    return data.reduce<{delays: number[]; delayIndex: number}>(
      (acc, series, index) => {
        const isHidden =
          series.metadata?.isVisuallyHidden === true ||
          comparisonIndexes.includes(index);

        return {
          delays: [...acc.delays, isHidden ? 0 : acc.delayIndex * 100],
          delayIndex: isHidden ? acc.delayIndex : acc.delayIndex + 1,
        };
      },
      {delays: [], delayIndex: 0},
    ).delays;
  }, [data, comparisonIndexes]);

  if (xScale == null || drawableWidth == null || yAxisLabelWidth == null) {
    return null;
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
    x: chartXPosition,
    y: chartYPosition,
  };

  const {hasXAxisAnnotations, hasYAxisAnnotations} = checkAvailableAnnotations(
    annotationsLookupTable,
  );

  const halfXAxisLabelWidth = xAxisDetails.labelWidth / 2;

  const shouldShowArea = data.length <= 3;

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

            const isComparisonLineHidden = hasHiddenComparisonSeries({
              index,
              activeColorVisionIndex: activeLineIndex,
              comparisonSeriesIndexes,
            });

            return (
              <LineSeries
                activeLineIndex={activeLineIndex}
                animationDelay={animationDelays[index]}
                data={singleSeries}
                hiddenIndexes={
                  [
                    ...hiddenLineIndexes,
                    isComparisonLineHidden ? index : undefined,
                  ].filter(Boolean) as number[]
                }
                index={index}
                key={`${name}-${index}`}
                svgDimensions={{height: drawableHeight, width: drawableWidth}}
                theme={theme}
                xScale={xScale}
                yScale={yScale}
                type="default"
                shouldShowArea={shouldShowArea}
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
              renderAnnotationContent={renderAnnotationContent}
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
          chartBounds={chartBounds}
          chartType={InternalChartType.Line}
          focusElementDataType={DataType.Point}
          getMarkup={getTooltipMarkup}
          data={data}
          longestSeriesIndex={longestSeriesIndex}
          id={tooltipId.current}
          margin={ChartMargin}
          onIndexChange={(index) => {
            if (index != null && isPerformanceImpacted) {
              moveCrosshair(index);
            } else {
              setActiveIndex(index);
            }
          }}
          parentElement={svgRef}
          usePortal
          xScale={xScale}
          yScale={yScale}
        />
      )}

      {showLegend && !isSmallChart && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          renderHiddenLegendLabel={renderHiddenLegendLabel}
          enableHideOverflow={hideLegendOverflow}
        />
      )}
    </Fragment>
  );
}
