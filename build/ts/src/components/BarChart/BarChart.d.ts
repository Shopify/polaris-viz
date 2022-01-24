import React from 'react';
import type { ChartType, DataSeries, Direction } from '../../types';
import type { RenderTooltipContentData, XAxisOptions, YAxisOptions } from '../BarChart';
import type { Annotation } from './types';
export interface BarChartProps {
    data: DataSeries[];
    renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
    annotations?: Annotation[];
    direction?: Direction;
    emptyStateText?: string;
    isAnimated?: boolean;
    skipLinkText?: string;
    theme?: string;
    type?: ChartType;
    xAxisOptions?: Partial<XAxisOptions>;
    yAxisOptions?: Partial<YAxisOptions>;
}
export declare function BarChart({ annotations, data, direction, emptyStateText, isAnimated, renderTooltipContent, skipLinkText, theme, type, xAxisOptions, yAxisOptions, }: BarChartProps): JSX.Element;
//# sourceMappingURL=BarChart.d.ts.map