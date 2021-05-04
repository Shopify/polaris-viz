import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {YAxis, TooltipContainer, BarChartXAxis, Bar} from 'components';

import {AnnotationLine} from '../components';
import {Chart} from '../Chart';
import {MASK_SUBDUE_COLOR, MASK_HIGHLIGHT_COLOR} from '../../../constants';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

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
    chartDimensions: new DOMRect(),
    barOptions: {
      color: 'colorPurple' as Color,
      margin: 0,
      hasRoundedCorners: false,
    },
    xAxisOptions: {
      labelFormatter: (value: string) => value.toString(),
      showTicks: true,
      labelColor: 'red',
      useMinimalLabels: false,
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      labelColor: 'red',
    },
    gridOptions: {showHorizontalLines: true, color: 'red'},
    renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
    annotationsLookupTable: {
      1: {
        dataIndex: 1,
        xOffset: 0.5,
        width: 5,
        color: '#ccc',
        ariaLabel: 'Median: 1.5',
        tooltipData: {
          label: 'Median',
          value: '1.5 hours',
        },
      },
    },
  };

  it('renders an SVG element', () => {
    const barChart = mount(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent('svg');
  });

  describe('<BarChartXAxis />', () => {
    it('renders', () => {
      const barChart = mount(<Chart {...mockProps} />);
      expect(barChart).toContainReactComponent(BarChartXAxis);
    });

    it('is passed three minimalLabelIndexes if useMinimalLabels is true and there are more than three data items', () => {
      const barChart = mount(
        <Chart
          {...mockProps}
          data={[
            {rawValue: 10, label: 'data'},
            {rawValue: 20, label: 'data 2'},
            {rawValue: 20, label: 'data 3'},
            {rawValue: 20, label: 'data 4'},
          ]}
          xAxisOptions={{
            labelFormatter: (value: string) => value.toString(),
            showTicks: true,
            labelColor: 'red',
            useMinimalLabels: true,
          }}
        />,
      );
      expect(barChart).toContainReactComponent(BarChartXAxis, {
        minimalLabelIndexes: [0, 2, 3],
      });
    });

    it('is passed null minimalLabelIndexes if useMinimalLabels is true but there are less than three bars', () => {
      const barChart = mount(
        <Chart
          {...mockProps}
          xAxisOptions={{
            labelFormatter: (value: string) => value.toString(),
            showTicks: true,
            labelColor: 'red',
            useMinimalLabels: true,
          }}
        />,
      );
      expect(barChart).toContainReactComponent(BarChartXAxis, {
        minimalLabelIndexes: null,
      });
    });
  });

  it('renders an yAxis', () => {
    const barChart = mount(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent(YAxis);
  });

  it('does not render a <TooltipContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipContainer);
  });

  it('renders a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(TooltipContainer);
  });

  it('renders the tooltip content in a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;

    expect(tooltipContainer).toContainReactComponent('p', {
      children: 'Mock Tooltip',
    });
  });

  it('renders a Bar for each data item', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponentTimes(Bar, 2);
  });

  it('passes a subdued color to the Bar that is not being hovered on or nearby', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    expect(chart).toContainReactComponent(Bar, {color: MASK_HIGHLIGHT_COLOR});

    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(Bar, {color: MASK_SUBDUE_COLOR});
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipContainer);
    });
  });

  describe('<AnnotationLine/>', () => {
    it('does not render when annotated data does not exist', () => {
      const updatedProps = {
        ...mockProps,
        annotationsLookupTable: {},
      };
      const chart = mount(<Chart {...updatedProps} />);

      expect(chart).not.toContainReactComponent(AnnotationLine);
    });

    it('renders when annotatated data exists', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(AnnotationLine);
    });
  });

  describe('data.barOptions.color', () => {
    it('renders when the barOptions.color exists', () => {
      const updatedProps = {
        ...mockProps,
        data: [
          {rawValue: 10, label: 'data'},
          {
            rawValue: 20,
            label: 'data 2',
            barOptions: {
              color: 'colorGrayDark' as Color,
            },
          },
        ],
      };
      const chart = mount(<Chart {...updatedProps} />);

      expect(chart.find('rect', {fill: 'rgb(55, 66, 80)'})).not.toBeNull();
    });

    it('does not render when the barOptions.color does not exist', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart.find('rect', {fill: 'rgb(55, 66, 80)'})).toBeNull();
    });
  });
});
