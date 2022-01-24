/// <reference types="react" />
import type { Dimensions } from '../../types';
import type { SparkBarChartProps } from './SparkBarChart';
interface Props extends SparkBarChartProps {
    dimensions?: Dimensions;
}
export declare function Chart({ data, dimensions, accessibilityLabel, isAnimated, dataOffsetRight, dataOffsetLeft, theme, }: Props): JSX.Element;
export {};
//# sourceMappingURL=Chart.d.ts.map