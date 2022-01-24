import type { Theme, Color, LineStyle, DataPoint, Data } from '../types';
interface ValidData {
    data: (DataPoint | Data)[];
    color?: Color;
    isComparison?: boolean;
    name?: string;
    lineStyle?: LineStyle;
}
export declare function useThemeSeriesColors(series: Partial<ValidData>[], selectedTheme: Theme): Color[];
export declare function getSeriesColorsFromCount(count: number, selectedTheme: Theme): Color[];
export declare function getSeriesColors(count: number, selectedTheme: Theme): Color[];
export {};
//# sourceMappingURL=use-theme-series-colors.d.ts.map