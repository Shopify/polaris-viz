import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {DEFAULT_MAX_Y} from '../../constants';
import type {Props} from '../useYScale';
import {getLabelWidth, useYScale} from '../useYScale';
import {shouldRoundScaleUp} from '../../utilities/shouldRoundScaleUp';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    scale.nice = () => scale;
    scale.copy = () => scale;
    return scale;
  }),
}));

jest.mock('../../utilities/estimateStringWidth', () => {
  return {
    estimateStringWidth: () => 0,
  };
});

jest.mock('../../utilities/shouldRoundScaleUp', () => {
  return {
    shouldRoundScaleUp: jest.fn(),
  };
});

const MOCK_PROPS: Props = {
  drawableHeight: 250,
  formatYAxisLabel: jest.fn(),
  integersOnly: false,
  max: 0,
  min: 50,
};

describe('useYScale()', () => {
  afterEach(() => {
    (scaleLinear as jest.Mock).mockReset();
  });

  it("provides a best estimate number of ticks to d3's ticks utility to choose the ideal number of ticks", () => {
    const ticksSpy = jest.fn(() => [0, 25, 50]);
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = ticksSpy;
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale(MOCK_PROPS);

      return null;
    }

    mount(<TestComponent />);

    expect(ticksSpy).toHaveBeenCalledWith(4);
  });

  it('creates a y scale with a domain corresponding to the minimum and maximum values in the data set, plus some padding', () => {
    let domainSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        ...MOCK_PROPS,
        min: -10000,
        max: 10000,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([-10000, 10000]);
  });

  it('creates a y scale with the domain maximum set to the default max y for a data set with all zero values', () => {
    let domainSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        ...MOCK_PROPS,
        min: 0,
        max: 0,
      });
      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([0, DEFAULT_MAX_Y]);
  });

  it('creates a y scale with range equal to the drawable height', () => {
    let rangeSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      rangeSpy = jest.fn((range: any) => (range ? scale : range));
      scale.range = rangeSpy;
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        ...MOCK_PROPS,
        drawableHeight: 250,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(rangeSpy).toHaveBeenCalledWith([250, 0]);
  });

  it('uses the provided function the format the tick labels', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = () => [25];
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      const {ticks} = useYScale({
        ...MOCK_PROPS,
        formatYAxisLabel: jest.fn((value) => `Formatted value: ${value}`),
      });

      const {formattedValue} = ticks[0];

      return <p>{formattedValue}</p>;
    }

    const wrapper = mount(<TestComponent />);

    expect(wrapper).toContainReactText('Formatted value: 25');
  });

  it('creates a y scale with max of 0 when all values are negative', () => {
    let domainSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        ...MOCK_PROPS,
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        min: -1820,
        max: -543,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([-1820, 0]);
  });

  describe('shouldRoundScaleUp()', () => {
    it('does not update the domain when true', () => {
      let domainSpy = jest.fn();
      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
        scale.range = (range: any) => (range ? scale : range);
        domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
        scale.domain = domainSpy;
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      (shouldRoundScaleUp as jest.Mock).mockImplementation(jest.fn(() => true));

      function TestComponent() {
        useYScale({...MOCK_PROPS, max: 10, shouldRoundUp: true});

        return null;
      }

      mount(<TestComponent />);

      expect(domainSpy).toHaveBeenNthCalledWith(1, [0, 10]);
    });

    it('updates the domain when false', () => {
      let domainSpy = jest.fn();
      const firstTick = 50;

      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = () => [firstTick];
        scale.range = (range: any) => (range ? scale : range);
        domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
        scale.domain = domainSpy;
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      (shouldRoundScaleUp as jest.Mock).mockImplementation(
        jest.fn(() => false),
      );

      function TestComponent() {
        useYScale({...MOCK_PROPS, min: 0, max: 10, shouldRoundUp: false});

        return null;
      }

      mount(<TestComponent />);

      // Check that it's called with the min and max data
      expect(domainSpy).toHaveBeenNthCalledWith(1, [0, 10]);

      // Check that it's called with the first tick and max data the second time
      expect(domainSpy).toHaveBeenNthCalledWith(2, [0, 10]);
    });

    it('updates the domain when true and verticalOverflow is true', () => {
      let domainSpy = jest.fn();
      const firstTick = 50;

      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = () => [firstTick];
        scale.range = (range: any) => (range ? scale : range);
        domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
        scale.domain = domainSpy;
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      (shouldRoundScaleUp as jest.Mock).mockImplementation(
        jest.fn(() => false),
      );

      function TestComponent() {
        useYScale({
          ...MOCK_PROPS,
          min: 0,
          max: 10,
          shouldRoundUp: false,
          verticalOverflow: true,
        });

        return null;
      }

      mount(<TestComponent />);

      // Check that it's called with the min and max data
      expect(domainSpy).toHaveBeenNthCalledWith(1, [0, 10]);

      // Check that it's called with the first tick and max data the second time
      expect(domainSpy).toHaveBeenNthCalledWith(2, [0, 10]);
    });
  });

  describe('integersOnly', () => {
    it('only returns ticks for integers if true', () => {
      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = () => [0, 0.5, 1];
        scale.range = (range: any) => (range ? scale : range);
        scale.domain = (domain: any) => (domain ? scale : domain);
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      function TestComponent() {
        const {ticks} = useYScale({
          ...MOCK_PROPS,
          integersOnly: true,
        });

        return <p>{ticks.map(({value}) => `${value.toString()}-`)}</p>;
      }

      const wrapper = mount(<TestComponent />);

      expect(wrapper).toContainReactText('0-1-');
    });

    it('rounds min domain down and max domain up to the nearest integer if true', () => {
      let domainSpy = jest.fn();
      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
        scale.range = (range: any) => (range ? scale : range);
        domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
        scale.domain = domainSpy;
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      function TestComponent() {
        useYScale({
          ...MOCK_PROPS,
          integersOnly: true,
          min: 0.1,
          max: 0.9,
        });

        return null;
      }

      mount(<TestComponent />);

      expect(domainSpy).toHaveBeenCalledWith([0, 1]);
    });
  });

  describe('getLabelWidth()', () => {
    it.each([
      {fixedWidth: undefined, yAxisLabelWidth: 100, expected: 100},
      {fixedWidth: null, yAxisLabelWidth: 100, expected: 100},
      {fixedWidth: false, yAxisLabelWidth: 100, expected: 100},
      {fixedWidth: 200, yAxisLabelWidth: 100, expected: 200},
    ])(
      'returns $expected when fixedWidth: $fixedWidth',
      ({fixedWidth, yAxisLabelWidth, expected}) => {
        expect(getLabelWidth(yAxisLabelWidth, fixedWidth as any)).toBe(
          expected,
        );
      },
    );
  });

  describe('maxYOverride', () => {
    it('creates a y scale with the domain maximum set to maxYOverride when both min and max are zero', () => {
      let domainSpy = jest.fn();
      const maxYOverride = 1;
      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
        scale.range = (range: any) => (range ? scale : range);
        domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
        scale.domain = domainSpy;
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      function TestComponent() {
        useYScale({
          ...MOCK_PROPS,
          min: 0,
          max: 0,
          maxYOverride,
        });

        return null;
      }

      mount(<TestComponent />);

      expect(domainSpy).toHaveBeenCalledWith([0, maxYOverride]);
    });
  });
});
