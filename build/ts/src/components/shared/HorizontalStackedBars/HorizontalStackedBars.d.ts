/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import { DataSeries } from '../../../types';
export interface HorizontalStackedBarsProps {
    animationDelay: number;
    ariaLabel: string;
    barHeight: number;
    data: DataSeries[];
    groupIndex: number;
    id: string;
    isAnimated: boolean;
    name: string;
    xScale: ScaleLinear<number, number>;
    theme?: string;
}
export declare function HorizontalStackedBars({ animationDelay, ariaLabel, barHeight, data, groupIndex, id, isAnimated, name, theme, xScale, }: HorizontalStackedBarsProps): JSX.Element;
//# sourceMappingURL=HorizontalStackedBars.d.ts.map