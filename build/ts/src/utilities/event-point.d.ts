import type React from 'react';
export declare function eventPoint(event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>): {
    clientX: number;
    clientY: number;
    svgX: number;
    svgY: number;
} | undefined;
export declare function eventPointNative(event: MouseEvent | TouchEvent): {
    clientX: number;
    clientY: number;
    svgX: number;
    svgY: number;
} | undefined;
//# sourceMappingURL=event-point.d.ts.map