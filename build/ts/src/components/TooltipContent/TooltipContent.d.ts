/// <reference types="react" />
import type { Color } from '../../types';
export declare enum TooltipRowType {
    Default = 0,
    Annotation = 1
}
export interface TooltipData {
    color: Color;
    label: string;
    value: string;
    type?: TooltipRowType;
    activeIndex?: number;
}
export interface TooltipContentProps {
    title?: string;
    data: TooltipData[];
    total?: null | {
        label: string;
        value: string;
    };
    theme?: string;
}
export declare function TooltipContent({ title, data, total, theme, }: TooltipContentProps): JSX.Element;
//# sourceMappingURL=TooltipContent.d.ts.map