import type {ReactNode} from 'react';
import {useMemo, useState} from 'react';
import {
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS,
  useAriaLabel,
  LINE_HEIGHT,
  InternalChartType,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {getHighestValueForSeries} from '../../utilities/getHighestValueForSeries';
import {TooltipWrapper} from '../TooltipWrapper';
import {ChartElements} from '../ChartElements';
import {checkAvailableAnnotations} from '../../components/Annotations';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import type {
  AnnotationLookupTable,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {HorizontalBarChartXAxisLabels} from '../HorizontalBarChartXAxisLabels';
import {useLegend, LegendContainer} from '../LegendContainer';
import type {HorizontalTransitionStyle} from '../../hooks/useHorizontalTransitions';
import {GradientDefs, HorizontalGroup} from '../shared';
import {
  useBarChartTooltipContent,
  useColorVisionEvents,
  useDataForHorizontalChart,
  useHorizontalBarSizes,
  useHorizontalSeriesColors,
  useHorizontalStackedValues,
  useHorizontalTransitions,
  useHorizontalXScale,
  useTheme,
} from '../../hooks';
import {ChartMargin, ANNOTATIONS_LABELS_OFFSET} from '../../constants';

import {
  VerticalGridLines,
  HorizontalBarChartYAnnotations,
  HorizontalBarChartXAnnotations,
} from './components';

export interface ChartProps {
  annotationsLookupTable: AnnotationLookupTable;
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  renderHiddenLegendLabel?: (count: number) => string;
  renderLegendContent?: RenderLegendContent;
}

export function Chart({
  annotationsLookupTable,
  data,
  renderHiddenLegendLabel,
  renderLegendContent,
  renderTooltipContent,
  seriesNameFormatter,
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  const {isTouchDevice} = useChartContext();

  useColorVisionEvents({enabled: data.length > 1 && !isTouchDevice});

  const selectedTheme = useTheme();
  const id = useMemo(() => uniqueId('HorizontalBarChart'), []);

  const isStacked = type === 'stacked';

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [xAxisHeight, setXAxisHeight] = useState(LINE_HEIGHT);
  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors(data);

  const {legend, setLegendDimensions, height, width} = useLegend({
    data: [
      {
        shape: 'Bar',
        series: data,
      },
    ],
    showLegend,
    colors: seriesColors,
    seriesNameFormatter,
  });

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    data,
    isSimple: xAxisOptions.hide,
    isStacked,
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    return getHighestValueForSeries(data, areAllNegative);
  }, [data, areAllNegative]);

  const {stackedValues, stackedMin, stackedMax} = useHorizontalStackedValues({
    isStacked,
    data,
  });

  const chartYPosition = (ChartMargin.Top as number) + annotationsHeight;
  const drawableHeight = height - xAxisHeight - chartYPosition;

  const {xScale, ticks, ticksFormatted, drawableWidth, chartXPosition} =
    useHorizontalXScale({
      allNumbers,
      stackedMin,
      stackedMax,
      isStacked,
      maxWidth: width,
      labelFormatter: xAxisOptions.labelFormatter,
      longestLabel,
      isSimple: xAxisOptions.hide,
    });

  const {barHeight, chartHeight, groupHeight} = useHorizontalBarSizes({
    chartDimensions: {width: drawableWidth, height: drawableHeight},
    isSimple: xAxisOptions.hide,
    isStacked,
    seriesLength: longestSeriesCount,
    singleBarCount: data.length,
    xAxisHeight,
  });

  const annotationsDrawableHeight =
    chartYPosition + chartHeight + ANNOTATIONS_LABELS_OFFSET;

  const getTooltipMarkup = useBarChartTooltipContent({
    data,
    seriesColors,
    renderTooltipContent,
    seriesNameFormatter,
  });

  const {transitions} = useHorizontalTransitions({
    series: data,
    groupHeight,
    chartXPosition,
  });

  const zeroPosition = xScale(0);

  const labelWidth = drawableWidth / ticks.length;

  const {hasXAxisAnnotations, hasYAxisAnnotations} = checkAvailableAnnotations(
    annotationsLookupTable,
  );

  const {unformattedLabels} = useFormattedLabels({
    data,
    labelFormatter: yAxisOptions.labelFormatter,
  });

  const getAriaLabel = useAriaLabel(data, {
    xAxisLabelFormatter: xAxisOptions.labelFormatter,
    yAxisLabelFormatter: yAxisOptions.labelFormatter,
  });

  return (
    <ChartElements.Div height={height} width={width}>
      <ChartElements.Svg setRef={setSvgRef} width={width} height={height}>
        {xAxisOptions.hide === true ? null : (
          <g transform={`translate(${chartXPosition}, ${chartYPosition})`}>
            <VerticalGridLines
              chartHeight={
                chartHeight + HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS
              }
              stroke={selectedTheme.grid.color}
              ticks={ticks}
              xScale={xScale}
            />
            <HorizontalBarChartXAxisLabels
              allowLineWrap={xAxisOptions.allowLineWrap}
              chartX={-labelWidth / 2}
              chartY={drawableHeight}
              labels={ticksFormatted}
              labelWidth={labelWidth}
              onHeightChange={setXAxisHeight}
              ticks={ticks}
              xScale={xScale}
            />
          </g>
        )}

        <GradientDefs
          direction="horizontal"
          gradientUnits={isStacked ? 'objectBoundingBox' : 'userSpaceOnUse'}
          id={id}
          seriesColors={seriesColors}
          size={isStacked ? '100%' : `${width}px`}
        />

        <g transform={`translate(${0}, ${chartYPosition})`}>
          {transitions((style, item, _transition, index) => {
            const {opacity, transform} = style as HorizontalTransitionStyle;
            const name = item.key ?? '';
            const ariaLabel = getAriaLabel({
              seriesIndex: item.index,
              key: item.key,
            });

            return (
              <animated.g key={`group-${name}`} style={{opacity, transform}}>
                <HorizontalGroup
                  areAllNegative={areAllNegative}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  chartXPosition={chartXPosition}
                  chartYPosition={chartYPosition}
                  containerWidth={width}
                  data={data}
                  groupHeight={groupHeight}
                  highestValueForSeries={highestValueForSeries}
                  id={id}
                  index={index}
                  isSimple={false}
                  isStacked={isStacked}
                  longestLabel={longestLabel}
                  name={name}
                  stackedValues={stackedValues}
                  xAxisOptions={xAxisOptions}
                  xScale={xScale}
                  yAxisOptions={yAxisOptions}
                  zeroPosition={zeroPosition}
                />
              </animated.g>
            );
          })}
        </g>

        {hasXAxisAnnotations && (
          <g transform={`translate(${chartXPosition}, ${0})`}>
            <HorizontalBarChartXAnnotations
              annotationsLookupTable={annotationsLookupTable}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              onHeightChange={setAnnotationsHeight}
              xScale={xScale}
            />
          </g>
        )}

        {hasYAxisAnnotations && (
          <g transform={`translate(${chartXPosition}, ${chartYPosition})`}>
            <HorizontalBarChartYAnnotations
              annotationsLookupTable={annotationsLookupTable}
              drawableWidth={drawableWidth}
              groupHeight={groupHeight}
              labels={unformattedLabels}
              zeroPosition={zeroPosition}
            />
          </g>
        )}
      </ChartElements.Svg>

      <TooltipWrapper
        chartType={InternalChartType.HorizontalBar}
        getMarkup={getTooltipMarkup}
        parentElement={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          enableHideOverflow
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          renderHiddenLegendLabel={renderHiddenLegendLabel}
        />
      )}
    </ChartElements.Div>
  );
}
