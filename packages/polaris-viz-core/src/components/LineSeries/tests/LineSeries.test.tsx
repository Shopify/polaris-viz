/* eslint-disable id-length */
import {scaleLinear} from 'd3-scale';

// eslint-disable-next-line import/order
import {mountWithProvider} from '../../../test-utilities';
import '@shopify/react-testing/matchers';

import type {LineSeriesProps} from '../LineSeries';
import {LineSeries} from '../LineSeries';
import {AnimatedLine, Area} from '../components';
import {
  DEFAULT_THEME_NAME,
  SHAPE_ANIMATION_HEIGHT_BUFFER,
} from '../../../constants';
import {useChartContextMock} from '../../../../../../tests/setup/tests';
import {DEFAULT_CHART_CONTEXT} from '../../../../../../packages/polaris-viz/src/storybook/constants';

const someScale = scaleLinear().domain([0, 100]).range([0, 100]);

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const mockData = {
  color: 'red',
  data: [
    {key: 0, value: 100},
    {key: 1, value: 50},
  ],
};

const mockDataWithIsolatedPoints = {
  color: 'red',
  data: [
    {key: '2020-01-01', value: null},
    {key: '2020-01-02', value: 50},
    {key: '2020-01-03', value: null},
    {key: '2020-01-04', value: 100},
    {key: '2020-01-05', value: 200},
    {key: '2020-01-06', value: null},
  ],
  isComparison: true,
};

const defaultProps: LineSeriesProps = {
  xScale: someScale,
  yScale: someScale,
  data: mockData,
  svgDimensions: {width: 100, height: 100},
  index: 0,
  theme: DEFAULT_THEME_NAME,
};

