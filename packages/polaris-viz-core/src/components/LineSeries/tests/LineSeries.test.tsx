/* eslint-disable id-length */
import {scaleLinear} from 'd3-scale';

// eslint-disable-next-line import/order
import {mountWithProvider} from '../../../test-utilities';
import '@shopify/react-testing/matchers';

import {LineSeries, LineSeriesProps} from '../LineSeries';
import {Area} from '../components';
import {SHAPE_ANIMATION_HEIGHT_BUFFER} from '../../../constants';

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

const defaultProps: LineSeriesProps = {
  xScale: someScale,
  yScale: someScale,
  data: mockData,
  svgDimensions: {width: 100, height: 100},
  index: 0,
  theme: 'Default',
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

  describe('svgDimensions', () => {
    it('is used to calculate <Rect/> height', () => {
      const lineSeries = mountWithProvider(
        <svg>
          <LineSeries {...defaultProps} />
        </svg>,
        {
          themes: {
            Default: {
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
    describe('theme.seriesColors.comparison', () => {
      it('gets passed to <Rect> if data series isComparison', () => {
        const lineSeries = mountWithProvider(
          <svg>
            <LineSeries
              {...defaultProps}
              data={{
                ...defaultProps.data,
                isComparison: true,
              }}
            />
          </svg>,
          {
            themes: {
              Default: {
                seriesColors: {
                  comparison: 'red',
                },
              },
            },
          },
        );

        expect(lineSeries).toContainReactComponent('rect', {
          fill: 'red',
        });
      });
    });

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
              Default: {
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
});
