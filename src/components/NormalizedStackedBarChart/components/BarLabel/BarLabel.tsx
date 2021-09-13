import React from 'react';

import {createCSSGradient, isGradientType} from '../../../../utilities';
import type {Color, Legend} from '../../../../types';
import {
  ComparisonMetric,
  ComparisonMetricShape,
} from '../../../ComparisonMetric';
import type {Orientation} from '../../types';

import styles from './BarLabel.scss';

export interface Props {
  label: string;
  value: string;
  color: Color;
  comparisonMetric?: ComparisonMetricShape;
  legendColors: Legend;
  orientation: Orientation;
}

export function BarLabel({
  label,
  value,
  color,
  comparisonMetric,
  legendColors,
  orientation,
}: Props) {
  const {labelColor, valueColor} = legendColors;

  const comparisonIndicator = comparisonMetric ? (
    <ComparisonMetric {...comparisonMetric} theme={legendColors} />
  ) : null;

  const angle = orientation === 'horizontal' ? 90 : 180;

  const formattedColor = isGradientType(color)
    ? createCSSGradient(color, angle)
    : color;

  return (
    <li className={styles.Container}>
      <div style={{background: formattedColor}} className={styles.LabelColor} />
      <div className={styles.Label}>
        <strong style={{color: labelColor}}>{label}</strong>
        <div style={{color: valueColor}} className={styles.Value}>
          {value}
          {comparisonIndicator}
        </div>
      </div>
    </li>
  );
}
