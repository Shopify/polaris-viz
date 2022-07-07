import React, {useState} from 'react';
import {pie} from 'd3-shape';
import {
  clamp,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  DEFAULT_THEME_NAME,
  useUniqueId,
  DEFAULT_CHART_PROPS,
  Direction,
} from '@shopify/polaris-viz-core';
import type {
  DataPoint,
  DataSeries,
  Dimensions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import type {ComparisonMetricProps} from '../ComparisonMetric';
import {LegendContainer, useLegend} from '../../components/LegendContainer';
import {
  getSeriesColors,
  useColorVisionEvents,
  useWatchColorVisionEvents,
} from '../../hooks';
import {Arc} from '../Arc';
import type {LegendPosition} from '../../types';

import styles from './DonutChart.scss';
import {InnerValue} from './components';

const FULL_CIRCLE = Math.PI * 2;

export interface ChartProps {
  data: DataSeries[];
  accessibilityLabel?: string;
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  showLegend: boolean;
  isAnimated?: boolean;
  total?: number;
  dimensions?: Dimensions;
  theme?: string;
  labelFormatter: LabelFormatter;
  legendPosition: LegendPosition;
}

export function Chart({
  data,
  accessibilityLabel = '',
  comparisonMetric,
  total,
  showLegend,
  dimensions = {height: 0, width: 0},
  theme = DEFAULT_THEME_NAME,
  labelFormatter,
  isAnimated = DEFAULT_CHART_PROPS.isAnimated,
  legendPosition = 'right',
}: ChartProps) {
  const chartId = useUniqueId('Donut');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const selectedTheme = useTheme(theme);

  const seriesCount = clamp({amount: data.length, min: 1, max: Infinity});
  const seriesColor = getSeriesColors(seriesCount, selectedTheme);

  const legendDirection: Direction =
    legendPosition === 'right' || legendPosition === 'left'
      ? 'vertical'
      : 'horizontal';

  const {height, width, legend, setLegendDimensions, isLegendMounted} =
    useLegend({
      data: [{series: data, shape: 'Bar'}],
      dimensions,
      showLegend,
      direction: legendDirection,
      colors: seriesColor,
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

  const styleMap = {
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
                    isAnimated={isAnimated}
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
                          isAnimated={isAnimated}
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
        {totalValue && !emptyState && isLegendMounted && (
          <InnerValue
            isAnimated={isAnimated}
            selectedTheme={selectedTheme}
            totalValue={totalValue}
            comparisonMetric={comparisonMetric}
            labelFormatter={labelFormatter}
          />
        )}
      </div>
      {showLegend && (
        <LegendContainer
          onDimensionChange={setLegendDimensions}
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          theme={theme}
          direction={legendDirection}
          position={legendPosition}
        />
      )}
    </div>
  );
}
