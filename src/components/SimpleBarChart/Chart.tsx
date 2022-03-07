import React, {useCallback, useMemo} from 'react';

import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {uniqueId} from '../../utilities';
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
import {
  XMLNS,
  HORIZONTAL_BAR_GROUP_DELAY,
  COLOR_VISION_SINGLE_ITEM,
} from '../../constants';
import type {ChartType, DataSeries, Dimensions} from '../../types';

import type {XAxisOptions} from './types';
import styles from './Chart.scss';

export interface ChartProps {
  data: DataSeries[];
  isAnimated: boolean;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  data,
  dimensions,
  isAnimated,
  showLegend,
  theme,
  type,
  xAxisOptions,
}: ChartProps) {
  useColorVisionEvents(data.length > 1);

  const id = useMemo(() => uniqueId('SimpleBarChart'), []);

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    data,
    theme,
  });

  const {legend, setLegendHeight, height, width} = useLegend({
    data,
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
    isAnimated,
    chartStartPosition: 0,
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
              isSimple
              isStacked={isStacked}
              labelFormatter={labelFormatter}
              name={name}
              opacity={opacity}
              stackedValues={stackedValues}
              theme={theme}
              transform={transform}
              xScale={xScale}
              zeroPosition={zeroPosition}
            />
          );
        })}
      </svg>

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
}
