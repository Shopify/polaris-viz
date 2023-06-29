import {useMemo} from 'react';
import {
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  useAriaLabel,
} from '@shopify/polaris-viz-core';
import type {
  ChartType,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {estimateTrendIndicatorWidth} from '../TrendIndicator';
import {ChartElements} from '../ChartElements';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {GradientDefs, HorizontalGroup} from '../shared';
import type {HorizontalTransitionStyle} from '../../hooks';
import {
  useHorizontalBarSizes,
  useDataForHorizontalChart,
  useHorizontalXScale,
  useHorizontalTransitions,
  useHorizontalSeriesColors,
  useHorizontalStackedValues,
  useColorVisionEvents,
} from '../../hooks';
import {getContainerAlignmentForLegend} from '../../utilities';
import type {LegendPosition, RenderLegendContent} from '../../types';

import type {SimpleBarChartDataSeries} from './types';

export interface ChartProps {
  data: SimpleBarChartDataSeries[];
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
  renderLegendContent?: RenderLegendContent;
  legendPosition?: LegendPosition;
}

export function Chart({
  data,
  dimensions,
  renderLegendContent,
  legendPosition = 'bottom-right',
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  useColorVisionEvents(data.length > 1);

  const id = useMemo(() => uniqueId('SimpleBarChart'), []);

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors(data);

  const {legend, setLegendDimensions, height, width} = useLegend({
    data: [
      {
        shape: 'Bar',
        series: data,
      },
    ],
    dimensions,
    colors: seriesColors,
    showLegend,
  });

  const {
    allNumbers,
    longestLabel,
    highestPositive,
    lowestNegative,
    areAllNegative,
  } = useDataForHorizontalChart({
    data,
    isSimple: true,
    isStacked,
    labelFormatter,
  });

  const {stackedValues, stackedMin, stackedMax} = useHorizontalStackedValues({
    isStacked,
    data,
  });

  // find the longest positive and negative data points
  // if they have a trend indicator, subtract its width (both positive and negative)

  console.log('highestPositive: ', highestPositive);
  console.log('lowestNegative: ', lowestNegative);

  const longestTrendIndicator = {
    positive: 0,
    negative: 0,
  };
  data.forEach((series) => {
    const {data: seriesData, metadata} = series;
    const {trends} = metadata ?? {};
    seriesData.forEach((dataPoint, index) => {
      const trendForDataPoint = trends?.[index];
      if (trendForDataPoint) {
        console.log('dataPoint: ', dataPoint.value);
        console.log('trendForDataPoint: ', trendForDataPoint);

        if (
          dataPoint.value === highestPositive &&
          !longestTrendIndicator.positive
        ) {
          longestTrendIndicator.positive = estimateTrendIndicatorWidth(
            trendForDataPoint.value,
          ).totalWidth;
        } else if (
          dataPoint.value === lowestNegative &&
          !longestTrendIndicator.negative
        ) {
          longestTrendIndicator.negative = estimateTrendIndicatorWidth(
            trendForDataPoint.value,
          ).totalWidth;
        }
      }
    });
  });

  console.log('longestTrendIndicator: ', longestTrendIndicator);
  console.log('longestLabel: ', longestLabel);

  const trendIndicatorOffset =
    longestTrendIndicator.positive + longestTrendIndicator.negative;

  const trendIndicatorWidths = data.flatMap((value) => {
    const trends = value.metadata?.trends ?? {};
    const trendValues = Object.values(trends);
    return trendValues.map(({value}) => {
      return estimateTrendIndicatorWidth(value).totalWidth;
    });
  });

  console.log('trendIndicatorWidths', trendIndicatorWidths);

  // const longestTrendIndicator = Math.max(0, ...trendIndicatorWidths);

  const {xScale} = useHorizontalXScale({
    allNumbers,
    isStacked,
    labelFormatter,
    maxWidth: width - trendIndicatorOffset,
    stackedMax,
    stackedMin,
    longestLabel,
  });

  const {barHeight, groupHeight} = useHorizontalBarSizes({
    chartDimensions: {width, height},
    isSimple: true,
    isStacked,
    seriesLength: longestSeriesCount,
    singleBarCount: data.length,
    xAxisHeight: 0,
  });

  const {transitions} = useHorizontalTransitions({
    series: data,
    groupHeight,
    chartXPosition: 0,
  });

  const xScaleOffset = longestLabel.negative + longestTrendIndicator.negative;
  console.log('xScaleOffset: ', xScaleOffset);

  const zeroPosition = xScale(0) + xScaleOffset;

  const getAriaLabel = useAriaLabel(data, {
    xAxisLabelFormatter: labelFormatter,
  });

  const containerStyle = getContainerAlignmentForLegend(legendPosition, true);
  return (
    <ChartElements.Div style={containerStyle} width="auto" height="auto">
      <ChartElements.Svg height={height} width={width}>
        <GradientDefs
          direction="horizontal"
          gradientUnits={isStacked ? 'objectBoundingBox' : 'userSpaceOnUse'}
          id={id}
          seriesColors={seriesColors}
          size={isStacked ? '100%' : `${width}px`}
        />

        {transitions((style, item, _transition, index) => {
          const {opacity, transform} = style as HorizontalTransitionStyle;
          const name = item.key ?? '';
          const ariaLabel = getAriaLabel({
            seriesIndex: item.index,
            key: data[0].data[item.index]?.key,
          });

          return (
            <animated.g
              key={`group-${name}`}
              style={{
                opacity,
                transform,
              }}
            >
              <HorizontalGroup
                areAllNegative={areAllNegative}
                ariaLabel={ariaLabel}
                barHeight={barHeight}
                containerWidth={width}
                data={data}
                groupHeight={groupHeight}
                id={id}
                index={index}
                isSimple
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
      </ChartElements.Svg>

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          position={legendPosition}
        />
      )}
    </ChartElements.Div>
  );
}
