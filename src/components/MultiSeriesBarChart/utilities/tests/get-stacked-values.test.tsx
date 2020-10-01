import {Data} from 'components/MultiSeriesBarChart/types';
import {stack} from 'd3-shape';

import {getStackedValues} from '../get-stacked-values';

const mockData: Data[] = [
  {data: [10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
  {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL2'},
  {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL3'},
];
const labels: string[] = ['one', 'two', 'three'];

jest.mock('d3-shape', () => ({
  stack: jest.fn(() => {
    const generator = (value: any) => value;
    generator.offset = () => generator;
    generator.keys = () => generator;
    return generator;
  }),
}));

describe('get-stacked-values', () => {
  it('makes a call to stack()', () => {
    (stack as jest.Mock).mockImplementation(() => {
      const stack = () => (value: any) => value;
      stack.offset = () => stack;
      stack.keys = () => stack;
      return stack;
    });

    getStackedValues(mockData, labels);

    expect(stack).toHaveBeenCalledTimes(1);
  });

  it('applies the offset to the stackedData', () => {
    let offsetSpy = jest.fn();

    (stack as jest.Mock).mockImplementation(() => {
      const stack = () => (value: any) => value;
      offsetSpy = jest.fn((offset: any) => (offset ? offset : stack));
      stack.offset = offsetSpy;
      stack.keys = (keys: any) => (keys ? stack : keys);
      return stack;
    });

    getStackedValues(mockData, labels);

    expect(offsetSpy).toHaveBeenCalledTimes(1);
  });

  it('applies the keys to the stackedData', () => {
    let keySpy = jest.fn();

    (stack as jest.Mock).mockImplementation(() => {
      const stack = () => (value: any) => value;
      stack.offset = (offset: any) => (offset ? offset : stack);

      keySpy = jest.fn(() => stack);
      stack.keys = () => keySpy;
      return stack;
    });

    getStackedValues(mockData, labels);

    expect(keySpy).toHaveBeenCalledTimes(1);
  });
});
