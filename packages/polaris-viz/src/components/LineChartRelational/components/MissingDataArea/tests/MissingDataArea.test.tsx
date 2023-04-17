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
        {value: 333, key: '2020-04-02T12:00:00'},
        {value: 234, key: '2020-04-03T12:00:00'},
        {value: 333, key: '2020-04-04T12:00:00'},
        {value: 333, key: '2020-04-05T12:00:00'},
      ],
    },
    {
      name: '75th Percentile',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 333, key: '2020-04-02T12:00:00'},
        {value: 333, key: '2020-04-03T12:00:00'},
        {value: null, key: '2020-04-04T12:00:00'},
        {value: null, key: '2020-04-04T12:00:00'},
      ],
    },
    {
      name: 'Similar stores median',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 333, key: '2020-04-02T12:00:00'},
        {value: 333, key: '2020-04-03T12:00:00'},
        {value: null, key: '2020-04-04T12:00:00'},
        {value: null, key: '2020-04-04T12:00:00'},
      ],
    },
    {
      name: '25th percentile',
      data: [
        {value: 333, key: '2020-04-01T12:00:00'},
        {value: 333, key: '2020-04-02T12:00:00'},
        {value: 333, key: '2020-04-03T12:00:00'},
        {value: null, key: '2020-04-04T12:00:00'},
        {value: null, key: '2020-04-04T12:00:00'},
      ],
    },
  ],
  drawableHeight: 200,
  xScale: scaleLinear(),
};

describe('<MissingDataArea />', () => {
  it('renders a rect', () => {
    const chart = mount(
      <svg>
        <MissingDataArea {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('rect', {
      x: 2,
      width: 2,
    });
  });

  it('renders nothing when data has no nulls', () => {
    const chart = mount(
      <svg>
        <MissingDataArea
          {...MOCK_PROPS}
          data={[
            {
              name: 'Apr 1 – Apr 14, 2020',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
              ],
            },
            {
              name: '75th Percentile',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
              ],
            },
            {
              name: 'Similar stores median',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
              ],
            },
            {
              name: '25th percentile',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
              ],
            },
          ]}
        />
      </svg>,
    );

    expect(chart).not.toContainReactComponent('rect');
  });

  it('renders area at the start of the chart', () => {
    const chart = mount(
      <svg>
        <MissingDataArea
          {...MOCK_PROPS}
          data={[
            {
              name: 'Apr 1 – Apr 14, 2020',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
                {value: 333, key: '2020-04-03T12:00:00'},
                {value: 333, key: '2020-04-04T12:00:00'},
                {value: 333, key: '2020-04-05T12:00:00'},
              ],
            },
            {
              name: '75th Percentile',
              data: [
                {value: null, key: '2020-04-01T12:00:00'},
                {value: null, key: '2020-04-02T12:00:00'},
                {value: null, key: '2020-04-03T12:00:00'},
                {value: 333, key: '2020-04-04T12:00:00'},
                {value: 333, key: '2020-04-05T12:00:00'},
              ],
            },
          ]}
        />
      </svg>,
    );

    expect(chart).toContainReactComponent('rect', {
      x: 0,
      width: 3,
    });
  });

  it('renders areas in the middle of the chart', () => {
    const chart = mount(
      <svg>
        <MissingDataArea
          {...MOCK_PROPS}
          data={[
            {
              name: 'Apr 1 – Apr 14, 2020',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
                {value: 333, key: '2020-04-03T12:00:00'},
                {value: 333, key: '2020-04-04T12:00:00'},
                {value: 333, key: '2020-04-05T12:00:00'},
                {value: 333, key: '2020-04-06T12:00:00'},
                {value: 333, key: '2020-04-07T12:00:00'},
                {value: 333, key: '2020-04-08T12:00:00'},
                {value: 333, key: '2020-04-09T12:00:00'},
              ],
            },
            {
              name: '75th Percentile',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
                {value: 333, key: '2020-04-03T12:00:00'},
                {value: null, key: '2020-04-04T12:00:00'},
                {value: null, key: '2020-04-05T12:00:00'},
                {value: null, key: '2020-04-06T12:00:00'},
                {value: 333, key: '2020-04-07T12:00:00'},
                {value: 333, key: '2020-04-08T12:00:00'},
                {value: 333, key: '2020-04-09T12:00:00'},
              ],
            },
          ]}
        />
      </svg>,
    );

    expect(chart).toContainReactComponent('rect', {
      x: 2,
      width: 4,
    });
  });

  it('renders areas at random areas', () => {
    const chart = mount(
      <svg>
        <MissingDataArea
          {...MOCK_PROPS}
          data={[
            {
              name: 'Apr 1 – Apr 14, 2020',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 333, key: '2020-04-02T12:00:00'},
                {value: 333, key: '2020-04-03T12:00:00'},
                {value: 333, key: '2020-04-04T12:00:00'},
                {value: 333, key: '2020-04-05T12:00:00'},
                {value: 333, key: '2020-04-06T12:00:00'},
                {value: 333, key: '2020-04-07T12:00:00'},
                {value: 333, key: '2020-04-08T12:00:00'},
                {value: 333, key: '2020-04-09T12:00:00'},
              ],
            },
            {
              name: '75th Percentile',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: null, key: '2020-04-02T12:00:00'},
                {value: null, key: '2020-04-03T12:00:00'},
                {value: 333, key: '2020-04-04T12:00:00'},
                {value: 333, key: '2020-04-05T12:00:00'},
                {value: 333, key: '2020-04-06T12:00:00'},
                {value: null, key: '2020-04-07T12:00:00'},
                {value: null, key: '2020-04-08T12:00:00'},
                {value: 333, key: '2020-04-09T12:00:00'},
              ],
            },
          ]}
        />
      </svg>,
    );

    expect(chart).toContainReactComponentTimes('rect', 2);
  });
});
