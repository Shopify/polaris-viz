import type { Series } from 'd3-shape';
import type { NumberLabelFormatter } from '../../../types';
export declare function useYScale({ fontSize, drawableHeight, stackedValues, formatYAxisLabel, }: {
    fontSize: number;
    drawableHeight: number;
    stackedValues: Series<{
        [key: string]: number;
    }, string>[];
    formatYAxisLabel: NumberLabelFormatter;
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