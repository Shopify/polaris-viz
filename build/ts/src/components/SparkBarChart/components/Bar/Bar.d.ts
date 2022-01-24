/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import { SpringValue } from '@react-spring/web';
interface Props {
    x: number;
    yScale: ScaleLinear<number, number>;
    value: number | null;
    width: number;
    height?: SpringValue<number> | number;
    fill: string;
}
export declare function Bar({ x, value, yScale, width, height, fill }: Props): JSX.Element | null;
export {};
//# sourceMappingURL=Bar.d.ts.map