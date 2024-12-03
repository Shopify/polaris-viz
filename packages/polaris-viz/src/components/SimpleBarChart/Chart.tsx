import {useMemo} from 'react';
import {
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  useAriaLabel,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  ChartType,
  LabelFormatter,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {getFontSize} from '../../utilities/getFontSize';
import {ChartSVG} from '../ChartElements/ChartSVG';
import {ChartDiv} from '../ChartElements/ChartDiv';
import {LegendContainer} from '../LegendContainer/LegendContainer';
import {useLegend} from '../LegendContainer/hooks/useLegend';
import {GradientDefs} from '../shared/GradientDefs/GradientDefs';
import {HorizontalGroup} from '../shared/HorizontalGroup/HorizontalGroup';
import type {HorizontalTransitionStyle} from '../../hooks/useHorizontalTransitions';
import {useHorizontalBarSizes} from '../../hooks/useHorizontalBarSizes';
import {useDataForHorizontalChart} from '../../hooks/useDataForHorizontalChart';
import {useHorizontalXScale} from '../../hooks/useHorizontalXScale';
import {useHorizontalTransitions} from '../../hooks/useHorizontalTransitions';
import {useHorizontalSeriesColors} from '../../hooks/useHorizontalSeriesColors';
import {useHorizontalStackedValues} from '../../hooks/useHorizontalStackedValues';
import {useColorVisionEvents} from '../../hooks/ColorVisionA11y/useColorVisionEvents';
import {getContainerAlignmentForLegend} from '../../utilities/getContainerAlignmentForLegend';
import type {LegendPosition, RenderLegendContent} from '../../types';

import type {SimpleBarChartDataSeries} from './types';
import {getLongestTrendIndicator} from './utilities';

export interface ChartProps {
  data: SimpleBarChartDataSeries[];
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  renderLegendContent?: RenderLegendContent;
  legendPosition?: LegendPosition;
}

export function Chart({
  data,
  renderLegendContent,
  legendPosition = 'bottom-right',
  seriesNameFormatter,
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
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

  const zeroPosition =
    xScale(0) + longestLabel.negative + longestTrendIndicator.negative;

  const getAriaLabel = useAriaLabel(data, {
    xAxisLabelFormatter: labelFormatter,
  });

  const containerStyle = getContainerAlignmentForLegend(legendPosition, true);
  return (
    <ChartDiv style={containerStyle} width="auto" height="auto">
      <ChartSVG height={height} width={width}>
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
      </ChartSVG>

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          position={legendPosition}
        />
      )}
    </ChartDiv>
  );
}
