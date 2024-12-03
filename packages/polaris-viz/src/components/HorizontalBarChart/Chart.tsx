import type {ReactNode} from 'react';
import {useMemo, useState} from 'react';
import {
  uniqueId,
  DataType,
  COLOR_VISION_SINGLE_ITEM,
  HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS,
  useAriaLabel,
  LINE_HEIGHT,
  InternalChartType,
  useChartContext,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  BoundingRect,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {ChartSVG} from '../ChartElements/ChartSVG';
import {ChartDiv} from '../ChartElements/ChartDiv';
import {checkAvailableAnnotations} from '../Annotations/utilities/checkAvailableAnnotations';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import type {
  AnnotationLookupTable,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {HorizontalBarChartXAxisLabels} from '../HorizontalBarChartXAxisLabels/HorizontalBarChartXAxisLabels';
import {useLegend} from '../LegendContainer/hooks/useLegend';
import {LegendContainer} from '../LegendContainer/LegendContainer';
import type {HorizontalTransitionStyle} from '../../hooks/useHorizontalTransitions';
import {GradientDefs} from '../shared/GradientDefs/GradientDefs';
import {HorizontalGroup} from '../shared/HorizontalGroup/HorizontalGroup';
import {useBarChartTooltipContent} from '../../hooks/useBarChartTooltipContent';
import {useColorVisionEvents} from '../../hooks/ColorVisionA11y/useColorVisionEvents';
import {useDataForHorizontalChart} from '../../hooks/useDataForHorizontalChart';
import {useHorizontalBarSizes} from '../../hooks/useHorizontalBarSizes';
import {useHorizontalSeriesColors} from '../../hooks/useHorizontalSeriesColors';
import {useHorizontalStackedValues} from '../../hooks/useHorizontalStackedValues';
import {useHorizontalTransitions} from '../../hooks/useHorizontalTransitions';
import {useHorizontalXScale} from '../../hooks/useHorizontalXScale';
import {ChartMargin, ANNOTATIONS_LABELS_OFFSET} from '../../constants';
import {formatDataIntoGroups} from '../../utilities/formatDataIntoGroups';
import {TooltipWrapper} from '../TooltipWrapper/TooltipWrapper';

import {VerticalGridLines} from './components/VerticalGridLines/VerticalGridLines';
import {HorizontalBarChartYAnnotations} from './components/HorizontalBarChartYAnnotations/HorizontalBarChartYAnnotations';
import {HorizontalBarChartXAnnotations} from './components/HorizontalBarChartXAnnotations/HorizontalBarChartXAnnotations';

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

  const {longestSeriesCount, seriesColors, longestSeriesIndex} =
    useHorizontalSeriesColors(data);

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
    isSimple: false,
    isStacked,
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    const groups = formatDataIntoGroups(data);

    const maxes = groups.map((numbers) => {
      const values = numbers.map((value) => value).filter(Boolean) as number[];

      if (values.length === 0) {
        return 0;
      }

      return areAllNegative ? Math.min(...values) : Math.max(...values);
    });

    return maxes;
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
      maxWidth: width - longestLabel.negative - longestLabel.positive,
      labelFormatter: xAxisOptions.labelFormatter,
      longestLabel,
    });

  const {barHeight, chartHeight, groupBarsAreaHeight, groupHeight} =
    useHorizontalBarSizes({
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

  const zeroPosition = longestLabel.negative + xScale(0);

  const labelWidth = drawableWidth / ticks.length;
  const chartBounds: BoundingRect = {
    width,
    height,
    x: chartXPosition,
    y: 0,
  };

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
    <ChartDiv height={height} width={width}>
      <ChartSVG setRef={setSvgRef} width={width} height={height}>
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
                  containerWidth={width}
                  data={data}
                  groupHeight={groupHeight}
                  id={id}
                  index={index}
                  isSimple={false}
                  isStacked={isStacked}
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
      </ChartSVG>

      {highestValueForSeries.length !== 0 && (
        <TooltipWrapper
          bandwidth={groupBarsAreaHeight}
          chartBounds={chartBounds}
          chartType={InternalChartType.HorizontalBar}
          data={data}
          focusElementDataType={DataType.BarGroup}
          getMarkup={getTooltipMarkup}
          margin={ChartMargin}
          parentElement={svgRef}
          longestSeriesIndex={longestSeriesIndex}
          xScale={xScale}
          type={type}
        />
      )}

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
    </ChartDiv>
  );
}
