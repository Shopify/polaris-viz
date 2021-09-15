import {shouldRotateZeroBars} from 'utilities/should-rotate-zero-bars';

describe('shouldRotateZeroBars', () => {
  describe('returns true if', () => {
    it('receives all negative values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {label: '', rawValue: -5},
        {label: '', rawValue: -3},
        {label: '', rawValue: -1},
      ]);

      expect(rotateZeroBars).toBe(true);
    });

    it('receives negative and 0 values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {label: '', rawValue: -5},
        {label: '', rawValue: -3},
        {label: '', rawValue: 0},
      ]);

      expect(rotateZeroBars).toBe(true);
    });
  });

  describe('returns false if', () => {
    it('receives all positive values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {label: '', rawValue: 5},
        {label: '', rawValue: 3},
        {label: '', rawValue: 2},
      ]);

      expect(rotateZeroBars).toBe(false);
    });

    it('receives all 0 values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {label: '', rawValue: 0},
        {label: '', rawValue: 0},
        {label: '', rawValue: 0},
      ]);

      expect(rotateZeroBars).toBe(false);
    });

    it('receives 0 and positive values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {label: '', rawValue: 0},
        {label: '', rawValue: 3},
        {label: '', rawValue: 3},
      ]);

      expect(rotateZeroBars).toBe(false);
    });

    it('receives 0, negative, and positive values', () => {
      const rotateZeroBars = shouldRotateZeroBars([
        {label: '', rawValue: 0},
        {label: '', rawValue: -3},
        {label: '', rawValue: 3},
      ]);

      expect(rotateZeroBars).toBe(false);
    });
  });
});
