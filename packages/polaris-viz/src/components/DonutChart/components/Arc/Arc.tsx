import React, {useMemo} from 'react';
import {classNames} from '../../../../utilities';
import {useDebouncedCallback} from 'use-debounce';
import {arc} from 'd3-shape';

import {
  GRADIENT_COLORS,
  ARC_CORNER_RADIUS,
  ARC_PAD_ANGLE,
  DONUT_CHART_THICKNESS,
  EVENT_DEBOUNCE_TIME,
} from '../../constants';

import type {ArcData} from '../../types';

import styles from './Arc.scss';
import {uniqueId} from '@shopify/polaris-viz-core';

export interface ArcProps {
  data: ArcData;
  radius: number;
  height: number;
  width: number;
  startAngle: number;
  endAngle: number;
  tabIndex: number;
  accessibilityLabel: string;
  role?: string;
  dimmed?: boolean;
  isOnlySegment?: boolean;
  valueFormatter?(value: number): string;
  onHover?(data: ArcData): void;
  onBlur?(data: ArcData): void;
}

export function Arc({
  data,
  radius,
  width,
  height,
  startAngle,
  endAngle,
  tabIndex,
  accessibilityLabel,
  role,
  dimmed = false,
  onHover,
  onBlur,
  valueFormatter,
  isOnlySegment,
}: ArcProps) {
  const {color} = data;
  const firstColor = GRADIENT_COLORS[color][0].color;
  const lastColor =
    GRADIENT_COLORS[color][GRADIENT_COLORS[color].length - 1].color;
  const gradientId = useMemo(() => {
    const uniqueColorId = uniqueId(color);
    const labelNoSpaces = accessibilityLabel.replace(/\s/g, '');
    return `${labelNoSpaces}-${uniqueColorId}`;
  }, [color, accessibilityLabel]);
  const createArc = arc().cornerRadius(ARC_CORNER_RADIUS);
  const arcOptions = {
    innerRadius: radius - DONUT_CHART_THICKNESS,
    outerRadius: radius,
    startAngle,
    endAngle,
    padAngle: ARC_PAD_ANGLE,
  };
  const path = createArc(arcOptions);
  const arcWidth = endAngle - startAngle;
  const halfwayPoint = startAngle + arcWidth / 2;

  const [handleHover] = useDebouncedCallback(
    () => onHover?.(data),
    EVENT_DEBOUNCE_TIME,
  );
  const [handleBlur] = useDebouncedCallback(
    () => onBlur?.(data),
    EVENT_DEBOUNCE_TIME,
  );

  const conicGradientValue = useMemo((): string => {
    const stopAdjustment = (startAngle - endAngle) * 0.25;

    return `conic-gradient(from ${startAngle}rad, ${firstColor}, ${lastColor} ${
      halfwayPoint - startAngle - stopAdjustment
    }rad ${endAngle - startAngle}rad, transparent ${endAngle - startAngle}rad)`;
  }, [endAngle, firstColor, halfwayPoint, lastColor, startAngle]);

  const onlySegmentBackgroundValue = useMemo((): string => {
    return lastColor;
  }, [lastColor]);

  const getAriaLabel = () => {
    const {label, value} = data;
    const formattedValue = valueFormatter ? valueFormatter(value) : value;
    return `${label}: ${formattedValue}`;
  };

  return (
    <>
      <clipPath id={gradientId} transform={`translate(${radius} ${radius})`}>
        <path className={classNames(styles.Arc)} d={path!} />
      </clipPath>
      <foreignObject
        x="0"
        y="0"
        width={width}
        height={height}
        clipPath={`url(#${gradientId})`}
        transform={`translate(-${radius} -${radius})`}
        className={classNames(dimmed && styles.Dimmed)}
        tabIndex={tabIndex}
        role={role}
        aria-label={getAriaLabel()}
        onFocus={handleHover}
        onBlur={handleBlur}
        onMouseEnter={handleHover}
        onMouseLeave={handleBlur}
      >
        <div
          className={styles.Gradient}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...(isOnlySegment
              ? {background: onlySegmentBackgroundValue}
              : {backgroundImage: conicGradientValue}),
          }}
        />
      </foreignObject>
    </>
  );
}
