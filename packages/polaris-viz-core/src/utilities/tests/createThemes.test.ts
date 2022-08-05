import {createTheme, createThemes} from '../';
import {DEFAULT_THEME} from '../../constants';

describe('createTheme', () => {
  it('generates a theme with default values, from the partial theme provided', () => {
    const result = createTheme({
      bar: {
        borderRadius: '3',
      },
    });
    expect(result).not.toStrictEqual(DEFAULT_THEME);

    expect(result).toStrictEqual(
      expect.objectContaining({
        bar: {
          ...DEFAULT_THEME.bar,
          borderRadius: '3',
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
          borderRadius: '3',
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
            borderRadius: '3',
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
          borderRadius: '0',
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
            borderRadius: '0',
          },
        },
      }),
    );
  });
});
