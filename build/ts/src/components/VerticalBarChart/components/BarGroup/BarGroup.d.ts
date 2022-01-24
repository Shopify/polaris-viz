/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import { Color } from '../../../../types';
interface Props {
    x: number;
    yScale: ScaleLinear<number, number>;
    width: number;
    height: number;
    data: number[];
    colors: Color[];
    isSubdued: boolean;
    barGroupIndex: number;
    ariaLabel: string;
    hasRoundedCorners: boolean;
    zeroAsMinHeight: boolean;
    isAnimated?: boolean;
    rotateZeroBars?: boolean;
}
export declare function BarGroup({ x, data, yScale, width, colors, height, barGroupIndex, ariaLabel, hasRoundedCorners, isSubdued, zeroAsMinHeight, isAnimated, rotateZeroBars, }: Props): JSX.Element;
export {};
//# sourceMappingURL=BarGroup.d.ts.map