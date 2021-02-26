import React from 'react';
import * as d3 from 'd3-shape';
import {mount} from '@shopify/react-testing';
import {animated, AnimatedValue, useSpring} from 'react-spring';

import {Arc, Spring} from '../Arc';
import {DataProps} from '../../../PieChart';
import {getColorValue, getDefaultColor} from '../../../../../utilities';

describe('<Arc />', () => {
  const data = [
    {
      label: 'Google',
      value: 45,
      formattedValue: '$45',
    },
  ];

  const arcs = d3.pie()(data.map((data: DataProps) => data.value));

  const seriesForLegend = data.map((data, index) => {
    return {
      name: data.label,
      color: getDefaultColor(index),
      value: data.value,
    };
  });

  const defaultProps = {
    innerRadius: 10,
    outerRadius: 10,
    slice: arcs[0],
    color: getColorValue(seriesForLegend[0].color),
    formattedValue: data[0].formattedValue,
    label: data[0].label,
  };

  it('renders non animated arc', () => {
    const props = {
      color: getColorValue(seriesForLegend[0].color),
      formattedValue: data[0].formattedValue,
      label: data[0].label,
    };
    const arc = mount(<Arc {...defaultProps} {...props} />);

    const {color, formattedValue, label} = props;

    expect(arc).toContainReactComponent(animated.path, {
      // eslint-disable-next-line id-length
      d:
        'M6.123233995736766e-16,-10A10,10,0,1,1,-6.123233995736766e-16,10A10,10,0,1,1,6.123233995736766e-16,-10M-1.8369701987210296e-15,-10A10,10,0,1,0,1.8369701987210296e-15,10A10,10,0,1,0,-1.8369701987210296e-15,-10Z',
      fill: color,
      role: 'listitem',
      'aria-label': formattedValue,
      'aria-describedby': label,
    });
  });

  it('creates the arc generator', () => {
    const arcSpy = jest.spyOn(d3, 'arc');
    mount(<Arc {...defaultProps} />);

    expect(arcSpy).toHaveBeenCalled();
  });

  it('generates an animated path when spring is passed in', () => {
    const expectedAnimatedStartAngle = arcs[0].startAngle;

    const props = {
      color: getColorValue(seriesForLegend[0].color),
      formattedValue: data[0].formattedValue,
      label: data[0].label,
    };

    const springComponent = mount(
      <MockSpringComponent endAngle={expectedAnimatedStartAngle} />,
    );

    const spring = springComponent.find(MockSpringAccepter)!.prop('spring');

    const arc = mount(<Arc {...defaultProps} {...props} spring={spring} />);

    const {color, formattedValue, label} = props;

    expect(arc).toContainReactComponent(animated.path, {
      // eslint-disable-next-line id-length
      d: expect.objectContaining({
        payload: expect.arrayContaining([
          expect.objectContaining({
            value: expectedAnimatedStartAngle,
          }),
        ]),
      }),
      fill: color,
      role: 'listitem',
      'aria-label': formattedValue,
      'aria-describedby': label,
    });
  });
});

function MockSpringComponent({endAngle}: {endAngle: number}) {
  const spring = useSpring({endAngle});

  return <MockSpringAccepter spring={spring} />;
}

function MockSpringAccepter(_: {
  spring: AnimatedValue<Pick<Spring, 'endAngle'>>;
}) {
  return <React.Fragment></React.Fragment>;
}
