import React from 'react';
import type { ScaleLinear } from 'd3-scale';
interface XAxisDetails {
    maxXLabelHeight: number;
    maxDiagonalLabelLength: number;
    needsDiagonalLabels: boolean;
    ticks: number[];
    horizontalLabelWidth: number;
}
interface Props {
    xScale: ScaleLinear<number, number>;
    labels: string[] | null;
    drawableWidth: number;
    fontSize: number;
    xAxisDetails: XAxisDetails;
    drawableHeight: number;
    ariaHidden: boolean;
    theme?: string;
}
declare function Axis({ xScale, labels, xAxisDetails, fontSize, drawableWidth, drawableHeight, ariaHidden, theme, }: Props): JSX.Element;
export declare const LinearXAxis: React.MemoExoticComponent<typeof Axis>;
export {};
//# sourceMappingURL=LinearXAxis.d.ts.map