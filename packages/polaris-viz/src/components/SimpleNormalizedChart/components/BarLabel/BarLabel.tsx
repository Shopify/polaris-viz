import React from 'react';
import {
  getColorVisionEventAttrs,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {Color, Direction} from '@shopify/polaris-viz-core';

import {getCSSBackgroundFromColor} from '../../../../utilities/getCSSBackgroundFromColor';
import {classNames} from '../../../../utilities';
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

  const backgroundColor = getCSSBackgroundFromColor(color, angle);

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
      <div
        style={{background: backgroundColor}}
        className={styles.LabelColor}
      />
      <div className={styles.Label}>
        <div
          style={{color: labelColor}}
          className={
            direction === 'horizontal'
              ? styles.FormattedHorizontalLabel
              : styles.FormattedVerticalLabel
          }
        >
          {label}
        </div>
        <div
          style={{color: valueColor}}
          className={
            direction === 'horizontal'
              ? styles.ValueHorizontalContainer
              : styles.ValueContainer
          }
        >
          <span className={styles.Value}>{value}</span>
          {comparisonIndicator}
        </div>
      </div>
    </li>
  );
}
