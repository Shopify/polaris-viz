import type {DataSeries} from '@shopify/polaris-viz-core';

import type {
  RenderTooltipContentData,
  RenderTooltipContent,
  Formatters,
} from '../types';
import {formatDataForTooltip} from '../utilities';
import {TooltipContent} from '../components';

export function getTooltipContentRenderer({
  data,
  formatters,
  renderTooltipContent: renderTooltipContentCallback,
  theme,
}: {
  data: DataSeries[];
  formatters: Formatters;
  theme: string;
  renderTooltipContent?: RenderTooltipContent;
}) {
  return function renderTooltipContent(tooltipData: RenderTooltipContentData) {
    if (renderTooltipContentCallback != null) {
      return renderTooltipContentCallback({
        ...tooltipData,
        dataSeries: data,
        formatters,
        theme,
      });
    }

    const {title, formattedData} = formatDataForTooltip({
      data: tooltipData,
      formatters,
    });

    if (formattedData[0].data.length === 0) {
      return null;
    } else {
      return (
        <TooltipContent data={formattedData} theme={theme} title={title} />
      );
    }
  };
}
