import React from 'react';
import type {SpringValue} from '@react-spring/web';
import {
  YAxis,
  TooltipContainer,
  BarChartXAxis,
  Bar,
  HorizontalGridLines,
} from 'components';

import {mountWithProvider} from '../../../test-utilities';
import {AnnotationLine} from '../components';
import {Chart} from '../Chart';
import {MIN_BAR_HEIGHT, SUBDUE_OPACITY} from '../../../constants';

const fakeSVGEvent = {
  currentTarget: {
    getScreenCTM: () => ({
      inverse: () => ({x: 100, y: 100}),
    }),
    createSVGPoint: () => ({
      x: 100,
      y: 100,
      matrixTransform: () => ({x: 100, y: 100}),
    }),
  },
};

describe('Chart />', () => {
  const mockProps = {
    data: [
      {rawValue: 10, label: 'data'},
      {rawValue: 20, label: 'data 2'},
    ],
    chartDimensions: {width: 500, height: 250},
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
    barTheme: {
      color: 'red',
      innerMargin: 0,
      outerMargin: 0,
      hasRoundedCorners: false,
      zeroAsMinHeight: false,
    },
    gridTheme: {
      showHorizontalLines: true,
      color: 'red',
      horizontalOverflow: false,
      horizontalMargin: 0,
      showVerticalLines: true,
    },
    xAxisOptions: {
      labelFormatter: (value: string) => value.toString(),
      useMinimalLabels: false,
    },
    xAxisTheme: {
      showTicks: true,
      labelColor: 'red',
      useMinimalLabels: false,
      hide: false,
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      integersOnly: false,
    },
    yAxisTheme: {
      labelColor: 'red',
      backgroundColor: 'blue',
      integersOnly: false,
    },
  };

  it('renders an SVG element', () => {
    const barChart = mountWithProvider(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent('svg');
  });

  describe('<BarChartXAxis />', () => {
    it('renders', () => {
      const barChart = mountWithProvider(<Chart {...mockProps} />);
      expect(barChart).toContainReactComponent(BarChartXAxis);
    });
  });

  it('renders an yAxis', () => {
    const barChart = mountWithProvider(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent(YAxis);
  });

  it('does not render a <TooltipContainer /> if there is no active point', () => {
    const chart = mountWithProvider(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipContainer);
  });

  it('renders a <TooltipContainer /> if there is an active point', () => {
    const chart = mountWithProvider(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(TooltipContainer);
  });

  it('renders the tooltip content in a <TooltipContainer /> if there is an active point', () => {
    const chart = mountWithProvider(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;

    expect(tooltipContainer).toContainReactComponent('p', {
      children: 'Mock Tooltip',
    });
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mountWithProvider(<Chart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipContainer);
    });
  });

  describe('<Bar />', () => {
    it('renders a Bar for each data item', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(Bar, 2);
    });

    it('passes a subdued color to the Bar that is not being hovered on or nearby', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      const svg = chart.find('svg')!;
      expect(chart).toContainReactComponent('g', {style: {opacity: 1}});

      svg.trigger('onMouseMove', fakeSVGEvent);

      expect(chart).toContainReactComponent('g', {
        style: {opacity: SUBDUE_OPACITY},
      });
    });

    describe('rotateZeroBars', () => {
      it('receives true if all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            barTheme={{
              ...mockProps.barTheme,
              zeroAsMinHeight: true,
            }}
            data={[
              {rawValue: 0, label: 'data'},
              {rawValue: -2, label: 'data'},
              {rawValue: -1, label: 'data'},
            ]}
          />,
        );

        expect(chart).toContainReactComponent(Bar, {
          rotateZeroBars: true,
        });
      });

      it('receives false if not all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            barTheme={{
              ...mockProps.barTheme,
              zeroAsMinHeight: true,
            }}
            data={[
              {rawValue: 0, label: 'data'},
              {rawValue: -2, label: 'data'},
              {rawValue: 1, label: 'data'},
            ]}
          />,
        );

        expect(chart).toContainReactComponent(Bar, {
          rotateZeroBars: false,
        });
      });

      it('receives false if all values are 0', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            barTheme={{
              ...mockProps.barTheme,
              zeroAsMinHeight: true,
            }}
            data={[
              {rawValue: 0, label: 'data'},
              {rawValue: 0, label: 'data'},
              {rawValue: 0, label: 'data'},
            ]}
          />,
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

      expect(chart).toContainReactComponent(Bar, {color: 'purple'});
    });
  });

  describe('barTheme.zeroAsMinHeight', () => {
    it('passes the min bar height to 0 bars if true', () => {
      const chart = mountWithProvider(
        <Chart
          {...mockProps}
          barTheme={{
            ...mockProps.barTheme,
            zeroAsMinHeight: true,
          }}
          data={[{rawValue: 0, label: 'data'}]}
        />,
      );

      const barHeight = chart.find(Bar)!.props.height as SpringValue;

      expect(barHeight.get()).toBe(MIN_BAR_HEIGHT);
    });

    it('does not pass the min bar height to 0 bars if false', () => {
      const chart = mountWithProvider(
        <Chart
          {...mockProps}
          barTheme={{
            ...mockProps.barTheme,
            zeroAsMinHeight: false,
          }}
          data={[{rawValue: 0, label: 'data'}]}
        />,
      );

      const barHeight = chart.find(Bar)!.props.height as SpringValue;

      expect(barHeight.get()).toBe(0);
    });

    it('sets rotateZeroBars to false if false', () => {
      const chart = mountWithProvider(
        <Chart
          {...mockProps}
          barTheme={{
            ...mockProps.barTheme,
            zeroAsMinHeight: false,
          }}
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
          barTheme={{
            ...mockProps.barTheme,
            zeroAsMinHeight: false,
          }}
          data={[
            {rawValue: 1, label: 'data'},
            {rawValue: 500, label: 'data'},
          ]}
        />,
      );

      const barHeight = chart.find(Bar)!.props.height as SpringValue;

      expect(barHeight.get()).toBe(MIN_BAR_HEIGHT);
    });
  });

  describe('gridTheme.showHorizontalLines', () => {
    it('does not render HorizontalGridLines when false', () => {
      const chart = mountWithProvider(
        <Chart
          {...mockProps}
          gridTheme={{...mockProps.gridTheme, showHorizontalLines: false}}
        />,
      );

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });
});