describe('<LineSeries />', () => {
  it('renders when data.data is empty', () => {
    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries {...defaultProps} data={{color: 'red', data: []}} />
      </svg>,
    );

    expect(lineSeries).toContainReactComponent('svg');
  });

  it('renders isolated points as circles for comparsion data', () => {
    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries {...defaultProps} data={mockDataWithIsolatedPoints} />
      </svg>,
    );

    const circles = lineSeries.findAll('circle');

    expect(circles).toHaveLength(1);

    expect(circles[0]).toHaveReactProps({
      cx: expect.any(Number),
      cy: expect.any(Number),
      fill: 'red',
    });
  });

  it('does not render isolated points as circles for non-comparison data', () => {
    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries
          {...defaultProps}
          data={{...mockDataWithIsolatedPoints, isComparison: false}}
        />
      </svg>,
    );

    expect(lineSeries).not.toContainReactComponent('circle');
  });

  describe('svgDimensions', () => {
    it('is used to calculate <Rect/> height', () => {
      const lineSeries = mountWithProvider(
        <svg>
          <LineSeries {...defaultProps} />
        </svg>,
        {
          themes: {
            [DEFAULT_THEME_NAME]: {
              line: {
                width: 10,
              },
            },
          },
        },
      );

      expect(lineSeries).toContainReactComponent('rect', {
        width: defaultProps.svgDimensions.width,
        height:
          defaultProps.svgDimensions.height +
          20 +
          SHAPE_ANIMATION_HEIGHT_BUFFER,
      });
    });
  });

  describe('areaPath', () => {
    it('gets passed to <Area/>', () => {
      const lineSeries = mountWithProvider(
        <svg>
          <LineSeries
            {...defaultProps}
            data={{...defaultProps.data, color: 'blue'}}
          />
        </svg>,
      );

      expect(
        JSON.stringify(lineSeries.find(Area)?.props.areaPath),
      ).toStrictEqual(
        '"M0,100L0.0050000000000000044,100C0.5891,100,0.41090000000000004,50,0.995,50L1,50L1,100L0.995,100C0.41090000000000004,100,0.5891,100,0.0050000000000000044,100L0,100Z"',
      );
    });
  });

  describe('theme', () => {
    describe('theme.line.hasSpline', () => {
      it('renders a curved line if true', () => {
        const lineSeries = mountWithProvider(
          <svg>
            <LineSeries {...defaultProps} />
          </svg>,
        );

        expect(lineSeries).toContainReactComponent('path', {
          d: 'M0,100L0.0050000000000000044,100C0.5891,100,0.41090000000000004,50,0.995,50L1,50',
        });
      });

      it('renders a non curved line if false', () => {
        const lineSeries = mountWithProvider(
          <svg>
            <LineSeries {...defaultProps} />
          </svg>,
          {
            themes: {
              [DEFAULT_THEME_NAME]: {
                line: {
                  hasSpline: false,
                },
              },
            },
          },
        );

        expect(lineSeries).toContainReactComponent('path', {
          d: 'M0,100L1,50',
        });
      });
    });
  });

  describe('animationDelay', () => {
    it('uses provided animationDelay for non-comparison data', () => {
      useChartContextMock.mockReturnValue({
        ...DEFAULT_CHART_CONTEXT,
        shouldAnimate: true,
      });

      const lineSeries = mountWithProvider(
        <svg>
          <LineSeries {...defaultProps} animationDelay={400} />
        </svg>,
      );

      expect(lineSeries).toContainReactComponent(AnimatedLine, {
        delay: 400,
      });
    });

    it('uses 0 for animation delay when series.isComparison is true', () => {
      useChartContextMock.mockReturnValue({
        ...DEFAULT_CHART_CONTEXT,
        shouldAnimate: true,
      });

      const lineSeries = mountWithProvider(
        <svg>
          <LineSeries
            {...defaultProps}
            data={{...defaultProps.data, isComparison: true}}
            animationDelay={400}
          />
        </svg>,
      );

      expect(lineSeries).toContainReactComponent(AnimatedLine, {
        delay: 0,
      });
    });

    it('uses 0 for animation delay when series has a comparison series', () => {
      useChartContextMock.mockReturnValue({
        ...DEFAULT_CHART_CONTEXT,
        shouldAnimate: true,
        comparisonIndexes: [1],
      });

      const lineSeries = mountWithProvider(
        <svg>
          <LineSeries {...defaultProps} index={1} animationDelay={400} />
        </svg>,
      );

      expect(lineSeries).toContainReactComponent(AnimatedLine, {
        delay: 0,
      });
    });
  });

  it('adds pointer-events: none to comparison lines when multiple comparison series exist', () => {
    useChartContextMock.mockReturnValue({
      ...DEFAULT_CHART_CONTEXT,
      comparisonIndexes: [1, 2],
    });

    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries {...defaultProps} index={1} />
      </svg>,
    );

    expect(lineSeries).toContainReactComponent('path', {
      style: {
        pointerEvents: 'none',
      },
    });
  });

  it('adds pointer-events: auto to series lines when multiple comparison series exist', () => {
    useChartContextMock.mockReturnValue({
      ...DEFAULT_CHART_CONTEXT,
      comparisonIndexes: [1, 2],
    });

    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries {...defaultProps} index={0} />
      </svg>,
    );

    expect(lineSeries).toContainReactComponent('path', {
      style: {
        pointerEvents: 'auto',
      },
    });
  });

  it('adds pointer-events: auto to series lines when no comparison series exist', () => {
    useChartContextMock.mockReturnValue({
      ...DEFAULT_CHART_CONTEXT,
      comparisonIndexes: [],
    });

    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries {...defaultProps} index={0} />
      </svg>,
    );

    expect(lineSeries).toContainReactComponent('path', {
      style: {
        pointerEvents: 'auto',
      },
    });
  });

  it('adds pointer-events: auto to comparison lines when no multiple series exist', () => {
    const lineSeries = mountWithProvider(
      <svg>
        <LineSeries
          {...defaultProps}
          data={mockDataWithIsolatedPoints}
          index={1}
        />
      </svg>,
    );

    expect(lineSeries).toContainReactComponent('path', {
      style: {
        pointerEvents: 'auto',
      },
    });
  });
});
