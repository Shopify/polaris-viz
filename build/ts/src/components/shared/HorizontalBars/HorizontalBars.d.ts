/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import { DataSeries } from '../../../types';
import type { LabelFormatter } from '../../../types';
export interface HorizontalBarsProps {
    ariaLabel: string;
    barHeight: number;
    data: DataSeries[];
    groupIndex: number;
    id: string;
    isAnimated: boolean;
    isSimple: boolean;
    labelFormatter: LabelFormatter;
    name: string;
    xScale: ScaleLinear<number, number>;
    zeroPosition: number;
    animationDelay?: number;
    theme?: string;
}
export declare function HorizontalBars({ animationDelay, ariaLabel, barHeight, data, groupIndex, id, isAnimated, isSimple, labelFormatter, name, theme, xScale, zeroPosition, }: HorizontalBarsProps): JSX.Element;
//# sourceMappingURL=HorizontalBars.d.ts.map