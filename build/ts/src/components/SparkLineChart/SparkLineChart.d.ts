/// <reference types="react" />
import type { DataSeries } from '../../types';
export interface SparkLineChartProps {
    data: DataSeries[];
    accessibilityLabel?: string;
    isAnimated?: boolean;
    offsetLeft?: number;
    offsetRight?: number;
    theme?: string;
}
export declare function SparkLineChart({ data, accessibilityLabel, isAnimated, offsetLeft, offsetRight, theme, }: SparkLineChartProps): JSX.Element;
//# sourceMappingURL=SparkLineChart.d.ts.map