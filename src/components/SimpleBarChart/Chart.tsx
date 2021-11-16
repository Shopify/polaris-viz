import React, {useCallback, useMemo, useState} from 'react';
import {useTransition, animated} from '@react-spring/web';

import {getSeriesColorsFromCount, useTheme} from '../../hooks';
import {
  XMLNS,
  HORIZONTAL_BAR_GROUP_DELAY,
  BARS_SORT_TRANSITION_CONFIG,
} from '../../constants';
import {ChartType, DataSeries, DataType, Dimensions} from '../../types';

import {getBarId} from './utilities';
import {
  GradientDefs,
  GroupLabel,
  HorizontalBars,
  StackedBars,
} from './components';
import type {ColorOverrides, XAxisOptions} from './types';
import {useBarSizes, useDataForChart, useXScale} from './hooks';
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
  const selectedTheme = useTheme(theme);

  const {labelFormatter} = xAxisOptions;
  const isStacked = type === 'stacked';

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const longestSeriesCount = useMemo(() => {
    return series.reduce((prev, cur) => {
      const count = cur.data.length;

      return count > prev ? count : prev;
    }, 0);
  }, [series]);

  const seriesColors = getSeriesColorsFromCount(
    longestSeriesCount,
    selectedTheme,
  );

  const {allNumbers, longestLabel, areAllNegative} = useDataForChart({
    series,
    isSimple: true,
    isStacked,
    labelFormatter,
  });

  const highestSumForStackedGroup = useMemo(() => {
    if (!isStacked) {
      return 0;
    }
    const numbers: number[] = [];

    series.forEach(({data}) => {
      const sum = data.reduce((prev, {value}) => prev + value, 0);
      numbers.push(sum);
    });

    return Math.max(...numbers);
  }, [series, isStacked]);

  const {xScale, xScaleStacked, ticks, ticksStacked} = useXScale({
    allNumbers,
    highestSumForStackedGroup,
    isStacked,
    maxWidth: width - longestLabel.negative - longestLabel.positive,
    longestSeriesCount,
  });

  const {barHeight, groupHeight} = useBarSizes({
    chartDimensions: {width, height},
    isSimple: true,
    isStacked,
    labelFormatter,
    seriesLength: series.length,
    singleBarCount: longestSeriesCount,
    ticks: isStacked ? ticksStacked : ticks,
  });

  const getAriaLabel = useCallback(
    (label: string, seriesIndex: number) => {
      const ariaSeries = series[seriesIndex].data
        .map(({value, key}) => {
          return `${key} ${labelFormatter(value)}`;
        })
        .join(', ');

      return `${label}: ${ariaSeries}`;
    },
    [series, labelFormatter],
  );

  const seriesWithColorOverride = useMemo(() => {
    const colors: ColorOverrides[] = [];

    series.forEach(({color, data}, groupIndex) => {
      data.forEach((_, seriesIndex) => {
        if (color != null) {
          colors.push({id: getBarId(groupIndex, seriesIndex), color});
        }
      });
    });

    return colors;
  }, [series]);

  const seriesWithIndex = useMemo(() => {
    return series.map((series, index) => ({
      series,
      index,
    }));
  }, [series]);

  const getTransform = (index: number) => {
    return `translate(0px,${groupHeight * index}px)`;
  };

  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleOnTransitionRest = () => {
    setIsFirstRender(false);
  };

  const animationTrail = isFirstRender ? 0 : 50;
  const outOfChartPosition = getTransform(series.length + 1);

  const transitions = useTransition(seriesWithIndex, {
    keys: (item) => {
      return item.series.name ?? '';
    },
    initial: ({index}) => ({
      opacity: isFirstRender ? 1 : 0,
      transform: isFirstRender ? getTransform(index) : outOfChartPosition,
    }),
    from: {
      opacity: 0,
      transform: outOfChartPosition,
    },
    leave: {
      opacity: 0,
      transform: outOfChartPosition,
    },
    enter: () => ({
      opacity: 0,
      transform: outOfChartPosition,
    }),
    update: ({index}) => ({opacity: 1, transform: getTransform(index)}),
    expires: true,
    config: BARS_SORT_TRANSITION_CONFIG,
    trail: isAnimated ? animationTrail : 0,
    default: {
      immediate: !isAnimated,
      onRest: handleOnTransitionRest,
    },
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
          colorOverrides={seriesWithColorOverride}
          seriesColors={seriesColors}
          theme={theme}
          width={width}
        />

        {transitions(({opacity, transform}, item, _transition, index) => {
          const {name = ''} = item.series;
          const ariaLabel = getAriaLabel(name, item.index);

          if (series[index] == null) {
            return null;
          }

          const animationDelay =
            isFirstRender && isAnimated
              ? (HORIZONTAL_BAR_GROUP_DELAY * index) / series.length
              : 0;

          return (
            <animated.g
              key={`group-${name}`}
              data-type={DataType.BarGroup}
              data-id={`${DataType.BarGroup}-${index}`}
              style={{
                opacity,
                transform,
              }}
            >
              <GroupLabel
                areAllNegative={areAllNegative}
                label={name}
                theme={theme}
                zeroPosition={zeroPosition}
              />

              {isStacked && xScaleStacked ? (
                <StackedBars
                  animationDelay={animationDelay}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  groupIndex={index}
                  isAnimated={isAnimated}
                  name={name}
                  series={item.series}
                  theme={theme}
                  xScale={xScaleStacked}
                />
              ) : (
                <HorizontalBars
                  animationDelay={animationDelay}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  groupIndex={index}
                  isAnimated={isAnimated}
                  isSimple
                  labelFormatter={labelFormatter}
                  name={name}
                  series={item.series}
                  theme={theme}
                  xScale={xScale}
                  zeroPosition={zeroPosition}
                />
              )}
            </animated.g>
          );
        })}
      </svg>
    </div>
  );
}
