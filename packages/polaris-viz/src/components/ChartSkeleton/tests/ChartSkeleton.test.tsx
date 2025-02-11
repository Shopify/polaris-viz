import {ChartState} from '@shopify/polaris-viz-core';

import {ChartSkeleton} from '../ChartSkeleton';
import {
  mountWithProvider,
  mockDefaultTheme,
} from '../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {Shimmer} from '../components';
import {DEFAULT_CHART_CONTEXT as MOCK_DEFAULT_CHART_CONTEXT} from '../../../storybook/constants';

jest.mock('@shopify/polaris-viz-core/src/hooks/useChartContext', () => ({
  useChartContext: jest.fn(() => ({
    ...MOCK_DEFAULT_CHART_CONTEXT,
    containerBounds: {height: 400, width: 800, x: 0, y: 0},
  })),
}));

describe('<ChartSkeleton />', () => {
  describe('<Shimmer/>', () => {
    it('is visible when state is set to loading', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton state={ChartState.Loading} />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).toContainReactComponent(Shimmer);
    });

    it('is NOT visible when state is set to error', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton state={ChartState.Error} />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).not.toContainReactComponent(Shimmer);
    });
  });

  describe('errorText', () => {
    it('is visible when state is set to error', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton state={ChartState.Error} errorText="some error msg" />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).toContainReactText('some error msg');
    });

    it('is NOT visible when state is set to loading', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton state={ChartState.Success} errorText="some error msg" />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).not.toContainReactText('some error msg');
    });
  });
});
