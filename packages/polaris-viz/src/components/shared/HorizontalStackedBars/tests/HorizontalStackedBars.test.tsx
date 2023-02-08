import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {BORDER_RADIUS} from '@shopify/polaris-viz-core';

import type {HorizontalStackedBarsProps} from '../HorizontalStackedBars';
import {HorizontalStackedBars} from '../HorizontalStackedBars';
import {StackedBar} from '../components';
import type {FormattedStackedSeries} from '../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const STACKED_VALUES = [
  [
    [0, 5],
    [5, 10],
    [10, 15],
  ],
  [
    [0, 10],
    [10, 20],
    [20, 30],
  ],
  [
    [0, 12],
    [12, 24],
    [24, 36],
  ],
];

const MOCK_PROPS: HorizontalStackedBarsProps = {
  activeGroupIndex: -1,
  animationDelay: 0,
  ariaLabel: '',
  barHeight: 20,
  dataKeys: ['Group 1', 'Group 2', 'Group 3'],
  groupIndex: 0,
  id: 'id',
  name: 'stacked',
  stackedValues: STACKED_VALUES as FormattedStackedSeries[],
  xScale: scaleLinear(),
};

describe('<HorizontalStackedBars />', () => {
  it('renders g', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('g');
  });

  it('renders <StackedBar />', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponentTimes(StackedBar, 3);
  });

  it('applies x offset', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.x).toStrictEqual(0);
    expect(bars[1].props.x).toStrictEqual(7);
    expect(bars[2].props.x).toStrictEqual(14);
  });

  it('applies borderRadius to last item', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.borderRadius).toStrictEqual(BORDER_RADIUS.None);
    expect(bars[2].props.borderRadius).toStrictEqual(BORDER_RADIUS.Right);
  });
});

describe('Zero Value', () => {
  it('renders a line component when all passed values are zero', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars
          {...MOCK_PROPS}
          stackedValues={
            [
              [
                [0, 0],
                [0, 0],
                [0, 0],
              ],
            ] as FormattedStackedSeries[]
          }
        />
      </svg>,
    );
    expect(chart).toContainReactComponent('line');
  });

  it('does not render a line component when at least one passed value is not zero', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars
          {...MOCK_PROPS}
          stackedValues={
            [
              [
                [0, 0],
                [1, 0],
                [0, 0],
              ],
            ] as FormattedStackedSeries[]
          }
        />
      </svg>,
    );
    expect(chart).not.toContainReactComponent('line');
  });
});
