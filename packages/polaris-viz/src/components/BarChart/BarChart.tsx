import React, {useRef} from 'react';
import {
  uniqueId,
  ChartType,
  DataSeries,
  IS_ANIMATED_DEFAULT,
} from '@shopify/polaris-viz-core';
import type {
  Direction,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import type {TooltipAnnotation, RenderTooltipContentData} from '../../types';
import {TooltipContent} from '../';
import {SkipLink} from '../SkipLink';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
  normalizeData,
} from '../../utilities';
import {HorizontalBarChart} from '../HorizontalBarChart';
import {VerticalBarChart} from '../VerticalBarChart';

import type {Annotation} from './types';
import {formatDataForTooltip} from './utilities';

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
  isAnimated = IS_ANIMATED_DEFAULT,
  renderTooltipContent,
  showLegend = true,
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

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'dataSeriesIndex');

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
      )}

      {hideSkipLink ? null : <SkipLink.Anchor id={skipLinkAnchorId.current} />}
    </React.Fragment>
  );
}
