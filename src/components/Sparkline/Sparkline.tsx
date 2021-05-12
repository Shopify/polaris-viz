import React, {useState, useLayoutEffect, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import {Color} from 'types';

import {useResizeObserver} from '../../hooks';

import styles from './Sparkline.scss';
import {Series} from './components';

const SVG_MARGIN = 2;

export interface Coordinates {
  x: number;
  y: number;
}

type AreaStyle = 'none' | 'solid' | 'gradient';
type LineStyle = 'solid' | 'dashed';

export interface SingleSeries {
  data: Coordinates[];
  color?: Color;
  areaStyle?: AreaStyle;
  lineStyle?: LineStyle;
  hasPoint?: boolean;
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
      window
        .matchMedia('print')
        .addEventListener('change', handlePrintMediaQueryChange);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', () => updateMeasurements());
        window
          .matchMedia('print')
          .removeEventListener('change', handlePrintMediaQueryChange);
      }
    };
  }, [entry, containerRef, updateMeasurements, handlePrintMediaQueryChange]);

  const {width, height} = svgDimensions;

  const xValues = Array.prototype.concat.apply(
    [],
    series.map(({data}) => data.map(({x}) => x)),
  );
  const xScale = scaleLinear()
    .range([SVG_MARGIN, width - SVG_MARGIN])
    .domain([Math.min(...xValues), Math.max(...xValues)]);

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

      <svg aria-hidden width={width} height={height}>
        {series.map((singleSeries, index) => {
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
