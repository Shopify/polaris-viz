import { ReactNode } from 'react';
import type { AnnotationLookupTable, RenderTooltipContentData, XAxisOptions } from '../BarChart';
import type { ChartType, DataSeries } from '../../types';
export interface HorizontalBarChartProps {
    data: DataSeries[];
    renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
    xAxisOptions: XAxisOptions;
    annotationsLookupTable?: AnnotationLookupTable;
    isAnimated?: boolean;
    theme?: string;
    type?: ChartType;
}
export declare function HorizontalBarChart({ annotationsLookupTable, data, isAnimated, renderTooltipContent, theme, type, xAxisOptions, }: HorizontalBarChartProps): JSX.Element;
//# sourceMappingURL=HorizontalBarChart.d.ts.map