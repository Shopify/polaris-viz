import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {Props} from '../useBarChartTooltipContent';
import {useBarChartTooltipContent} from '../useBarChartTooltipContent';

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

const DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
    ],
  },
];

describe('useBarChartTooltipContent()', () => {
  it('returns formatted tooltip content', () => {
    function TestComponent() {
      const props: Props = {
        data: DATA,
        renderTooltipContent: (value) => value,
        seriesColors: ['red', 'green', 'blue'],
      };

      const data = useBarChartTooltipContent(props);

      return <span data-data={`${JSON.stringify(data(0))}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data.data).toStrictEqual([
      {
        data: [
          {
            color: 'red',
            key: 'Breakfast',
            value: 3,
          },
          {
            color: 'green',
            key: 'Lunch',
            value: 4,
          },
          {
            color: 'blue',
            key: 'Dinner',
            value: 7,
          },
        ],
        shape: 'Bar',
      },
    ]);
    expect(data.title).toStrictEqual('Monday');
    expect(data.dataSeries).toStrictEqual(DATA);
  });
});
