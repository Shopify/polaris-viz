/// <reference types="react" />
import type { LineStyle, Color } from '../../types';
interface LegendSeries {
    lineStyle?: LineStyle;
    name?: string;
    color?: Color;
}
export interface Props {
    series: LegendSeries[];
    theme?: string;
}
export declare function Legend({ series, theme }: Props): JSX.Element;
export {};
//# sourceMappingURL=Legend.d.ts.map