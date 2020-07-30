import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {XAxis} from '../XAxis';

jest.mock('d3-scale', () => ({
  scaleLinear: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];
    scale.range = () => [0, 2];

    return scale;
  },
}));

(global as any).DOMRect = class DOMRect {
  width = 300;
  height = 200;
};

describe('<XAxis />', () => {
  it("provides a best estimate number of ticks to d3's ticks utility to choose the ideal number of ticks", () => {
    const xScale = scaleLinear();
    const ticksSpy = jest.spyOn(xScale, 'ticks');

    mount(
      <svg>
        <XAxis
          xScale={xScale}
          labels={['Test label 1', 'Test label 2', 'Test label 3']}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    expect(ticksSpy).toHaveBeenCalledWith(2);
  });

  it('renders an axis line with a tick at the start and end of the axis', () => {
    const axis = mount(
      <svg>
        <XAxis
          xScale={scaleLinear()}
          labels={['Test label 1', 'Test label 2', 'Test label 3']}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    expect(axis).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M 0 6 v -6 H 2 v 6',
    });
  });

  it('renders a small, outer tick for each tick that there is space for', () => {
    const axis = mount(
      <svg>
        <XAxis
          xScale={scaleLinear()}
          labels={['Test label 1', 'Test label 2', 'Test label 3']}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    expect(axis).toContainReactComponentTimes('line', 3, {y2: 6});
  });

  it('renders a vertical gridline for each tick that there is space for using drawableHeight', () => {
    const axis = mount(
      <svg>
        <XAxis
          xScale={scaleLinear()}
          labels={['Test label 1', 'Test label 2', 'Test label 3']}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    // -55 is the height mocked above minus the top and bottom margin
    expect(axis).toContainReactComponentTimes('line', 3, {y1: '0', y2: -150});
  });

  it('renders a label for each tick', () => {
    const labels = ['Test label 1', 'Test label 2', 'Test label 3'];
    const axis = mount(
      <svg>
        <XAxis
          xScale={scaleLinear()}
          labels={labels}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    // toContainReactText can't get the text from svg <text> elements,
    // so we have to retrieve it manually as children
    const text = axis.findAll('text')!;
    const textContent = text.map((node) => node.prop('children'));

    expect(textContent).toStrictEqual(labels);
  });

  it('renders a label for each tick that there is space for', () => {
    (global as any).DOMRect = class DOMRect {
      width = 100;
      height = 200;
    };

    const labels = ['Test label 1', 'Test label 2', 'Test label 3'];
    const axis = mount(
      <svg>
        <XAxis
          xScale={scaleLinear()}
          labels={labels}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    expect(axis).toContainReactComponent('text', {children: 'Test label 1'});
    expect(axis).toContainReactComponent('text', {children: 'Test label 2'});
    expect(axis).not.toContainReactComponent('text', {
      children: 'Test label 3',
    });
  });

  it('does not render any labels if the labels prop is not provided', () => {
    const axis = mount(
      <svg>
        <XAxis
          xScale={scaleLinear()}
          dimensions={new DOMRect()}
          drawableHeight={150}
          axisMargin={0}
        />
      </svg>,
    );

    const text = axis.findAll('text')!;

    expect(text).toHaveLength(0);
  });
});
