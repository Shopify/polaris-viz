interface LayoutDetails {
    yAxisLabelWidth: number;
    fontSize: number;
    xLabels: string[];
    width: number;
    innerMargin: number;
    outerMargin: number;
    minimalLabelIndexes?: number[] | null;
    wrapLabels: boolean;
}
export declare function getBarXAxisDetails({ xLabels, yAxisLabelWidth, fontSize, width, innerMargin, outerMargin, minimalLabelIndexes, wrapLabels, }: LayoutDetails): {
    maxXLabelHeight: number;
    maxDiagonalLabelLength: number;
    needsDiagonalLabels: boolean;
    maxWidth: number;
};
export {};
//# sourceMappingURL=get-bar-xaxis-details.d.ts.map