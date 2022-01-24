import type { StringLabelFormatter, YAxisTick, DataSeries } from '../types';
export interface ChartDetails {
    data: DataSeries[];
    fontSize: number;
    width: number;
    formatXAxisLabel: StringLabelFormatter;
    initialTicks: YAxisTick[];
    xAxisLabels: string[];
    useMinimalLabels?: boolean;
    wrapLabels: boolean;
}
export declare function useLinearXAxisDetails({ data, fontSize, width, formatXAxisLabel, initialTicks, xAxisLabels, useMinimalLabels, wrapLabels, }: ChartDetails): {
    maxXLabelHeight: number;
    maxDiagonalLabelLength: number;
    needsDiagonalLabels: boolean;
    ticks: number[];
    horizontalLabelWidth: number;
};
//# sourceMappingURL=useLinearXAxisDetails.d.ts.map