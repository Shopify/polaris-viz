import React, {useCallback, useMemo, useState} from 'react';

import {getSeriesColorsFromCount, useTheme} from '../../hooks';
import {TooltipContent} from '../TooltipContent';
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
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

  const {allNumbers, longestLabel, areAllAllNegative} = useDataForChart({
    series,
    isSimple,
    labelFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    const maxes: number[] = [];

    series.forEach(({data}) => {
      const values = data.map(({rawValue}) => rawValue);
      const max = areAllAllNegative ? Math.min(...values) : Math.max(...values);

      maxes.push(max);
    });

    return maxes;
  }, [series, areAllAllNegative]);

  const {xScale, xScaleStacked, ticks} = useXScale({
    allNumbers,
    isStacked,
    maxWidth: chartDimensions.width - longestLabel,
    seriesLength: series.length,
  });

  const firstNonNegativeValue = useMemo(() => {
    const value =
      ticks.find((value) => {
        return value >= 0;
      }) ?? 0;

    return xScale(value);
  }, [xScale, ticks]);

  const {
    bandwidth,
    barHeight,
    chartHeight,
    groupBarsAreaHeight,
    groupHeight,
    seriesAreaHeight,
    tallestXAxisLabel,
  } = useBarSizes({
    chartDimensions,
    isSimple: isSimple || xAxisOptions.hide,
    isStacked,
    labelFormatter,
    seriesLength: series.length,
    singleBarCount: longestSeriesCount,
    ticks,
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

  return (
    <div
      className={styles.ChartContainer}
      style={{
        width: chartDimensions.width,
        height: chartHeight,
      }}
    >
      <svg
        className={styles.SVG}
        height={chartHeight}
        ref={setSvgRef}
        role="list"
        width={chartDimensions.width}
        xmlns={XMLNS}
      >
        {isSimple || xAxisOptions.hide === true ? null : (
          <React.Fragment>
            <VerticalGridLines
              seriesAreaHeight={seriesAreaHeight}
              stroke={selectedTheme.grid.color}
              ticks={ticks}
              xScale={xScale}
            />
            <XAxisLabels
              bandwidth={bandwidth}
              color={selectedTheme.yAxis.labelColor}
              labelFormatter={labelFormatter}
              seriesAreaHeight={seriesAreaHeight}
              tallestXAxisLabel={tallestXAxisLabel}
              ticks={ticks}
              xScale={xScale}
            />
          </React.Fragment>
        )}

        <GradientDefs
          colorOverrides={seriesWithColorOverride}
          seriesColors={seriesColors}
        />

        {series.map((item, index) => {
          const {name, data} = item;
          const ariaLabel = getAriaLabel(name, index);

          if (series[index] == null) {
            return null;
          }

          const animationDelay =
            (HORIZONTAL_BAR_GROUP_DELAY * index) / series.length;

          return (
            <g
              key={name}
              data-type={DataType.BarGroup}
              data-id={`${DataType.BarGroup}-${index}`}
              style={{
                transform: `translate(${firstNonNegativeValue}px,${
                  groupHeight * index
                }px)`,
              }}
            >
              <GroupLabel
                areAllAllNegative={areAllAllNegative}
                color={selectedTheme.xAxis.labelColor}
                label={name}
              />

              {isStacked && xScaleStacked ? (
                <StackedBars
                  animationDelay={animationDelay}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  groupIndex={index}
                  series={data}
                  xScale={xScaleStacked}
                />
              ) : (
                <HorizontalBars
                  animationDelay={animationDelay}
                  areAllAllNegative={areAllAllNegative}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  firstNonNegativeValue={firstNonNegativeValue}
                  groupIndex={index}
                  isAnimated={isAnimated}
                  isSimple={isSimple}
                  labelFormatter={labelFormatter}
                  series={data}
                  theme={theme}
                  xScale={xScale}
                />
              )}
            </g>
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
