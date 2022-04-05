import {getYAxisOptions, getXAxisOptions} from '../';

describe('get-axis-options', () => {
  describe('getYAxisOptions', () => {
    it('returns options when no data provided', () => {
      const yAxisOptions = getYAxisOptions();

      expect(yAxisOptions.integersOnly).toStrictEqual(false);
      expect(typeof yAxisOptions.labelFormatter).toBe('function');
      expect(yAxisOptions.labelFormatter('foo')).toBe('foo');
    });

    it('overrides integersOnly when provided', () => {
      const yAxisOptions = getYAxisOptions({
        integersOnly: true,
      });

      expect(yAxisOptions.integersOnly).toStrictEqual(true);
    });

    it('overrides labelFormatter when provided', () => {
      const yAxisOptions = getYAxisOptions({
        labelFormatter: (value) => `${value} bar`,
      });

      expect(yAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });

    it('overrides options when both provided', () => {
      const yAxisOptions = getYAxisOptions({
        integersOnly: true,
        labelFormatter: (value) => `${value} bar`,
      });

      expect(yAxisOptions.integersOnly).toStrictEqual(true);
      expect(yAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });
  });

  describe('getXAxisOption', () => {
    it('returns options when no data provided', () => {
      const xAxisOptions = getXAxisOptions();

      expect(xAxisOptions.hide).toStrictEqual(false);
      expect(typeof xAxisOptions.labelFormatter).toBe('function');
      expect(xAxisOptions.labelFormatter('foo')).toBe('foo');
    });

    it('overrides hide when provided', () => {
      const xAxisOptions = getXAxisOptions({
        hide: true,
      });

      expect(xAxisOptions.hide).toStrictEqual(true);
    });

    it('overrides labelFormatter when provided', () => {
      const xAxisOptions = getXAxisOptions({
        labelFormatter: (value) => `${value} bar`,
      });

      expect(xAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });

    it('overrides options when both provided', () => {
      const xAxisOptions = getXAxisOptions({
        hide: true,
        labelFormatter: (value) => `${value} bar`,
      });

      expect(xAxisOptions.hide).toStrictEqual(true);
      expect(xAxisOptions.labelFormatter('foo')).toBe('foo bar');
    });
  });
});
