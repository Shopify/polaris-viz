import React from 'react';
import { Dimensions } from '../../types';
import type { RenderTooltipContentData, XAxisOptions, YAxisOptions, DataWithDefaults } from './types';
interface Props {
    isAnimated: boolean;
    renderTooltipContent: (data: RenderTooltipContentData) => React.ReactNode;
    data: DataWithDefaults[];
    xAxisOptions: XAxisOptions;
    yAxisOptions: Required<YAxisOptions>;
    emptyStateText?: string;
    theme?: string;
    dimensions?: Dimensions;
}
export declare function Chart({ data, dimensions, renderTooltipContent, emptyStateText, isAnimated, xAxisOptions, yAxisOptions, theme, }: Props): JSX.Element | null;
export {};
//# sourceMappingURL=Chart.d.ts.map