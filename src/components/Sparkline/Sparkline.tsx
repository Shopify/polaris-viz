import React, {useState, useLayoutEffect, useRef} from 'react';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';
import {interpolate} from 'd3-interpolate';
import {transition} from 'd3-transition';
import {easeLinear} from 'd3-ease';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';

import {VisiblyHidden} from './Sparkline.style';
import {useWindowSize} from './hooks';
import {getPathLength} from './utilities';

const MAX_AREA_OPACITY = 0.4;
const SVG_MARGIN = 2;
const STROKE_WIDTH = 1.5;
const ANIMATION_DURATION = 1000;

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
  const [opacity, updateOpacity] = useState(0);
  const [strokeDashoffset, updatePath] = useState<number | null>(null);
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const [windowWidth, windowHeight] = useWindowSize();
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current == null) {
      throw new Error('No SVG rendered');
    }

    setSvgDimensions({
      height: containerRef.current.clientHeight,
      width: containerRef.current.clientWidth,
    });
  }, [containerRef, windowWidth, windowHeight]);

  const pathWidth =
    pathRef.current == null ? null : pathRef.current.clientWidth;

  useLayoutEffect(() => {
    const offsetInterpolation = interpolate(getPathLength(pathRef.current), 0);
    const opacityInterpolation = interpolate(0, MAX_AREA_OPACITY);
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    transition()
      .duration(useAnimation && !prefersReducedMotion ? ANIMATION_DURATION : 0)
      .ease(easeLinear)
      .tween('pathAndOpacity', () => (tweenValue: number) => {
        updatePath(offsetInterpolation(tweenValue));
        if (includeArea) {
          updateOpacity(opacityInterpolation(tweenValue));
        }
      });
  }, [data, useAnimation, pathWidth, includeArea]);

  const {width, height} = svgDimensions;
  const xValues = data.map(({x}) => x);
  const xScale = scaleLinear()
    .range([SVG_MARGIN, width - SVG_MARGIN])
    .domain([Math.min(...xValues), Math.max(...xValues)]);

  const yValues = data.map(({y}) => y);
  const yScale = scaleLinear()
    .range([height - SVG_MARGIN, SVG_MARGIN])
    .domain([Math.min(...yValues), Math.max(...yValues)]);

  const pathLength =
    pathRef != null && pathRef.current != null
      ? getPathLength(pathRef.current)
      : 0;

  const lineShape = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y(({y}) => yScale(y))(data);

  const areaShape = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y0(height)
    .y1(({y}) => yScale(y))(data);

  return (
    <div ref={containerRef} style={{width: '100%', height: '100%'}}>
      {accessibilityLabel ? (
        <VisiblyHidden>{accessibilityLabel}</VisiblyHidden>
      ) : null}
      <svg aria-hidden width={width} height={height} color={tokens[color]}>
        <g>
          <path
            ref={pathRef}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            d={lineShape == null ? '' : lineShape}
            strokeDasharray={`${pathLength} ${pathLength}`}
            strokeDashoffset={
              strokeDashoffset == null ? pathLength : strokeDashoffset
            }
          />
          {includeArea ? (
            <path
              opacity={opacity}
              fill="currentColor"
              d={areaShape == null ? '' : areaShape}
            />
          ) : null}
        </g>
      </svg>
    </div>
  );
}
