import React from 'react';
import {
  getColorVisionEventAttrs,
  isGradientType,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {Color, Direction} from '@shopify/polaris-viz-core';

import {createCSSGradient, classNames} from '../../../../utilities';
import {
  ComparisonMetric,
  ComparisonMetricProps,
} from '../../../ComparisonMetric';
import type {LegendPosition} from '../../../../types';

import styles from './BarLabel.scss';

export interface Props {
  activeIndex: number;
  index: number;
  label: string;
  value: string;
  color: Color;
  direction: Direction;
  legendPosition: LegendPosition;
  comparisonMetric?: ComparisonMetricProps | null;
}

export function BarLabel({
  activeIndex,
  index,
  label,
  value,
  color,
  comparisonMetric,
  direction,
  legendPosition,
}: Props) {
  const selectedTheme = useTheme();
  const {labelColor, valueColor} = selectedTheme.legend;

  const comparisonIndicator = comparisonMetric ? (
    <ComparisonMetric {...comparisonMetric} />
  ) : null;

  const angle = direction === 'horizontal' ? 90 : 180;

  const formattedColor = isGradientType(color)
    ? createCSSGradient(color, angle)
    : color;

  return (
    <li
      className={classNames(
        styles.Container,
        legendPosition.includes('bottom')
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
