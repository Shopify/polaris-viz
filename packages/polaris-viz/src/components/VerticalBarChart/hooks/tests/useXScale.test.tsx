import {Fragment} from 'react';
import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import type {Props} from '../useXScale';
import {useXScale} from '../useXScale';

jest.mock('d3-scale', () => ({
  ...jest.requireActual('d3-scale'),
  scaleBand: jest.fn(() => {
    return (value: any) => value;
  }),
}));

const MOCK_PROPS: Props = {
  drawableWidth: 200,
  data: [
    [10, 20, 30],
    [0, 1, 2],
  ],
  labels: ['label 1', 'label 2'],
};

describe('useXScale', () => {
  function TestComponent(props: Props) {
    useXScale(props);
    return null;
  }

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

    mount(<TestComponent {...MOCK_PROPS} />);

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

    mount(<TestComponent {...MOCK_PROPS} />);

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
      const {xAxisLabels} = useXScale(MOCK_PROPS);
      return (
        <Fragment>
          {xAxisLabels.map(({value, xOffset}, index) => (
            <div key={index}>{`${value}-${xOffset}`}</div>
          ))}
        </Fragment>
      );
    }

    const testComponent = mount(<TestComponent />);
    expect(testComponent).toContainReactText('label 1-50');
  });

  describe('gapOverride', () => {
    it('returns gap based on data size when gapOverride is not provided', () => {
      let paddingInnerSpy;
      let paddingOuterSpy;

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.range = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;

        paddingInnerSpy = jest.fn(() => scale);
        paddingOuterSpy = jest.fn(() => scale);

        scale.paddingInner = paddingInnerSpy;
        scale.paddingOuter = paddingOuterSpy;
        scale.domain = () => scale;
        scale.step = () => 10;
        return scale;
      });

      mount(<TestComponent {...MOCK_PROPS} />);

      expect(paddingInnerSpy).toHaveBeenCalledWith(0.25);
      expect(paddingOuterSpy).toHaveBeenCalledWith(0.125);
    });

    it('returns gap based on gapOverride when provided', () => {
      let paddingInnerSpy;
      let paddingOuterSpy;

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.range = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;

        paddingInnerSpy = jest.fn(() => scale);
        paddingOuterSpy = jest.fn(() => scale);

        scale.paddingInner = paddingInnerSpy;
        scale.paddingOuter = paddingOuterSpy;
        scale.domain = () => scale;
        scale.step = () => 10;
        return scale;
      });

      mount(<TestComponent {...MOCK_PROPS} gapOverride={0} />);

      expect(paddingInnerSpy).toHaveBeenCalledWith(0);
      expect(paddingOuterSpy).toHaveBeenCalledWith(0);
    });

    it('clamps gapOverride to 0 when a negative value is provided', () => {
      let paddingInnerSpy;
      let paddingOuterSpy;

      (scaleBand as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.range = () => scale;
        scale.range = () => scale;
        scale.bandwidth = () => 10;

        paddingInnerSpy = jest.fn(() => scale);
        paddingOuterSpy = jest.fn(() => scale);

        scale.paddingInner = paddingInnerSpy;
        scale.paddingOuter = paddingOuterSpy;
        scale.domain = () => scale;
        scale.step = () => 10;
        return scale;
      });

      mount(<TestComponent {...MOCK_PROPS} gapOverride={-10} />);

      expect(paddingInnerSpy).toHaveBeenCalledWith(0);
      expect(paddingOuterSpy).toHaveBeenCalledWith(0);
    });
  });
});
