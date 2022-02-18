import React from 'react';
import {mount} from '@shopify/react-testing';

import {
  mountWithProvider,
  expectToThrow,
  randomNumber,
} from '../../test-utilities';
import {DEFAULT_THEME} from '../../../../polaris-viz-core/src';
import {useSparkLine} from '../useSparkLine';

const generateSampleData = ({minValue, maxValue, length}) => {
  const data = new Array(length)
    .fill({
      key: 'some key',
      value: null,
    })
    .map((_, index) => ({
      key: `some key ${index}`,
      value: randomNumber(minValue, maxValue),
    }));

  return {data};
};

const generateSampleDataWithMinMax = ({minValue, maxValue, length}) => {
  const {data} = generateSampleData({minValue, maxValue, length});

  data.push({
    key: 'max',
    value: maxValue,
  });
  data.push({
    key: 'max',
    value: minValue,
  });
  return {data};
};

describe('useSparkLine', () => {
  describe('minXDomain', () => {
    it.each`
      minValue | maxValue | length | expected
      ${1}     | ${100}   | ${1}   | ${'0'}
      ${-100}  | ${1900}  | ${10}  | ${'0'}
      ${-280}  | ${450}   | ${8}   | ${'0'}
    `(
      'is zero, regardless of the data provided',
      ({minValue, maxValue, length, expected}) => {
        const TestComponent = () => {
          const {minXDomain} = useSparkLine({
            data: [
              generateSampleDataWithMinMax({
                minValue,
                maxValue,
                length,
              }),
            ],
            height: 100,
          });

          return <div>{minXDomain.toString()}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('maxXDomain', () => {
    it.each`
      lengths              | expected
      ${[10, 5]}           | ${'10'}
      ${[320, 0, 50, 100]} | ${'320'}
      ${[0, 0, 50, 100]}   | ${'100'}
    `(
      'is calculated based on the length of the longest data series',
      ({lengths, expected}) => {
        const TestComponent = () => {
          const {maxXDomain} = useSparkLine({
            data: new Array(lengths.length).fill(null).map((_, index) =>
              generateSampleData({
                minValue: 0,
                maxValue: 100,
                length: lengths[index],
              }),
            ),
            height: 100,
          });

          return <div>{maxXDomain.toString()}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('yScale', () => {
    it.each`
      minValue | maxValue | height | expected
      ${0}     | ${10}    | ${10}  | ${'2'}
      ${-10}   | ${50}    | ${13}  | ${'8'}
      ${-10}   | ${0}     | ${13}  | ${'-7'}
    `(
      'uses the hight and  the minimum and maximum values of the data provided',
      ({minValue, maxValue, height, expected}) => {
        const TestComponent = () => {
          const {yScale} = useSparkLine({
            data: [
              {
                data: [
                  {
                    key: 'key 1',
                    value: minValue,
                  },
                  {
                    key: 'key 2',
                    value: maxValue,
                  },
                  {
                    key: 'key 3',
                    value: maxValue / 3,
                  },
                ],
              },
            ],
            height,
          });

          return <div>{yScale(10)}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });
});
