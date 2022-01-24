import type { DataSeries, NumberLabelFormatter } from '../../../types';
export declare function useYScale({ drawableHeight, data, formatYAxisLabel, fontSize, integersOnly, }: {
    fontSize: number;
    drawableHeight: number;
    data: DataSeries[];
    formatYAxisLabel: NumberLabelFormatter;
    integersOnly: boolean;
}): {
    yScale: import("d3-scale").ScaleLinear<number, number>;
    ticks: {
        value: number;
        formattedValue: string;
        yOffset: number;
    }[];
    axisMargin: number;
};
//# sourceMappingURL=use-y-scale.d.ts.map