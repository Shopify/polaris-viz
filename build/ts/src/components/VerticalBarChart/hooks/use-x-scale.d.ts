export declare function useXScale({ drawableWidth, data, labels, innerMargin, outerMargin, }: {
    drawableWidth: number;
    data: number[][];
    labels: string[];
    innerMargin: number;
    outerMargin: number;
}): {
    xScale: import("d3-scale").ScaleBand<string>;
    xAxisLabels: {
        value: string;
        xOffset: number;
    }[];
};
//# sourceMappingURL=use-x-scale.d.ts.map