import React, {ReactNode, useCallback, useMemo, useState} from 'react';

import type {HorizontalTransitionStyle} from '../../hooks/useHorizontalTransitions';
import {GradientDefs, HorizontalGroup} from '../shared';
import {
  useDataForHorizontalChart,
  useHorizontalBarSizes,
  useHorizontalSeriesColors,
  useHorizontalTransitions,
  useHorizontalXScale,
  useTheme,
} from '../../hooks';
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
} from '../../constants';
import {
  eventPointNative,
  formatDataIntoGroups,
  getHighestSumForStacked,
  uniqueId,
} from '../../utilities';
import {ChartType, DataSeries, DataType, Dimensions} from '../../types';
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

export interface ChartProps {
  isAnimated: boolean;
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  data,
  dimensions,
  isAnimated,
  renderTooltipContent,
  theme,
  type,
  xAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);
  const {labelFormatter} = xAxisOptions;
  const id = uniqueId('HorizontalBarChart');

  const isStacked = type === 'stacked';

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const {longestSeriesCount, seriesColors} = useHorizontalSeriesColors({
    data,
    theme,
  });

  const {allNumbers, longestLabel, areAllNegative} = useDataForHorizontalChart({
    data,
    isSimple: false,
    isStacked,
    labelFormatter,
  });

  const highestValueForSeries = useMemo(() => {
    const groups = formatDataIntoGroups(data);

    const maxes = groups.map((numbers) => {
      const values = numbers.map((value) => value).filter(Boolean) as number[];

      if (values.length === 0) {
        return 0;
      }

      return areAllNegative ? Math.min(...values) : Math.max(...values);
    });

    return maxes;
  }, [data, areAllNegative]);

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
    longestSeriesCount: data.length,
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

  const getTooltipMarkup = useCallback(
    (activeIndex: number) => {
      if (activeIndex === -1) {
        return null;
      }

      const tooltipData: TooltipData[] = data.map(
        ({name, data, color}, index) => {
          const {value} = data[activeIndex];

          return {
            label: `${name}`,
            value: `${value}`,
            color: color ?? seriesColors[index],
          };
        },
      );

      return renderTooltipContent({data: tooltipData});
    },
    [data, seriesColors, renderTooltipContent],
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

        <GradientDefs seriesColors={seriesColors} theme={theme} width={width} />

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
              isSimple={false}
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
      const x = data.reduce((prev, cur) => {
        const value = cur.data[index].value;

        if (value == null) {
          return prev;
        }

        return prev + xScaleStacked(value);
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

      if (currentIndex < 0 || currentIndex > longestSeriesCount - 1) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      return formatPositionForTooltip(currentIndex);
    } else if (index != null) {
      return formatPositionForTooltip(index);
    }

    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }
}
