import React, {useRef, useState, useLayoutEffect} from 'react';
import {path} from 'd3-path';
import {animated, useSpring} from 'react-spring';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';
import {getPathLength} from 'utilities/get-path-length';

import styles from './RadialGauge.scss';

export function RadialGauge({
  value,
  outOf,
  size = 200,
  backgroundColor = 'colorSkyLight',
  outlineColor = 'colorPurple',
  formatValue = (value: number) => `${value}`,
}: {
  value: number;
  outOf: number;
  size: number;
  backgroundColor: Color;
  outlineColor: Color;
  formatValue(value: number): string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(getPathLength(pathRef.current));

  useLayoutEffect(() => {
    setPathLength(getPathLength(pathRef.current));
  }, []);

  const radius = size / 2;
  const stroke = size / 20;
  const percentComplete = value / outOf;
  const fullCircle = 2 * Math.PI;

  const outlineStart = Math.PI * 1.5;
  const outlineEnd = percentComplete * fullCircle + outlineStart;

  const innerCircleRadius = radius - stroke * 1.5;
  const outlineRadius = radius - stroke;

  const outlinePath = path();
  outlinePath.arc(radius, radius, outlineRadius, outlineStart, outlineEnd);
  const centerPath = path();
  centerPath.arc(radius, radius, innerCircleRadius, 0, fullCircle);

  const pathAnimation = useSpring({
    config: {duration: 1000},
    strokeDashoffset: 0,
    from: {strokeDashoffset: pathLength},
    reset: true,
  });

  return (
    <svg height={size} width={size}>
      <path d={centerPath.toString()} fill={tokens[backgroundColor]} />

      <animated.path
        className={styles.Outline}
        ref={pathRef}
        d={outlinePath.toString()}
        stroke={tokens[outlineColor]}
        strokeWidth={stroke}
        strokeDasharray={`${pathLength} ${pathLength}`}
        strokeDashoffset={pathAnimation.strokeDashoffset}
      />

      <text
        textAnchor="middle"
        x="50%"
        y="60%"
        style={{fontSize: Math.round(size / 4)}}
      >
        {formatValue(value)}
      </text>
    </svg>
  );
}
