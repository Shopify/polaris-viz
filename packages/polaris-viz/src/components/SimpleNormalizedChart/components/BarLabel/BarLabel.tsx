import React from 'react';
import {
  getColorVisionEventAttrs,
  isGradientType,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {Color, LegendTheme, Direction} from '@shopify/polaris-viz-core';

import {createCSSGradient, classNames} from '../../../../utilities';
import {
  ComparisonMetric,
  ComparisonMetricProps,
} from '../../../ComparisonMetric';
import type {LabelPosition} from '../../types';

import styles from './BarLabel.scss';

export interface Props {
  activeIndex: number;
  index: number;
  label: string;
  value: string;
  color: Color;
  legendColors: LegendTheme;
  direction: Direction;
  labelPosition: LabelPosition;
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'> | null;
}

export function BarLabel({
  activeIndex,
  index,
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
      style={getColorVisionStylesForActiveIndex({activeIndex, index})}
      {...getColorVisionEventAttrs({
        type: COLOR_VISION_SINGLE_ITEM,
        index,
      })}
    >
      <div style={{background: formattedColor}} className={styles.LabelColor} />
      <div className={styles.Label}>
        <strong style={{color: labelColor}}>{label}</strong>
        <div style={{color: valueColor}} className={styles.ValueContainer}>
          <span className={styles.Value}>{value}</span>
          {comparisonIndicator}
        </div>
      </div>
    </li>
  );
}
