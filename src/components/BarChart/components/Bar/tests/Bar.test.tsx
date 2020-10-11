import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {MIN_BAR_HEIGHT} from '../../../../../constants';
import {Bar} from '../Bar';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => jest.fn((value) => value)),
}));

describe('<Bar/>', () => {
  it('renders a rect', () => {
    const bar = mount(
      <svg>
        <Bar
          color="colorPurple"
          isSelected={false}
          x={0}
          rawValue={1000}
          width={100}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('rect', {
      x: 0,
      y: 1000,
      fill: 'rgba(156, 106, 222, 1)',
      width: 100,
      height: 1000,
    });
  });

  it('gives the bar a min height if needed', () => {
    const bar = mount(
      <svg>
        <Bar
          color="colorPurple"
          isSelected={false}
          x={0}
          rawValue={1}
          width={100}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('rect', {
      height: MIN_BAR_HEIGHT,
    });
  });

  it('does not give a 0 value a min height', () => {
    const bar = mount(
      <svg>
        <Bar
          color="colorPurple"
          isSelected={false}
          x={0}
          rawValue={0}
          width={100}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('rect', {
      height: 0,
    });
  });

  it('uses the primary color when the bar is not selected', () => {
    const bar = mount(
      <svg>
        <Bar
          color="colorPurple"
          highlightColor="colorRed"
          isSelected={false}
          x={0}
          rawValue={1}
          width={100}
          yScale={scaleBand() as any}
        />
        ,
      </svg>,
    );

    expect(bar).toContainReactComponent('rect', {
      fill: 'rgba(156, 106, 222, 1)',
    });
  });
});
