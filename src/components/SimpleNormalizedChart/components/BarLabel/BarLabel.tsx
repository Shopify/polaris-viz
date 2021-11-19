import React from 'react';

import {
  createCSSGradient,
  isGradientType,
  classNames,
} from '../../../../utilities';
import type {Color, Direction, Legend} from '../../../../types';
import {
  ComparisonMetric,
  ComparisonMetricShape,
} from '../../../ComparisonMetric';
import type {LabelPosition} from '../../types';

import styles from './BarLabel.scss';

export interface Props {
  label: string;
  value: string;
  color: Color;
  legendColors: Legend;
  direction: Direction;
  labelPosition: LabelPosition;
  comparisonMetric?: ComparisonMetricShape | null;
}

export function BarLabel({
  label,
  value,
  color,
  comparisonMetric,
  legendColors,
  direction,
  labelPosition,
}: Props) {
  const {labelColor, valueColor} = legendColors;

  const comparisonIndicator = comparisonMetric ? (
    <ComparisonMetric {...comparisonMetric} theme={legendColors} />
  ) : null;

  const angle = direction === 'horizontal' ? 90 : 180;

  const formattedColor = isGradientType(color)
    ? createCSSGradient(color, angle)
    : color;

  return (
    <li
      className={classNames(
        styles.Container,
        labelPosition.includes('bottom')
          ? styles.ContaineBottomLabel
          : styles.ContainerDefaultLabel,
      )}
    >
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
