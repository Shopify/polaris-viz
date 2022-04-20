import {shouldRotateZeroBars} from '../shouldRotateZeroBars';

describe('shouldRotateZeroBars', () => {
  describe('returns true if', () => {
    it('receives all negative values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {key: '', value: -5},
        {key: '', value: -3},
        {key: '', value: -1},
      ]);

      expect(rotateZeroBars).toBe(true);
    });

    it('receives negative and 0 values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {key: '', value: -5},
        {key: '', value: -3},
        {key: '', value: 0},
      ]);

      expect(rotateZeroBars).toBe(true);
    });
  });

  describe('returns false if', () => {
    it('receives all positive values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {key: '', value: 5},
        {key: '', value: 3},
        {key: '', value: 2},
      ]);

      expect(rotateZeroBars).toBe(false);
    });

    it('receives all 0 values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {key: '', value: 0},
        {key: '', value: 0},
        {key: '', value: 0},
      ]);

      expect(rotateZeroBars).toBe(false);
    });

    it('receives 0 and positive values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {key: '', value: 0},
        {key: '', value: 3},
        {key: '', value: 3},
      ]);

      expect(rotateZeroBars).toBe(false);
    });

    it('receives 0, negative, and positive values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {key: '', value: 0},
        {key: '', value: -3},
        {key: '', value: 3},
      ]);

      expect(rotateZeroBars).toBe(false);
    });
  });
});
