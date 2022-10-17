import {yAxisMinMax} from '../yAxisMinMax';

describe('yAxisMinMax', () => {
  describe('defaults', () => {
    it('renders defaults when no data provided', () => {
      expect(yAxisMinMax([])).toStrictEqual({
        minY: 0,
        maxY: 10,
      });
    });

    it('renders defaults when data is all null', () => {
      expect(
        yAxisMinMax([
          {
            data: [
              {key: 0, value: null},
              {key: 0, value: null},
              {key: 0, value: null},
              {key: 0, value: null},
            ],
          },
          {
            data: [
              {key: 0, value: null},
              {key: 0, value: null},
              {key: 0, value: null},
              {key: 0, value: null},
            ],
          },
        ]),
      ).toStrictEqual({
        minY: 0,
        maxY: 10,
      });
    });
  });

  describe('min/max', () => {
    it('renders min/max when data provided', () => {
      expect(
        yAxisMinMax([
          {
            data: [
              {key: 0, value: 1},
              {key: 0, value: 18},
              {key: 0, value: 5},
              {key: 0, value: 2},
            ],
          },
          {
            data: [
              {key: 0, value: 1},
              {key: 0, value: 2},
              {key: 0, value: 5},
              {key: 0, value: 2},
            ],
          },
        ]),
      ).toStrictEqual({
        minY: 1,
        maxY: 18,
      });
    });

    it('renders min/max when mixed data provided', () => {
      expect(
        yAxisMinMax([
          {
            data: [
              {key: 0, value: 1},
              {key: 0, value: null},
              {key: 0, value: 5},
              {key: 0, value: 0},
            ],
          },
          {
            data: [
              {key: 0, value: null},
              {key: 0, value: 2},
              {key: 0, value: null},
              {key: 0, value: 2},
            ],
          },
        ]),
      ).toStrictEqual({
        minY: 0,
        maxY: 5,
      });
    });
  });
});
