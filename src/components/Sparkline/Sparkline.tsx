import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';
import {Color} from 'types';
import {animated, useSpring} from 'react-spring';
import {getColorValue} from 'utilities';
import {useWindowSize} from 'hooks';

import {getPathLength} from './utilities';
import styles from './Sparkline.scss';

const MAX_AREA_OPACITY = 0.4;
const SVG_MARGIN = 2;
const STROKE_WIDTH = 1.5;
const ANIMATION_CONFIG = {duration: 1000};

interface Coordinates {
  x: number;
  y: number;
}

interface Props {
  data: Coordinates[];
  color?: Color;
  useAnimation?: boolean;
  includeArea?: boolean;
  accessibilityLabel?: string;
}

export function Sparkline({
  data,
  accessibilityLabel,
  color = 'colorTeal',
  useAnimation = false,
  includeArea = false,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const [pathLength, setPathLength] = useState(getPathLength(pathRef.current));
  const [windowWidth, windowHeight] = useWindowSize();

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (containerRef.current == null) {
      throw new Error('No SVG rendered');
    }

    setSvgDimensions({
      height: containerRef.current.clientHeight,
      width: containerRef.current.clientWidth,
    });

    setPathLength(getPathLength(pathRef.current));
  }, 10);

  useLayoutEffect(() => {
    updateMeasurements();
  }, [windowWidth, windowHeight, updateMeasurements]);

  const prefersReducedMotion =
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const areaAnimation = useSpring({
    config: ANIMATION_CONFIG,
    immediate: !useAnimation || prefersReducedMotion,
    opacity: MAX_AREA_OPACITY,
    from: {opacity: 0},
    reset: true,
  });

  const pathAnimation = useSpring({
    config: ANIMATION_CONFIG,
    immediate: !useAnimation || prefersReducedMotion,
    strokeDashoffset: 0,
    from: {strokeDashoffset: pathLength},
    reset: true,
  });

  const {width, height} = svgDimensions;

  const xValues = data.map(({x}) => x);
  const xScale = scaleLinear()
    .range([SVG_MARGIN, width - SVG_MARGIN])
    .domain([Math.min(...xValues), Math.max(...xValues)]);

  const yValues = data.map(({y}) => y);
  const yScale = scaleLinear()
    .range([height - SVG_MARGIN, SVG_MARGIN])
    .domain([Math.min(...yValues), Math.max(...yValues)]);

  const lineShape = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y(({y}) => yScale(y))(data);

  const areaShape = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y0(height)
    .y1(({y}) => yScale(y))(data);

  return (
    <div style={{width: '100%', height: '100%'}} ref={containerRef}>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}
      <svg
        aria-hidden
        width={width}
        height={height}
        color={getColorValue(color)}
      >
        <g>
          <animated.path
            ref={pathRef}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            d={lineShape == null ? '' : lineShape}
            strokeDasharray={`${pathLength} ${pathLength}`}
            strokeDashoffset={pathAnimation.strokeDashoffset}
          />
          {includeArea ? (
            <animated.path
              opacity={areaAnimation.opacity}
              fill="currentColor"
              d={areaShape == null ? '' : areaShape}
            />
          ) : null}
        </g>
      </svg>
    </div>
  );
}
