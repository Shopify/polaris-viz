import React, {useState} from 'react';
import {pie} from 'd3-shape';
import {
  clamp,
  useTheme,
  COLOR_VISION_SINGLE_ITEM,
  DEFAULT_THEME_NAME,
  useUniqueId,
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

import styles from './DonutChart.scss';
import {Arc, InnerValue} from './components';

const FULL_CIRCLE = Math.PI * 2;

export interface ChartProps {
  data: DataSeries[];
  accessibilityLabel?: string;
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  showLegend: boolean;
  isAnimated: boolean;
  total?: number;
  dimensions?: Dimensions;
  theme: string;
  labelFormatter: LabelFormatter;
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
  isAnimated,
}: ChartProps) {
  const chartId = useUniqueId('Donut');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const selectedTheme = useTheme(theme);

  const seriesCount = clamp({amount: data.length, min: 1, max: Infinity});
  const seriesColor = getSeriesColors(seriesCount, selectedTheme);

  const {height, width, legend, setLegendDimensions} = useLegend({
    data: [{series: data, shape: 'Bar'}],
    dimensions,
    showLegend,
    direction: 'vertical',
    colors: seriesColor,
  });

  const diameter = Math.min(height, width);
  const radius = diameter / 2;

  const shouldUseColorVisionEvents = Boolean(width && height);

  useColorVisionEvents(shouldUseColorVisionEvents);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveIndex(detail.index);
    },
  });

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

  if (!width || !height) return null;

  return (
    <div className={styles.DonutWrapper}>
      <div className={styles.Donut}>
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
        <svg viewBox={`-40 -40 ${diameter + 20} ${diameter + 20}`}>
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
        </svg>
        {totalValue && !emptyState && (
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
        <div
          style={{
            width: `calc(100% - ${diameter}px)`,
          }}
        >
          <LegendContainer
            onDimensionChange={setLegendDimensions}
            colorVisionType={COLOR_VISION_SINGLE_ITEM}
            data={legend}
            theme={theme}
            direction="vertical"
          />
        </div>
      )}
    </div>
  );
}
