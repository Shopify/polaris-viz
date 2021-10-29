import React, {useCallback, useMemo, useState} from 'react';
import {useTransition, animated} from '@react-spring/web';

import {getSeriesColorsFromCount, useTheme} from '../../hooks';
import {TooltipContent} from '../TooltipContent';
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
  BARS_SORT_TRANSITION_CONFIG,
} from '../../constants';
import {eventPointNative} from '../../utilities';
import {DataType, Dimensions} from '../../types';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
} from '../TooltipWrapper';

import {getAlteredHorizontalBarPosition, getBarId} from './utilities';
import {
  GradientDefs,
  GroupLabel,
  HorizontalBars,
  StackedBars,
  VerticalGridLines,
  XAxisLabels,
} from './components';
import type {ColorOverrides, Series, XAxisOptions} from './types';
import {useBarSizes, useDataForChart, useXScale} from './hooks';
import styles from './Chart.scss';

interface ChartProps {
  chartDimensions: Dimensions;
  isAnimated: boolean;
  isSimple: boolean;
  isStacked: boolean;
  series: Series[];
  xAxisOptions: Required<XAxisOptions>;
  theme?: string;
}

export function Chart({
  chartDimensions,
  isAnimated,
  isSimple,
  isStacked,
  series,
  theme,
  xAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);
  const {labelFormatter} = xAxisOptions;

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

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
    isSimple,
    isStacked,
    labelFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    const maxes: number[] = [];

    series.forEach(({data}) => {
      const values = data.map(({rawValue}) => rawValue);
      const max = areAllNegative ? Math.min(...values) : Math.max(...values);

      maxes.push(max);
    });

    return maxes;
  }, [series, areAllNegative]);

  const highestSumForStackedGroup = useMemo(() => {
    if (!isStacked) {
      return 0;
    }
    const numbers: number[] = [];

    series.forEach(({data}) => {
      const sum = data.reduce((prev, {rawValue}) => prev + rawValue, 0);
      numbers.push(sum);
    });

    return Math.max(...numbers);
  }, [series, isStacked]);

  const {xScale, xScaleStacked, ticks, ticksStacked} = useXScale({
    allNumbers,
    highestSumForStackedGroup,
    isStacked,
    maxWidth:
      chartDimensions.width - longestLabel.negative - longestLabel.positive,
    longestSeriesCount,
  });

  const {
    bandwidth,
    barHeight,
    chartHeight,
    groupBarsAreaHeight,
    groupHeight,
    tallestXAxisLabel,
  } = useBarSizes({
    chartDimensions,
    isSimple: isSimple || xAxisOptions.hide,
    isStacked,
    labelFormatter,
    seriesLength: series.length,
    singleBarCount: longestSeriesCount,
    ticks: isStacked ? ticksStacked : ticks,
  });

  const getAriaLabel = useCallback(
    (label: string, seriesIndex: number) => {
      const ariaSeries = series[seriesIndex].data
        .map(({rawValue, label}) => {
          return `${label} ${labelFormatter(rawValue)}`;
        })
        .join(', ');

      return `${label}: ${ariaSeries}`;
    },
    [series, labelFormatter],
  );

  const getTooltipMarkup = useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const data = series[activeIndex].data.map(
        ({rawValue, label, color}, index) => {
          return {
            label,
            value: labelFormatter(rawValue),
            color: color ?? seriesColors[index],
          };
        },
      );

      return <TooltipContent data={data} theme={theme} />;
    },
    [series, seriesColors, labelFormatter, theme],
  );

  const seriesWithColorOverride = useMemo(() => {
    const colors: ColorOverrides[] = [];

    series.forEach(({data}, groupIndex) => {
      data.forEach(({color}, seriesIndex) => {
        if (color != null) {
          colors.push({id: getBarId(groupIndex, seriesIndex), color});
        }
      });
    });

    return colors;
  }, [series]);
  const seriesWithIndex = series.map((series, index) => ({
    series,
    index,
  }));

  const getTransform = (index: number) => {
    return `translate(${longestLabel.negative + xScale(0)}px,${
      groupHeight * index
    }px)`;
  };

  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleOnTransitionRest = () => {
    setIsFirstRender(false);
  };

  const animationTrail = isFirstRender ? 0 : 50;
  const outOfChartPosition = getTransform(series.length + 1);

  const transitions = useTransition(seriesWithIndex, {
    keys: (item) => item.series.name,
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

  return (
    <div
      className={styles.ChartContainer}
      style={{
        width: chartDimensions.width,
        height: chartDimensions.height,
      }}
    >
      <svg
        className={styles.SVG}
        height={chartDimensions.height}
        ref={setSvgRef}
        role="list"
        width={chartDimensions.width}
        xmlns={XMLNS}
      >
        {isSimple || xAxisOptions.hide === true ? null : (
          <React.Fragment>
            <VerticalGridLines
              chartHeight={chartHeight}
              stroke={selectedTheme.grid.color}
              ticks={isStacked ? ticksStacked : ticks}
              xScale={isStacked ? xScaleStacked! : xScale}
            />
            <XAxisLabels
              bandwidth={bandwidth}
              chartHeight={chartHeight}
              color={selectedTheme.xAxis.labelColor}
              labelFormatter={labelFormatter}
              tallestXAxisLabel={tallestXAxisLabel}
              ticks={isStacked ? ticksStacked : ticks}
              xScale={isStacked ? xScaleStacked! : xScale}
            />
          </React.Fragment>
        )}

        <GradientDefs
          colorOverrides={seriesWithColorOverride}
          seriesColors={seriesColors}
          theme={theme}
          width={chartDimensions.width}
        />

        {transitions(({opacity, transform}, item, _transition, index) => {
          const {name} = item.series;
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
              />

              {isStacked && xScaleStacked ? (
                <StackedBars
                  animationDelay={animationDelay}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  groupIndex={index}
                  name={name}
                  series={item.series.data}
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
                  isSimple={isSimple}
                  labelFormatter={labelFormatter}
                  series={item.series.data}
                  theme={theme}
                  xScale={xScale}
                  name={name}
                />
              )}
            </animated.g>
          );
        })}
      </svg>
      <TooltipWrapper
        bandwidth={groupBarsAreaHeight}
        chartDimensions={chartDimensions}
        focusElementDataType={DataType.Bar}
        getAlteredPosition={getAlteredHorizontalBarPosition}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={Margin}
        onIndexChange={onIndexChange}
        parentRef={svgRef}
      />
    </div>
  );

  function onIndexChange(index: number) {
    const barElements = svgRef?.querySelectorAll(
      `[data-type=${DataType.BarGroup}]`,
    );

    if (!barElements) {
      return;
    }

    if (index == null) {
      barElements.forEach((element: SVGPathElement) => {
        element.style.opacity = '1';
      });
    } else {
      barElements.forEach((el: SVGPathElement) => {
        if (el.dataset.id === `${DataType.BarGroup}-${index}`) {
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0.5';
        }
      });
    }
  }

  function formatPositionForTooltip(index: number): TooltipPosition {
    if (isStacked && xScaleStacked) {
      const x = series[index].data.reduce((prev, cur) => {
        return prev + xScaleStacked(cur.rawValue);
      }, 0);

      return {
        x,
        y: groupHeight * index,
        activeIndex: index,
      };
    }

    const highestValue = highestValueForSeries[index];
    const x = xScale(highestValue);

    return {
      x: highestValue < 0 ? -x : x,
      y: groupHeight * index,
      activeIndex: index,
    };
  }

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    if (isSimple === true) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    if (eventType === 'mouse' && event) {
      const point = eventPointNative(event);

      if (point == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      const {svgY} = point;

      const currentPoint = svgY - 0;
      const currentIndex = Math.floor(currentPoint / groupHeight);

      if (currentIndex < 0 || currentIndex > series.length - 1) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      return formatPositionForTooltip(currentIndex);
    } else if (index != null) {
      return formatPositionForTooltip(index);
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}
