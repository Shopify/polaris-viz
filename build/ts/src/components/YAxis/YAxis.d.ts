import React from 'react';
import type { YAxisTick } from '../../types';
interface Props {
    ticks: YAxisTick[];
    textAlign: 'left' | 'right';
    width: number;
    fontSize?: number;
    theme?: string;
}
declare function Axis({ ticks, fontSize, width, textAlign, theme }: Props): JSX.Element;
export declare const YAxis: React.MemoExoticComponent<typeof Axis>;
export {};
//# sourceMappingURL=YAxis.d.ts.map