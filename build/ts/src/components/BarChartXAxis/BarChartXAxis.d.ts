import React from 'react';
import type { ScaleBand } from 'd3-scale';
interface XAxisDetails {
    maxXLabelHeight: number;
    maxDiagonalLabelLength: number;
    needsDiagonalLabels: boolean;
    maxWidth: number;
}
interface BarChartXAxisProps {
    drawableHeight: number;
    xScale: ScaleBand<string>;
    labels: {
        value: string;
        xOffset: number;
    }[];
    fontSize: number;
    xAxisDetails: XAxisDetails;
    minimalLabelIndexes?: number[] | null;
    theme?: string;
}
export declare const BarChartXAxis: React.NamedExoticComponent<BarChartXAxisProps>;
export {};
//# sourceMappingURL=BarChartXAxis.d.ts.map