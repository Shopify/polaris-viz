import {DEFAULT_CHART_PROPS} from '@shopify/polaris-viz-core';
import {Fragment} from 'react';

import type {LineChartProps} from '../LineChart';
import {LineChart} from '../LineChart';

import {RelatedAreas, MissingDataArea} from './components';

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
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
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
      slots={{
        chart: (props) => {
          return (
            <Fragment>
              <MissingDataArea {...props} data={data} />
              <RelatedAreas {...props} data={data} />
            </Fragment>
          );
        },
      }}
      state={state}
      theme={theme}
      tooltipOptions={tooltipOptions}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
    />
  );
}
