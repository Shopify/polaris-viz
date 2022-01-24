import type { Path } from 'd3-path';
import type { CurveGenerator } from 'd3-shape';
export interface CurveStepRoundedProps {
    distance: number;
    roundness: number;
}
export declare class CurveStepRounded implements CurveGenerator {
    private config;
    private _context;
    private _shift;
    private _line;
    private _x;
    private _y;
    private _point;
    constructor(_context: CanvasRenderingContext2D | Path, config: CurveStepRoundedProps);
    areaStart(): void;
    areaEnd(): void;
    lineStart(): void;
    lineEnd(): void;
    point(rawX?: number, rawY?: number): void;
}
export declare function curveStepRounded(context: CanvasRenderingContext2D | Path): CurveStepRounded;
//# sourceMappingURL=curve-step-rounded.d.ts.map