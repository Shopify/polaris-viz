import type {Root} from '@shopify/react-testing';
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

function TestComponent(props: Props) {
  const result = useYScale(props);
  return <div>{JSON.stringify(result)}</div>;
}

describe('useYScale()', () => {
  beforeEach(() => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });
  });

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

    mount(<TestComponent {...MOCK_PROPS} />);

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

    mount(<TestComponent {...MOCK_PROPS} min={-10000} max={10000} />);

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

    mount(<TestComponent {...MOCK_PROPS} min={0} max={0} />);

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

    mount(<TestComponent {...MOCK_PROPS} drawableHeight={250} />);

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

    const wrapper = mount(
      <TestComponent
        {...MOCK_PROPS}
        formatYAxisLabel={(value) => `Formatted value: ${value}`}
      />,
    );

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

    mount(<TestComponent {...MOCK_PROPS} min={-1820} max={-543} />);

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

      mount(<TestComponent {...MOCK_PROPS} max={10} shouldRoundUp />);

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

      mount(
        <TestComponent
          {...MOCK_PROPS}
          min={0}
          max={10}
          shouldRoundUp={false}
        />,
      );

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

      mount(
        <TestComponent
          {...MOCK_PROPS}
          min={0}
          max={10}
          shouldRoundUp={false}
          verticalOverflow
        />,
      );

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

      const result = mount(<TestComponent {...MOCK_PROPS} integersOnly />);

      expect(parseResult(result)).toStrictEqual(
        expect.objectContaining({
          ticks: [
            {value: 0, yOffset: 0},
            {value: 1, yOffset: 1},
          ],
        }),
      );
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

      mount(<TestComponent {...MOCK_PROPS} integersOnly min={0.1} max={0.9} />);

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
      const maxYOverride = 20;
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

      mount(
        <TestComponent
          {...MOCK_PROPS}
          min={0}
          max={10}
          maxYOverride={maxYOverride}
        />,
      );

      expect(domainSpy).toHaveBeenCalledWith([0, maxYOverride]);
    });

    it('sets the domain maximum to 10 when all values are zero', () => {
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

      mount(<TestComponent {...MOCK_PROPS} min={0} max={0} />);

      expect(domainSpy).toHaveBeenCalledWith([0, 10]);
    });
  });

  describe('ticksOverride', () => {
    it('returns ticks from ticksOverride', () => {
      const result = mount(
        <TestComponent {...MOCK_PROPS} ticksOverride={[0, 10, 12, 25]} />,
      );

      expect(parseResult(result)).toStrictEqual(
        expect.objectContaining({
          ticks: [
            {value: 0, yOffset: 0},
            {value: 10, yOffset: 10},
            {value: 12, yOffset: 12},
            {value: 25, yOffset: 25},
          ],
        }),
      );
    });
  });
});

function parseResult(mockComponent: Root<any>) {
  return JSON.parse(mockComponent.text());
}
