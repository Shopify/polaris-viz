import type {DataSeries} from '@shopify/polaris-viz-core';

import type {TooltipOptions, RenderTooltipContentData} from '../types';
import {TooltipContent} from '../components/TooltipContent/TooltipContent';

import {formatDataForTooltip} from './formatDataForTooltip';

export function getTooltipContentRenderer({
  tooltipOptions = {},
  theme,
  data,
}: {
  tooltipOptions?: TooltipOptions;
  theme: string;
  data: DataSeries[];
}) {
  return function renderTooltipContent(tooltipData: RenderTooltipContentData) {
    if (tooltipOptions?.renderTooltipContent != null) {
      const {renderTooltipContent, ...formatters} = tooltipOptions;

      return renderTooltipContent({
        ...tooltipData,
        dataSeries: data,
        formatters,
        theme,
      });
    }

    const {title, formattedData} = formatDataForTooltip({
      data: tooltipData,
      tooltipOptions,
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
