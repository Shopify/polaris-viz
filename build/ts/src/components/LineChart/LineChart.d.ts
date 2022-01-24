import React from 'react';
import type { DataSeries } from '../../types';
import type { RenderTooltipContentData, XAxisOptions, YAxisOptions } from './types';
export interface LineChartProps {
    data: DataSeries[];
    emptyStateText?: string;
    isAnimated?: boolean;
    renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
    skipLinkText?: string;
    theme?: string;
    xAxisOptions?: Partial<XAxisOptions>;
    yAxisOptions?: Partial<YAxisOptions>;
}
export declare function LineChart({ data, renderTooltipContent, skipLinkText, emptyStateText, isAnimated, xAxisOptions, yAxisOptions, theme, }: LineChartProps): JSX.Element;
//# sourceMappingURL=LineChart.d.ts.map