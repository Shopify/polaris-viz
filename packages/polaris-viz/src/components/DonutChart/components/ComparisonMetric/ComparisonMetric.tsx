import React from 'react';
import {Icon} from '@shopify/polaris'; // remove - get SVG from figma
import {CaretDownMinor, CaretUpMinor} from '@shopify/polaris-icons'; // remove - ++ chevron here? SimpleNormalizedChart
import {classNames} from '../../../../utilities';
import {useI18n} from '@shopify/react-i18n'; // can completely remove

import styles from './ComparisonMetric.scss';

export interface ComparisonMetricProps {
  percentage: number;
}

export function ComparisonMetric({percentage}: ComparisonMetricProps) {
  const [i18n] = useI18n();

  if (percentage === 0) return null;

  const isPositive = percentage > 0;

  return (
    <span
      className={classNames(
        styles.ComparisonMetric,
        isPositive ? styles.Positive : styles.Negative,
      )}
    >
      <Icon source={isPositive ? CaretUpMinor : CaretDownMinor} />
      <span className={styles.VisuallyHidden}>
        {i18n.formatPercentage(percentage, {
          maximumFractionDigits: 0,
        })}
      </span>
      <span aria-hidden>
        {i18n.formatPercentage(Math.abs(percentage), {
          maximumFractionDigits: 0,
        })}
      </span>
    </span>
  );
}
