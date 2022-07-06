import React from 'react';
import {useSpring, animated, config} from '@react-spring/web';
import {LabelFormatter, useTheme} from '@shopify/polaris-viz-core';

import {classNames} from '../../../../utilities';
import {
  ComparisonMetric,
  ComparisonMetricProps,
} from '../../../ComparisonMetric';
import styles from '../../DonutChart.scss';

interface Props {
  totalValue: number;
  labelFormatter: LabelFormatter;
  isAnimated: boolean;
  comparisonMetric?: ComparisonMetricProps;
}

export function InnerValue({
  totalValue,
  comparisonMetric,
  labelFormatter,
  isAnimated,
}: Props) {
  const selectedTheme = useTheme();

  const {animatedValue} = useSpring({
    animatedValue: totalValue,
    from: {animatedValue: 0},
    config: config.stiff,
    default: {
      immediate: !isAnimated,
    },
  });

  return (
    <div className={styles.ContentWrapper}>
      <animated.p
        className={classNames(styles.ContentValue)}
        style={{color: selectedTheme.xAxis.labelColor}}
      >
        {animatedValue.to((value) =>
          animatedValue.isPaused
            ? labelFormatter(value)
            : labelFormatter(Math.abs(Math.floor(value))),
        )}
      </animated.p>
      {comparisonMetric != null && (
        <div className={styles.ComparisonMetric}>
          <ComparisonMetric
            metric={comparisonMetric.metric}
            trend={comparisonMetric.trend}
            accessibilityLabel={comparisonMetric.accessibilityLabel}
          />
        </div>
      )}
    </div>
  );
}
