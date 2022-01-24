import type { Series as ShapeSeries } from 'd3-shape';
export declare type StackSeries = ShapeSeries<{
    [key: string]: number;
}, string>;
export interface AccessibilitySeries {
    title: string;
    data: {
        label: string;
        value: string;
    }[];
}
export declare enum BarMargin {
    Small = 0.1,
    Medium = 0.3,
    Large = 0.5,
    None = 0
}
//# sourceMappingURL=types.d.ts.map