import React from 'react';
import {mount} from '@shopify/react-testing';

import {YAxis, BarChartXAxis} from '../../../components';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {mockDefaultTheme} from '../../../test-utilities/mount-with-provider';
import {TooltipAnimatedContainer} from '../../../components/TooltipWrapper';
import {Chart, Props} from '../Chart';
import {BarGroup, StackedBarGroup} from '../components';

const ZERO_AS_MIN_HEIGHT_THEME = {
  themes: {
    Default: {
      bar: {
        zeroAsMinHeight: true,
      },
    },
  },
};

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 100, svgY: 100};
    },
  };
});

describe('Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const renderTooltipContent = () => <p>Mock Tooltip</p>;

  const mockProps: Props = {
    data: [
      {
        data: [
          {key: 'stuff 1', value: 10},
          {key: 'stuff 2', value: 20},
          {key: 'stuff 3', value: 30},
        ],
        color: 'black',
        name: 'LABEL1',
      },
      {
        data: [
          {key: 'stuff 1', value: 10},
          {key: 'stuff 2', value: 20},
          {key: 'stuff 3', value: 30},
        ],
        color: 'red',
        name: 'LABEL2',
      },
    ],
    dimensions: {width: 500, height: 250},
    renderTooltipContent,
    isStacked: false,
    xAxisOptions: {
      labelFormatter: jest.fn((value: string) => value.toString()),
      labels: ['stuff 1', 'stuff 2', 'stuff 3'],
      hide: false,
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      integersOnly: false,
    },
  };

  it('renders an SVG element', () => {
    const multiSeriesBarChart = mount(<Chart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent('svg');
  });

  it('renders an BarChartXAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(BarChartXAxis);
  });

  it('does not render BarChartXAxis if it is hidden', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        xAxisOptions={{...mockProps.xAxisOptions, hide: true}}
      />,
    );
    expect(chart).not.toContainReactComponent(BarChartXAxis);
  });

  it('renders an yAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis);
  });

  it('formats the x axis labels', () => {
    mount(<Chart {...mockProps} />);
    expect(mockProps.xAxisOptions.labelFormatter).toHaveBeenCalledTimes(3);
  });

  it('does not render <TooltipAnimatedContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders tooltip content inside a <TooltipAnimatedContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });
  });

  describe('<BarGroup />', () => {
    it('renders a BarGroup for each data item', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(BarGroup, 3);
    });

    it('passes isSubdued props to the BarGroup around what is being hovered', () => {
      const chart = mount(<Chart {...mockProps} />);

      triggerSVGMouseMove(chart);

      expect(chart).toContainReactComponent(BarGroup, {
        isSubdued: true,
      });
    });

    it('does not render BarGroup if isStacked is true', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).not.toContainReactComponent(BarGroup);
    });

    describe('rotateZeroBars', () => {
      it('receives true if all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: -1},
                  {key: '', value: 0},
                  {key: '', value: -2},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: -3},
                  {key: '', value: -4},
                  {key: '', value: -1},
                ],
              },
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: true,
        });
      });

      it('receives false if not all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: 3},
                  {key: '', value: 0},
                  {key: '', value: -3},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: -4},
                  {key: '', value: 5},
                  {key: '', value: -4},
                ],
              },
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });

      it('receives false if all values are 0', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: 0},
                  {key: '', value: 0},
                  {key: '', value: 0},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: 0},
                  {key: '', value: 0},
                  {key: '', value: 0},
                ],
              },
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });

      it('receives false if zeroAsMinHeight is false', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: 0},
                  {key: '', value: -5},
                  {key: '', value: 0},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: 0},
                  {key: '', value: 0},
                  {key: '', value: -3},
                ],
              },
            ]}
          />,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });
    });
  });

  describe('<StackedBarGroup />', () => {
    it('renders StackedBarGroup if isStacked is true', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).toContainReactComponent(StackedBarGroup);
    });

    it('renders a StackedBarGroup for each stacked data item', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).toContainReactComponentTimes(StackedBarGroup, 2);
    });

    it('passes active props to the BarGroup that is being hovered', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      triggerSVGMouseMove(chart);

      expect(chart).toContainReactComponent(StackedBarGroup, {
        activeBarGroup: 0,
      });
    });
  });

  describe('gridOptions.showHorizontalLines', () => {
    it('does not render HorizontalGridLines when false', () => {
      const chart = mountWithProvider(
        <Chart {...mockProps} />,
        mockDefaultTheme({grid: {showHorizontalLines: false}}),
      );

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });
});
