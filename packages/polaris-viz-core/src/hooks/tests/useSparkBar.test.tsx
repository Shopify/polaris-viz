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
          width: 600,
          seriesColor: 'red',
          targetLine: {
            offsetLeft: 0,
            offsetRight: 0,
            value: 0,
          },
        });

        return <div>{JSON.stringify(dataWithIndex)}</div>;
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
            targetLine: {
              offsetLeft: 0,
              offsetRight: 0,
              value: 0,
            },
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
            targetLine: {
              offsetLeft: 0,
              offsetRight: 0,
              value: 0,
            },
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
          console.log(dataOffsetLeft);
          const {strokeDashoffset} = useSparkBar({
            data: [{data}],
            height: 500,
            width: 100,
            targetLine: {
              offsetLeft: dataOffsetLeft,
              offsetRight: 0,
              value: 0,
            },
            seriesColor: 'red',
          });
          return <div>{strokeDashoffset}</div>;
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
          targetLine: {
            offsetLeft: 0,
            offsetRight: 0,
            value: 0,
          },
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
