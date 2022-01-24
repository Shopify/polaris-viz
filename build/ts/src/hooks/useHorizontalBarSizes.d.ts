import type { Dimensions, LabelFormatter } from '../types';
interface Props {
    chartDimensions: Dimensions;
    isSimple: boolean;
    isStacked: boolean;
    labelFormatter: LabelFormatter;
    seriesLength: number;
    singleBarCount: number;
    ticks: number[];
}
export declare function useHorizontalBarSizes({ chartDimensions, isSimple, isStacked, labelFormatter, seriesLength, singleBarCount, ticks, }: Props): {
    bandwidth: number;
    barHeight: number;
    chartHeight: number;
    groupBarsAreaHeight: number;
    groupHeight: number;
    tallestXAxisLabel: number;
};
export {};
//# sourceMappingURL=useHorizontalBarSizes.d.ts.map