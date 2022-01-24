import type { Line } from 'd3-shape';
import type { DataPoint, DataSeries } from '../types';
export declare const SPRING_CONFIG: {
    friction: number;
    clamp: boolean;
    mass: number;
    tension: number;
};
export declare function useLinearChartAnimations({ activeIndex, lineGenerator, data, isAnimated, }: {
    activeIndex: number | null;
    lineGenerator: Line<DataPoint>;
    data: DataSeries[];
    isAnimated: boolean;
}): {
    animatedCoordinates: import("@react-spring/web").Interpolation<number, DOMPoint | {
        x: number;
        y: number;
    }>[] | null;
};
//# sourceMappingURL=use-linear-chart-animations.d.ts.map