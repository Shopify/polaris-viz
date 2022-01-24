/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
interface VerticalGridLinesProps {
    chartHeight: number;
    stroke: string;
    ticks: number[];
    xScale: ScaleLinear<number, number>;
}
export declare const VerticalGridLines: ({ chartHeight, ticks, xScale, stroke, }: VerticalGridLinesProps) => JSX.Element;
export {};
//# sourceMappingURL=VerticalGridLines.d.ts.map