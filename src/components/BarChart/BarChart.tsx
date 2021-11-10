import React, {useRef} from 'react';

import type {XAxisOptions, YAxisOptions} from '../../types';
import {SkipLink} from '../SkipLink';
import {uniqueId, normalizeData} from '../../utilities';
import {ChartContainer} from '../ChartContainer';

import {TooltipContent} from './components';
import {Chart} from './Chart';
import type {
  BarChartData,
  RenderTooltipContentData,
  Annotation,
  AnnotationLookupTable,
} from './types';

export interface BarChartProps {
  data: BarChartData[];
  annotations?: Annotation[];
  skipLinkText?: string;
  emptyStateText?: string;
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  xAxisOptions?: XAxisOptions;
  yAxisOptions?: YAxisOptions;
  theme?: string;
}

export function BarChart({
  data,
  annotations,
  renderTooltipContent,
  emptyStateText,
  isAnimated = false,
  skipLinkText,
  xAxisOptions,
  yAxisOptions,
  theme,
}: BarChartProps) {
  const skipLinkAnchorId = useRef(uniqueId('barChart'));

  const emptyState = data.length === 0;

  const xAxisOptionsWithDefaults = {
    labelFormatter: (value: string) => value,
    useMinimalLabels: false,
    wrapLabels: true,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({
    label,
    value,
    annotation,
  }: RenderTooltipContentData) {
    const formattedLabel = xAxisOptionsWithDefaults.labelFormatter(label);
    const formattedValue = yAxisOptionsWithDefaults.labelFormatter(value);
    return (
      <TooltipContent
        label={formattedLabel}
        value={formattedValue}
        annotation={annotation}
        theme={theme}
      />
    );
  }

  let annotationsLookupTable: AnnotationLookupTable = {};
  if (annotations != null && annotations.length > 0) {
    annotationsLookupTable = normalizeData(annotations, 'dataIndex');
  }

  return (
    <React.Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      emptyState ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        <Chart
          isAnimated={isAnimated}
          data={data}
          annotationsLookupTable={annotationsLookupTable}
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
          emptyStateText={emptyStateText}
        />
      </ChartContainer>

      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      emptyState ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
    </React.Fragment>
  );
}
