/// <reference types="react" />
import type { ScaleLinear } from 'd3-scale';
import type { DataWithDefaults } from '../../types';
export interface Props {
    series: DataWithDefaults;
    yScale: ScaleLinear<number, number>;
    xScale: ScaleLinear<number, number>;
    hasSpline: boolean;
}
export declare function GradientArea({ series, yScale, xScale, hasSpline }: Props): JSX.Element | null;
//# sourceMappingURL=GradientArea.d.ts.map