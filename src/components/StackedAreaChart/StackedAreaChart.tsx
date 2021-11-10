import React, {useRef} from 'react';

import {ChartContainer} from '../ChartContainer';
import {SkipLink} from '../SkipLink';
import type {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {TooltipContent} from '../TooltipContent';
import {uniqueId} from '../../utilities';

import {Chart} from './Chart';
import type {Series, RenderTooltipContentData} from './types';

export interface StackedAreaChartProps {
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  xAxisOptions: {
    labels: string[];
    formatLabel?: StringLabelFormatter;
    hide?: boolean;
    wrapLabels?: boolean;
  };
  yAxisOptions?: {
    formatLabel?: NumberLabelFormatter;
  };
  series: Series[];
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
}

export function StackedAreaChart({
  xAxisOptions,
  yAxisOptions,
  series,
  renderTooltipContent,
  isAnimated = false,
  skipLinkText,
  theme,
}: StackedAreaChartProps) {
  const skipLinkAnchorId = useRef(uniqueId('stackedAreaChart'));

  if (series.length === 0) {
    return null;
  }

  const yFormatter =
    yAxisOptions?.formatLabel ?? ((value: number) => value.toString());

  const xFormatter = xAxisOptions.formatLabel ?? ((value: string) => value);

  function renderDefaultTooltipContent({
    title,
    data,
  }: RenderTooltipContentData) {
    const formattedData = data.map(({color, label, value}) => ({
      color,
      label,
      value: yFormatter(value),
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
          xAxisOptions={xAxisOptions}
          series={series}
          formatXAxisLabel={xFormatter}
          formatYAxisLabel={yFormatter}
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
          isAnimated={isAnimated}
        />
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
