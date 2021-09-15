import {degreesToRadians} from 'utilities/degrees-to-radians';

describe('degreesToRadians', () => {
  it('returns a radian value', () => {
    const actual = degreesToRadians(40);
    expect(actual).toBe(0.6981317007977318);
  });
});
