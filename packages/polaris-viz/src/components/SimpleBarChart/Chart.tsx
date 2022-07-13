import React, {useCallback, useMemo} from 'react';
import {
  uniqueId,
  COLOR_VISION_SINGLE_ITEM,
  DEFAULT_THEME_NAME,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  ChartType,
  DataSeries,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

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
import {XMLNS, HORIZONTAL_BAR_GROUP_DELAY} from '../../constants';

import styles from './Chart.scss';

export interface ChartProps {
  data: DataSeries[];
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  data,
  dimensions,
  showLegend,
  theme = DEFAULT_THEME_NAME,
  type,
  xAxisOptions,
  yAxisOptions,
}: ChartProps) {
  useColorVisionEvents(data.length > 1);
  const {shouldAnimate} = useChartContext();

  const id = useMemo(() => uniqueId('SimpleBarChart'), []);

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    data,
    theme,
  });

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
    labelHeight: 0,
  });

  const getAriaLabel = useCallback(
    (seriesIndex: number) => {
      const ariaSeries = data
        .map(({name, data}) => {
          return `${name} ${labelFormatter(data[seriesIndex].value)}`;
        })
        .join(', ');

      return `${data[0].data[seriesIndex].key}: ${ariaSeries}`;
    },
    [data, labelFormatter],
  );

  const {transitions} = useHorizontalTransitions({
    series: data,
    groupHeight,
    chartXPosition: 0,
  });

  const zeroPosition = longestLabel.negative + xScale(0);

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
        role="list"
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
      >
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
          const ariaLabel = getAriaLabel(item.index);

          const animationDelay = shouldAnimate
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
              isSimple
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
      </svg>

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          theme={theme}
        />
      )}
    </div>
  );
}
