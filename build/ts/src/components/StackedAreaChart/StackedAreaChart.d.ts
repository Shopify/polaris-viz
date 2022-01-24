import React from 'react';
import type { StringLabelFormatter, NumberLabelFormatter, DataSeries } from '../../types';
import type { RenderTooltipContentData } from './types';
export interface StackedAreaChartProps {
    renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
    xAxisOptions: {
        labels: string[];
        formatLabel?: StringLabelFormatter;
        hide?: boolean;
        wrapLabels?: boolean;
    };
    yAxisOptions?: {
        formatLabel?: NumberLabelFormatter;
    };
    data: DataSeries[];
    isAnimated?: boolean;
    skipLinkText?: string;
    theme?: string;
}
export declare function StackedAreaChart({ xAxisOptions, yAxisOptions, data, renderTooltipContent, isAnimated, skipLinkText, theme, }: StackedAreaChartProps): JSX.Element | null;
//# sourceMappingURL=StackedAreaChart.d.ts.map