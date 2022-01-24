import React from 'react';
import { RoundedBorder } from '../../../types';
export interface BarProps {
    color: string;
    height: number;
    tabIndex: number;
    width: number;
    x: number;
    y: number;
    animationDelay?: number;
    ariaLabel?: string;
    index?: number;
    isAnimated?: boolean;
    needsMinWidth?: boolean;
    role?: string;
    roundedBorder?: RoundedBorder;
    transform?: string;
}
export declare const Bar: React.NamedExoticComponent<BarProps>;
//# sourceMappingURL=Bar.d.ts.map