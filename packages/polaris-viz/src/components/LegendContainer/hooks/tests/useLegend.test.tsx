import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import type {DataSeries, DataGroup} from '@shopify/polaris-viz-core';
import {LEGENDS_TOP_MARGIN} from '@shopify/polaris-viz-core';

import type {Props} from '../useLegend';
import {useLegend} from '../useLegend';

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
  dimensions: {height: 100, width: 100},
  showLegend: true,
  data: DATAGROUP,
  seriesNameFormatter: (value) => `${value}`,
};

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useLegend()', () => {
  describe('showLegend', () => {
    it('returns data', () => {
      function TestComponent() {
        const data = useLegend(MOCK_PROPS);
        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        legend: [
          {name: 'Breakfast', shape: 'Line', value: '0'},
          {name: 'Lunch', shape: 'Line', value: '0'},
          {name: 'Dinner', shape: 'Line', value: '0'},
          {name: 'Breakfast', shape: 'Bar', value: '0'},
          {name: 'Lunch', shape: 'Bar', value: '0'},
          {name: 'Dinner', shape: 'Bar', value: '0'},
        ],
        height: 60,
        width: 100,
        isLegendMounted: false,
      });
    });

    it('returns empty data when false', () => {
      function TestComponent() {
        const data = useLegend({...MOCK_PROPS, showLegend: false});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        legend: [],
        height: 100,
        width: 100,
        isLegendMounted: true,
      });
    });

    it('mounts after initializing', () => {
      function TestComponent() {
        const data = useLegend(MOCK_PROPS);
        return <span data-data={`${JSON.stringify(data)}`} />;
      }

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
            isLegendMounted: true,
          });
        });
      });
    });
  });

  describe('type', () => {
    it('adds type `Line` to legend', () => {
      function TestComponent() {
        const data = useLegend(MOCK_PROPS);

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[0].shape).toStrictEqual('Line');
    });

    it('adds type `Bar` to legend', () => {
      function TestComponent() {
        const data = useLegend(MOCK_PROPS);
        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[3].shape).toStrictEqual('Bar');
    });
  });

  describe('colors', () => {
    it('uses color when no data.color is available', () => {
      function TestComponent() {
        const data = useLegend({
          ...MOCK_PROPS,
          colors: ['red'],
          data: [
            {
              shape: 'Bar',
              series: [
                {
                  name: 'Breakfast',
                  data: [],
                },
              ],
            },
          ],
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[0].color).toStrictEqual('red');
    });

    it('uses data.color when available', () => {
      function TestComponent() {
        const data = useLegend({
          ...MOCK_PROPS,
          colors: ['red'],
          data: [
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
          ],
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[0].color).toStrictEqual('blue');
    });
  });

  describe('isLegendMounted', () => {
    it('returns true when showLegend=false', () => {
      function TestComponent() {
        const data = useLegend({...MOCK_PROPS, showLegend: false});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.isLegendMounted).toStrictEqual(true);
    });
  });

  describe('seriesNameFormatter', () => {
    it('returns true when showLegend=false', () => {
      function TestComponent() {
        const data = useLegend({
          ...MOCK_PROPS,
          seriesNameFormatter: (value) => `Name: ${value}`,
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legend[0].name).toStrictEqual('Name: Breakfast');
    });
  });
});
