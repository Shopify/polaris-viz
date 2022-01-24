/// <reference types="react" />
import type { ChartType, DataSeries } from '../../types';
import type { XAxisOptions } from './types';
export interface SimpleBarChartProps {
    data: DataSeries[];
    isAnimated?: boolean;
    theme?: string;
    type?: ChartType;
    xAxisOptions?: XAxisOptions;
}
export declare function SimpleBarChart({ isAnimated, data, theme, type, xAxisOptions, }: SimpleBarChartProps): JSX.Element;
//# sourceMappingURL=SimpleBarChart.d.ts.map