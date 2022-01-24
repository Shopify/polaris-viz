export declare const generateLabels: (dataLength: number) => string[];
export declare const generateDataSet: (dataLength: number) => {
    value: number;
    key: string;
}[];
export declare const generateMultipleSeries: (quantity: number, dataSetLength?: number) => {
    name: string;
    data: {
        value: number;
        key: string;
    }[];
}[];
export declare const SPARKLINE_SERIES: ({
    data: {
        x: number;
        y: number;
    }[];
    lineStyle?: undefined;
    area?: undefined;
} | {
    lineStyle: string;
    area: null;
    data: {
        x: number;
        y: number;
    }[];
})[];
export declare function copyTextToClipboard(text: string): void;
export declare const SHARK_SPECIES_GROWTH: {
    name: string;
    data: {
        key: string;
        value: number;
    }[];
}[];
//# sourceMappingURL=index.d.ts.map