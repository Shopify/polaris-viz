import {mount} from '@shopify/react-testing';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import type {Props} from '../CustomLegend';
import {CustomLegend} from '../CustomLegend';

describe('<CustomLegend />', () => {
  describe('seriesNameFormatter', () => {
    it('renders formatted series name', () => {
      const component = mount(
        <CustomLegend
          {...MOCK_PROPS}
          seriesNameFormatter={(value) => `Name: ${value}`}
        />,
      );

      expect(component).toContainReactText('Name: Average');
      expect(component).toContainReactText('Name: 75th - 25th percentile');
    });
  });
});

const MOCK_PROPS: Props = {
  data: [
    {
      name: 'Average',
      data: [{value: 333, key: '2020-03-01T12:00:00'}],
    },
    {
      name: '75th Percentile',
      data: [{value: 388, key: '2020-03-01T12:00:00'}],
      metadata: {
        relatedIndex: 2,
        legendLabel: '75th - 25th percentile',
      },
    },
    {
      name: 'Median',
      data: [{value: 238, key: '2020-03-01T12:00:00'}],
    },
    {
      name: '25th percentile',
      data: [{value: 88, key: '2020-03-01T12:00:00'}],
      metadata: {
        relatedIndex: 2,
        legendLabel: '75th - 25th percentile',
      },
    },
  ],
  seriesNameFormatter: (value) => `${value}`,
  theme: DEFAULT_THEME_NAME,
  getColorVisionEventAttrs: jest.fn(),
  getColorVisionStyles: jest.fn(),
};
