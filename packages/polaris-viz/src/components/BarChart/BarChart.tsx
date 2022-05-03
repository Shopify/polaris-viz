import React, {useRef} from 'react';
import {
  uniqueId,
  ChartType,
  DataSeries,
  ChartState,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';
import type {
  Direction,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../components/ChartContainer';
import type {
  TooltipAnnotation,
  RenderTooltipContentData,
  Annotation,
} from '../../types';
import {TooltipContent} from '../';
import {SkipLink} from '../SkipLink';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
  normalizeData,
} from '../../utilities';
import {HorizontalBarChart} from '../HorizontalBarChart';
import {VerticalBarChart} from '../VerticalBarChart';
import {ChartSkeleton} from '../../components/ChartSkeleton';

import {formatDataForTooltip} from './utilities';

export interface BarChartProps {
  data: DataSeries[];
  state?: ChartState;
  errorText?: string;
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
  state = ChartState.Success,
  errorText,
  direction = 'vertical',
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  showLegend = true,
  skipLinkText,
  theme = DEFAULT_THEME_NAME,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: BarChartProps) {
  const skipLinkAnchorId = useRef(uniqueId('BarChart'));

  const emptyState = data.length === 0;
  const hideSkipLink =
    skipLinkText == null || skipLinkText.length === 0 || emptyState;

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'startIndex');

  function renderTooltip(tooltipData: RenderTooltipContentData) {
    if (renderTooltipContent != null) {
      return renderTooltipContent({
        ...tooltipData,
        dataSeries: data,
      });
    }

    const {title, formattedData} = formatDataForTooltip({
      data: tooltipData,
      direction,
      xAxisOptions: xAxisOptionsWithDefaults,
      yAxisOptions: yAxisOptionsWithDefaults,
    });

    const annotation = annotationsLookupTable[tooltipData.activeIndex];
    const annotations: TooltipAnnotation[] = [];

    if (annotation) {
      annotations.push({
        key: annotation.tooltipData?.key ?? '',
        value: annotation.tooltipData?.value ?? '',
      });
    }

    return (
      <TooltipContent
        annotations={annotations}
        data={formattedData}
        theme={theme}
        title={title}
      />
    );
  }
  const ChartByDirection =
    direction === 'vertical' ? (
      <VerticalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        emptyStateText={emptyStateText}
        isAnimated={isAnimated}
        renderTooltipContent={renderTooltip}
        showLegend={showLegend}
        theme={theme}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
      />
    ) : (
      <HorizontalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        isAnimated={isAnimated}
        renderTooltipContent={renderTooltip}
        showLegend={showLegend}
        theme={theme}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
      />
    );
  return (
    <React.Fragment>
      {hideSkipLink ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          ChartByDirection
        )}
      </ChartContainer>

      {hideSkipLink ? null : <SkipLink.Anchor id={skipLinkAnchorId.current} />}
    </React.Fragment>
  );
}
