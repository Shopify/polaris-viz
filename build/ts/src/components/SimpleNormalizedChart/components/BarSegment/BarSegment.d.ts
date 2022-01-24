/// <reference types="react" />
import type { Size } from '../../types';
import type { Color, Direction } from '../../../../types';
interface Props {
    isAnimated: boolean;
    index: number;
    scale: number;
    color: Color;
    size: Size;
    direction: Direction;
    roundedCorners: boolean;
}
export declare function BarSegment({ color, index, isAnimated, scale, size, direction, roundedCorners, }: Props): JSX.Element;
export {};
//# sourceMappingURL=BarSegment.d.ts.map