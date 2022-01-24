/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import type { DataSeries, Theme } from '../../../../types';
export declare function Series({ xScale, yScale, data, isAnimated, svgDimensions, theme, }: {
    xScale: ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
    data: DataSeries;
    isAnimated: boolean;
    svgDimensions: {
        width: number;
        height: number;
    };
    theme: Theme;
}): JSX.Element | null;
//# sourceMappingURL=Series.d.ts.map