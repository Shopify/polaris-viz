import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';
import {mountWithProvider} from 'test-utilities';
import {mockDefaultTheme} from 'test-utilities/mount-with-provider';

import {BarChartXAxis} from 'components/BarChartXAxis/BarChartXAxis';

jest.mock('d3-scale', () => ({
  scaleBand: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];
    scale.range = () => [0, 2];
    scale.bandwidth = () => 10;

    return scale;
  },
}));

describe('<BarChartXAxis/>', () => {
  const mockProps = {
    range: [0, 100],
    fontSize: 10,
    labels: [
      {value: 'A label that is long', xOffset: 10},
      {value: 'Label', xOffset: 20},
    ],
    xScale: scaleBand(),
    xAxisDetails: {
      needsDiagonalLabels: false,
      maxXLabelHeight: 40,
      maxDiagonalLabelLength: 100,
      maxWidth: 100,
    },
  };

  it('renders a line for each label value', () => {
    const axis = mountWithProvider(
      <svg>
        <BarChartXAxis {...mockProps} />,
      </svg>,
      mockDefaultTheme({xAxis: {showTicks: true}}),
    );

    expect(axis).toContainReactComponentTimes('line', 2);
  });

  it('renders a foreignObject for each label value', () => {
    const axis = mount(
      <svg>
        <BarChartXAxis {...mockProps} />,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('foreignObject', 2);
  });

  it('hides elements if needsDiagonalLabels is true and there is not enough room', () => {
    const axis = mount(
      <svg>
        <BarChartXAxis
          {...mockProps}
          xAxisDetails={{
            ...mockProps.xAxisDetails,
            needsDiagonalLabels: true,
            maxWidth: 10,
          }}
        />
        ,
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('foreignObject', 1);
  });

  it('displays text horizontally by default', () => {
    const axis = mount(
      <svg>
        <BarChartXAxis {...mockProps} />,
      </svg>,
    );

    const foreignObjectTransform = axis.find('foreignObject')!.props.transform;
    expect(foreignObjectTransform).not.toContain('rotate');
  });

  it('displays text diagonally if needsDiagonalLabels is true', () => {
    const axis = mount(
      <svg>
        <BarChartXAxis
          {...mockProps}
          xAxisDetails={{...mockProps.xAxisDetails, needsDiagonalLabels: true}}
        />
        ,
      </svg>,
    );

    const foreignObjectTransform = axis.find('foreignObject')!.props.transform;
    expect(foreignObjectTransform).toContain('rotate');
  });

  it('displays minimal labels if minimalLabelIndexes is true', () => {
    const axis = mount(
      <svg>
        <BarChartXAxis
          {...mockProps}
          minimalLabelIndexes={[0, 3, 6]}
          labels={[
            {value: '0', xOffset: 10},
            {value: '1', xOffset: 10},
            {value: '2', xOffset: 20},
            {value: '3', xOffset: 20},
            {value: '4', xOffset: 20},
            {value: '5', xOffset: 20},
            {value: '6', xOffset: 20},
          ]}
        />
      </svg>,
    );

    const styleProps = {fontSize: 10, color: 'colorGray30'};

    expect(axis).toContainReactComponent('div', {
      children: '0',
      style: {...styleProps, textAlign: 'left'},
    });

    expect(axis).toContainReactComponent('div', {
      children: '3',
      style: {...styleProps, textAlign: 'center'},
    });

    expect(axis).toContainReactComponent('div', {
      children: '6',
      style: {...styleProps, textAlign: 'right'},
    });
  });

  it('uses modified positions for minimal xAxis labels', () => {
    const axis = mount(
      <svg>
        <BarChartXAxis
          {...mockProps}
          minimalLabelIndexes={[0, 3, 6]}
          labels={[
            {value: '0', xOffset: 10},
            {value: '1', xOffset: 10},
            {value: '2', xOffset: 20},
            {value: '3', xOffset: 20},
            {value: '4', xOffset: 20},
            {value: '5', xOffset: 20},
            {value: '6', xOffset: 20},
          ]}
        />
        ,
      </svg>,
    );

    expect(axis).toContainReactComponent('g', {
      transform: 'translate(5, 24)',
    });
  });
});
