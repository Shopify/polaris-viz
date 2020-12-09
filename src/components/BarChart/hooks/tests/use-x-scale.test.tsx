import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import {useXScale} from '../use-x-scale';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => {
    return (value: any) => value;
  }),
}));

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
      scale.rangeRound = rangeSpy;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      return scale;
    });

    function TestComponent() {
      useXScale({
        drawableWidth: 200,
        barMargin: 0,
        data: [{rawValue: 10, label: ''}],
        formatXAxisLabel: () => '',
      });

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
      scale.rangeRound = () => scale;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      domainSpy = jest.fn(() => scale);
      scale.domain = domainSpy;
      return scale;
    });

    function TestComponent() {
      useXScale({
        drawableWidth: 200,
        barMargin: 0,
        data: [
          {rawValue: 0, label: ''},
          {rawValue: 1000, label: ''},
          {rawValue: -1000, label: ''},
        ],
        formatXAxisLabel: (val: string) => val,
      });
      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith(['0', '1', '2']);
  });

  it('returns labels with formatting and xoffsets', () => {
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = () => scale;
      scale.rangeRound = () => scale;
      scale.bandwidth = () => 10;
      scale.paddingInner = () => scale;
      scale.domain = () => scale;
      return scale;
    });

    function TestComponent() {
      const {xAxisLabels} = useXScale({
        drawableWidth: 200,
        barMargin: 0,
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
});
