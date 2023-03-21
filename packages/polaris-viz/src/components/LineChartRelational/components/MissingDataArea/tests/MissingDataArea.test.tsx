import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import type {Props} from '../MissingDataArea';
import {MissingDataArea} from '../MissingDataArea';

const MOCK_PROPS: Props = {
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 534, key: '2020-04-04T12:00:00'},
      ],
    },
    {
      name: '75th Percentile',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
      ],
    },
    {
      name: 'Similar stores median',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
      ],
    },
    {
      name: '25th percentile',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 797, key: '2020-04-02T12:00:00'},
      ],
    },
  ],
  drawableHeight: 200,
  drawableWidth: 600,
  xScale: scaleLinear(),
};

describe('<MissingDataArea />', () => {
  it('renders a rect', () => {
    const chart = mount(
      <svg>
        <MissingDataArea {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('rect');
  });

  it('renders nothing when data series have same length', () => {
    const chart = mount(
      <svg>
        <MissingDataArea
          {...MOCK_PROPS}
          data={[
            {
              name: 'Apr 1 – Apr 14, 2020',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 797, key: '2020-04-02T12:00:00'},
              ],
            },
            {
              name: '75th Percentile',
              data: [],
            },
            {
              name: 'Similar stores median',
              data: [],
            },
            {
              name: '25th percentile',
              data: [],
            },
          ]}
        />
      </svg>,
    );

    expect(chart).not.toContainReactComponent('rect');
  });
});
