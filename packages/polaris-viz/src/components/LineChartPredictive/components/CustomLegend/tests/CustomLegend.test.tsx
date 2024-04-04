import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

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

      expect(component).toContainReactText('Name: Series one');
    });
  });
});

const MOCK_PROPS: Props = {
  data: [
    {
      name: 'Series one',
      data: [{value: 88, key: '2020-03-01T12:00:00'}],
    },
  ],
  predictiveSeriesNames: [],
  seriesNameFormatter: (value) => `${value}`,
  theme: 'Default',
  getColorVisionEventAttrs: jest.fn(),
  getColorVisionStyles: jest.fn(),
};
