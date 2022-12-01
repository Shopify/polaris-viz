import type {Meta} from '@storybook/react';

import {PageWithSizingInfo} from '../../Docs/stories';
import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_ARGS,
  LEGEND_POSITION_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {SimpleNormalizedChart} from '../SimpleNormalizedChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/SimpleNormalizedChart',
  component: SimpleNormalizedChart,
  parameters: {
    controls: CONTROLS_ARGS,
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used for positive datasets with two to four items. If your dataset has more than four items, consider grouping the fourth item and the remainder into an “other” category before passing data to the component.  ',
      },
    },
  },
  argTypes: {
    data: DATA_ARGS,
    direction: {description: 'Determines the direction of the chart.'},
    size: {
      description:
        'Determines the width or height of the bar segments depending on `direction`.',
    },
    legendPosition: LEGEND_POSITION_ARGS,
    renderLegendContent: RENDER_LEGEND_CONTENT_ARGS,
    showLegend: {
      description: 'Shows the legend for the chart.',
    },
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};
