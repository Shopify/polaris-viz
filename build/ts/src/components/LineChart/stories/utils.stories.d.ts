export declare const data: ({
    name: string;
    data: {
        value: number;
        key: string;
    }[];
    color?: undefined;
    isComparison?: undefined;
} | {
    name: string;
    data: {
        value: number;
        key: string;
    }[];
    color: string;
    isComparison: boolean;
})[];
export declare const seriesUsingSeriesColors: ({
    name: string;
    data: {
        value: number;
        key: string;
    }[];
    isComparison?: undefined;
} | {
    name: string;
    data: {
        value: number;
        key: string;
    }[];
    isComparison: boolean;
})[];
export declare const xAxisLabels: string[];
export declare function formatXAxisLabel(value: string): string;
export declare function formatYAxisLabel(value: number): string;
export declare const renderTooltipContent: any;
//# sourceMappingURL=utils.stories.d.ts.map