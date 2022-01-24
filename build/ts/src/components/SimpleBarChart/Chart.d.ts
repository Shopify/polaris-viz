/// <reference types="react" />
import type { ChartType, DataSeries, Dimensions } from '../../types';
import type { XAxisOptions } from './types';
export interface ChartProps {
    data: DataSeries[];
    isAnimated: boolean;
    type: ChartType;
    xAxisOptions: Required<XAxisOptions>;
    dimensions?: Dimensions;
    theme?: string;
}
export declare function Chart({ data, dimensions, isAnimated, theme, type, xAxisOptions, }: ChartProps): JSX.Element;
//# sourceMappingURL=Chart.d.ts.map