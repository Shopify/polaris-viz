import type {ReactNode} from 'react';
import {useState, useMemo} from 'react';
import {line} from 'd3-shape';
import type {
  DataSeries,
  DataPoint,
  XAxisOptions,
  YAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {
  useUniqueId,
  curveStepRounded,
  DataType,
  useYScale,
  COLOR_VISION_SINGLE_ITEM,
  useChartPositions,
  LINE_HEIGHT,
  SMALL_CHART_HEIGHT,
  InternalChartType,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {ChartElements} from '../ChartElements';
import {
  Annotations,
  checkAvailableAnnotations,
  YAxisAnnotations,
} from '../Annotations';
import type {
  AnnotationLookupTable,
  GetXPosition,
  RenderLegendContent,
  RenderTooltipContentData,
  RenderAnnotationContentData,
  BottomOnlyLegendPosition,
} from '../../types';
import {XAxis} from '../XAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {TooltipWrapper} from '../TooltipWrapper';
import {
  useLinearChartAnimations,
  useTheme,
  useThemeSeriesColors,
  useColorVisionEvents,
  useLinearLabelsAndDimensions,
} from '../../hooks';
import {ChartMargin, ANNOTATIONS_LABELS_OFFSET} from '../../constants';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';
import {HorizontalGridLines} from '../HorizontalGridLines';

import {useStackedData} from './hooks';
import {StackedAreas, Points} from './components';
import {useStackedChartTooltipContent} from './hooks/useStackedChartTooltipContent';
import {yAxisMinMax} from './utilities/yAxisMinMax';
import styles from './Chart.scss';

export interface Props {
  annotationsLookupTable: AnnotationLookupTable;
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  theme: string;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  legendPosition?: BottomOnlyLegendPosition;
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderLegendContent?: RenderLegendContent;
  renderHiddenLegendLabel?: (count: number) => string;
}

export function Chart({
  annotationsLookupTable,
  xAxisOptions,
  data,
  legendPosition,
  renderLegendContent,
  renderTooltipContent,
  showLegend,
  theme,
  yAxisOptions,
  renderAnnotationContent,
  renderHiddenLegendLabel,
  seriesNameFormatter,
}: Props) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const {containerBounds, isTouchDevice} = useChartContext();

  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  useColorVisionEvents({enabled: data.length > 1 && !isTouchDevice});

  const isSmallChart = containerBounds.height < SMALL_CHART_HEIGHT;

  const hideXAxis =
    xAxisOptions.hide || selectedTheme.xAxis.hide || isSmallChart;

  const [xAxisHeight, setXAxisHeight] = useState(hideXAxis ? 0 : LINE_HEIGHT);
  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {legend, setLegendDimensions, height, width} = useLegend({
    colors: seriesColors,
    data: [
      {
        shape: 'Line',
        series: data,
      },
    ],
    showLegend: showLegend && !isSmallChart,
    seriesNameFormatter,
  });

  const tooltipId = useUniqueId('stackedAreaChart');

  const {
    stackedValues,
    longestSeriesIndex,
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

  const yScaleOptions = {
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
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

  const getTooltipMarkup = useStackedChartTooltipContent({
    data,
    renderTooltipContent,
    seriesColors,
    seriesNameFormatter,
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

  const chartBounds = {
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
    <ChartElements.Div height={height} width={width}>
      <ChartElements.Svg
        width={width}
        setRef={setSvgRef}
        role="table"
        height={height}
      >
        {hideXAxis ? null : (
          <XAxis
            allowLineWrap={xAxisOptions.allowLineWrap}
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
          transform={`translate(${chartXPosition},${chartYPosition})`}
          className={styles.Group}
          area-hidden="true"
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
              labelFormatter={xAxisOptions.labelFormatter}
              onHeightChange={setAnnotationsHeight}
              renderAnnotationContent={renderAnnotationContent}
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
          chartBounds={chartBounds}
          chartType={InternalChartType.Line}
          data={data}
          focusElementDataType={DataType.Point}
          getMarkup={getTooltipMarkup}
          id={tooltipId}
          longestSeriesIndex={longestSeriesIndex}
          margin={ChartMargin}
          onIndexChange={(index) => setActivePointIndex(index)}
          parentElement={svgRef}
          usePortal
          xScale={xScale}
        />
      )}

      {showLegend && !isSmallChart && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          position={legendPosition}
          renderLegendContent={renderLegendContent}
          enableHideOverflow
          renderHiddenLegendLabel={renderHiddenLegendLabel}
        />
      )}
    </ChartElements.Div>
  );
}
