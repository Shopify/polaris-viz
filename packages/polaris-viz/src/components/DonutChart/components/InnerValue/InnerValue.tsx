import React from 'react';
import {useSpring, animated} from '@react-spring/web';

import {classNames} from '../../../../utilities';
import {ComparisonMetric} from '../../../ComparisonMetric';
import styles from '../../DonutChart.scss';

export function InnerValue({
  selectedTheme,
  totalValue,
  comparisonMetric,
  labelFormatter,
  isAnimated,
}) {
  const {animatedValue} = useSpring({
    animatedValue: totalValue,
    from: {animatedValue: 0},
    config: {mass: 1, tension: 210, friction: 20},
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
            theme={selectedTheme.legend}
            accessibilityLabel={comparisonMetric.accessibilityLabel}
          />
        </div>
      )}
    </div>
  );
}
