/// <reference types="react" />
import type { Legend } from '../../types';
export interface ComparisonMetricProps {
    metric: string;
    trend: 'positive' | 'negative' | 'neutral';
    accessibilityLabel: string;
    theme: Legend;
    dataIndex?: number;
}
export declare function ComparisonMetric({ metric, trend, accessibilityLabel, theme, }: Omit<ComparisonMetricProps, 'dataIndex'>): JSX.Element;
//# sourceMappingURL=ComparisonMetric.d.ts.map