/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import type { LabelFormatter } from 'types';
interface XAxisLabelsProps {
    bandwidth: number;
    chartHeight: number;
    color: string;
    labelFormatter: LabelFormatter;
    tallestXAxisLabel: number;
    ticks: number[];
    xScale: ScaleLinear<number, number>;
}
export declare const XAxisLabels: ({ bandwidth, chartHeight, color, labelFormatter, tallestXAxisLabel, ticks, xScale, }: XAxisLabelsProps) => JSX.Element;
export {};
//# sourceMappingURL=XAxisLabels.d.ts.map