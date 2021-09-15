import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import type {Path} from 'd3-path';

import {curveStepRounded, CurveStepRounded} from 'utilities/curve-step-rounded';

const dataset = [0, 20];

const WIDTH = 100;
const HEIGHT = 50;

const [min, max] = extent(dataset) as [number, number];

const xScale = scaleLinear()
  .domain([0, dataset.length - 1])
  .range([0, WIDTH]);

const yScale = scaleLinear().domain([min, max]).range([HEIGHT, 0]);

describe('curveStepRounded', () => {
  it('generates a line with the default roundness and distance', () => {
    const lineGenerator = line<number>()
      .x((_dataPoint, index) => xScale(index))
      .y((dataPoint) => yScale(dataPoint))
      .curve(curveStepRounded);

    const actual = lineGenerator(dataset);
    expect(actual).toBe('M0,50L0.5,50C58.91,50,41.09,0,99.5,0L100,0');
  });
});

describe('CurveStepRounded', () => {
  it.each`
    distance | roundness | expected
    ${1}     | ${1}      | ${'M0,50L0,50C100,50,0,0,100,0L100,0'}
    ${1}     | ${0}      | ${'M0,50L0,50C0,50,100,0,100,0L100,0'}
    ${0}     | ${1}      | ${'M0,50L50,50C50,50,50,0,50,0L100,0'}
    ${0.5}   | ${0}      | ${'M0,50L25,50C25,50,75,0,75,0L100,0'}
    ${0.99}  | ${0.5}    | ${'M0,50L0.5,50C50,50,50,0,99.5,0L100,0'}
  `(
    'implements a CurveStepRounded curve generator with the provided distance and roundness',
    ({distance, roundness, expected}) => {
      const customCurveStepRounded = (
        context: CanvasRenderingContext2D | Path,
      ) =>
        new CurveStepRounded(context, {
          distance,
          roundness,
        });

      const lineGenerator = line<number>()
        .x((_dataPoint, index) => xScale(index))
        .y((dataPoint) => yScale(dataPoint))
        .curve(customCurveStepRounded);

      const actual = lineGenerator(dataset);
      expect(actual).toBe(expected);
    },
  );
});
