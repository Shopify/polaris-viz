import React, {ReactNode, useMemo, useState} from 'react';
import {
  uniqueId,
  DataType,
  COLOR_VISION_SINGLE_ITEM,
  BoundingRect,
  HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS,
  useAriaLabel,
  LINE_HEIGHT,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {checkAvailableAnnotations} from '../../components/Annotations';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import type {
  RenderTooltipContentData,
  AnnotationLookupTable,
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
import {XMLNS, ChartMargin, ANNOTATIONS_LABELS_OFFSET} from '../../constants';
import {eventPointNative, formatDataIntoGroups} from '../../utilities';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
} from '../TooltipWrapper';

import {
  VerticalGridLines,
  HorizontalBarChartYAnnotations,
  HorizontalBarChartXAnnotations,
} from './components';
import {getAlteredHorizontalBarPosition} from './utilities';

export interface ChartProps {
  annotationsLookupTable: AnnotationLookupTable;
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({
  annotationsLookupTable,
  data,
  dimensions,
  renderTooltipContent,
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  useColorVisionEvents(data.length > 1);

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
    dimensions,
    showLegend,
    colors: seriesColors,
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

  const labels = useFormattedLabels({
    data,
    labelFormatter: yAxisOptions.labelFormatter,
  });

  const getAriaLabel = useAriaLabel(data, {
    xAxisLabelFormatter: xAxisOptions.labelFormatter,
    yAxisLabelFormatter: yAxisOptions.labelFormatter,
  });

  return (
    <React.Fragment>
      <svg
        ref={setSvgRef}
        role="list"
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
        width={width}
        height={height}
      >
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
              chartHeight={height}
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
              labels={labels}
              zeroPosition={zeroPosition}
            />
          </g>
        )}
      </svg>

      <TooltipWrapper
        bandwidth={groupBarsAreaHeight}
        chartBounds={chartBounds}
        focusElementDataType={DataType.BarGroup}
        getAlteredPosition={getAlteredHorizontalBarPosition}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={ChartMargin}
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

  function formatPositionForTooltip(index: number): TooltipPosition {
    if (isStacked) {
      const x = stackedValues[index].reduce((prev, cur) => {
        const [start, end] = cur;

        if (start < 0) {
          return prev;
        }

        return prev + (xScale(end) - xScale(start));
      }, xScale(0));

      return {
        x,
        y: groupHeight * index,
        activeIndex: index,
      };
    }

    const highestValue = highestValueForSeries[index];
    const x = chartXPosition + xScale(highestValue);

    return {
      x: highestValue < 0 ? -x : x,
      y: groupHeight * index,
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

      const {svgY} = point;

      const currentPoint = svgY - 0;
      const currentIndex = Math.floor(currentPoint / groupHeight);

      if (currentIndex < 0 || currentIndex > longestSeriesCount - 1) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      return formatPositionForTooltip(currentIndex);
    } else if (index != null) {
      return formatPositionForTooltip(index);
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}
