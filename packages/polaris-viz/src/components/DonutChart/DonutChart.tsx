import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {useResizeObserver} from '@shopify/resize-observer'; // in chart container
import {classNames} from '../../utilities';
import {useDebouncedCallback} from 'use-debounce';
import {pie} from 'd3-shape';

import {Arc, ComparisonMetric} from './components'; // Import from polaris viz
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
}

export function DonutChart({
  data,
  activeArcId = null,
  accessibilityLabel,
  onHover,
  onBlur,
  valueFormatter,
  comparisonMetric,
  total,
}: DonutChartProps) {
  const [setContainerRef, entry] = useResizeObserver();
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const [activeArc, setActiveArc] = useState<number | null>(activeArcId);
  useEffect(() => {
    setActiveArc(activeArcId);
  }, [activeArcId]);

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (entry == null) return;

    setSvgDimensions({
      height: entry.contentRect.height,
      width: entry.contentRect.width,
    });
  }, 10);

  const handlePrintMediaQueryChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches && entry != null) {
        setSvgDimensions({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
        });
      }
    },
    [entry],
  );

  useLayoutEffect(() => {
    if (entry == null) return;

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
  }, [entry, updateMeasurements, handlePrintMediaQueryChange]);

  const {width, height} = svgDimensions;
  const radius = Math.min(width, height) / 2;

  const handleHover = useCallback(
    (data: ArcData) => {
      setActiveArc(data.id);
      onHover?.(data);
    },
    [onHover],
  );

  const handleBlur = useCallback(
    (data: ArcData) => {
      setActiveArc(null);
      onBlur?.(data);
    },
    [onBlur],
  );

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
    <div className={styles.Donut} ref={setContainerRef}>
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
              const isActiveArc = activeArc === id;
              const shouldDimArc = activeArc === null ? false : !isActiveArc;

              return (
                <g
                  key={`${id}-${startAngle}-${endAngle}`}
                  role={isActiveArc ? 'listitem' : undefined}
                  aria-hidden={!isActiveArc}
                >
                  <Arc
                    dimmed={shouldDimArc}
                    width={width}
                    height={height}
                    data={data}
                    radius={radius}
                    tabIndex={0}
                    role={isActiveArc ? 'img' : undefined}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    onHover={handleHover}
                    onBlur={handleBlur}
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
              <ComparisonMetric percentage={comparisonMetric} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
