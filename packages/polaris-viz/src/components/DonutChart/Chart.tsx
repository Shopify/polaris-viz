import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {useResizeObserver} from '../../hooks'; // in chart container
import {classNames} from '../../utilities';
import {useDebouncedCallback} from 'use-debounce';
import {pie} from 'd3-shape';

import {ComparisonMetric} from 'components/ComparisonMetric';
import {Arc} from './components'; // Import from polaris viz
import type {ArcData} from './types';
import styles from './DonutChart.scss';

export interface DonutChartProps {
  data: ArcData[];
  accessibilityLabel: string;
  activeArcId?: number | null;
  comparisonMetric?: number;
  total?: number;
  valueFormatter?(value: number): string;
  onHover?(data: ArcData): void;
  onBlur?(data: ArcData): void;
  dimensions: any;
}

export function Chart({
  data,
  activeArcId = null,
  accessibilityLabel,
  onHover,
  onBlur,
  valueFormatter,
  comparisonMetric,
  total,
  dimensions,
}: DonutChartProps) {
  const {width, height} = dimensions;
  const radius = Math.min(width, height) / 2;

  const createPie = pie<ArcData>()
    .value(({value}) => value)
    .sort(null);
  const pieChartData = createPie(data);
  const emptyState = pieChartData.length === 0;

  const totalValue = total || data.reduce((acc, {value}) => value + acc, 0);
  const formattedValue = valueFormatter
    ? valueFormatter(totalValue)
    : String(totalValue);

  return (
    <div className={styles.Donut}>
      <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      <svg aria-hidden width={width} height={height}>
        <g transform={`translate(${radius} ${radius})`}>
          {emptyState ? (
            <g aria-hidden>
              <Arc
                data={{id: 0, label: '', value: 0, color: 'sky'}}
                width={width}
                height={height}
                radius={radius}
                tabIndex={-1}
                startAngle={0}
                endAngle={Math.PI * 2}
                accessibilityLabel={accessibilityLabel}
              />
            </g>
          ) : (
            pieChartData.map(({data, startAngle, endAngle}) => {
              const {id} = data;

              return (
                <g key={`${id}-${startAngle}-${endAngle}`}>
                  <Arc
                    width={width}
                    height={height}
                    data={data}
                    radius={radius}
                    tabIndex={0}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    valueFormatter={valueFormatter}
                    accessibilityLabel={accessibilityLabel}
                    isOnlySegment={pieChartData.length === 1}
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
          <p className={classNames(styles.ContentValue)}>{formattedValue}</p>
          {comparisonMetric === undefined ||
          comparisonMetric === Infinity ? null : (
            <div className={styles.ComparisonMetric}>
              {/* <ComparisonMetric percentage={comparisonMetric} /> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
