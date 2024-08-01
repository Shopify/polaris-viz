import {Fragment, useEffect, useState} from 'react';
import {useSpring, animated, config} from '@react-spring/web';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import type {RenderInnerValueContent} from '../../../../types';
import {classNames} from '../../../../utilities';
import type {ComparisonMetricProps} from '../../../ComparisonMetric';
import {ComparisonMetric} from '../../../ComparisonMetric';
import styles from '../../DonutChart.scss';

const SCALING_FACTOR = 0.07;

export interface InnerValueProps {
  activeValue: number | null | undefined;
  activeIndex: number;
  labelFormatter: LabelFormatter;
  isAnimated: boolean;
  totalValue: number;
  diameter: number;
  comparisonMetric?: ComparisonMetricProps;
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
  const [fontSize, setFontSize] = useState(0);

  const {animatedValue} = useSpring({
    animatedValue: totalValue,
    from: {animatedValue: 0},
    config: config.stiff,
    default: {
      immediate: !isAnimated,
    },
  });

  useEffect(() => {
    setFontSize(diameter * SCALING_FACTOR);
  }, [diameter]);

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
