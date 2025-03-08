import type {ReactNode} from 'react';
import {useMemo, useState} from 'react';
import {
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  useAriaLabel,
  useChartContext,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import type {
  ChartType,
  LabelFormatter,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {getHighestValueForSeries} from '../../utilities/getHighestValueForSeries';
import {TooltipWrapper} from '../TooltipWrapper';
import {getFontSize} from '../../utilities/getFontSize';
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
  useBarChartTooltipContent,
} from '../../hooks';
import {getContainerAlignmentForLegend} from '../../utilities';
import type {
  LegendPosition,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';

import type {SimpleBarChartDataSeries} from './types';
import {getLongestTrendIndicator} from './utilities';

export interface ChartProps {
  data: SimpleBarChartDataSeries[];
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  renderLegendContent?: RenderLegendContent;
  legendPosition?: LegendPosition;
}

export function Chart({
  data,
  renderLegendContent,
  legendPosition = 'bottom-right',
  renderTooltipContent,
  seriesNameFormatter,
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const {isTouchDevice} = useChartContext();
  useColorVisionEvents({enabled: data.length > 1 && !isTouchDevice});

  const fontSize = getFontSize();
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
    colors: seriesColors,
    showLegend,
    seriesNameFormatter,
  });

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    data,
    isSimple: true,
    isStacked,
    labelFormatter,
  });

  const {stackedValues, stackedMin, stackedMax} = useHorizontalStackedValues({
    isStacked,
    data,
  });

  const longestTrendIndicator = getLongestTrendIndicator(data, fontSize);

  const trendIndicatorOffset =
    longestTrendIndicator.positive + longestTrendIndicator.negative;

  const {xScale} = useHorizontalXScale({
    allNumbers,
    isStacked,
    labelFormatter,
    maxWidth: width - trendIndicatorOffset,
    stackedMax,
    stackedMin,
    longestLabel,
    isSimple: true,
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

  const zeroPosition = areAllNegative
    ? xScale(0) + longestLabel.negative
    : xScale(0) + longestLabel.negative + longestTrendIndicator.negative;

  const getAriaLabel = useAriaLabel(data, {
    xAxisLabelFormatter: labelFormatter,
  });

  const getTooltipMarkup = useBarChartTooltipContent({
    data,
    seriesColors,
    renderTooltipContent,
    seriesNameFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    return getHighestValueForSeries(data, areAllNegative);
  }, [data, areAllNegative]);

  const containerStyle = getContainerAlignmentForLegend(legendPosition, true);
  return (
    <ChartElements.Div style={containerStyle} width="auto" height="auto">
      <ChartElements.Svg height={height} width={width} setRef={setSvgRef}>
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
                chartXPosition={0}
                chartYPosition={0}
                containerWidth={width}
                data={data}
                groupHeight={groupHeight}
                id={id}
                index={index}
                highestValueForSeries={highestValueForSeries}
                isSimple
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
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          position={legendPosition}
        />
      )}
    </ChartElements.Div>
  );
}
