import React from 'react';
import {pie} from 'd3-shape';
import {clamp, useTheme} from '@shopify/polaris-viz-core';
import type {
  DataPoint,
  DataSeries,
  Dimensions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {classNames} from '../../utilities';
import {ComparisonMetric, ComparisonMetricProps} from '../ComparisonMetric';
import {getSeriesColors} from '../../hooks';
import {LegendContainer} from '../../components/LegendContainer';

import styles from './DonutChart.scss';
import {Arc} from './components';

const FULL_CIRCLE = Math.PI * 2;

export interface ChartProps {
  data: DataSeries[];
  accessibilityLabel?: string;
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  total?: number;
  dimensions?: Dimensions;
  theme?: string;
  labelFormatter: LabelFormatter;
}

export function Chart({
  data,
  accessibilityLabel = '',
  comparisonMetric,
  total,
  dimensions = {height: 0, width: 0},
  theme,
  labelFormatter,
}: ChartProps) {
  const {width, height} = dimensions;
  const diameter = Math.min(width, height);
  const radius = diameter / 2;
  const selectedTheme = useTheme(theme);
  const seriesCount = clamp({amount: data.length, min: 1, max: Infinity});
  const seriesColor = getSeriesColors(seriesCount, selectedTheme);
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

  const formattedValue = labelFormatter(totalValue);

  const legendData = data.map(({name, color, isComparison}, index) => ({
    name: name ?? '',
    color: color ?? seriesColor[index],
    isComparison,
  }));

  return (
    <div className={styles.DonutWrapper}>
      <div
        className={styles.Donut}
        style={{
          width: diameter,
          height: diameter,
        }}
      >
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
        <svg aria-hidden width={width} height={height}>
          <g transform={`translate(${radius} ${radius})`}>
            {emptyState ? (
              <g aria-hidden>
                <Arc
                  width={width}
                  height={height}
                  radius={radius}
                  startAngle={0}
                  endAngle={FULL_CIRCLE}
                  color={selectedTheme.grid.color}
                  cornerRadius={selectedTheme.arc.cornerRadius}
                  thickness={selectedTheme.arc.thickness}
                />
              </g>
            ) : (
              pieChartData.map(({data, startAngle, endAngle}, index) => {
                const {key} = data;

                return (
                  <g key={`${key}-${startAngle}-${endAngle}`}>
                    <Arc
                      width={width}
                      height={height}
                      radius={radius}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      color={seriesColor[index]}
                      cornerRadius={selectedTheme.arc.cornerRadius}
                      thickness={selectedTheme.arc.thickness}
                    />
                  </g>
                );
              })
            )}
          </g>
        </svg>

        {formattedValue && !emptyState && (
          <div
            className={classNames(
              styles.ContentWrapper,
              comparisonMetric && styles.ContentWrapperWithComparison,
            )}
          >
            <p
              className={classNames(styles.ContentValue)}
              style={{color: selectedTheme.xAxis.labelColor}}
            >
              {formattedValue}
            </p>
            {comparisonMetric != null && (
              <div className={styles.ComparisonMetric}>
                <ComparisonMetric
                  metric={comparisonMetric.metric}
                  trend={comparisonMetric.trend}
                  theme={selectedTheme.legend}
                  accessibilityLabel="accessibility-label"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div
        style={{
          width: `calc(100% - ${diameter}px)`,
        }}
      >
        <LegendContainer
          onHeightChange={() => {}}
          colorVisionType={null}
          data={legendData}
        />
      </div>
    </div>
  );
}
