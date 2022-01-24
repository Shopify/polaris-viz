/// <reference types="react" />
import type { ComparisonMetricProps } from '../ComparisonMetric';
import type { DataPoint, Direction, LabelFormatter } from '../../types';
import type { Size, LabelPosition } from './types';
export interface SimpleNormalizedChartProps {
    data: DataPoint[];
    comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
    labelFormatter?: LabelFormatter;
    labelPosition?: LabelPosition;
    direction?: Direction;
    size?: Size;
    theme?: string;
}
export declare function SimpleNormalizedChart({ comparisonMetrics, data, labelFormatter, labelPosition, direction, size, theme, }: SimpleNormalizedChartProps): JSX.Element;
//# sourceMappingURL=SimpleNormalizedChart.d.ts.map