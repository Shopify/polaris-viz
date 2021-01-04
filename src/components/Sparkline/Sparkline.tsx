import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';
import {Color} from 'types';
import {animated, useSpring} from 'react-spring';

import {usePrefersReducedMotion} from '../../hooks';
import {getColorValue, uniqueId} from '../../utilities';

import {getPathLength, rgbToRgba} from './utilities';
import styles from './Sparkline.scss';
import {LinearGradient} from './components';

const MAX_AREA_OPACITY = 0.4;
const SVG_MARGIN = 2;
const STROKE_WIDTH = 1.5;
const ANIMATION_CONFIG = {duration: 1000};

interface Coordinates {
  x: number;
  y: number;
}

export interface SparklineProps {
  data: Coordinates[];
  color?: Color;
  isAnimated?: boolean;
  areaFillStyle?: 'none' | 'solid' | 'gradient';
  accessibilityLabel?: string;
}

export function Sparkline({
  data,
  accessibilityLabel,
  color = 'colorTeal',
  isAnimated = false,
  areaFillStyle = 'none',
}: SparklineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const [pathLength, setPathLength] = useState(getPathLength(pathRef.current));
  const [hasNewData, setNewData] = useState(true);
  const {prefersReducedMotion} = usePrefersReducedMotion();

  useEffect(() => {
    setNewData(true);
    setPathLength(getPathLength(pathRef.current));
  }, [data]);

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
    if (containerRef.current == null) {
      throw new Error('No SVG rendered');
    }

    function updateSVG({isNewData}: {isNewData: boolean}) {
      setNewData(isNewData);
      updateMeasurements();
    }

    updateSVG({isNewData: true});

    window.addEventListener('resize', () => updateSVG({isNewData: false}));

    return () =>
      window.removeEventListener('resize', () => updateSVG({isNewData: false}));
  }, [updateMeasurements]);

  const immediate = !isAnimated || prefersReducedMotion || !hasNewData;

  const areaAnimation = useSpring({
    config: ANIMATION_CONFIG,
    immediate,
    opacity: areaFillStyle === 'gradient' ? 1 : MAX_AREA_OPACITY,
    from: {opacity: 0},
    reset: true,
  });

  const pathAnimation = useSpring({
    config: ANIMATION_CONFIG,
    immediate,
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

  const colorValue = getColorValue(color);
  const id = useMemo(() => uniqueId('sparkline'), []);

  return (
    <div style={{width: '100%', height: '100%'}} ref={containerRef}>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg aria-hidden width={width} height={height} color={colorValue}>
        <g>
          <animated.path
            ref={pathRef}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            d={lineShape == null ? '' : lineShape}
            strokeDasharray={`${pathLength} ${pathLength}`}
            strokeDashoffset={pathAnimation.strokeDashoffset}
          />

          {areaFillStyle === 'gradient' ? (
            <LinearGradient
              id={id}
              startColor={rgbToRgba({rgb: colorValue, alpha: 0})}
              endColor={rgbToRgba({rgb: colorValue, alpha: 0.8})}
            />
          ) : null}

          {areaFillStyle === 'none' ? null : (
            <animated.path
              fill={
                areaFillStyle === 'gradient' ? `url(#${id})` : 'currentColor'
              }
              opacity={areaAnimation.opacity}
              d={areaShape == null ? '' : areaShape}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
