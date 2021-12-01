import React, {useCallback, useMemo} from 'react';

import {getHighestSumForStacked, uniqueId} from '../../utilities';
import {GradientDefs, HorizontalGroup} from '../shared';
import {
  useHorizontalBarSizes,
  useDataForHorizontalChart,
  useHorizontalXScale,
  useHorizontalTransitions,
  useHorizontalSeriesColors,
  HorizontalTransitionStyle,
} from '../../hooks';
import {XMLNS, HORIZONTAL_BAR_GROUP_DELAY} from '../../constants';
import type {ChartType, DataSeries, Dimensions} from '../../types';

import type {XAxisOptions} from './types';
import styles from './Chart.scss';

export interface ChartProps {
  data: DataSeries[];
  isAnimated: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  data,
  dimensions,
  isAnimated,
  theme,
  type,
  xAxisOptions,
}: ChartProps) {
  const id = uniqueId('SimpleBarChart');

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    data,
    theme,
  });

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    data,
    isSimple: true,
    isStacked,
    labelFormatter,
  });

  const highestSumForStackedGroup = useMemo(() => {
    if (!isStacked) {
      return 0;
    }
    return getHighestSumForStacked(data);
  }, [data, isStacked]);

  const {xScale, xScaleStacked, ticks, ticksStacked} = useHorizontalXScale({
    allNumbers,
    highestSumForStackedGroup,
    isStacked,
    maxWidth: width - longestLabel.negative - longestLabel.positive,
    longestSeriesCount,
  });

  const {barHeight, groupHeight} = useHorizontalBarSizes({
    chartDimensions: {width, height},
    isSimple: true,
    isStacked,
    labelFormatter,
    seriesLength: longestSeriesCount,
    singleBarCount: data.length,
    ticks: isStacked ? ticksStacked : ticks,
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
          id={id}
          seriesColors={seriesColors}
          theme={theme}
          width={width}
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
              id={id}
              index={index}
              isAnimated={isAnimated}
              isSimple
              isStacked={isStacked}
              labelFormatter={labelFormatter}
              name={name}
              opacity={opacity}
              theme={theme}
              transform={transform}
              xScale={xScale}
              xScaleStacked={xScaleStacked}
              zeroPosition={zeroPosition}
            />
          );
        })}
      </svg>
    </div>
  );
}
