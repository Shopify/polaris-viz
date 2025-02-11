import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import type {DataSeries, DataGroup} from '@shopify/polaris-viz-core';

import {useChartContextMock} from '../../../../../../../tests/setup/tests';
import type {Props} from '../useLegend';
import {useLegend} from '../useLegend';
import {DEFAULT_CHART_CONTEXT as MOCK_DEFAULT_CHART_CONTEXT} from '../../../../storybook/constants';

const DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [],
  },
  {
    name: 'Lunch',
    data: [],
  },
  {
    name: 'Dinner',
    data: [],
  },
];

const DATAGROUP: DataGroup[] = [
  {
    shape: 'Line',
    series: DATA,
  },
  {
    shape: 'Bar',
    series: DATA,
  },
];

const MOCK_PROPS: Props = {
  showLegend: true,
  data: DATAGROUP,
  seriesNameFormatter: (value) => `${value}`,
};

function parseData(result: Root<any>) {
  return JSON.parse(result.find('span')!.domNode!.dataset.data!);
}

describe('useLegend()', () => {
  beforeAll(() => {
    useChartContextMock.mockReturnValue({
      ...MOCK_DEFAULT_CHART_CONTEXT,
      containerBounds: {height: 100, width: 100},
    });
  });

  describe('showLegend', () => {
    it('returns data', () => {
      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        legend: [
          {name: 'Breakfast', shape: 'Line', value: '0', isHidden: false},
          {name: 'Lunch', shape: 'Line', value: '0', isHidden: false},
          {name: 'Dinner', shape: 'Line', value: '0', isHidden: false},
          {name: 'Breakfast', shape: 'Bar', value: '0', isHidden: false},
          {name: 'Lunch', shape: 'Bar', value: '0', isHidden: false},
          {name: 'Dinner', shape: 'Bar', value: '0', isHidden: false},
        ],
        height: 60,
        width: 100,
      });
    });

    it('returns empty data when false', () => {
      const result = mount(<TestComponent showLegend={false} />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        legend: [],
        height: 100,
        width: 100,
      });
    });

    it('mounts after initializing', () => {
      const result = mount(<TestComponent />);

      result.act(() => {
        requestAnimationFrame(() => {
          const data = parseData(result);
          expect(data).toStrictEqual({
            legend: [
              {name: 'Breakfast', shape: 'Line'},
              {name: 'Lunch', shape: 'Line'},
              {name: 'Dinner', shape: 'Line'},
              {name: 'Breakfast', shape: 'Bar'},
              {name: 'Lunch', shape: 'Bar'},
              {name: 'Dinner', shape: 'Bar'},
            ],
            height: 100,
            width: 100,
          });
        });
      });
    });
  });

  describe('type', () => {
    it('adds type `Line` to legend', () => {
      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[0].shape).toStrictEqual('Line');
    });

    it('adds type `Bar` to legend', () => {
      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[3].shape).toStrictEqual('Bar');
    });
  });

  describe('colors', () => {
    it('uses color when no data.color is available', () => {
      const result = mount(
        <TestComponent
          colors={['red']}
          data={[
            {
              shape: 'Bar',
              series: [
                {
                  name: 'Breakfast',
                  data: [],
                },
              ],
            },
          ]}
        />,
      );

      const data = parseData(result);

      expect(data.legend[0].color).toStrictEqual('red');
    });

    it('uses data.color when available', () => {
      const result = mount(
        <TestComponent
          colors={['red']}
          data={[
            {
              shape: 'Bar',
              series: [
                {
                  name: 'Breakfast',
                  data: [],
                  color: 'blue',
                },
              ],
            },
          ]}
        />,
      );

      const data = parseData(result);

      expect(data.legend[0].color).toStrictEqual('blue');
    });
  });

  describe('seriesNameFormatter', () => {
    it('returns true when showLegend=false', () => {
      const result = mount(
        <TestComponent seriesNameFormatter={(value) => `Name: ${value}`} />,
      );

      const data = parseData(result);

      expect(data.legend[0].name).toStrictEqual('Name: Breakfast');
    });
  });

  function TestComponent(props: Partial<Props>) {
    const data = useLegend({...MOCK_PROPS, ...props});
    return <span data-data={`${JSON.stringify(data)}`} />;
  }
});
