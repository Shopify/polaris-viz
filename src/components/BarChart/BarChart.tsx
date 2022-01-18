import React, {useRef} from 'react';

import {TooltipContent} from '../TooltipContent';
import {SkipLink} from '../SkipLink';
import {uniqueId, normalizeData} from '../../utilities';
import {HorizontalBarChart} from '../HorizontalBarChart';
import type {ChartType, DataSeries, Direction} from '../../types';
import {VerticalBarChart} from '../VerticalBarChart';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from '../BarChart';

import type {Annotation} from './types';

export interface BarChartProps {
  data: DataSeries[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;

  annotations?: Annotation[];
  direction?: Direction;
  emptyStateText?: string;
  isAnimated?: boolean;
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function BarChart({
  annotations = [],
  data,
  direction = 'vertical',
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  showLegend = false,
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

  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    wrapLabels: false,
    useMinimalLabels: false,
    ...xAxisOptions,
  };

  const yAxisOptionsForChart: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  function renderTooltip({data}: RenderTooltipContentData) {
    if (renderTooltipContent != null) {
      return renderTooltipContent({data});
    }

    const tooltipData = data.map(({value, label, color, type}) => {
      return {
        label,
        value: yAxisOptionsForChart.labelFormatter(value),
        color,
        type,
      };
    });

    return <TooltipContent data={tooltipData} theme={theme} />;
  }
  const annotationsLookupTable = normalizeData(annotations, 'dataSeriesIndex');

  return (
    <React.Fragment>
      {hideSkipLink ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}

      {direction === 'vertical' ? (
        <VerticalBarChart
          annotationsLookupTable={annotationsLookupTable}
          data={data}
          emptyStateText={emptyStateText}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltip}
          showLegend={showLegend}
          theme={theme}
          type={type}
          xAxisOptions={xAxisOptionsForChart}
          yAxisOptions={yAxisOptionsForChart}
        />
      ) : (
        <HorizontalBarChart
          annotationsLookupTable={annotationsLookupTable}
          data={data}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltip}
          theme={theme}
          showLegend={showLegend}
          type={type}
          xAxisOptions={xAxisOptionsForChart}
        />
      )}

      {hideSkipLink ? null : <SkipLink.Anchor id={skipLinkAnchorId.current} />}
    </React.Fragment>
  );
}
