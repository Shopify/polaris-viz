import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import type {Color, Dimensions, LineStyle} from 'types';

import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import {useResizeObserver, useWatchPrintMedia, useTheme} from '../../hooks';
import {IS_SAFARI} from '../../hooks/useWatchPrintMedia';
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
  const previousSizeRef = useRef(svgDimensions);

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (entry == null) return;

    setSvgDimensions({
      height: entry.contentRect.height,
      width: entry.contentRect.width,
    });
  }, 10);

  useWatchPrintMedia((event: MediaQueryListEvent) => {
    if (!containerRef) {
      return;
    }

    const dimensions: Dimensions = {
      height: containerRef.clientHeight,
      width: containerRef.clientWidth,
    };

    if (event.matches) {
      previousSizeRef.current = dimensions;

      if (IS_SAFARI) {
        setTimeout(() => setSvgDimensions(dimensions));
      } else {
        setSvgDimensions(dimensions);
      }
    } else {
      setSvgDimensions(previousSizeRef.current);
    }
  });

  useLayoutEffect(() => {
    if (entry == null) return;

    if (containerRef == null) return;

    updateMeasurements();
  }, [entry, containerRef, updateMeasurements]);

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
            lineStyle,
            hasPoint,
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
