import { RoundedBorder } from '../types';
declare type RoundedCorners = [number, number, number, number];
export declare function keepValuePositive(amount: number): number;
export declare function getBorderRadius(roundedCorner: RoundedBorder, radius: number): RoundedCorners;
interface Props {
    height: number;
    width: number;
    roundedBorder: RoundedBorder;
    needsMinWidth: boolean;
}
export declare function getRoundedRectPath({ height, width, roundedBorder, needsMinWidth, }: Props): string;
export {};
//# sourceMappingURL=get-rounded-rect-path.d.ts.map