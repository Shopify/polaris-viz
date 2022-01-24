import type { DataSeries } from '../types';
interface Props {
    data: DataSeries[];
    theme?: string;
}
export declare function useHorizontalSeriesColors({ data, theme }: Props): {
    longestSeriesCount: number;
    seriesColors: import("../types").Color[];
};
export {};
//# sourceMappingURL=useHorizontalSeriesColors.d.ts.map