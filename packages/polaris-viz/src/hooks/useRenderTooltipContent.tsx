import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {TooltipOptions, RenderTooltipContentData} from '../types';
import {formatDataForTooltip} from '../utilities';
import {TooltipContent} from '../components';

export function useRenderTooltipContent({
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
      return tooltipOptions.renderTooltipContent({
        ...tooltipData,
        dataSeries: data,
      });
    }

    const {title, formattedData} = formatDataForTooltip({
      data: tooltipData,
      tooltipOptions,
    });

    return <TooltipContent data={formattedData} theme={theme} title={title} />;
  };
}
