import {RightAngleTriangle} from 'utilities/RightAngleTriangle';

describe('RightAngleTriangle', () => {
  describe('getAdjacentLength', () => {
    it('returns if given side A', () => {
      const actual = new RightAngleTriangle({sideA: 10}).getAdjacentLength();

      expect(actual).toBe(10);
    });

    it('returns if given side B and C', () => {
      const actual = new RightAngleTriangle({
        sideB: 12,
        sideC: 20,
      }).getAdjacentLength();

      expect(actual).toBe(16);
    });

    it('throws an error if not enough information is provided', () => {
      expect(() =>
        new RightAngleTriangle({
          sideB: 12,
        }).getAdjacentLength(),
      ).toThrow('Must provide side A or side B and C to find adjacent length');
    });
  });

  describe('getOppositeLength', () => {
    it('returns if given side B', () => {
      const actual = new RightAngleTriangle({sideB: 10}).getOppositeLength();

      expect(actual).toBe(10);
    });

    it('returns if given side A and C', () => {
      const actual = new RightAngleTriangle({
        sideA: 16,
        sideC: 20,
      }).getOppositeLength();

      expect(actual).toBe(12);
    });

    it('throws an error if not enough information is provided', () => {
      expect(() =>
        new RightAngleTriangle({
          sideA: 16,
        }).getOppositeLength(),
      ).toThrow('Must provide side B or side C and A to find opposite length');
    });
  });

  describe('getHypotenuseLength', () => {
    it('returns if given side C', () => {
      const actual = new RightAngleTriangle({sideC: 10}).getHypotenuseLength();

      expect(actual).toBe(10);
    });

    it('returns if given side A and B', () => {
      const actual = new RightAngleTriangle({
        sideA: 16,
        sideB: 12,
      }).getHypotenuseLength();

      expect(actual).toBe(20);
    });

    it('throws an error if not enough information is provided', () => {
      expect(() =>
        new RightAngleTriangle({
          sideA: 16,
        }).getHypotenuseLength(),
      ).toThrow(
        'Must provide side C or side B and A to find hypotenuse length',
      );
    });
  });
});
