import React, {useRef} from 'react';

import {TooltipContent} from '../TooltipContent';
import {SkipLink} from '../SkipLink';
import {uniqueId} from '../../utilities';
import {HorizontalBarChart} from '../HorizontalBarChart';
import type {ChartType, DataSeries, Direction} from '../../types';
import {VerticalBarChart} from '../VerticalBarChart';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from '../BarChart';

export interface BarChartProps {
  data: DataSeries[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;

  direction?: Direction;
  emptyStateText?: string;
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function BarChart({
  data,
  direction = 'vertical',
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  skipLinkText,
  theme,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: BarChartProps) {
  const skipLinkAnchorId = useRef(uniqueId('BarChart'));

  const emptyState = data.length === 0;
  const hideSkipLink =
    skipLinkText == null || skipLinkText.length === 0 || emptyState;

  const xAxisOptionsForChart: XAxisOptions = {
    labelFormatter: (value: string) => value,
    hide: false,
    wrapLabels: false,
    ...xAxisOptions,
  };

  function renderTooltip({data}: RenderTooltipContentData) {
    if (renderTooltipContent != null) {
      return renderTooltipContent({data});
    }

    const tooltipData = data.map(({value, label, color}) => {
      return {
        label,
        value: xAxisOptionsForChart.labelFormatter!(value),
        color,
      };
    });

    return <TooltipContent data={tooltipData} theme={theme} />;
  }

  return (
    <React.Fragment>
      {hideSkipLink ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}

      {direction === 'vertical' ? (
        <VerticalBarChart
          data={data}
          xAxisOptions={xAxisOptionsForChart}
          yAxisOptions={yAxisOptions}
          theme={theme}
          type={type}
          emptyStateText={emptyStateText}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltip}
        />
      ) : (
        <HorizontalBarChart
          data={data}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltip}
          theme={theme}
          type={type}
          xAxisOptions={xAxisOptionsForChart}
        />
      )}

      {hideSkipLink ? null : <SkipLink.Anchor id={skipLinkAnchorId.current} />}
    </React.Fragment>
  );
}
