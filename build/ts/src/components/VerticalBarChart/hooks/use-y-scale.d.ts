import type { StackSeries } from '../types';
import type { DataSeries, NumberLabelFormatter } from '../../../types';
export declare function useYScale({ drawableHeight, data, formatYAxisLabel, stackedValues, integersOnly, }: {
    drawableHeight: number;
    data: DataSeries[];
    formatYAxisLabel: NumberLabelFormatter;
    stackedValues: StackSeries[] | null;
    integersOnly: boolean;
}): {
    yScale: import("d3-scale").ScaleLinear<number, number>;
    ticks: {
        value: number;
        formattedValue: string;
        yOffset: number;
    }[];
};
//# sourceMappingURL=use-y-scale.d.ts.map