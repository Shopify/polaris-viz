export declare function useHorizontalXScale({ allNumbers, highestSumForStackedGroup, isStacked, longestSeriesCount, maxWidth, }: {
    allNumbers: number[];
    highestSumForStackedGroup: number;
    isStacked: boolean;
    longestSeriesCount: number;
    maxWidth: number;
}): {
    xScale: import("d3-scale").ScaleLinear<number, number>;
    xScaleStacked: import("d3-scale").ScaleLinear<number, number> | null;
    ticks: number[];
    ticksStacked: number[];
};
//# sourceMappingURL=useHorizontalXScale.d.ts.map