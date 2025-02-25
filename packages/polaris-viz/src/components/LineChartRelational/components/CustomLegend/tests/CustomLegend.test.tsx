/* eslint-disable @shopify/strict-component-boundaries */
import {mount} from '@shopify/react-testing';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import type {Props} from '../CustomLegend';
import {CustomLegend} from '../CustomLegend';
import {LegendItem} from '../../../../Legend';
import {HiddenLegendTooltip} from '../../../../LegendContainer/components/HiddenLegendTooltip';
import {useChartContextMock} from '../../../../../../../../tests/setup/tests';

describe('<CustomLegend />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  describe('lineStyle', () => {
    it('renders a LegendItem with the lineStyle from metadata.lineStyle', () => {
      const component = mount(<CustomLegend {...MOCK_PROPS} />);

      expect(component).toContainReactComponent(LegendItem, {
        lineStyle: 'dashed',
      });
    });
  });

  describe('HiddenLegendTooltip', () => {
    it('shows HiddenLegendTooltip when container does not fit all legend items', () => {
      useChartContextMock.mockReturnValue({
        containerBounds: {width: 20, height: 250, x: 0, y: 0},
      });

      const component = mount(<CustomLegend {...MOCK_PROPS} />);

      expect(component).toContainReactComponent(HiddenLegendTooltip);
      expect(component).toContainReactText('+1 more');
    });

    it('does not show HiddenLegendTooltip when container fits all legend items', () => {
      useChartContextMock.mockReturnValue({
        containerBounds: {width: 1200, height: 250, x: 0, y: 0},
      });

      const component = mount(<CustomLegend {...MOCK_PROPS} />);

      expect(component).not.toContainReactComponent(HiddenLegendTooltip);
    });
  });
});

const MOCK_PROPS: Props = {
  data: [
    {
      name: 'Average',
      data: [{value: 333, key: '2020-03-01T12:00:00'}],
      metadata: {
        lineStyle: 'dashed',
      },
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
  activeIndex: 0,
};
