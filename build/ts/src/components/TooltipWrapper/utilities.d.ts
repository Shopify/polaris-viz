import type { TooltipPositionOffset } from '../TooltipWrapper';
import type { Dimensions, Margin } from '../../types';
export declare const TOOLTIP_MARGIN = 10;
export interface AlteredPositionProps {
    currentX: number;
    currentY: number;
    position: TooltipPositionOffset;
    tooltipDimensions: Dimensions;
    chartDimensions: Dimensions;
    margin: Margin;
    bandwidth: number;
}
export interface AlteredPositionReturn {
    x: number;
    y: number;
}
export declare type AlteredPosition = (props: AlteredPositionProps) => AlteredPositionReturn;
export declare function getAlteredVerticalBarPosition(props: AlteredPositionProps): AlteredPositionReturn;
declare type getFunction = (value: number, props: AlteredPositionProps) => {
    value: number;
    wasOutsideBounds: boolean;
};
export declare function getInlinePosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export declare function getVerticalCenterPosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export declare function getAbovePosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export declare function getBelowPosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export declare function getLeftPosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export declare function getRightPosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export declare function getCenterPosition(...args: Parameters<getFunction>): ReturnType<getFunction>;
export {};
//# sourceMappingURL=utilities.d.ts.map