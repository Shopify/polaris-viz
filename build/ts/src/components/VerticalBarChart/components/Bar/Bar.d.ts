import React from 'react';
interface Props {
    color: string;
    x: number;
    rawValue: number;
    width: number;
    index: number;
    rotateZeroBars: boolean;
    height: number;
    tabIndex: number;
    zeroPosition: number;
    onFocus?: ({ index, cx, cy }: {
        index: number;
        cx: number;
        cy: number;
    }) => void;
    ariaLabel?: string;
    role?: string;
    hasRoundedCorners?: boolean;
    animationDelay?: number;
    isAnimated?: boolean;
}
export declare const Bar: React.NamedExoticComponent<Props>;
export {};
//# sourceMappingURL=Bar.d.ts.map