import {createTheme, createThemes} from '../';
import {DEFAULT_THEME_NAME, LIGHT_THEME} from '../../constants';

describe('createTheme', () => {
  it('generates a theme with default values, from the partial theme provided', () => {
    const result = createTheme({
      bar: {
        borderRadius: 5,
      },
    });
    expect(result).not.toStrictEqual(LIGHT_THEME);

    expect(result).toStrictEqual(
      expect.objectContaining({
        bar: {
          ...LIGHT_THEME.bar,
          borderRadius: 5,
        },
      }),
    );
  });
});

describe('createThemes', () => {
  it('generates a record of themes with default values, from the partial themes provided', () => {
    const result = createThemes({
      [DEFAULT_THEME_NAME]: {
        bar: {
          borderRadius: 5,
        },
      },
    });
    expect(result).not.toStrictEqual({[DEFAULT_THEME_NAME]: LIGHT_THEME});

    expect(result).toStrictEqual(
      expect.objectContaining({
        [DEFAULT_THEME_NAME]: {
          ...LIGHT_THEME,
          bar: {
            ...LIGHT_THEME.bar,
            borderRadius: 5,
          },
        },
      }),
    );
  });

  it('generates a record with multiple custom themes', () => {
    const result = createThemes({
      [DEFAULT_THEME_NAME]: LIGHT_THEME,
      SomeTheme: {
        bar: {
          borderRadius: 0,
        },
      },
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        [DEFAULT_THEME_NAME]: LIGHT_THEME,
        SomeTheme: {
          ...LIGHT_THEME,
          bar: {
            ...LIGHT_THEME.bar,
            borderRadius: 0,
          },
        },
      }),
    );
  });
});
