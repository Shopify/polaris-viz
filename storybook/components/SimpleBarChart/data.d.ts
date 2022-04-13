import type { DataSeries } from '@shopify/polaris-viz-core';
export declare function buildSeries(items: number[] | number[][], labels?: string[]): DataSeries[];
export declare const SERIES: DataSeries[];
export declare const SINGLE_SERIES: DataSeries[];
export declare const COMPARISON_SERIES: ({
    name: string;
    data: {
        key: string;
        value: number;
    }[];
    isComparison?: undefined;
} | {
    name: string;
    data: {
        key: string;
        value: number;
    }[];
    isComparison: boolean;
})[];
export declare const COLOR_OVERRIDE_SERIES: ({
    name: string;
    data: {
        value: number;
        key: string;
    }[];
    color: string;
} | {
    name: string;
    data: {
        value: number;
        key: string;
    }[];
    color?: undefined;
})[];
//# sourceMappingURL=data.d.ts.map