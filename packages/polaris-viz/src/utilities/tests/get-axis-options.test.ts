import {getYAxisOptionsWithDefaults, getXAxisOptionsWithDefaults} from '../';

describe('get-axis-options', () => {
  describe('getYAxisOptionsWithDefaults()', () => {
    it('returns options when no data provided', () => {
      const yAxisOptions = getYAxisOptionsWithDefaults();

      expect(yAxisOptions.integersOnly).toStrictEqual(false);
      expect(typeof yAxisOptions.labelFormatter).toBe('function');
      expect(yAxisOptions.labelFormatter('foo')).toBe('foo');
    });

    it('overrides integersOnly when provided', () => {
      const yAxisOptions = getYAxisOptionsWithDefaults({
        integersOnly: true,
      });

      expect(yAxisOptions.integersOnly).toStrictEqual(true);
    });

    it('overrides labelFormatter when provided', () => {
      const yAxisOptions = getYAxisOptionsWithDefaults({
        labelFormatter: (value) => `${value} bar`,
      });

      expect(yAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });

    it('overrides options when both provided', () => {
      const yAxisOptions = getYAxisOptionsWithDefaults({
        integersOnly: true,
        labelFormatter: (value) => `${value} bar`,
      });

      expect(yAxisOptions.integersOnly).toStrictEqual(true);
      expect(yAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });
  });

  describe('getXAxisOptionsWithDefaults()', () => {
    it('returns options when no data provided', () => {
      const xAxisOptions = getXAxisOptionsWithDefaults();

      expect(xAxisOptions.hide).toStrictEqual(false);
      expect(typeof xAxisOptions.labelFormatter).toBe('function');
      expect(xAxisOptions.labelFormatter('foo')).toBe('foo');
    });

    it('overrides hide when provided', () => {
      const xAxisOptions = getXAxisOptionsWithDefaults({
        hide: true,
      });

      expect(xAxisOptions.hide).toStrictEqual(true);
    });

    it('overrides labelFormatter when provided', () => {
      const xAxisOptions = getXAxisOptionsWithDefaults({
        labelFormatter: (value) => `${value} bar`,
      });

      expect(xAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });

    it('overrides options when both provided', () => {
      const xAxisOptions = getXAxisOptionsWithDefaults({
        hide: true,
        labelFormatter: (value) => `${value} bar`,
      });

      expect(xAxisOptions.hide).toStrictEqual(true);
      expect(xAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });
  });
});
