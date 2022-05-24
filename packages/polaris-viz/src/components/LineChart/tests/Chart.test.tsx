import React from 'react';
import {mount} from '@shopify/react-testing';
import {line} from 'd3-shape';
import {
  LinearGradientWithStops,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {LegendContainer} from '../../LegendContainer';
import {Crosshair} from '../../../components/Crosshair';
import {VisuallyHiddenRows} from '../../../components/VisuallyHiddenRows';
import {Point} from '../../../components/Point';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {mockDefaultTheme} from '../../../test-utilities/mountWithProvider';
import {TooltipAnimatedContainer} from '../../../components/TooltipWrapper';
import {Chart, ChartProps} from '../Chart';
import {Line, GradientArea} from '../components';
import {YAxis} from '../../YAxis';
import type {DataWithDefaults} from '../types';

const MOCK_DATA: Required<DataWithDefaults> = {
  name: 'Primary',
  color: 'red',
  lineStyle: 'solid',
  areaColor: 'red',
  isComparison: false,
  data: [
    {key: 'Jan 1', value: 1500},
    {key: 'Jan 2', value: 1000},
    {key: 'Jan 3', value: 800},
    {key: 'Jan 4', value: 1300},
  ],
};

const xAxisOptions: Required<XAxisOptions> = {
  labelFormatter: jest.fn(),
  hide: false,
};

const yAxisOptions: Required<YAxisOptions> = {
  labelFormatter: jest.fn(),
  integersOnly: false,
};

const MOCK_PROPS: ChartProps = {
  data: [MOCK_DATA],
  dimensions: {width: 500, height: 250},
  xAxisOptions,
  yAxisOptions,
  renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  isAnimated: false,
  showLegend: false,
};

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    estimateStringWidth: () => 100,
    getPathLength: () => 0,
    getPointAtLength: () => ({x: 0, y: 0}),
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 0, svgY: 0};
    },
  };
});

jest.mock('d3-shape', () => ({
  ...jest.requireActual('d3-shape'),
  line: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    shape.curve = () => shape;
    return shape;
  }),
}));

describe('<Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders an svg element', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).toContainReactComponent('svg');
  });

  it('sets an active point and tooltip position on svg mouse or touch interaction', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(Point, {active: true});
  });

  it('renders a <YAxis />', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).toContainReactComponent(YAxis);
  });

  it('renders a <Crosshair /> at full opacity if there is an active point', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    triggerSVGMouseMove(chart);

    expect(chart.find(Crosshair)).toHaveReactProps({opacity: 1});
  });

  it('renders a <Crosshair /> at 0 opacity if there is no active point', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart.find(Crosshair)).toHaveReactProps({opacity: 0});
  });

  it('renders a <Line /> for each data-point', () => {
    const chart = mount(
      <Chart
        {...MOCK_PROPS}
        data={[MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}]}
      />,
    );

    expect(chart).toContainReactComponentTimes(Line, 2);
  });

  it('calls the d3 curve method when hasSpline is true', () => {
    const curveSpy = jest.fn();
    (line as jest.Mock).mockImplementationOnce(() => {
      const shape = (value: any) => value;
      shape.x = () => shape;
      shape.y = () => shape;
      shape.curve = curveSpy;
      return shape;
    });

    mount(
      <Chart
        {...MOCK_PROPS}
        data={[MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}]}
      />,
    );

    expect(curveSpy).toHaveBeenCalled();
  });

  it('renders a <Point /> for each data item in each data-point', () => {
    const data = [MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}];
    const chart = mount(<Chart {...MOCK_PROPS} data={data} />);

    expect(chart).toContainReactComponentTimes(Point, 8);
  });

  it('renders an additional <Point /> for each data-point if isAnimated is true', () => {
    const data = [MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}];
    const chart = mount(<Chart {...MOCK_PROPS} data={data} isAnimated />);

    expect(chart).toContainReactComponentTimes(Point, 8 + data.length);
  });

  it('passes props to <Point />', () => {
    const chart = mount(
      <Chart
        {...MOCK_PROPS}
        data={[MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}]}
      />,
    );

    expect(chart).toContainReactComponent(Point, {
      color: 'rgb(255, 0, 0)',
      cx: 0,
      cy: 0,
      active: false,
      index: 0,
      tabIndex: -1,
    });
  });

  it('renders tooltip content inside a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    // No tooltip if there is no active point
    expect(chart).not.toContainReactText('Mock Tooltip');
    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  it('renders <VisuallyHiddenRows />', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).toContainReactComponent(VisuallyHiddenRows, {
      data: MOCK_PROPS.data,
      xAxisLabels: MOCK_DATA.data.map(({key}) => key),
    });
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });

    it('does not render crosshair for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactComponent(Crosshair);
    });

    it('does not render Visually Hidden Rows for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactComponent(VisuallyHiddenRows);
    });
  });

  describe('data-point.color', () => {
    describe('is a CSS color color', () => {
      it('removes transparency for <Point />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: 'rgba(255, 255, 255, 0.5)',
              },
            ]}
          />,
        );

        expect(chart.find(Point)).toHaveReactProps({
          color: 'rgb(255, 255, 255)',
        });
      });

      it('does not remove transparency for <Line />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: 'rgb(255, 255, 255)',
              },
            ]}
          />,
        );

        expect(chart.find(Line)).toHaveReactProps({
          color: 'rgb(255, 255, 255)',
        });
      });
    });

    describe('is of type GradientStop[]', () => {
      it('renders a LinearGradientWithStops if data-point color is a gradient', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'red',
                  },
                ],
              },
            ]}
          />,
        );

        expect(chart).toContainReactComponent(LinearGradientWithStops);
      });

      it('passes gradient url as color prop to <Line />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'red',
                  },
                ],
              },
            ]}
          />,
        );

        const lineColor = chart.find(Line).prop('color');

        expect(lineColor).toContain('url(#lineChartGradient-');
      });

      it('passes point gradient url as color prop to <Point />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'red',
                  },
                ],
              },
            ]}
          />,
        );

        const pointColor = chart.find(Point).prop('color');

        expect(pointColor).toContain('url(#lineChartGradient-');
      });

      it('removes transparency from the gradient', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'rgba(255, 0, 0, 0.1)',
                  },
                ],
              },
            ]}
          />,
        );

        expect(chart).toContainReactComponent(LinearGradientWithStops, {
          gradient: [
            {
              offset: 1,
              color: 'rgb(255, 0, 0)',
            },
          ],
        });
      });
    });
  });

  describe('areaColor', () => {
    it('renders a <GradientArea /> for a data-point if areaColor is specified', () => {
      const chart = mount(
        <Chart {...MOCK_PROPS} data={[{...MOCK_DATA, areaColor: 'red'}]} />,
      );

      expect(chart).toContainReactComponentTimes(GradientArea, 1);
    });
  });

  describe('gridOptions.showHorizontalLines', () => {
    it('does not render HorizontalGridLines when false', () => {
      const chart = mountWithProvider(
        <Chart {...MOCK_PROPS} />,
        mockDefaultTheme({grid: {showHorizontalLines: false}}),
      );

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mountWithProvider(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });

  describe('showLegend', () => {
    it('does not render <LegendContainer /> when false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(250);
    });

    it('renders <LegendContainer /> when true', () => {
      const chart = mount(<Chart {...MOCK_PROPS} showLegend />);

      expect(chart).toContainReactComponent(LegendContainer);
    });
  });
});
