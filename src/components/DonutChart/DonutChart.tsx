import React, {useState, useLayoutEffect, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {pie} from 'd3-shape';
import type {NumberLabelFormatter} from 'types';

import {ComparisonMetric} from '../../components/ComparisonMetric';
import {useResizeObserver} from '../../hooks';

import {Arc, ArcData, DonutTooltip} from './components';
import styles from './DonutChart.scss';

export type SortOptions = 'asc' | 'desc' | 'none';

export interface DonutChartProps {
  data: ArcData[];
  accessibilityLabel?: string;
  sort?: SortOptions;
  valueFormatter?: NumberLabelFormatter;
  onHover?(data: ArcData): void;
  onBlur?(): void;
  hideTooltip?: boolean;
  comparisonMetric?: number;
}

export function DonutChart({
  data,
  accessibilityLabel,
  onHover,
  onBlur,
  sort = 'asc',
  valueFormatter,
  hideTooltip = false,
  comparisonMetric,
}: DonutChartProps) {
  const {
    ref: containerRef,
    setRef: setContainerRef,
    entry,
  } = useResizeObserver();
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const [activeArc, setActiveArc] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (containerRef == null) return;

    setSvgDimensions({
      height: containerRef.clientHeight,
      width: containerRef.clientWidth,
    });
  }, 10);

  const handlePrintMediaQueryChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches && containerRef != null) {
        setSvgDimensions({
          height: containerRef.clientHeight,
          width: containerRef.clientWidth,
        });
      }
    },
    [containerRef],
  );

  useLayoutEffect(() => {
    if (entry == null) return;

    if (containerRef == null) return;

    updateMeasurements();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', () => updateMeasurements());

      if (typeof window.matchMedia('print').addEventListener === 'function') {
        window
          .matchMedia('print')
          .addEventListener('change', handlePrintMediaQueryChange);
      } else if (typeof window.matchMedia('print').addListener === 'function') {
        window.matchMedia('print').addListener(handlePrintMediaQueryChange);
      }
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', () => updateMeasurements());

        if (typeof window.matchMedia('print').addEventListener === 'function') {
          window
            .matchMedia('print')
            .removeEventListener('change', handlePrintMediaQueryChange);
        } else if (
          typeof window.matchMedia('print').addListener === 'function'
        ) {
          window
            .matchMedia('print')
            .removeListener(handlePrintMediaQueryChange);
        }
      }
    };
  }, [entry, containerRef, updateMeasurements, handlePrintMediaQueryChange]);

  const {width, height} = svgDimensions;
  const radius = Math.min(width, height) / 2;

  const handleHover = useCallback(
    (data: ArcData, index: number, x: number, y: number) => {
      setActiveArc(index);
      onHover?.(data);
      setTooltipPosition({
        x: x + radius,
        y: y + radius,
      });
    },
    [onHover, radius],
  );

  const handleBlur = useCallback(() => {
    setActiveArc(null);
    onBlur?.();
  }, [onBlur]);

  const createPieChartSortFn = (() => {
    switch (sort) {
      case 'asc':
        return ({value: valueA}: ArcData, {value: valueB}: ArcData) =>
          valueA - valueB;
      case 'desc':
        return ({value: valueA}: ArcData, {value: valueB}: ArcData) =>
          valueB - valueA;
      default:
        return () => 0;
    }
  })();

  const pieChart = pie<ArcData>()
    .value(({value}) => value)
    // Sorts the printed arcs and also the series array.
    // This allows screen readers to read in the desired order.
    .sort(createPieChartSortFn)(data.sort(createPieChartSortFn));
  const emptyState = pieChart.length === 0;

  const totalValue = data.reduce((acc, {value}) => value + acc, 0);
  const formattedValue = valueFormatter
    ? valueFormatter(totalValue)
    : String(totalValue);

  return (
    <div className={styles.Donut} ref={setContainerRef}>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg aria-hidden width={width} height={height}>
        <g transform={`translate(${radius} ${radius})`}>
          {emptyState ? (
            <g aria-hidden>
              <Arc
                index={0}
                data={{label: '', value: 0, color: 'colorSky'}}
                radius={radius}
                tabIndex={-1}
                startAngle={0}
                endAngle={Math.PI * 2}
              />
            </g>
          ) : (
            pieChart.map(({data, startAngle, endAngle}, index) => {
              const shouldDimArc =
                activeArc !== null ? index !== activeArc : false;
              const isActiveArc = activeArc === index;

              return (
                <g
                  key={index}
                  role={isActiveArc ? 'listitem' : undefined}
                  aria-hidden={!isActiveArc}
                >
                  <Arc
                    index={index}
                    dimmed={shouldDimArc}
                    data={data}
                    radius={radius}
                    tabIndex={0}
                    role={isActiveArc ? 'img' : undefined}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    onHover={handleHover}
                    onBlur={handleBlur}
                    valueFormatter={valueFormatter}
                  />
                </g>
              );
            })
          )}
        </g>
      </svg>

      {formattedValue && !emptyState && (
        <div className={styles.ContentWrapper}>
          <div className={styles.ContentValue}>{formattedValue}</div>
          {comparisonMetric && (
            <div className={styles.ComparisonMetric}>
              <ComparisonMetric
                metric={String(Math.abs(comparisonMetric))}
                trend={comparisonMetric > 0 ? 'positive' : 'negative'}
                accessibilityLabel="label"
              />
            </div>
          )}
        </div>
      )}

      {!hideTooltip &&
      !emptyState &&
      tooltipPosition != null &&
      activeArc != null ? (
        <DonutTooltip
          activePointIndex={activeArc}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={{
            width,
            height,
          }}
          label={data[activeArc].label}
          value={
            valueFormatter
              ? valueFormatter(data[activeArc].value)
              : String(data[activeArc].value)
          }
        />
      ) : null}
    </div>
  );
}
