import {useTheme} from '@shopify/polaris-viz-core';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';

export interface ComparisonMetricProps {
  metric: string;
  trend: 'positive' | 'negative' | 'neutral';
  accessibilityLabel: string;
  dataIndex?: number;
}

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
}: Omit<ComparisonMetricProps, 'dataIndex'>) {
  const selectedTheme = useTheme();

  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon}>
          <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
          <span style={{color: selectedTheme.legend.trendIndicator.neutral}}>
            -
          </span>
        </span>
      );
    case 'positive':
      return (
        <span className={styles.PositiveIcon}>
          <UpChevron
            accessibilityLabel={accessibilityLabel}
            fill={selectedTheme.legend.trendIndicator.positive}
          />
          <span style={{color: selectedTheme.legend.trendIndicator.positive}}>
            {metric}
          </span>
        </span>
      );
    case 'negative':
      return (
        <span className={styles.NegativeIcon}>
          <DownChevron
            accessibilityLabel={accessibilityLabel}
            fill={selectedTheme.legend.trendIndicator.negative}
          />
          <span style={{color: selectedTheme.legend.trendIndicator.negative}}>
            {metric}
          </span>
        </span>
      );
  }
}
