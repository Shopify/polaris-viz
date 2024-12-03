import {Fragment} from 'react';
import {useSpring, animated, config} from '@react-spring/web';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {useChartContext, useTheme} from '@shopify/polaris-viz-core';

import type {RenderInnerValueContent} from '../../../../types';
import {classNames} from '../../../../utilities/classnames';
import type {ComparisonMetricProps} from '../../../ComparisonMetric/ComparisonMetric';
import {ComparisonMetric} from '../../../ComparisonMetric/ComparisonMetric';
import styles from '../../DonutChart.scss';

const SCALING_FACTOR = 0.07;

export interface InnerValueProps {
  activeValue: number | null | undefined;
  activeIndex: number;
  isAnimated: boolean;
  totalValue: number;
  comparisonMetric?: ComparisonMetricProps;
  diameter: number;
  labelFormatter: LabelFormatter;
  renderInnerValueContent?: RenderInnerValueContent;
}

export function InnerValue({
  activeValue,
  activeIndex,
  comparisonMetric,
  labelFormatter,
  isAnimated,
  renderInnerValueContent,
  totalValue,
  diameter,
}: InnerValueProps) {
  const selectedTheme = useTheme();
  const {containerBounds} = useChartContext();

  const {animatedValue} = useSpring({
    animatedValue: totalValue,
    from: {animatedValue: 0},
    config: config.stiff,
    default: {
      immediate: !isAnimated,
    },
  });

  const fontSize = diameter * SCALING_FACTOR;

  const animatedTotalValue = (
    <animated.span>
      {animatedValue.to((value) =>
        animatedValue.isPaused
          ? labelFormatter(value)
          : labelFormatter(Math.abs(Math.floor(value))),
      )}
    </animated.span>
  );

  const activeValueExists = activeValue !== null && activeValue !== undefined;
  const valueToDisplay = activeValueExists
    ? labelFormatter(activeValue)
    : animatedTotalValue;

  const innerContent = renderInnerValueContent?.({
    activeValue,
    activeIndex,
    animatedTotalValue,
    totalValue,
    dimensions: containerBounds,
  }) ?? (
    <Fragment>
      <animated.p
        className={classNames(styles.ContentValue)}
        style={{color: selectedTheme.xAxis.labelColor, fontSize}}
      >
        {valueToDisplay}
      </animated.p>
      {comparisonMetric != null && !activeValueExists && (
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
