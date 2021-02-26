import React from 'react';
import {mount} from '@shopify/react-testing';
import {pie} from 'd3-shape';
import * as reactSpring from 'react-spring';

import {DataProps, PieChart} from '../PieChart';
import {getColorValue, getDefaultColor} from '../../../utilities';
import {Arc, Legend} from '../components';

jest.mock('../../../utilities', () => ({
  ...jest.requireActual('../../../utilities'),
  getDefaultColor: jest.fn(),
  getColorValue: jest.fn(),
}));

const getDefaultColorMock: jest.Mock = jest.requireMock('../../../utilities')
  .getDefaultColor;

const getColorValueMock: jest.Mock = jest.requireMock('../../../utilities')
  .getColorValue;

describe('<PieChart />', () => {
  beforeEach(() => {
    getDefaultColorMock.mockReturnValue('primary');
    getColorValueMock.mockReturnValue('rgb(0,161,159)');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    data: [
      {
        label: 'Google',
        value: 45,
        formattedValue: '$45',
      },
      {label: 'Facebook', value: 70, formattedValue: '$70'},
      {label: 'Twitter', value: 200, formattedValue: '$200'},
    ],
    outerRadius: 150,
  };

  it('renders <div/> with pie chart container', () => {
    const pieChart = mount(<PieChart {...defaultProps} />);

    expect(pieChart).toContainReactComponent('div', {
      className: 'Container',
    });
  });

  it('renders <svg/> with props', () => {
    const outerRadius = 200;
    const pieChart = mount(
      <PieChart {...defaultProps} outerRadius={outerRadius} />,
    );

    expect(pieChart).toContainReactComponent('svg', {
      width: outerRadius * 2,
      height: outerRadius * 2,
      viewBox: `-${outerRadius} -${outerRadius} ${outerRadius *
        2} ${outerRadius * 2}`,
      role: 'list',
    });
  });

  it('renders <Legend/>', () => {
    const data = [
      {
        label: 'Google',
        value: 45,
        formattedValue: '$45',
      },
    ];
    const props = {
      data,
    };

    const expectedSeriesForLegend = data.map((data, index) => {
      return {
        name: data.label,
        color: getDefaultColor(index),
        value: data.value,
      };
    });

    const pieChart = mount(<PieChart {...defaultProps} {...props} />);

    expect(pieChart).toContainReactComponent(Legend, {
      series: expectedSeriesForLegend,
    });
  });

  it('renders n <Arc/> based on n length of data', () => {
    const data = [
      {
        label: 'Google',
        value: 45,
        formattedValue: '$45',
      },
      {label: 'Facebook', value: 70, formattedValue: '$70'},
      {label: 'Twitter', value: 200, formattedValue: '$200'},
    ];
    const props = {
      data,
    };

    const pieChart = mount(<PieChart {...defaultProps} {...props} />);

    expect(pieChart).toContainReactComponentTimes(Arc, data.length);
  });

  it('renders <Arc/> with props', () => {
    const props = {
      data: [
        {
          label: 'Google',
          value: 45,
          formattedValue: '$45',
        },
      ],
      outerRadius: 200,
    };

    const pieChart = mount(<PieChart {...defaultProps} {...props} />);

    const {data, outerRadius} = props;

    const {label, formattedValue} = data[0];

    const expectedSeriesForLegend = data.map((data, index) => {
      return {
        name: data.label,
        color: getDefaultColor(index),
        value: data.value,
      };
    });

    const generatedSlices = pie()(data.map((data: DataProps) => data.value));

    const expectedInitialSlices = generatedSlices.map((slice) => ({
      ...slice,
      endAngle: slice.startAngle + 0.1,
    }));

    expect(pieChart).toContainReactComponent(Arc, {
      innerRadius: outerRadius / 2,
      outerRadius,
      slice: expectedInitialSlices[0],
      color: getColorValue(expectedSeriesForLegend[0].color),
      formattedValue,
      label,
    });
  });

  it('passes spring props to arc when animation is enabled', () => {
    const pieChart = mount(<PieChart {...defaultProps} />);

    const arc = pieChart.find(Arc)!;

    expect(arc.props.spring).toBeDefined();
  });

  it('does not pass spring props to arc when animation is disabled', () => {
    const pieChart = mount(<PieChart {...defaultProps} animation={false} />);

    const arc = pieChart.find(Arc)!;

    expect(arc.props.spring).toBeUndefined();
  });

  it('calls getDefaultColor', () => {
    const data = [
      {
        label: 'Google',
        value: 45,
        formattedValue: '$45',
      },
    ];
    const props = {
      data,
    };

    mount(<PieChart {...defaultProps} {...props} />);

    expect(getDefaultColorMock).toHaveBeenCalledTimes(1);
  });

  it('calls getColorValue', () => {
    const data = [
      {
        label: 'Google',
        value: 45,
        formattedValue: '$45',
      },
    ];
    const props = {
      data,
    };

    mount(<PieChart {...defaultProps} {...props} />);

    expect(getColorValueMock).toHaveBeenCalled();
  });

  it('calls useSprings', () => {
    const useSpringSpy = jest.spyOn(reactSpring, 'useSprings');
    const data = [
      {
        label: 'Google',
        value: 45,
        formattedValue: '$45',
      },
    ];
    const props = {
      data,
    };

    mount(<PieChart {...defaultProps} {...props} />);

    expect(useSpringSpy).toHaveBeenCalled();
  });
});
