import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {useXScale} from 'components/BarChart/hooks/use-x-scale';

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
    {rawValue: 0, label: ''},
    {rawValue: 1000, label: ''},
    {rawValue: -1000, label: ''},
  ],
  formatXAxisLabel: (val: string) => val,
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
      return scale;
    });

    function TestComponent() {
      useXScale(mockProps);

      return null;
    }

    mount(<TestComponent />);

    expect(rangeSpy).toHaveBeenCalledWith([0, 200]);
  });

  it('creates an x scale with a domain for each band', () => {
    let domainSpy = jest.fn();
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = (range: any) => range;
      scale.range = () => scale;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      scale.paddingOuter = () => scale;
      domainSpy = jest.fn(() => scale);
      scale.domain = domainSpy;
      return scale;
    });

    function TestComponent() {
      useXScale(mockProps);
      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith(['0', '1', '2']);
  });

  it('returns labels with formatting and xoffsets', () => {
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = () => scale;
      scale.range = () => scale;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      scale.paddingOuter = () => scale;
      scale.domain = () => scale;
      return scale;
    });

    function TestComponent() {
      const {xAxisLabels} = useXScale({
        ...mockProps,
        data: [{rawValue: 0, label: 'Test 1'}],
        formatXAxisLabel: (val: string) => `${val}!`,
      });

      return (
        <React.Fragment>
          {xAxisLabels.map(({value, xOffset}, index) => (
            <div key={index}>{`${value}-${xOffset}`}</div>
          ))}
        </React.Fragment>
      );
    }

    const testComponent = mount(<TestComponent />);
    expect(testComponent).toContainReactText('Test 1!-50');
  });

  describe('innerMargin', () => {
    it('calls paddingInner with the innerMargin', () => {
      let paddingInnerSpy = jest.fn();

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.domain = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;
        scale.paddingOuter = () => scale;

        paddingInnerSpy = jest.fn(() => scale);
        scale.paddingInner = paddingInnerSpy;

        return scale;
      });

      function TestComponent() {
        useXScale({...mockProps, innerMargin: 0.5});

        return null;
      }

      mount(<TestComponent />);

      expect(paddingInnerSpy).toHaveBeenCalledWith(0.5);
    });
  });

  describe('outerMargin', () => {
    it('calls paddingOuter with the outerMargin', () => {
      let paddingOuterSpy = jest.fn();

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.domain = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;
        scale.paddingInner = () => scale;

        paddingOuterSpy = jest.fn(() => scale);
        scale.paddingOuter = paddingOuterSpy;

        return scale;
      });

      function TestComponent() {
        useXScale({...mockProps, outerMargin: 0.5});

        return null;
      }

      mount(<TestComponent />);

      expect(paddingOuterSpy).toHaveBeenCalledWith(0.5);
    });
  });
});
