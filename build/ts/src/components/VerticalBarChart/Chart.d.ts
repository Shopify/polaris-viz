import React from 'react';
import type { AnnotationLookupTable } from 'components/BarChart/types';
import { Dimensions, DataSeries, ChartType } from '../../types';
import type { RenderTooltipContentData, XAxisOptions, YAxisOptions } from '../BarChart';
export interface Props {
    data: DataSeries[];
    dimensions?: Dimensions;
    renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
    type: ChartType;
    xAxisOptions: Required<XAxisOptions>;
    yAxisOptions: Required<YAxisOptions>;
    annotationsLookupTable?: AnnotationLookupTable;
    emptyStateText?: string;
    isAnimated?: boolean;
    theme?: string;
}
export declare function Chart({ annotationsLookupTable, data, dimensions, renderTooltipContent, xAxisOptions, yAxisOptions, isAnimated, emptyStateText, theme, type, }: Props): JSX.Element;
//# sourceMappingURL=Chart.d.ts.map