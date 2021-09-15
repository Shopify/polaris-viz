import {createTheme, createThemes} from '../';
import {DEFAULT_THEME} from 'consts';

describe('createTheme', () => {
  it('generates a theme with default values, from the partial theme provided', () => {
    const result = createTheme({
      bar: {
        innerMargin: 'Small',
      },
    });
    expect(result).not.toStrictEqual(DEFAULT_THEME);

    expect(result).toStrictEqual(
      expect.objectContaining({
        bar: {
          ...DEFAULT_THEME.bar,
          innerMargin: 'Small',
        },
      }),
    );
  });
});

describe('createThemes', () => {
  it('generates a record of themes with default values, from the partial themes provided', () => {
    const result = createThemes({
      Default: {
        bar: {
          innerMargin: 'Small',
        },
      },
    });
    expect(result).not.toStrictEqual({Default: DEFAULT_THEME});

    expect(result).toStrictEqual(
      expect.objectContaining({
        Default: {
          ...DEFAULT_THEME,
          bar: {
            ...DEFAULT_THEME.bar,
            innerMargin: 'Small',
          },
        },
      }),
    );
  });

  it('generates a record with multiple custom themes', () => {
    const result = createThemes({
      Default: DEFAULT_THEME,
      SomeTheme: {
        bar: {
          hasRoundedCorners: false,
        },
      },
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        Default: DEFAULT_THEME,
        SomeTheme: {
          ...DEFAULT_THEME,
          bar: {
            ...DEFAULT_THEME.bar,
            hasRoundedCorners: false,
          },
        },
      }),
    );
  });
});
