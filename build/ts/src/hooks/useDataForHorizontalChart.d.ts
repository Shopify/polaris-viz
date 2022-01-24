import type { DataSeries, LabelFormatter } from '../types';
interface Props {
    data: DataSeries[];
    isSimple: boolean;
    isStacked: boolean;
    labelFormatter: LabelFormatter;
}
export declare function useDataForHorizontalChart({ data, isSimple, isStacked, labelFormatter, }: Props): {
    allNumbers: number[];
    areAllNegative: boolean;
    highestPositive: number;
    longestLabel: {
        positive: number;
        negative: number;
    };
    lowestNegative: number;
};
export {};
//# sourceMappingURL=useDataForHorizontalChart.d.ts.map