import React, {useState, useLayoutEffect, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import type {Color, SparkChartData} from 'types';

import {useResizeObserver} from '../../hooks';
import {XMLNS} from '../../constants';

import styles from './Sparkline.scss';
import {Series} from './components';

const SVG_MARGIN = 2;

export interface Coordinates {
  x: number;
  y: SparkChartData;
}

type AreaStyle = 'none' | 'solid' | 'gradient';
type LineStyle = 'solid' | 'dashed';

export interface SingleSeries {
  data: Coordinates[];
  color?: Color;
  areaStyle?: AreaStyle;
  lineStyle?: LineStyle;
  hasPoint?: boolean;
  offsetRight?: number;
  offsetLeft?: number;
}

export interface SparklineProps {
  series: SingleSeries[];
  accessibilityLabel?: string;
  isAnimated?: boolean;
  hasSpline?: boolean;
}

export function Sparkline({
  series,
  accessibilityLabel,
  isAnimated = false,
  hasSpline = false,
}: SparklineProps) {
  const {
    ref: containerRef,
    setRef: setContainerRef,
    entry,
  } = useResizeObserver();
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});

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

  const xValues = Array.prototype.concat.apply(
    [],
    series.map(({data}) => data.map(({x}) => x)),
  );

  const minXValues = Math.min(...xValues);
  const maxXValues = Math.max(...xValues);

  const yValues = Array.prototype.concat.apply(
    [],
    series.map(({data}) => data.map(({y}) => y)),
  );

  const yScale = scaleLinear()
    .range([height - SVG_MARGIN, SVG_MARGIN])
    .domain([Math.min(...yValues), Math.max(...yValues)]);

  return (
    <div style={{width: '100%', height: '100%'}} ref={setContainerRef}>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg xmlns={XMLNS} aria-hidden width={width} height={height}>
        {series.map((singleSeries, index) => {
          const {offsetRight = 0, offsetLeft = 0} = singleSeries;

          const xScale = scaleLinear()
            .range([offsetLeft + SVG_MARGIN, width - offsetRight - SVG_MARGIN])
            .domain([minXValues, maxXValues]);

          return (
            <g key={index}>
              <Series
                xScale={xScale}
                yScale={yScale}
                series={singleSeries}
                isAnimated={isAnimated}
                height={height}
                hasSpline={hasSpline}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
