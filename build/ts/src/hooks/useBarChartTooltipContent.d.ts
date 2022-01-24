import type { AnnotationLookupTable, RenderTooltipContentData } from 'components/BarChart';
import { ReactNode } from 'react';
import type { Color, DataSeries } from 'types';
interface Props {
    annotationsLookupTable: AnnotationLookupTable;
    data: DataSeries[];
    seriesColors: Color[];
    renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
}
export declare function useBarChartTooltipContent({ annotationsLookupTable, data, seriesColors, renderTooltipContent, }: Props): (activeIndex: number) => ReactNode;
export {};
//# sourceMappingURL=useBarChartTooltipContent.d.ts.map