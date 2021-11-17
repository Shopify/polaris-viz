import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import {useTransition, animated} from '@react-spring/web';

import {
  GradientDefs,
  HorizontalBars,
  HorizontalStackedBars,
  GroupLabel,
} from '../shared';
import {
  getSeriesColorsFromCount,
  useDataForHorizontalChart,
  useHorizontalBarSizes,
  useHorizontalXScale,
  useTheme,
} from '../../hooks';
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
  BARS_SORT_TRANSITION_CONFIG,
} from '../../constants';
import {eventPointNative, getBarId} from '../../utilities';
import {
  ChartType,
  ColorOverrides,
  DataSeries,
  DataType,
  Dimensions,
} from '../../types';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
} from '../TooltipWrapper';
import type {TooltipData} from '../TooltipContent';

import {getAlteredHorizontalBarPosition} from './utilities';
import {VerticalGridLines, XAxisLabels} from './components';
import type {RenderTooltipContentData, XAxisOptions} from './types';
import styles from './Chart.scss';

interface ChartProps {
  isAnimated: boolean;
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  series: DataSeries[];
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  dimensions,
  isAnimated,
  renderTooltipContent,
  series,
  theme,
  type,
  xAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);
  const {labelFormatter} = xAxisOptions;

  const isStacked = type === 'stacked';

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

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

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    series,
    isSimple: false,
    isStacked,
    labelFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    const maxes: number[] = [];

    series.forEach(({data}) => {
      const values = data.map(({value}) => value);
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
      const sum = data.reduce((prev, {value}) => prev + value, 0);
      numbers.push(sum);
    });

    return Math.max(...numbers);
  }, [series, isStacked]);

  const {xScale, xScaleStacked, ticks, ticksStacked} = useHorizontalXScale({
    allNumbers,
    highestSumForStackedGroup,
    isStacked,
    maxWidth: width - longestLabel.negative - longestLabel.positive,
    longestSeriesCount,
  });

  const {
    bandwidth,
    barHeight,
    chartHeight,
    groupBarsAreaHeight,
    groupHeight,
    tallestXAxisLabel,
  } = useHorizontalBarSizes({
    chartDimensions: {width, height},
    isSimple: xAxisOptions.hide,
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

  const getTooltipMarkup = useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const data: TooltipData[] = series[activeIndex].data.map(
        ({value, key}, index) => {
          return {
            label: `${key}`,
            value: `${value}`,
            color: series[activeIndex].color ?? seriesColors[index],
          };
        },
      );

      return renderTooltipContent({data});
    },
    [series, seriesColors, renderTooltipContent],
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

  const seriesWithIndex = series.map((series, index) => ({
    series,
    index,
  }));

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
    keys: (item) => item.series.name ?? '',
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
        ref={setSvgRef}
        role="list"
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
      >
        {xAxisOptions.hide === true ? null : (
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
          width={width}
        />

        {transitions(({opacity, transform}, item, _transition, index) => {
          const name = item.series.name ?? '';
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
                <HorizontalStackedBars
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
                  isSimple={false}
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
      <TooltipWrapper
        bandwidth={groupBarsAreaHeight}
        chartDimensions={{width, height}}
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
        return prev + xScaleStacked(cur.value);
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
