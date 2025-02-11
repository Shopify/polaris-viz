import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {BORDER_RADIUS} from '@shopify/polaris-viz-core';

import {
  mountWithProvider,
  mockDefaultTheme,
} from '../../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import type {HorizontalStackedBarsProps} from '../HorizontalStackedBars';
import {HorizontalStackedBars} from '../HorizontalStackedBars';
import {StackedBar} from '../components';
import {Label} from '../../Label';
import type {FormattedStackedSeries} from '../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

jest.mock(
  '@shopify/polaris-viz-core/src/utilities/estimateStringWidth',
  () => ({
    ...jest.requireActual(
      '@shopify/polaris-viz-core/src/utilities/estimateStringWidth',
    ),
    estimateStringWidth: () => 100,
  }),
);

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
  isSimple: false,
  labelFormatter: (value) => `${value}`,
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

  describe('Label', () => {
    it('renders <Label /> when isSimple is false and hideGroupLabel is false', () => {
      const chart = mountWithProvider(
        <svg>
          <HorizontalStackedBars {...MOCK_PROPS} />
        </svg>,
        mockDefaultTheme({groupLabel: {hide: false}}),
      );

      expect(chart).toContainReactComponent(Label);
    });

    it('does not render <Label /> when isSimple and hideGroup is true', () => {
      const chart = mountWithProvider(
        <svg>
          <HorizontalStackedBars {...MOCK_PROPS} isSimple />
        </svg>,
        mockDefaultTheme({groupLabel: {hide: true}}),
      );

      expect(chart).not.toContainReactComponent(Label);
    });

    it('does not render <Label /> when isSimple and hideGroup is false', () => {
      const chart = mountWithProvider(
        <svg>
          <HorizontalStackedBars {...MOCK_PROPS} isSimple />
        </svg>,
        mockDefaultTheme({groupLabel: {hide: false}}),
      );

      expect(chart).not.toContainReactComponent(Label);
    });
  });

  describe('labelFormatter', () => {
    it('renders a formatted label', () => {
      const chart = mount(
        <svg>
          <HorizontalStackedBars
            {...MOCK_PROPS}
            labelFormatter={(value) => `${value}%`}
          />
        </svg>,
      );

      const labels = chart.findAll(Label);

      expect(labels[0].props.label).toStrictEqual('0%');
    });
  });
});
