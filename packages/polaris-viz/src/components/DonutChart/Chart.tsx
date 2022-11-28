import React, {useState, CSSProperties} from 'react';
import {pie} from 'd3-shape';
import {
  clamp,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  useUniqueId,
  Direction,
  ChartState,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  DataPoint,
  DataSeries,
  Dimensions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {estimateLegendItemWidth} from '../Legend';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {
  getSeriesColors,
  useColorVisionEvents,
  useWatchColorVisionEvents,
} from '../../hooks';
import {Arc} from '../Arc';
import type {LegendPosition, RenderLegendContent} from '../../types';
import {ChartSkeleton} from '../../components/ChartSkeleton';

import styles from './DonutChart.scss';
import {InnerValue} from './components';

const FULL_CIRCLE = Math.PI * 2;
const MAX_LEGEND_WIDTH_PERCENTAGE = 0.35;

export interface ChartProps {
  data: DataSeries[];
  accessibilityLabel?: string;
  comparisonMetric?: ComparisonMetricProps;
  showLegend: boolean;
  total?: number;
  dimensions?: Dimensions;
  labelFormatter: LabelFormatter;
  legendPosition: LegendPosition;
  state: ChartState;
  errorText?: string;
  renderLegendContent?: RenderLegendContent;
}

export function Chart({
  data,
  accessibilityLabel = '',
  comparisonMetric,
  total,
  showLegend,
  dimensions = {height: 0, width: 0},
  labelFormatter,
  legendPosition = 'right',
  state,
  errorText,
  renderLegendContent,
}: ChartProps) {
  const {shouldAnimate, characterWidths} = useChartContext();
  const chartId = useUniqueId('Donut');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const selectedTheme = useTheme();

  const seriesCount = clamp({amount: data.length, min: 1, max: Infinity});
  const seriesColor = getSeriesColors(seriesCount, selectedTheme);

  const legendDirection: Direction =
    legendPosition === 'right' || legendPosition === 'left'
      ? 'vertical'
      : 'horizontal';

  const longestLegendWidth = data.reduce((previous, current) => {
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
      data: [{series: data, shape: 'Bar'}],
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

  const styleMap: {[key: string]: CSSProperties} = {
    top: {
      flexDirection: 'column-reverse',
    },
    bottom: {
      flexDirection: 'column',
    },
    right: {
      flexDirection: 'row',
    },
    left: {
      flexDirection: 'row-reverse',
    },
    'top-left': {
      flexDirection: 'row-reverse',
      alignItems: 'start',
    },
    'top-right': {
      flexDirection: 'row',
      alignItems: 'start',
    },
    'bottom-right': {
      flexDirection: 'row',
      alignItems: 'end',
    },
    'bottom-left': {
      flexDirection: 'row-reverse',
      alignItems: 'end',
    },
  };

  if (!width || !height) return null;
  const diameter = Math.min(height, width);
  const radius = diameter / 2;

  const points: DataPoint[] = data.reduce(
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

  return (
    <div className={styles.DonutWrapper} style={styleMap[legendPosition]}>
      <div className={styles.Donut}>
        {state === ChartState.Success ? (
          <React.Fragment>
            <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
            <svg
              viewBox={`-40 -40 ${diameter + 20} ${diameter + 20}`}
              height={diameter}
              width={diameter}
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
                        const color = data[index]?.color ?? seriesColor[index];
                        const name = data[index].name;
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
              isAnimated={shouldAnimate}
              totalValue={totalValue}
              comparisonMetric={comparisonMetric}
              labelFormatter={labelFormatter}
            />
          </React.Fragment>
        ) : (
          <ChartSkeleton
            dimensions={{width: diameter, height: diameter}}
            state={state}
            type="Donut"
            errorText={errorText}
          />
        )}
      </div>
      {showLegend && (
        <LegendContainer
          onDimensionChange={setLegendDimensions}
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          direction={legendDirection}
          position={legendPosition}
          maxWidth={maxLegendWidth}
          renderLegendContent={renderLegendContent}
        />
      )}
    </div>
  );
}
