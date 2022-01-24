/// <reference types="react" />
import { SpringValue } from '@react-spring/web';
import type { ScaleLinear } from 'd3-scale';
import { DataSeries, LabelFormatter } from '../../../types';
export interface HorizontalGroupProps {
    animationDelay: number;
    areAllNegative: boolean;
    ariaLabel: string;
    barHeight: number;
    containerWidth: number;
    data: DataSeries[];
    id: string;
    index: number;
    isAnimated: boolean;
    isSimple: boolean;
    isStacked: boolean;
    labelFormatter: LabelFormatter;
    name: string;
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
    xScale: ScaleLinear<number, number>;
    xScaleStacked: ScaleLinear<number, number> | null;
    zeroPosition: number;
    theme?: string;
}
export declare function HorizontalGroup({ animationDelay, areAllNegative, ariaLabel, barHeight, containerWidth, data, id, index, isAnimated, isSimple, isStacked, labelFormatter, name, opacity, theme, transform, xScale, xScaleStacked, zeroPosition, }: HorizontalGroupProps): JSX.Element;
//# sourceMappingURL=HorizontalGroup.d.ts.map