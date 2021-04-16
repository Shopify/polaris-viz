import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import {Color} from 'types';

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
  showPoint?: boolean;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (containerRef.current == null) {
      throw new Error('No SVG rendered');
    }

    setSvgDimensions({
      height: containerRef.current.clientHeight,
      width: containerRef.current.clientWidth,
    });
  }, 10);

  useLayoutEffect(() => {
    if (containerRef.current == null) {
      throw new Error('No SVG rendered');
    }

    updateMeasurements();

    window.addEventListener('resize', () => updateMeasurements());

    return () =>
      window.removeEventListener('resize', () => updateMeasurements());
  }, [updateMeasurements]);

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
    <div style={{width: '100%', height: '100%'}} ref={containerRef}>
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
