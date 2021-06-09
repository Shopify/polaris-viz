import {createTheme, createThemes} from '../';
import {DefaultTheme} from '../../constants';

describe('createTheme', () => {
  it('generates a theme with default values, from the partial theme provided', () => {
    const result = createTheme({
      barOptions: {
        innerMargin: 'Small',
      },
    });
    expect(result).not.toStrictEqual(DefaultTheme);

    expect(result).toStrictEqual(
      expect.objectContaining({
        barOptions: {
          ...DefaultTheme.barOptions,
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
        barOptions: {
          innerMargin: 'Small',
        },
      },
    });
    expect(result).not.toStrictEqual({Default: DefaultTheme});

    expect(result).toStrictEqual(
      expect.objectContaining({
        Default: {
          barOptions: {
            ...DefaultTheme.barOptions,
            innerMargin: 'Small',
          },
        },
      }),
    );
  });

  it('generates a record with multiple custom themes', () => {
    const result = createThemes({
      Default: DefaultTheme,
      SomeTheme: {
        barOptions: {
          hasRoundedCorners: false,
        },
      },
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        Default: DefaultTheme,
        SomeTheme: {
          barOptions: {
            ...DefaultTheme.barOptions,
            hasRoundedCorners: false,
          },
        },
      }),
    );
  });
});
