import {Fragment} from 'react';
import {useSpring, animated, config} from '@react-spring/web';
import {LabelFormatter, useTheme} from '@shopify/polaris-viz-core';

import type {RenderInnerValueContent} from '../../../../types';
import {classNames} from '../../../../utilities';
import {
  ComparisonMetric,
  ComparisonMetricProps,
} from '../../../ComparisonMetric';
import styles from '../../DonutChart.scss';

interface Props {
  activeValue: number | null;
  labelFormatter: LabelFormatter;
  isAnimated: boolean;
  totalValue: number;
  comparisonMetric?: ComparisonMetricProps;
  renderInnerValueContent?: RenderInnerValueContent;
}

export function InnerValue({
  activeValue,
  comparisonMetric,
  labelFormatter,
  isAnimated,
  renderInnerValueContent,
  totalValue,
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

  const animatedTotalValue = (
    <animated.span>
      {animatedValue.to((value) =>
        animatedValue.isPaused
          ? labelFormatter(value)
          : labelFormatter(Math.abs(Math.floor(value))),
      )}
    </animated.span>
  );

  const innerContent = renderInnerValueContent?.({
    activeValue,
    animatedTotalValue,
    totalValue,
  }) ?? (
    <Fragment>
      <animated.p
        className={classNames(styles.ContentValue)}
        style={{color: selectedTheme.xAxis.labelColor}}
      >
        {animatedTotalValue}
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
    </Fragment>
  );

  return <div className={styles.ContentWrapper}>{innerContent}</div>;
}
