import { useMemo } from 'react';
import {
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  useAriaLabel,
} from '@shopify/polaris-viz-core';
import type {
  ChartType,
  DataSeries,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {animated} from '@react-spring/web';

import {ChartElements} from '../ChartElements';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {GradientDefs, HorizontalGroup} from '../shared';
import {
  useHorizontalBarSizes,
  useDataForHorizontalChart,
  useHorizontalXScale,
  useHorizontalTransitions,
  useHorizontalSeriesColors,
  HorizontalTransitionStyle,
  useHorizontalStackedValues,
  useColorVisionEvents,
} from '../../hooks';
import type {RenderLegendContent} from '../../types';

export interface ChartProps {
  data: DataSeries[];
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
  renderLegendContent?: RenderLegendContent;
}

export function Chart({
  data,
  dimensions,
  renderLegendContent,
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

  const {xScale} = useHorizontalXScale({
    allNumbers,
    isStacked,
    labelFormatter,
    maxWidth: width - longestLabel.negative - longestLabel.positive,
    stackedMax,
    stackedMin,
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

  const zeroPosition = longestLabel.negative + xScale(0);
  const getAriaLabel = useAriaLabel(data, {
    xAxisLabelFormatter: labelFormatter,
  });

  return (
    <ChartElements.Div height={height} width={width}>
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
        />
      )}
    </ChartElements.Div>
  );
}
