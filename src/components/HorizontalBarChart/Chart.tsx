import React, {useCallback, useMemo, useState} from 'react';

import {TooltipContent} from '../TooltipContent';
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
} from '../../constants';
import {useTheme, useThemeSeriesColors} from '../../hooks';
import {eventPointNative} from '../../utilities';
import {DataType, Dimensions} from '../../types';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipHorizontalOffset,
  TooltipPosition,
  TooltipPositionParams,
  TooltipVerticalOffset,
  TooltipWrapper,
  TOOLTIP_MARGIN,
} from '../TooltipWrapper';

import {getAlteredHorizontalBarPosition} from './utilities';
import {
  GradientDefs,
  GroupLabel,
  HorizontalBars,
  StackedBars,
  VerticalGridLines,
  XAxisLabels,
} from './components';
import type {Series, XAxisOptions, YAxisOptions} from './types';
import {useBarSizes, useDataForChart, useXScale} from './hooks';
import styles from './Chart.scss';

const TOOLTIP_POSITION = {
  horizontal: TooltipHorizontalOffset.Right,
  vertical: TooltipVerticalOffset.Above,
};

interface ChartProps {
  chartDimensions: Dimensions;
  isAnimated: boolean;
  isSimple: boolean;
  isStacked: boolean;
  series: Series[];
  xAxisOptions: XAxisOptions;
  yAxisOptions: YAxisOptions;
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
  yAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);
  const {labelFormatter} = xAxisOptions;

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const colorsForSeriesColors = useMemo(() => {
    return series[0].data.map(({color}) => {
      return {
        color,
      };
    });
  }, [series]);

  const seriesColors = useThemeSeriesColors(
    colorsForSeriesColors,
    selectedTheme,
  );

  const {allNumbers, longestLabel, areAllAllNegative} = useDataForChart({
    series,
    isSimple,
    labelFormatter,
  });

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

  const {barHeight, groupHeight, groupBarsAreaHeight, chartHeight, bandwidth} =
    useBarSizes({
      chartDimensions,
      isSimple,
      isStacked,
      singleBarCount: series[0].data.length,
      seriesLength: series.length,
      ticksCount: ticks.length,
    });

  const getAriaLabel = useCallback(
    (label: string, seriesIndex: number) => {
      const ariaSeries = series[seriesIndex].data
        .map(({rawValue}, index) => {
          return `${yAxisOptions.labels[index]} ${labelFormatter(rawValue)}`;
        })
        .join(', ');

      return `${label}: ${ariaSeries}`;
    },
    [series, yAxisOptions.labels, labelFormatter],
  );

  const getTooltipMarkup = useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const data = series[activeIndex].data.map(({rawValue}, index) => {
        return {
          label: yAxisOptions.labels[index],
          value: labelFormatter(rawValue),
          color: seriesColors[index],
        };
      });

      return <TooltipContent data={data} theme={theme} />;
    },
    [series, seriesColors, yAxisOptions, labelFormatter, theme],
  );

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
        {isSimple ?? xAxisOptions.hide === true ? null : (
          <React.Fragment>
            <VerticalGridLines
              ticks={ticks}
              chartHeight={chartHeight}
              xScale={xScale}
              stroke={selectedTheme.grid.color}
            />
            <XAxisLabels
              bandwidth={bandwidth}
              chartHeight={chartHeight}
              color={selectedTheme.yAxis.labelColor}
              labelFormatter={labelFormatter}
              ticks={ticks}
              xScale={xScale}
            />
          </React.Fragment>
        )}

        <GradientDefs seriesColors={seriesColors} />

        {series.map((item, index) => {
          const {label} = item;
          const ariaLabel = getAriaLabel(label, index);

          if (series[index] == null) {
            return null;
          }

          const animationDelay =
            (HORIZONTAL_BAR_GROUP_DELAY * index) / series.length;

          return (
            <g
              key={item.label}
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
                label={label}
              />

              {isStacked && xScaleStacked ? (
                <StackedBars
                  animationDelay={animationDelay}
                  ariaLabel={ariaLabel}
                  barHeight={barHeight}
                  groupIndex={index}
                  series={item.data}
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
                  series={item.data}
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
        x: x + TOOLTIP_MARGIN,
        y: groupHeight * index,
        position: TOOLTIP_POSITION,
        activeIndex: index,
      };
    }

    const values = series[index].data.map(({rawValue}) => rawValue);
    const highestValue = areAllAllNegative
      ? Math.min(...values)
      : Math.max(...values);

    const x = xScale(highestValue);

    return {
      x: highestValue < 0 ? -x : x,
      y: groupHeight * index,
      position: TOOLTIP_POSITION,
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
