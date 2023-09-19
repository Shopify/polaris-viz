import type {ReactNode} from 'react';
import {Fragment, useRef, useState} from 'react';
import {pie} from 'd3-shape';
import {
  clamp,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  useUniqueId,
  ChartState,
  useChartContext,
  DataType,
  ChartMargin,
} from '@shopify/polaris-viz-core';
import type {
  DataPoint,
  DataSeries,
  Dimensions,
  LabelFormatter,
  Direction,
  BoundingRect,
} from '@shopify/polaris-viz-core';

import {useDonutChartTooltipContents} from '../../hooks/useDonutChartTooltipContents';
import type {
  TooltipPosition,
  TooltipPositionParams,
} from '../../components/TooltipWrapper';
import {
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../../components/TooltipWrapper';
import {DONUT_CHART_MAX_SERIES_COUNT} from '../../constants';
import {
  eventPointNative,
  getContainerAlignmentForLegend,
} from '../../utilities';
import {estimateLegendItemWidth} from '../Legend';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {
  getSeriesColors,
  useColorVisionEvents,
  useWatchColorVisionEvents,
} from '../../hooks';
import {Arc} from '../Arc';
import type {
  LegendPosition,
  RenderInnerValueContent,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {ChartSkeleton} from '../../components/ChartSkeleton';

import styles from './DonutChart.scss';
import {InnerValue} from './components';

const ERROR_ANIMATION_PADDING = 40;
const FULL_CIRCLE = Math.PI * 2;
const MAX_LEGEND_WIDTH_PERCENTAGE = 0.35;
const RADIUS_PADDING = 20;

export interface ChartProps {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
  legendPosition: LegendPosition;
  showLegend: boolean;
  state: ChartState;
  theme: string;
  accessibilityLabel?: string;
  comparisonMetric?: ComparisonMetricProps;
  dimensions?: Dimensions;
  errorText?: string;
  legendFullWidth?: boolean;
  renderInnerValueContent?: RenderInnerValueContent;
  renderLegendContent?: RenderLegendContent;
  renderTooltipContent?: (data: RenderTooltipContentData) => ReactNode;
  total?: number;
}

export function Chart({
  data,
  labelFormatter,
  legendPosition = 'right',
  showLegend,
  state,
  theme,
  accessibilityLabel = '',
  comparisonMetric,
  dimensions = {height: 0, width: 0},
  errorText,
  legendFullWidth = false,
  renderInnerValueContent,
  renderLegendContent,
  renderTooltipContent,
  total,
}: ChartProps) {
  const {shouldAnimate, characterWidths} = useChartContext();
  const chartId = useUniqueId('Donut');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const selectedTheme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  const seriesCount = clamp({
    amount: data.length,
    min: 1,
    max: DONUT_CHART_MAX_SERIES_COUNT,
  });

  const seriesColor = getSeriesColors(seriesCount, selectedTheme);

  const chartBounds: BoundingRect = {
    width: dimensions.width,
    height: dimensions.height,
    x: 0,
    y: 0,
  };

  const getTooltipMarkup = useDonutChartTooltipContents({
    renderTooltipContent,
    data,
    seriesColors: seriesColor,
  });

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    if (eventType === 'mouse') {
      const point = eventPointNative(event!);

      if (point == null) {
        return TOOLTIP_POSITION_DEFAULT_RETURN;
      }

      return {
        x: (event as MouseEvent).pageX,
        y: (event as MouseEvent).pageY,
        activeIndex,
      };
    } else {
      const activeIndex = index ?? 0;

      return {
        x: dimensions?.width ?? 0,
        y: dimensions?.height ?? 0,
        activeIndex,
      };
    }
  }

  const seriesData = data
    .filter(({data}) => Number(data[0]?.value) > 0)
    .sort(
      (current, next) =>
        Number(next.data[0].value) - Number(current.data[0].value),
    )
    .slice(0, seriesCount);

  const legendDirection: Direction =
    legendPosition === 'right' || legendPosition === 'left'
      ? 'vertical'
      : 'horizontal';

  const longestLegendWidth = seriesData.reduce((previous, current) => {
    const estimatedLegendWidth = estimateLegendItemWidth(
      current.name ?? '',
      characterWidths,
    );

    if (estimatedLegendWidth > previous) {
      return estimatedLegendWidth;
    }

    return previous;
  }, 0);

  const maxLegendWidth =
    legendDirection === 'vertical'
      ? Math.min(
          longestLegendWidth,
          dimensions.width * MAX_LEGEND_WIDTH_PERCENTAGE,
        )
      : 0;

  const {height, width, legend, setLegendDimensions, isLegendMounted} =
    useLegend({
      data: [{series: seriesData, shape: 'Bar'}],
      dimensions,
      showLegend,
      direction: legendDirection,
      colors: seriesColor,
      maxWidth: maxLegendWidth,
    });

  const shouldUseColorVisionEvents = Boolean(
    width && height && isLegendMounted,
  );

  useColorVisionEvents(shouldUseColorVisionEvents);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

  if (!width || !height) return null;
  const diameter = Math.min(height, width);
  const radius = diameter / 2;

  const points: DataPoint[] = seriesData.reduce(
    (prev: DataPoint[], {data}) => prev.concat(data),
    [],
  );

  const createPie = pie<DataPoint>()
    .value(({value}) => value!)
    .sort(null);
  const pieChartData = createPie(points);

  const emptyState = pieChartData.length === 0;

  const totalValue =
    total || points.reduce((acc, {value}) => (value ?? 0) + acc, 0);

  const activeValue = points[activeIndex]?.value;

  const minX = -(40 + ERROR_ANIMATION_PADDING);
  const minY = -40;
  const viewBoxDimensions = {
    height: diameter + RADIUS_PADDING,
    width: diameter + RADIUS_PADDING - minX,
  };

  const containerAlignmentStyle =
    getContainerAlignmentForLegend(legendPosition);

  return (
    <div className={styles.DonutWrapper} style={containerAlignmentStyle}>
      <div className={styles.Donut}>
        {state === ChartState.Success ? (
          <Fragment>
            <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
            <svg
              viewBox={`${minX} ${minY} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
              height={diameter}
              width={diameter}
              ref={svgRef}
            >
              {isLegendMounted && (
                <g className={styles.DonutChart}>
                  {emptyState ? (
                    <g aria-hidden>
                      <Arc
                        isAnimated={shouldAnimate}
                        width={diameter}
                        height={diameter}
                        radius={radius}
                        startAngle={0}
                        endAngle={FULL_CIRCLE}
                        color={selectedTheme.grid.color}
                        cornerRadius={selectedTheme.arc.cornerRadius}
                        thickness={selectedTheme.arc.thickness}
                      />
                    </g>
                  ) : (
                    pieChartData.map(
                      ({data: pieData, startAngle, endAngle}, index) => {
                        const color =
                          seriesData[index]?.color ?? seriesColor[index];
                        const name = seriesData[index].name;
                        const accessibilityLabel = `${name}: ${pieData.key} - ${pieData.value}`;

                        return (
                          <g
                            key={`${chartId}-arc-${index}`}
                            className={styles.DonutChart}
                            aria-label={accessibilityLabel}
                            role="img"
                          >
                            <Arc
                              isAnimated={shouldAnimate}
                              index={index}
                              activeIndex={activeIndex}
                              width={diameter}
                              height={diameter}
                              radius={radius}
                              startAngle={startAngle}
                              endAngle={endAngle}
                              color={color}
                              cornerRadius={selectedTheme.arc.cornerRadius}
                              thickness={selectedTheme.arc.thickness}
                            />
                          </g>
                        );
                      },
                    )
                  )}
                </g>
              )}
            </svg>
            <InnerValue
              activeValue={activeValue}
              isAnimated={shouldAnimate}
              totalValue={totalValue}
              comparisonMetric={comparisonMetric}
              labelFormatter={labelFormatter}
              renderInnerValueContent={renderInnerValueContent}
            />
          </Fragment>
        ) : (
          <ChartSkeleton
            dimensions={{width: diameter, height: diameter}}
            state={state}
            type="Donut"
            errorText={errorText}
            theme={theme}
          />
        )}
      </div>
      {showLegend && (
        <LegendContainer
          fullWidth={legendFullWidth}
          onDimensionChange={setLegendDimensions}
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          direction={legendDirection}
          position={legendPosition}
          maxWidth={maxLegendWidth}
          renderLegendContent={renderLegendContent}
        />
      )}
      <TooltipWrapper
        alwaysUpdatePosition
        chartBounds={chartBounds}
        focusElementDataType={DataType.Point}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={ChartMargin}
        parentRef={svgRef.current}
        usePortal
      />
    </div>
  );
}
