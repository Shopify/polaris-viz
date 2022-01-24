/// <reference types="react" />
import type { DataSeries } from '../../types';
export interface SparkBarChartProps {
    data: DataSeries[];
    dataOffsetRight?: number;
    dataOffsetLeft?: number;
    accessibilityLabel?: string;
    isAnimated?: boolean;
    theme?: string;
}
export declare function SparkBarChart({ data, accessibilityLabel, isAnimated, dataOffsetRight, dataOffsetLeft, theme, }: SparkBarChartProps): JSX.Element;
//# sourceMappingURL=SparkBarChart.d.ts.map