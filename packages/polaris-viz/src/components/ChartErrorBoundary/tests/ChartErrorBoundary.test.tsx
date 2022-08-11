import React from 'react';

import {ChartSkeleton} from '../../ChartSkeleton';
import {ChartErrorBoundary} from '../ChartErrorBoundary';
import {mountWithProvider} from '../../../test-utilities/mountWithProvider';

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
  // eslint-disable-next-line no-console
  const realError = console.error;

  beforeAll(() => {
    // Remove the error message from the console because
    // we're expected to have an error.
    // eslint-disable-next-line no-console
    console.error = (...x) => {};
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    console.error = realError;
  });

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
          <div>Visible!</div>
        </ChartErrorBoundary>,
      );
      expect(wrapper.text()).toBe('Visible!');
    });
  });
});
