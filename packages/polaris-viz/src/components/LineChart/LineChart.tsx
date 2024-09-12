import {Fragment, useRef} from 'react';
import type {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {
  InternalChartType,
  uniqueId,
  ChartState,
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {getTooltipContentRenderer} from '../../utilities/getTooltipContentRenderer';
import {fillMissingDataPoints} from '../../utilities/fillMissingDataPoints';
import {getLineChartDataWithDefaults} from '../../utilities/getLineChartDataWithDefaults';
import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../../components/ChartSkeleton';
import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
  normalizeData,
} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {useTheme} from '../../hooks';
import type {
  Annotation,
  LineChartSlotProps,
  RenderLegendContent,
  TooltipOptions,
} from '../../types';

import {Chart} from './Chart';

export type LineChartProps = {
  annotations?: Annotation[];
  errorText?: string;
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
  renderHiddenLegendLabel?: (count: number) => string;
  seriesNameFormatter?: LabelFormatter;
  showLegend?: boolean;
  hideLegendOverflow?: boolean;
  scrollElement?: HTMLElement;
  skipLinkText?: string;
  tooltipOptions?: TooltipOptions;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  slots?: {
    chart?: (props: LineChartSlotProps) => JSX.Element;
  };
} & ChartProps;

export function LineChart(props: LineChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    annotations = [],
    data: dataSeries,
    emptyStateText,
    errorText,
    id,
    isAnimated,
    onError,
    renderLegendContent,
    renderHiddenLegendLabel,
    seriesNameFormatter = (value) => `${value}`,
    showLegend = true,
    hideLegendOverflow = true,
    skipLinkText,
    state,
    theme = defaultTheme,
    tooltipOptions,
    xAxisOptions,
    yAxisOptions,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const data = fillMissingDataPoints(dataSeries, true);

  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const renderTooltip = getTooltipContentRenderer({
    tooltipOptions,
    theme,
    data,
  });
  const annotationsLookupTable = normalizeData(annotations, 'startKey');

  const dataWithDefaults = getLineChartDataWithDefaults(data, seriesColors);

  return (
    <Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      data.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer
        id={id}
        data={data}
        theme={theme}
        isAnimated={isAnimated}
        scrollElement={props.scrollElement}
        type={InternalChartType.Line}
        onError={onError}
      >
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          <Chart
            annotationsLookupTable={annotationsLookupTable}
            data={dataWithDefaults}
            emptyStateText={emptyStateText}
            renderLegendContent={renderLegendContent}
            renderTooltipContent={renderTooltip}
            renderHiddenLegendLabel={renderHiddenLegendLabel}
            seriesNameFormatter={seriesNameFormatter}
            showLegend={showLegend}
            hideLegendOverflow={hideLegendOverflow}
            theme={theme}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            slots={props.slots}
          />
        )}
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </Fragment>
  );
}
