import React from 'react';

import {YAxis, BarChartXAxis, Bar} from '../../../components';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {mockDefaultTheme} from '../../../test-utilities/mount-with-provider';
import {TooltipAnimatedContainer} from '../../../components/TooltipWrapper';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {AnnotationLine} from '../components';
import {Chart} from '../Chart';
import {MIN_BAR_HEIGHT} from '../../../constants';

const ZERO_AS_MIN_HEIGHT_THEME = {
  themes: {
    Default: {
      bar: {
        zeroAsMinHeight: true,
      },
    },
  },
};

jest.mock('../../../utilities/event-point', () => {
  return {
    ...jest.requireActual('../../../utilities/event-point'),
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 80, svgY: 80};
    },
  };
});

describe('Chart />', () => {
  const mockProps = {
    data: [
      {rawValue: 10, label: 'data'},
      {rawValue: 20, label: 'data 2'},
    ],
    dimensions: {width: 500, height: 250},
    annotationsLookupTable: {
      1: {
        dataIndex: 1,
        xOffset: 0.5,
        width: 5,
        color: 'gray',
        ariaLabel: 'Median: 1.5',
        tooltipData: {
          label: 'Median',
          value: '1.5 hours',
        },
      },
    },
    renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
    emptyStateText: 'Empty',
    isAnimated: false,
    xAxisOptions: {
      labelFormatter: (value: string) => value.toString(),
      useMinimalLabels: false,
      hide: false,
      wrapLabels: true,
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      integersOnly: false,
    },
  };

  it('renders an SVG element', () => {
    const barChart = mountWithProvider(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent('svg');
  });

  describe('xAxisOptions.hide', () => {
    it('renders <BarChartXAxis /> when true', () => {
      const barChart = mountWithProvider(<Chart {...mockProps} />);
      expect(barChart).toContainReactComponent(BarChartXAxis);
    });

    it('does not render <BarChartXAxis /> when false', () => {
      const barChart = mountWithProvider(
        <Chart
          {...mockProps}
          xAxisOptions={{...mockProps.xAxisOptions, hide: true}}
        />,
      );
      expect(barChart).not.toContainReactComponent(BarChartXAxis);
    });
  });

  it('renders an yAxis', () => {
    const barChart = mountWithProvider(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent(YAxis);
  });

  it('does not render a <TooltipAnimatedContainer /> if there is no active point', () => {
    const chart = mountWithProvider(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders a <TooltipAnimatedContainer /> if there is an active point', () => {
    const chart = mountWithProvider(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders the tooltip content in a <TooltipAnimatedContainer /> if there is an active point', () => {
    const chart = mountWithProvider(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

    expect(tooltipContainer).toContainReactComponent('p', {
      children: 'Mock Tooltip',
    });
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mountWithProvider(<Chart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });
  });

  describe('<Bar />', () => {
    it('renders a Bar for each data item', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(Bar, 2);
    });

    describe('rotateZeroBars', () => {
      it('receives true if all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {rawValue: 0, label: 'data'},
              {rawValue: -2, label: 'data'},
              {rawValue: -1, label: 'data'},
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );

        expect(chart).toContainReactComponent(Bar, {
          rotateZeroBars: true,
        });
      });

      it('receives false if not all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {rawValue: 0, label: 'data'},
              {rawValue: -2, label: 'data'},
              {rawValue: 1, label: 'data'},
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );

        expect(chart).toContainReactComponent(Bar, {
          rotateZeroBars: false,
        });
      });

      it('receives false if all values are 0', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {rawValue: 0, label: 'data'},
              {rawValue: 0, label: 'data'},
              {rawValue: 0, label: 'data'},
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );

        expect(chart).toContainReactComponent(Bar, {
          rotateZeroBars: false,
        });
      });
    });
  });

  describe('<AnnotationLine/>', () => {
    it('does not render when annotated data does not exist', () => {
      const updatedProps = {
        ...mockProps,
        annotationsLookupTable: {},
      };
      const chart = mountWithProvider(<Chart {...updatedProps} />);

      expect(chart).not.toContainReactComponent(AnnotationLine);
    });

    it('renders when annotatated data exists', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(AnnotationLine);
    });
  });

  describe('data.barColor', () => {
    it('renders when the barColor exists', () => {
      const updatedProps = {
        ...mockProps,
        data: [
          {rawValue: 10, label: 'data', barColor: 'purple'},
          {
            rawValue: 20,
            label: 'data 2',
            barColor: 'purple',
          },
        ],
      };
      const chart = mountWithProvider(<Chart {...updatedProps} />);

      expect(chart.find('rect', {fill: 'purple'})).not.toBeNull();
    });

    it('does not render when the barTheme.color does not exist', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart.find('rect', {fill: 'purple'})).toBeNull();
    });
  });

  describe('barTheme.zeroAsMinHeight', () => {
    it('passes the min bar height to 0 bars if true', () => {
      const chart = mountWithProvider(
        <Chart {...mockProps} data={[{rawValue: 0, label: 'data'}]} />,
        ZERO_AS_MIN_HEIGHT_THEME,
      );

      const barHeight = chart.find(Bar)!.props.height;

      expect(barHeight).toBe(MIN_BAR_HEIGHT);
    });

    it('does not pass the min bar height to 0 bars if false', () => {
      const chart = mountWithProvider(
        <Chart {...mockProps} data={[{rawValue: 0, label: 'data'}]} />,
      );

      const barHeight = chart.find(Bar)!.props.height;

      expect(barHeight).toBe(0);
    });

    it('sets rotateZeroBars to false if false', () => {
      const chart = mountWithProvider(
        <Chart
          {...mockProps}
          data={[
            {rawValue: 0, label: 'data'},
            {rawValue: -5, label: 'data'},
          ]}
        />,
      );

      expect(chart).toContainReactComponent(Bar, {
        rotateZeroBars: false,
      });
    });

    it('passes the min bar height to non-zero bar if false', () => {
      const chart = mountWithProvider(
        <Chart
          {...mockProps}
          data={[
            {rawValue: 1, label: 'data'},
            {rawValue: 500, label: 'data'},
          ]}
        />,
      );

      const barHeight = chart.find(Bar)!.props.height;

      expect(barHeight).toBe(MIN_BAR_HEIGHT);
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
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });
});
