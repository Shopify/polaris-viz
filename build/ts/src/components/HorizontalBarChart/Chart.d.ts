import { ReactNode } from 'react';
import { ChartType, DataSeries, Dimensions } from '../../types';
import type { AnnotationLookupTable, RenderTooltipContentData, XAxisOptions } from '../BarChart';
export interface ChartProps {
    isAnimated: boolean;
    data: DataSeries[];
    renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
    type: ChartType;
    xAxisOptions: Required<XAxisOptions>;
    annotationsLookupTable?: AnnotationLookupTable;
    dimensions?: Dimensions;
    theme?: string;
}
export declare function Chart({ annotationsLookupTable, data, dimensions, isAnimated, renderTooltipContent, theme, type, xAxisOptions, }: ChartProps): JSX.Element;
//# sourceMappingURL=Chart.d.ts.map