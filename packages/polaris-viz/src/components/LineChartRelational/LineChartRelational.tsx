import type {WithRequired} from '@shopify/polaris-viz-core';
import {DEFAULT_CHART_PROPS} from '@shopify/polaris-viz-core';

import type {LineChartProps} from '../LineChart';
import {LineChart} from '../LineChart';

import {renderTooltipContent} from './utilities/renderTooltipContent';
import {RelatedArea} from './components';

export function LineChartRelational(props: LineChartProps) {
  const {
    annotations = [],
    data,
    errorText,
    emptyStateText,
    id,
    isAnimated,
    renderLegendContent,
    showLegend = true,
    skipLinkText,
    state,
    theme,
    tooltipOptions,
    xAxisOptions,
    yAxisOptions,
  }: WithRequired<LineChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const tooltipOptionsWithDefaults = {
    ...tooltipOptions,
    renderTooltipContent: (data) => renderTooltipContent(data, theme),
  };

  return (
    <LineChart
      annotations={annotations}
      data={data}
      emptyStateText={emptyStateText}
      errorText={errorText}
      id={id}
      isAnimated={isAnimated}
      renderLegendContent={renderLegendContent}
      showLegend={showLegend}
      skipLinkText={skipLinkText}
      slots={{chart: (props) => <RelatedArea {...props} data={data} />}}
      state={state}
      theme={theme}
      tooltipOptions={tooltipOptionsWithDefaults}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
    />
  );
}
