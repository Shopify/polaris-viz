import React, {ReactNode, useCallback, useMemo, useState} from 'react';

import type {HorizontalTransitionStyle} from '../../hooks/useHorizontalTransitions';
import {GradientDefs, HorizontalGroup} from '../shared';
import {
  useBarChartTooltipContent,
  useDataForHorizontalChart,
  useHorizontalBarSizes,
  useHorizontalSeriesColors,
  useHorizontalStackedValues,
  useHorizontalTransitions,
  useHorizontalXScale,
  useTheme,
} from '../../hooks';
import {
  XMLNS,
  BarChartMargin as Margin,
  HORIZONTAL_BAR_GROUP_DELAY,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
} from '../../constants';
import {
  eventPointNative,
  formatDataIntoGroups,
  uniqueId,
} from '../../utilities';
import {ChartType, DataSeries, DataType, Dimensions} from '../../types';
import {
  TOOLTIP_POSITION_DEFAULT_RETURN,
  TooltipPosition,
  TooltipPositionParams,
  TooltipWrapper,
} from '../TooltipWrapper';
import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
  XAxisOptions,
} from '../BarChart';
import {AnnotationLine} from '../BarChart';

import {getAlteredHorizontalBarPosition} from './utilities';
import {VerticalGridLines, XAxisLabels} from './components';
import styles from './Chart.scss';

export interface ChartProps {
  isAnimated: boolean;
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: Dimensions;
  theme?: string;
}

export function Chart({
  annotationsLookupTable = {},
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
  const id = useMemo(() => uniqueId('HorizontalBarChart'), []);

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

  const {stackedValues, stackedMin, stackedMax} = useHorizontalStackedValues({
    isStacked,
    data,
  });

  const {xScale, ticks} = useHorizontalXScale({
    allNumbers,
    stackedMin,
    stackedMax,
    isStacked,
    maxWidth: width - longestLabel.negative - longestLabel.positive,
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
    ticks,
  });

  const getAriaLabel = useCallback(
    (seriesIndex: number) => {
      if (data[seriesIndex] == null) {
        return '';
      }

      const ariaSeries = data
        .map(({name, data}) => {
          return `${name} ${labelFormatter(data[seriesIndex].value)}`;
        })
        .join(', ');

      return `${data[0].data[seriesIndex].key}: ${ariaSeries}`;
    },
    [data, labelFormatter],
  );

  const getTooltipMarkup = useBarChartTooltipContent({
    annotationsLookupTable,
    data,
    seriesColors,
    renderTooltipContent,
  });

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
              ticks={ticks}
              xScale={xScale}
            />
            <XAxisLabels
              bandwidth={bandwidth}
              chartHeight={chartHeight}
              color={selectedTheme.xAxis.labelColor}
              labelFormatter={labelFormatter}
              tallestXAxisLabel={tallestXAxisLabel}
              ticks={ticks}
              xScale={xScale}
            />
          </React.Fragment>
        )}

        <GradientDefs
          id={id}
          seriesColors={seriesColors}
          theme={theme}
          width={isStacked ? '100%' : `${width}px`}
          gradientUnits={isStacked ? 'objectBoundingBox' : 'userSpaceOnUse'}
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
              isSimple={false}
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
        <g>
          {Object.keys(annotationsLookupTable).map((key, dataIndex) => {
            const annotation = annotationsLookupTable[Number(key)];

            if (annotation == null) {
              return null;
            }

            const xPosition = groupHeight * annotation.dataSeriesIndex;
            const xPositionValue = xPosition == null ? 0 : xPosition;
            const leftOffset = barHeight * annotation.dataPointIndex;

            const position =
              xPositionValue + HORIZONTAL_GROUP_LABEL_HEIGHT + leftOffset;

            return (
              <AnnotationLine
                barSize={barHeight}
                color={annotation.color}
                direction="horizontal"
                drawableSize={width}
                key={`annotation${dataIndex}${annotation.dataPointIndex}`}
                position={position}
                shouldAnimate={isAnimated}
                width={annotation.width}
                offset={annotation.offset}
              />
            );
          })}
        </g>
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
    if (isStacked) {
      const x = stackedValues[index].reduce((prev, cur) => {
        const [start, end] = cur;

        if (start < 0) {
          return prev;
        }

        return prev + (xScale(end) - xScale(start));
      }, xScale(0));

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
