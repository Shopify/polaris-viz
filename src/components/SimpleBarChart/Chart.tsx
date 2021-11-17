import React, {useCallback, useMemo} from 'react';

import {
  formatDataForHorizontalBarChart,
  getHighestSumForStacked,
} from '../../utilities';
import {GradientDefs, HorizontalGroup} from '../shared';
import {
  useHorizontalBarSizes,
  useDataForHorizontalChart,
  useHorizontalXScale,
  useHorizontalTransitions,
  useHorizontalSeriesColors,
} from '../../hooks';
import {XMLNS, HORIZONTAL_BAR_GROUP_DELAY} from '../../constants';
import type {ChartType, DataSeries, Dimensions} from '../../types';

import type {XAxisOptions} from './types';
import styles from './Chart.scss';

interface ChartProps {
  isAnimated: boolean;
  series: DataSeries[];
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  theme?: string;
  dimensions?: Dimensions;
}

export function Chart({
  dimensions,
  isAnimated,
  series,
  theme,
  type,
  xAxisOptions,
}: ChartProps) {
  const formattedSeries = useMemo(() => {
    return formatDataForHorizontalBarChart(series);
  }, [series]);

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    formattedSeries,
    series,
    theme,
  });

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    series: formattedSeries,
    isSimple: true,
    isStacked,
    labelFormatter,
  });

  const highestSumForStackedGroup = useMemo(() => {
    if (!isStacked) {
      return 0;
    }
    return getHighestSumForStacked(formattedSeries);
  }, [formattedSeries, isStacked]);

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
    seriesLength: formattedSeries.length,
    singleBarCount: longestSeriesCount,
    ticks: isStacked ? ticksStacked : ticks,
  });

  const getAriaLabel = useCallback(
    (label: string, seriesIndex: number) => {
      const ariaSeries = formattedSeries[seriesIndex].data
        .map(({value, key}) => {
          return `${key} ${labelFormatter(value)}`;
        })
        .join(', ');

      return `${label}: ${ariaSeries}`;
    },
    [formattedSeries, labelFormatter],
  );

  const {transitions, isFirstRender} = useHorizontalTransitions({
    series: formattedSeries,
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
        <GradientDefs seriesColors={seriesColors} theme={theme} width={width} />

        {transitions(({opacity, transform}, item, _transition, index) => {
          const {name = ''} = item.series;
          const ariaLabel = getAriaLabel(name, item.index);

          if (formattedSeries[index] == null) {
            return null;
          }

          const animationDelay =
            isFirstRender && isAnimated
              ? (HORIZONTAL_BAR_GROUP_DELAY * index) / formattedSeries.length
              : 0;

          return (
            <HorizontalGroup
              animationDelay={animationDelay}
              areAllNegative={areAllNegative}
              ariaLabel={ariaLabel}
              barHeight={barHeight}
              index={index}
              isAnimated={isAnimated}
              isSimple
              isStacked={isStacked}
              labelFormatter={labelFormatter}
              name={name}
              opacity={opacity}
              series={item.series}
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
