/* eslint-disable no-console */
import type {DataGroup, DataSeries} from '@shopify/polaris-viz-core';

import {ChartSkeleton} from '../../ChartSkeleton';
import {ChartErrorBoundary} from '../ChartErrorBoundary';
import {mountWithProvider} from '../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';

const MOCK_PROPS = {
  data: [],
  containerDimensions: {
    width: 900,
    height: 400,
  },
};

function Child() {
  throw new Error();
}

const warnMock = jest.spyOn(console, 'warn').mockImplementation();

describe('<ChartErrorBoundary />', () => {
  const realError = console.error;

  beforeAll(() => {
    // Remove the error message from the console because
    // we're expected to have an error.
    console.error = (...x) => {};
  });

  afterEach(() => {
    warnMock.mockReset();
  });

  afterAll(() => {
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

  describe('checkForMismatchedData()', () => {
    it('displays a warning when DataSeries is mismatched', () => {
      const badData: DataSeries[] = [
        {
          name: '',
          data: [
            {key: '', value: 1},
            {key: '', value: 1},
          ],
        },
        {
          name: '',
          data: [{key: '', value: 2}],
        },
      ];

      mountWithProvider(
        <ChartErrorBoundary type="Default" {...MOCK_PROPS} data={badData}>
          <Child />
        </ChartErrorBoundary>,
      );

      expect(warnMock.mock.calls[0][0]).toStrictEqual(
        'The DataSeries[] provided does not have equal series values.',
      );
    });

    it('displays a warning when DataGroup is mismatched', () => {
      const badData: DataGroup[] = [
        {
          shape: 'Line',
          series: [
            {
              name: '',
              data: [
                {key: '', value: 1},
                {key: '', value: 1},
              ],
            },
            {
              name: '',
              data: [{key: '', value: 2}],
            },
          ],
        },
        {
          shape: 'Bar',
          series: [
            {
              name: '',
              data: [
                {key: '', value: 1},
                {key: '', value: 1},
              ],
            },
            {
              name: '',
              data: [{key: '', value: 2}],
            },
          ],
        },
      ];

      mountWithProvider(
        <ChartErrorBoundary type="Default" {...MOCK_PROPS} data={badData}>
          <Child />
        </ChartErrorBoundary>,
      );

      expect(warnMock.mock.calls[0][0]).toStrictEqual(
        'The DataGroup[] provided does not have equal series values.',
      );
    });
  });

  describe('onError', () => {
    it('calls onError when provided', () => {
      const onErrorSpy = jest.fn();

      mountWithProvider(
        <ChartErrorBoundary type="Default" {...MOCK_PROPS} onError={onErrorSpy}>
          <Child />
        </ChartErrorBoundary>,
      );
      expect(onErrorSpy).toHaveBeenCalled();
    });
  });
});
