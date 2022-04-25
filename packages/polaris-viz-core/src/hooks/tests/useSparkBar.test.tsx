import React from 'react';
import {mount} from '@shopify/react-testing';

import {useSparkBar} from '../useSparkBar';

describe('useSparkBar', () => {
  describe('dataWithIndex', () => {
    it.each`
      data                                            | expected
      ${[{key: '1', value: 1}, {key: '2', value: 2}]} | ${'[{"value":{"key":"1","value":1},"index":0},{"value":{"key":"2","value":2},"index":1}]'}
      ${[{key: 1, value: 1}, {key: 2, value: 2}]}     | ${'[{"value":{"key":1,"value":1},"index":0},{"value":{"key":2,"value":2},"index":1}]'}
    `('returns data with an index', ({data, expected}) => {
      const TestComponent = () => {
        const {dataWithIndex} = useSparkBar({
          data: [{data}],
          height: 500,
          dataOffsetLeft: 0,
          dataOffsetRight: 0,
          width: 600,
          seriesColor: 'red',
        });

        return <div>{JSON.stringify(dataWithIndex)}</div>;
      };

      const mockComponent = mount(<TestComponent />);
      expect(mockComponent.text()).toBe(expected);
    });
  });

  describe('color', () => {
    it.each`
      initialColor                    | expected
      ${'red'}                        | ${'[{"color":"red","offset":0}]'}
      ${[{color: '#fff', offset: 0}]} | ${'[{"color":"#fff","offset":0}]'}
    `('returns a usable color', ({initialColor, expected}) => {
      const TestComponent = () => {
        const {color} = useSparkBar({
          data: [],
          height: 500,
          dataOffsetLeft: 0,
          dataOffsetRight: 0,
          width: 600,
          seriesColor: initialColor,
        });

        return <div>{JSON.stringify(color)}</div>;
      };

      const mockComponent = mount(<TestComponent />);
      expect(mockComponent.text()).toBe(expected);
    });
  });

  describe('strokeDasharray', () => {
    it.each`
      width  | data                                                                  | expected
      ${100} | ${[{key: '1', value: 1}, {key: '2', value: 2}]}                       | ${'39.6764705882353 19.147058823529413'}
      ${500} | ${[{key: '1', value: 1}, {key: '2', value: 2}, {key: '3', value: 3}]} | ${'128.12962962962962 57.05555555555555'}
    `(
      'returns a strokeDasharray based on the width and amount of data',
      ({width, data, expected}) => {
        const TestComponent = () => {
          const {strokeDasharray} = useSparkBar({
            data: [{data}],
            height: 500,
            dataOffsetLeft: 0,
            dataOffsetRight: 0,
            width,
            seriesColor: 'red',
          });

          return <div>{strokeDasharray.toString()}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('barWidth', () => {
    it.each`
      width  | data                                                                  | expected
      ${100} | ${[{key: '1', value: 1}, {key: '2', value: 2}]}                       | ${'41'}
      ${500} | ${[{key: '1', value: 1}, {key: '2', value: 2}, {key: '3', value: 3}]} | ${'130'}
    `(
      'returns a barWidth based on the width and amount of data',
      ({width, data, expected}) => {
        const TestComponent = () => {
          const {barWidth} = useSparkBar({
            data: [{data}],
            height: 500,
            dataOffsetLeft: 0,
            dataOffsetRight: 0,
            width,
            seriesColor: 'red',
          });

          return <div>{Math.round(barWidth).toString()}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('strokeDashOffset', () => {
    it.each`
      dataOffsetLeft | data                                                                  | expected
      ${100}         | ${[{key: '1', value: 1}, {key: '2', value: 2}]}                       | ${'-100.75'}
      ${0}           | ${[{key: '1', value: 1}, {key: '2', value: 2}, {key: '3', value: 3}]} | ${'-0.75'}
    `(
      'returns a strokeDashoffset based on dataOffsetLeft',
      ({dataOffsetLeft, data, expected}) => {
        const TestComponent = () => {
          const {strokeDashoffset} = useSparkBar({
            data: [{data}],
            height: 500,
            dataOffsetLeft,
            dataOffsetRight: 0,
            width: 100,
            seriesColor: 'red',
          });

          return <div>{strokeDashoffset}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('comparisonData', () => {
    it.each`
      data                                                                  | isComparison | expected
      ${[{key: '1', value: 1}, {key: '2', value: 2}]}                       | ${true}      | ${'{"data":[{"key":"1","value":1},{"key":"2","value":2}],"isComparison":true}'}
      ${[{key: '1', value: 1}, {key: '2', value: 2}, {key: '3', value: 3}]} | ${false}     | ${''}
    `(
      'returns filtered comparisonData if it exists',
      ({data, isComparison, expected}) => {
        const TestComponent = () => {
          const {comparisonData} = useSparkBar({
            data: [{data, isComparison}],
            height: 500,
            dataOffsetLeft: 0,
            dataOffsetRight: 0,
            width: 100,
            seriesColor: 'red',
          });

          return <div>{JSON.stringify(comparisonData)}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('lineShape', () => {
    it.each`
      data                                                                  | width  | height | expected
      ${[{key: '1', value: 1}, {key: '2', value: 2}]}                       | ${300} | ${300} | ${'M300,154L600,8'}
      ${[{key: '1', value: 1}, {key: '2', value: 2}, {key: '3', value: 3}]} | ${100} | ${100} | ${'M50,69.33333333333334L100,38.66666666666667L150,8'}
    `(
      'returns a lineShape if comparisonData if it exists',
      ({data, width, height, expected}) => {
        const TestComponent = () => {
          const {lineShape} = useSparkBar({
            data: [{data, isComparison: true}],
            height,
            dataOffsetLeft: 0,
            dataOffsetRight: 0,
            width,
            seriesColor: 'red',
          });

          return <div>{lineShape.toString()}</div>;
        };

        const mockComponent = mount(<TestComponent />);
        expect(mockComponent.text()).toBe(expected);
      },
    );
  });

  describe('borderRadius', () => {
    it.each`
      width     | expected
      ${100}    | ${'20 20 0 0'}
      ${53}     | ${'10 10 0 0'}
      ${11.237} | ${'2 2 0 0'}
    `('returns a borderRadius based on width', ({width, expected}) => {
      const TestComponent = () => {
        const {borderRadius} = useSparkBar({
          data: [
            {
              data: [
                {key: '1', value: 1},
                {key: '2', value: 2},
              ],
              isComparison: true,
            },
          ],
          height: 300,
          dataOffsetLeft: 0,
          dataOffsetRight: 0,
          width,
          seriesColor: 'red',
        });

        return <div>{borderRadius.toString()}</div>;
      };

      const mockComponent = mount(<TestComponent />);
      expect(mockComponent.text()).toBe(expected);
    });
  });
});
