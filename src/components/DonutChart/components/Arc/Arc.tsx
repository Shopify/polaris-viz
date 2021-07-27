import React from 'react';
import {colorWhite} from '@shopify/polaris-tokens';
import {useDebouncedCallback} from 'use-debounce';
import {arc} from 'd3-shape';
import type {Color, NumberLabelFormatter} from 'types';

import {classNames, getColorValue} from '../../../../utilities';
import {
  ARC_CORNER_RADIUS,
  DONUT_CHART_THICKNESS,
  DONUT_CHART_STROKE_WIDTH,
} from '../../../../constants';

import styles from './Arc.scss';

export interface ArcData {
  label: string;
  value: number;
  color: Color;
}

export interface ArcProps {
  data: ArcData;
  radius: number;
  startAngle: number;
  endAngle: number;
  index: number;
  tabIndex: number;
  role?: string;
  dimmed?: boolean;
  valueFormatter?: NumberLabelFormatter;
  onHover?(serie: ArcData, index: number, x: number, y: number): void;
  onBlur?(): void;
}

export function Arc({
  data,
  radius,
  startAngle,
  endAngle,
  index,
  tabIndex,
  role,
  dimmed,
  onHover,
  onBlur,
  valueFormatter,
}: ArcProps) {
  const colorValue = getColorValue(data.color);
  const createArc = arc().cornerRadius(ARC_CORNER_RADIUS);
  const arcOptions = {
    innerRadius: radius - DONUT_CHART_THICKNESS,
    outerRadius: radius,
    startAngle,
    endAngle,
  };
  const path = createArc(arcOptions);
  const [cx, cy] = createArc.centroid(arcOptions);

  const [handleHover] = useDebouncedCallback(
    () => onHover?.(data, index, cx, cy),
    10,
  );
  const [handleBlur] = useDebouncedCallback(() => onBlur?.(), 10);

  const getAriaLabel = () => {
    const {label, value} = data;
    const formattedValue = valueFormatter ? valueFormatter(value) : value;
    return `${label}: ${formattedValue}`;
  };

  return (
    <path
      fill={colorValue}
      className={classNames(styles.Arc, dimmed && styles.Dimmed)}
      stroke={colorWhite}
      strokeWidth={DONUT_CHART_STROKE_WIDTH}
      tabIndex={tabIndex}
      role={role}
      aria-label={getAriaLabel()}
      onFocus={handleHover}
      onBlur={handleBlur}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      d={path!}
    />
  );
}
