import React from 'react';
import { StringLabelFormatter, NumberLabelFormatter, Dimensions, DataSeries } from '../../types';
import type { RenderTooltipContentData } from './types';
export interface Props {
    xAxisOptions: {
        labels: string[];
        wrapLabels?: boolean;
        hide?: boolean;
    };
    data: DataSeries[];
    formatXAxisLabel: StringLabelFormatter;
    formatYAxisLabel: NumberLabelFormatter;
    renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
    dimensions?: Dimensions;
    isAnimated: boolean;
    theme?: string;
}
export declare function Chart({ xAxisOptions, data, dimensions, formatXAxisLabel, formatYAxisLabel, renderTooltipContent, isAnimated, theme, }: Props): JSX.Element | null;
//# sourceMappingURL=Chart.d.ts.map