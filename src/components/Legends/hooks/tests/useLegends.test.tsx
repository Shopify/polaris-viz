import React from 'react';
import {mount, Root} from '@shopify/react-testing';
import type {DataSeries} from 'types';

import {useLegends, Props} from '../useLegends';

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

const MOCK_PROPS: Props = {
  dimensions: {height: 100, width: 100},
  showLegend: true,
  data: DATA,
};

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useLegends()', () => {
  describe('showLegend', () => {
    it('returns data', () => {
      function TestComponent() {
        const data = useLegends(MOCK_PROPS);

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        legends: [
          {
            iconType: 'solid',
            name: 'Breakfast',
          },
          {
            iconType: 'solid',
            name: 'Lunch',
          },
          {
            iconType: 'solid',
            name: 'Dinner',
          },
        ],
        height: 71,
        width: 100,
      });
    });

    it('returns empty data when false', () => {
      function TestComponent() {
        const data = useLegends({...MOCK_PROPS, showLegend: false});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data).toStrictEqual({
        legends: [],
        height: 100,
        width: 100,
      });
    });
  });

  describe('type', () => {
    it('adds type to legend', () => {
      function TestComponent() {
        const data = useLegends({...MOCK_PROPS, type: 'line'});

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legends[0].iconType).toStrictEqual('line');
    });
  });

  describe('colors', () => {
    it('uses data.color when available', () => {
      function TestComponent() {
        const data = useLegends({
          ...MOCK_PROPS,
          colors: ['red'],
          data: [
            {
              name: 'Breakfast',
              data: [],
            },
          ],
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legends[0].color).toStrictEqual('red');
    });

    it('uses color when no data.color is available', () => {
      function TestComponent() {
        const data = useLegends({
          ...MOCK_PROPS,
          colors: ['red'],
          data: [
            {
              name: 'Breakfast',
              data: [],
              color: 'blue',
            },
          ],
        });

        return <span data-data={`${JSON.stringify(data)}`} />;
      }

      const result = mount(<TestComponent />);

      const data = parseData(result);

      expect(data.legends[0].color).toStrictEqual('blue');
    });
  });
});
