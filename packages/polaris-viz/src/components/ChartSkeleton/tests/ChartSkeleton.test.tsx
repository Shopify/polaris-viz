import {ChartState} from '@shopify/polaris-viz-core';

import {ChartSkeleton} from '../ChartSkeleton';
import {
  mountWithProvider,
  mockDefaultTheme,
} from '../../../test-utilities/mountWithProvider';
import {Shimmer} from '../components';

const MOCK_PROPS = {
  dimensions: {
    width: 900,
    height: 400,
  },
};

describe('<ChartSkeleton />', () => {
  describe('<Shimmer/>', () => {
    it('is visible when state is set to loading', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton {...MOCK_PROPS} state={ChartState.Loading} />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).toContainReactComponent(Shimmer);
    });

    it('is NOT visible when state is set to error', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton {...MOCK_PROPS} state={ChartState.Error} />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).not.toContainReactComponent(Shimmer);
    });
  });

  describe('errorText', () => {
    it('is visible when state is set to error', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton
          {...MOCK_PROPS}
          state={ChartState.Error}
          errorText="some error msg"
        />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).toContainReactText('some error msg');
    });

    it('is NOT visible when state is set to loading', () => {
      const wrapper = mountWithProvider(
        <ChartSkeleton
          {...MOCK_PROPS}
          state={ChartState.Success}
          errorText="some error msg"
        />,
        mockDefaultTheme({chartContainer: {backgroundColor: 'red'}}),
      );
      expect(wrapper).not.toContainReactText('some error msg');
    });
  });
});
