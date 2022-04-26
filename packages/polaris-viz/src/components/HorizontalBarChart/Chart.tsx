import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import {
  uniqueId,
  DataType,
  COLOR_VISION_SINGLE_ITEM,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData} from '../../types';
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
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
} from '../../constants';
import {eventPointNative, formatDataIntoGroups} from '../../utilities';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
} from '../TooltipWrapper';
import type {AnnotationLookupTable} from '../BarChart';
import {AnnotationLine} from '../BarChart';

import {VerticalGridLines} from './components';
import {getAlteredHorizontalBarPosition} from './utilities';
import styles from './Chart.scss';

export interface ChartProps {
  isAnimated: boolean;
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  dimensions,
  isAnimated,
  renderTooltipContent,
  showLegend,
  theme,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  useColorVisionEvents(data.length > 1);

  const selectedTheme = useTheme(theme);
  const id = useMemo(() => uniqueId('HorizontalBarChart'), []);

  const isStacked = type === 'stacked';

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [labelHeight, setLabelHeight] = useState(0);

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    data,
    theme,
  });

  const {legend, setLegendHeight, height, width} = useLegend({
    data,
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

  const drawableHeight = height - labelHeight;

  const {xScale, ticks, ticksFormatted, drawableWidth, chartStartPosition} =
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
      chartDimensions: {width: drawableWidth, height},
      isSimple: xAxisOptions.hide,
      isStacked,
      seriesLength: longestSeriesCount,
      singleBarCount: data.length,
      labelHeight,
    });

  const getAriaLabel = useCallback(
    (key: string, seriesIndex: number) => {
      const ariaSeries = data
        .map(({name, data}) => {
          if (data[seriesIndex] == null) {
            return name;
          }

          return `${name} ${xAxisOptions.labelFormatter(
            data[seriesIndex].value,
          )}`;
        })
        .join(', ');

      return `${yAxisOptions.labelFormatter(key)}: ${ariaSeries}`;
    },
    [data, xAxisOptions, yAxisOptions],
  );

  const getTooltipMarkup = useBarChartTooltipContent({
    data,
    seriesColors,
    renderTooltipContent,
  });

  const {transitions} = useHorizontalTransitions({
    series: data,
    groupHeight,
    isAnimated,
    chartStartPosition,
  });

  const zeroPosition = longestLabel.negative + xScale(0);

  const labelWidth = drawableWidth / ticks.length;

  return (
    <div
      className={styles.ChartContainer}
      style={{
        width,
        height,
      }}
    >
      <svg
        className={styles.SVG}
        ref={setSvgRef}
        role="list"
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
        width={width}
        height={height}
      >
        {xAxisOptions.hide === true ? null : (
          <g transform={`translate(${chartStartPosition}, 0)`}>
            <VerticalGridLines
              chartHeight={chartHeight}
              stroke={selectedTheme.grid.color}
              ticks={ticks}
              xScale={xScale}
            />
            <HorizontalBarChartXAxisLabels
              chartHeight={height}
              chartX={-labelWidth / 2}
              chartY={drawableHeight}
              labels={ticksFormatted}
              labelWidth={labelWidth}
              onHeightChange={setLabelHeight}
              theme={theme}
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
          theme={theme}
        />

        {transitions((style, item, _transition, index) => {
          const {opacity, transform} = style as HorizontalTransitionStyle;
          const name = item.key ?? '';
          const ariaLabel = getAriaLabel(item.key, item.index);

          const animationDelay = isAnimated
            ? (HORIZONTAL_BAR_GROUP_DELAY * index) / data.length
            : 0;

          return (
            <HorizontalGroup
              animationDelay={animationDelay}
              areAllNegative={areAllNegative}
              ariaLabel={ariaLabel}
              barHeight={barHeight}
              containerWidth={width}
              data={data}
              groupHeight={groupHeight}
              id={id}
              index={index}
              isAnimated={isAnimated}
              isSimple={false}
              isStacked={isStacked}
              name={name}
              opacity={opacity}
              stackedValues={stackedValues}
              theme={theme}
              transform={transform}
              xAxisOptions={xAxisOptions}
              xScale={xScale}
              yAxisOptions={yAxisOptions}
              zeroPosition={zeroPosition}
            />
          );
        })}
        <g>
          {Object.keys(annotationsLookupTable).map((key, dataIndex) => {
            const annotation = annotationsLookupTable[Number(key)];

            if (annotation == null) {
              return null;
            }

            const xPosition = groupHeight * annotation.dataSeriesIndex;
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const leftOffset = barHeight * annotation.dataPointIndex;

            const position =
              xPositionValue + HORIZONTAL_GROUP_LABEL_HEIGHT + leftOffset;

            return (
              <AnnotationLine
                barSize={barHeight}
                color={annotation.color}
                direction="horizontal"
                drawableSize={width}
                isAnimated={isAnimated}
                key={`annotation${dataIndex}${annotation.dataPointIndex}`}
                offset={annotation.offset}
                position={position}
                width={annotation.width}
              />
            );
          })}
        </g>
      </svg>
      <TooltipWrapper
        bandwidth={groupBarsAreaHeight}
        chartDimensions={{width, height}}
        focusElementDataType={DataType.BarGroup}
        getAlteredPosition={getAlteredHorizontalBarPosition}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={Margin}
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
    const x = chartStartPosition + xScale(highestValue);

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
