import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {useXScale} from '../use-x-scale';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => {
    return (value: any) => value;
  }),
}));

const mockProps = {
  drawableWidth: 200,
  innerMargin: 0,
  outerMargin: 0,
  data: [
    [10, 20, 30],
    [0, 1, 2],
  ],
  labels: ['label 1', 'label 2'],
};

describe('useXScale', () => {
  afterEach(() => {
    (scaleBand as jest.Mock).mockReset();
  });

  it('creates an x scale with range from 0 to the drawable width', () => {
    let rangeSpy = jest.fn();
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.domain = () => scale;
      rangeSpy = jest.fn(() => scale);
      scale.range = rangeSpy;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      scale.paddingOuter = () => scale;
      scale.step = () => 10;
      return scale;
    });

    function TestComponent() {
      useXScale(mockProps);

      return null;
    }

    mount(<TestComponent />);

    expect(rangeSpy).toHaveBeenCalledWith([0, 200]);
  });

  it('creates an x scale with a domain for each data array', () => {
    let domainSpy = jest.fn();
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = (range: any) => range;
      scale.range = () => scale;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      scale.paddingOuter = () => scale;
      scale.step = () => 10;
      domainSpy = jest.fn(() => scale);
      scale.domain = domainSpy;
      return scale;
    });

    function TestComponent() {
      useXScale(mockProps);
      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith(['0', '1']);
  });

  it('returns labels with xoffsets', () => {
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = () => scale;
      scale.range = () => scale;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      scale.paddingOuter = () => scale;
      scale.domain = () => scale;
      scale.step = () => 10;
      return scale;
    });

    function TestComponent() {
      const {xAxisLabels} = useXScale(mockProps);
      return (
        <React.Fragment>
          {xAxisLabels.map(({value, xOffset}, index) => (
            <div key={index}>{`${value}-${xOffset}`}</div>
          ))}
        </React.Fragment>
      );
    }

    const testComponent = mount(<TestComponent />);
    expect(testComponent).toContainReactText('label 1-50');
  });

  describe('innerMargin', () => {
    it('calls the paddingInner method using the innerMargin', () => {
      let paddingInnerSpy = jest.fn();

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.domain = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;
        scale.paddingOuter = () => scale;
        scale.step = () => 10;

        paddingInnerSpy = jest.fn(() => scale);
        scale.paddingInner = paddingInnerSpy;

        return scale;
      });

      function TestComponent() {
        useXScale({
          ...mockProps,
          innerMargin: 0.5,
        });

        return null;
      }

      mount(<TestComponent />);

      expect(paddingInnerSpy).toHaveBeenCalledWith(0.5);
    });
  });

  describe('outerMargin', () => {
    it('calls the paddingOuter method using the outerMargin', () => {
      let paddingOuterSpy = jest.fn();

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.domain = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;
        scale.paddingInner = () => scale;
        scale.step = () => 10;

        paddingOuterSpy = jest.fn(() => scale);
        scale.paddingOuter = paddingOuterSpy;

        return scale;
      });

      function TestComponent() {
        useXScale({
          ...mockProps,
          outerMargin: 0.5,
        });

        return null;
      }

      mount(<TestComponent />);

      expect(paddingOuterSpy).toHaveBeenCalledWith(0.5);
    });
  });
});
