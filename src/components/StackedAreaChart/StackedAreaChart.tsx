import React, {useRef} from 'react';

import type {
  LinearXAxisOptions,
  LinearYAxisOptions,
  DataSeries,
} from '../../types';
import {ChartContainer} from '../ChartContainer';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {uniqueId} from '../../utilities';

import {Chart} from './Chart';
import type {RenderTooltipContentData} from './types';

export interface StackedAreaChartProps {
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  data: DataSeries[];
  isAnimated?: boolean;
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<LinearXAxisOptions>;
  yAxisOptions?: Partial<LinearYAxisOptions>;
}

export function StackedAreaChart({
  xAxisOptions,
  yAxisOptions,
  data,
  renderTooltipContent,
  isAnimated = false,
  showLegend = true,
  skipLinkText,
  theme,
}: StackedAreaChartProps) {
  const skipLinkAnchorId = useRef(uniqueId('stackedAreaChart'));

  if (data.length === 0) {
    return null;
  }

  const xAxisOptionsWithDefaults: Required<LinearXAxisOptions> = {
    labelFormatter: (value: string) => value,
    useMinimalLabels: false,
    xAxisLabels: [],
    hide: false,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults: Required<LinearYAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({
    title,
    data,
  }: RenderTooltipContentData) {
    const formattedData = data.map(({color, label, value}) => ({
      color,
      label,
      value: yAxisOptionsWithDefaults.labelFormatter(value),
    }));

    return <TooltipContent theme={theme} title={title} data={formattedData} />;
  }

  return (
    <React.Fragment>
      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        <Chart
          data={data}
          isAnimated={isAnimated}
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
          showLegend={showLegend}
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
        />
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
