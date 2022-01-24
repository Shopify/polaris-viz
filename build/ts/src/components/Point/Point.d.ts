import React from 'react';
import type { ActiveTooltip, DataType } from 'types';
import { Interpolation } from '@react-spring/web';
interface Props {
    active: boolean;
    cx: number | Interpolation;
    cy: number | Interpolation;
    color: string;
    index: number;
    isAnimated: boolean;
    onFocus?: ({ index, x, y }: ActiveTooltip) => void;
    tabIndex?: number;
    ariaLabelledby?: string;
    ariaHidden?: boolean;
    visuallyHidden?: boolean;
    stroke: string;
    dataType?: DataType;
}
export declare const Point: React.NamedExoticComponent<Props>;
export {};
//# sourceMappingURL=Point.d.ts.map