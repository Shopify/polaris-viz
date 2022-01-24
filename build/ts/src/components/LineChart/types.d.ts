import type { LineStyle, StringLabelFormatter, NumberLabelFormatter, Color, DataSeries } from '../../types';
export declare type DataWithDefaults = DataSeries & {
    color: Color;
    lineStyle: LineStyle;
    areaColor?: string | null;
};
export interface TooltipData {
    name: string;
    point: {
        label: string;
        value: number;
    };
    color: Color;
    lineStyle: LineStyle;
}
export interface RenderTooltipContentData {
    data: TooltipData[];
}
export interface XAxisOptions {
    labelFormatter: StringLabelFormatter;
    xAxisLabels: string[];
    useMinimalLabels: boolean;
    hide?: boolean;
    wrapLabels: boolean;
}
export interface YAxisOptions {
    labelFormatter: NumberLabelFormatter;
    integersOnly: boolean;
}
//# sourceMappingURL=types.d.ts.map