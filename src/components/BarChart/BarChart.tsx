import React, {useRef} from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {SkipLink} from '../SkipLink';
import {TooltipContent} from '../TooltipContent';
import {uniqueId} from '../../utilities';
import {useTheme, useThemeSeriesColors} from '../../hooks';
import type {DataSeries} from '../../types';

import {Chart} from './Chart';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from './types';

export interface BarChartProps {
  data: DataSeries[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;

  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function BarChart({
  data,
  barOptions = {isStacked: false},
  renderTooltipContent,
  skipLinkText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  emptyStateText,
  theme,
}: BarChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const skipLinkAnchorId = useRef(uniqueId('BarChart'));

  const emptyState = data.length === 0;

  const xAxisOptionsWithDefaults: XAxisOptions = {
    labelFormatter: (value: string) => value,
    labels: [],
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
          isStacked={barOptions.isStacked}
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
