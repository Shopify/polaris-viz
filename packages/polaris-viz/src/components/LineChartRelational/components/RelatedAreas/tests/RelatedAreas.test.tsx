import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import type {RelatedAreaProps} from '../RelatedAreas';
import {RelatedAreas} from '../RelatedAreas';
import {Area} from '../../Area';

const MOCK_PROPS: RelatedAreaProps = {
  data: [
    {
      name: 'Average',
      data: [{value: 333, key: '2020-04-01T12:00:00'}],
      color: [
        {offset: 0, color: 'rgba(149, 101, 255, 1)'},
        {offset: 100, color: 'rgba(75, 146, 229, 1)'},
      ],
    },
    {
      name: '75th Percentile',
      data: [{value: 859, key: '2020-03-02T12:00:00'}],
      color: 'rgba(103, 197, 228, 1)',
      metadata: {
        relatedIndex: 2,
        areaColor: 'rgba(103, 197, 228, 0.1)',
      },
    },
    {
      name: 'Median',
      data: [{value: 759, key: '2020-03-02T12:00:00'}],
      color: 'rgba(40, 106, 123, 1)',
      metadata: {
        relatedIndex: 3,
        areaColor: 'rgba(47, 175, 218, 0.2)',
      },
      styleOverride: {
        line: {
          strokeDasharray: '3 6',
        },
      },
    },
    {
      name: '25th percentile',
      data: [{value: 559, key: '2020-03-02T12:00:00'}],
      color: 'rgba(103, 197, 228, 1)',
    },
  ],
  drawableHeight: 200,
  drawableWidth: 600,
  xScale: scaleLinear(),
  yScale: scaleLinear(),
};

describe('<RelatedAreas />', () => {
  it('renders 2 <Area /> components', () => {
    const chart = mount(
      <svg>
        <RelatedAreas {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponentTimes(Area, 2);
  });
});
