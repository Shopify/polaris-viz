/// <reference types="react" />
import type { ComparisonMetricProps } from '../ComparisonMetric';
import type { DataPoint, Direction, LabelFormatter } from '../../types';
import type { Size, LabelPosition } from './types';
export interface ChartProps {
    data: DataPoint[];
    comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
    labelFormatter?: LabelFormatter;
    labelPosition?: LabelPosition;
    direction?: Direction;
    size?: Size;
    theme?: string;
}
export declare function Chart({ comparisonMetrics, data, labelFormatter, labelPosition, direction, size, theme, }: ChartProps): JSX.Element;
//# sourceMappingURL=Chart.d.ts.map