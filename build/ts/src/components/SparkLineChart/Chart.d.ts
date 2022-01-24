/// <reference types="react" />
import type { Dimensions } from '../../types';
import type { SparkLineChartProps } from './SparkLineChart';
interface Props extends SparkLineChartProps {
    dimensions?: Dimensions;
}
export declare function Chart({ data, dimensions, accessibilityLabel, isAnimated, offsetLeft, offsetRight, theme, }: Props): JSX.Element;
export {};
//# sourceMappingURL=Chart.d.ts.map