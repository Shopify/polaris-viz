import React from 'react';
import type { AnnotationLookupTable } from 'components/BarChart/types';
import type { ChartType, DataSeries } from '../../types';
import type { RenderTooltipContentData, XAxisOptions, YAxisOptions } from '../BarChart';
export interface VerticalBarChartProps {
    data: DataSeries[];
    renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
    xAxisOptions: Required<XAxisOptions>;
    yAxisOptions: Required<YAxisOptions>;
    annotationsLookupTable?: AnnotationLookupTable;
    barOptions?: {
        isStacked: boolean;
    };
    emptyStateText?: string;
    isAnimated?: boolean;
    theme?: string;
    type?: ChartType;
}
export declare function VerticalBarChart({ annotationsLookupTable, data, renderTooltipContent, isAnimated, xAxisOptions, yAxisOptions, emptyStateText, theme, type, }: VerticalBarChartProps): JSX.Element;
//# sourceMappingURL=VerticalBarChart.d.ts.map