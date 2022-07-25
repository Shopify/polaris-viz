import React from 'react';

import {ChartSkeleton, SkeletonType} from '../../ChartSkeleton';
import {ChartErrorBoundary} from '../ChartErrorBoundary';
import {
  mountWithProvider,
  mockDefaultTheme,
} from '../../../test-utilities/mountWithProvider';

const MOCK_PROPS = {
  dimensions: {
    width: 900,
    height: 400,
  },
};

function Child() {
  throw new Error();
}

describe('<ChartErrorBoundary />', () => {
  describe('<ChartSkeleton />', () => {
    it('is visible when an error occurs', () => {
      const wrapper = mountWithProvider(
        <ChartErrorBoundary type="Default" {...MOCK_PROPS}>
          <Child />
        </ChartErrorBoundary>,
      );
      expect(wrapper).toContainReactComponent(ChartSkeleton);
    });

    it('is not visible when an error does not occur', () => {
      const wrapper = mountWithProvider(
        <ChartErrorBoundary type="Default" {...MOCK_PROPS}>
          <div>This should be visible!</div>
        </ChartErrorBoundary>,
      );
      expect(wrapper).toContainReactComponent('div');
    });
  });
});
