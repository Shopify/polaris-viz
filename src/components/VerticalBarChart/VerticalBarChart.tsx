import React, {useRef} from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {uniqueId} from '../../utilities';
import {useTheme, useThemeSeriesColors} from '../../hooks';
import type {ChartType, DataSeries} from '../../types';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from '../BarChart';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;

  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  type?: ChartType;
}

export function VerticalBarChart({
  data,
  renderTooltipContent,
  skipLinkText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  emptyStateText,
  theme,
  type = 'default',
}: VerticalBarChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const skipLinkAnchorId = useRef(uniqueId('VerticalBarChart'));

  const emptyState = data.length === 0;

  const xAxisOptionsWithDefaults: XAxisOptions = {
    labelFormatter: (value: string) => value,
    wrapLabels: true,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(({label, value, color}) => ({
      color,
      label,
      value: yAxisOptionsWithDefaults.labelFormatter(value),
    }));

    return <TooltipContent theme={theme} data={formattedData} />;
  }

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <React.Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      emptyState ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        <Chart
          data={seriesWithDefaults}
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
          isAnimated={isAnimated}
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
          emptyStateText={emptyStateText}
          type={type}
        />
      </ChartContainer>

      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      emptyState ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
