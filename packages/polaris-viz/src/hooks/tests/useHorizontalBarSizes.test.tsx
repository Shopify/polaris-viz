import React from 'react';
import {mount, Root} from '@shopify/react-testing';

import {useHorizontalBarSizes, Props} from '../useHorizontalBarSizes';

const MOCK_PROPS: Props = {
  chartDimensions: {height: 400, width: 600},
  isSimple: false,
  isStacked: false,
  seriesLength: 3,
  singleBarCount: 2,
  labelHeight: 15,
};

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useHorizontalBarSizes()', () => {
  it('returns data', () => {
    function TestComponent() {
      const data = useHorizontalBarSizes(MOCK_PROPS);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({
      barHeight: 44.333333333333336,
      chartHeight: 380,
      groupBarsAreaHeight: 88.66666666666667,
      groupHeight: 126.66666666666667,
    });
  });

  it('returns data for multiple bars', () => {
    function TestComponent() {
      const data = useHorizontalBarSizes({...MOCK_PROPS, singleBarCount: 3});

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({
      barHeight: 28.88888888888889,
      chartHeight: 380,
      groupBarsAreaHeight: 86.66666666666667,
      groupHeight: 126.66666666666667,
    });
  });

  describe('isSimple', () => {
    it('returns shorter container height when true', () => {
      function TestComponent() {
        const data = useHorizontalBarSizes({...MOCK_PROPS, isSimple: true});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.chartHeight).toStrictEqual(416);
      expect(data.groupBarsAreaHeight).toStrictEqual(100.66666666666666);
      expect(data.groupHeight).toStrictEqual(138.66666666666666);
    });
  });

  describe('isStacked', () => {
    it('returns single bar height when true', () => {
      function TestComponent() {
        const data = useHorizontalBarSizes({...MOCK_PROPS, isStacked: true});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.barHeight).toStrictEqual(88.66666666666667);
    });
  });
});
