/// <reference types="react" />
import type { LineStyle, Color } from 'types';
export interface TooltipData {
    name: string;
    point: {
        label: string;
        value: string | number;
    };
    color?: Color;
    lineStyle: LineStyle;
}
export interface TooltipContentProps {
    data: TooltipData[];
    theme?: string;
}
export declare function TooltipContent({ data, theme }: TooltipContentProps): JSX.Element;
//# sourceMappingURL=TooltipContent.d.ts.map