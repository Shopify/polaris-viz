import React from 'react';
import { Series } from 'd3-shape';
import type { ScaleLinear } from 'd3-scale';
import type { Color } from 'types';
declare type StackedSeries = Series<{
    [key: string]: number;
}, string>;
interface Props {
    width: number;
    height: number;
    transform: string;
    colors: Color[];
    stackedValues: StackedSeries[];
    xScale: ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
    isAnimated: boolean;
    theme?: string;
}
export declare function Areas({ width, height, stackedValues, transform, xScale, yScale, colors, isAnimated, theme, }: Props): JSX.Element;
export declare const StackedAreas: React.MemoExoticComponent<typeof Areas>;
export {};
//# sourceMappingURL=StackedAreas.d.ts.map