import React, { ReactNode } from 'react';
import type { Line as D3Line } from 'd3-shape';
import type { DataPoint, DataSeries } from '../../../../types';
export interface Props {
    series: DataSeries;
    isAnimated: boolean;
    index: number;
    lineGenerator: D3Line<DataPoint>;
    color: string;
    children?: ReactNode;
    theme?: string;
}
export declare const Line: React.NamedExoticComponent<Props>;
//# sourceMappingURL=Line.d.ts.map