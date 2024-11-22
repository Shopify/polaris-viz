import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '..';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

const numberStyles = {
  fontWeight: 600,
  fontFamily:
    "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
};

export const CustomInnerValueContent: StoryFn<DonutChartProps> = Template.bind(
  {},
);

CustomInnerValueContent.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  renderInnerValueContent: ({activeValue, animatedTotalValue, totalValue}) => {
    const activeValuePercentage =
      activeValue === null || activeValue === undefined
        ? null
        : `${((activeValue / totalValue) * 100).toFixed(1)}%`;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        {activeValuePercentage && (
          <p
            style={{
              fontSize: 36,
              margin: 0,
              ...numberStyles,
            }}
          >
            {activeValuePercentage}
          </p>
        )}
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            margin: '8px 0',
          }}
        >
          Total:
          <span
            style={{
              fontSize: 20,
              ...numberStyles,
            }}
          >
            {animatedTotalValue}
          </span>
        </p>
      </div>
    );
  },
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/CustomInnerValueContent'} as any;