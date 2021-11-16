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
  const formattedData = useMemo(() => {
    return formatDataForHorizontalBarChart(data);
  }, [data]);

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    data,
    formattedData,
    theme,
  });

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    data: formattedData,
    isSimple: true,
    isStacked,
    labelFormatter,
  });

  const highestSumForStackedGroup = useMemo(() => {
    if (!isStacked) {
      return 0;
    }
    return getHighestSumForStacked(formattedData);
  }, [formattedData, isStacked]);

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
    seriesLength: formattedData.length,
    singleBarCount: longestSeriesCount,
    ticks: isStacked ? ticksStacked : ticks,
  });

  const getAriaLabel = useCallback(
    (label: string, seriesIndex: number) => {
      const ariaSeries = formattedData[seriesIndex].data
        .map(({value, key}) => {
          return `${key} ${labelFormatter(value)}`;
        })
        .join(', ');

      return `${label}: ${ariaSeries}`;
    },
    [formattedData, labelFormatter],
  );

  const {transitions, isFirstRender} = useHorizontalTransitions({
    series: formattedData,
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

          if (formattedData[index] == null) {
            return null;
          }

          const animationDelay =
            isFirstRender && isAnimated
              ? (HORIZONTAL_BAR_GROUP_DELAY * index) / formattedData.length
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
