import React from 'react';
import {mount, Root} from '@shopify/react-testing';

import {useBarSizes} from '../useBarSizes';

const MOCK_PROPS = {
  chartDimensions: {height: 400, width: 600},
  isSimple: false,
  isStacked: false,
  labelFormatter: (value: string) => value,
  seriesLength: 3,
  singleBarCount: 2,
  ticks: [0, 1, 2, 3, 4, 5],
};

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useBarSizes', () => {
  it('returns data', () => {
    function TestComponent() {
      const data = useBarSizes(MOCK_PROPS);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({
      bandwidth: 100,
      barHeight: 46,
      chartHeight: 390,
      groupBarsAreaHeight: 92,
      groupHeight: 130,
      tallestXAxisLabel: 0,
    });
  });

  it('returns data for multiple bars', () => {
    function TestComponent() {
      const data = useBarSizes({...MOCK_PROPS, singleBarCount: 3});

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({
      bandwidth: 100,
      barHeight: 30,
      chartHeight: 390,
      groupBarsAreaHeight: 90,
      groupHeight: 130,
      tallestXAxisLabel: 0,
    });
  });

  describe('isSimple', () => {
    it('returns shorter container height when true', () => {
      function TestComponent() {
        const data = useBarSizes({...MOCK_PROPS, isSimple: true});

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
        const data = useBarSizes({...MOCK_PROPS, isStacked: true});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.barHeight).toStrictEqual(92);
    });
  });
});
