import React, {useState, useLayoutEffect, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import type {Color, LineStyle} from 'types';

import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import {useResizeObserver, useTheme} from '../../hooks';
import {XMLNS} from '../../constants';

import styles from './Sparkline.scss';
import {Series} from './components';

const SVG_MARGIN = 2;

export interface Coordinates {
  x: number;
  y: number | null;
}

export interface SingleSeries {
  data: Coordinates[];
  color?: Color;
  area?: Color;
  lineStyle?: LineStyle;
  hasPoint?: boolean;
  offsetRight?: number;
  offsetLeft?: number;
}

export interface SparklineProps {
  series: SingleSeries[];
  accessibilityLabel?: string;
  isAnimated?: boolean;
  theme?: string;
}

export function Sparkline({
  series,
  accessibilityLabel,
  isAnimated = false,
  theme,
}: SparklineProps) {
  const {
    ref: containerRef,
    setRef: setContainerRef,
    entry,
  } = useResizeObserver();
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(series, selectedTheme);

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
          height: entry.contentRect.width,
          width: entry.contentRect.height,
        });
      }
    },
    [entry],
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
    <div
      ref={setContainerRef}
      className={styles.Container}
      style={{
        background: selectedTheme.chartContainer.backgroundColor,
        padding: selectedTheme.chartContainer.padding,
        borderRadius: selectedTheme.chartContainer.borderRadius,
      }}
    >
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg xmlns={XMLNS} aria-hidden width={width} height={height}>
        {series.map((singleSeries, index) => {
          const {
            lineStyle = selectedTheme.line.style,
            hasPoint = selectedTheme.line.hasPoint,
            offsetRight = 0,
            offsetLeft = 0,
          } = singleSeries;

          const xScale = scaleLinear()
            .range([offsetLeft + SVG_MARGIN, width - offsetRight - SVG_MARGIN])
            .domain([minXValues, maxXValues]);

          const seriesWithColor = {
            color: seriesColors[index],
            hasPoint: lineStyle === 'solid' ? hasPoint : false,
            ...singleSeries,
          };

          return (
            <g key={index}>
              <Series
                xScale={xScale}
                yScale={yScale}
                series={seriesWithColor}
                isAnimated={isAnimated}
                svgDimensions={svgDimensions}
                theme={selectedTheme}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
