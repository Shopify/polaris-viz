import {Color} from 'types';

export function getDefaultColor(index = 0): Color {
  const colors: Color[] = ['primary', 'secondary', 'tertiary', 'quaternary'];
  const colorIndex = index % colors.length;

  const isDevelopment = process.env.NODE_ENV === 'development';

  if (index >= colors.length && isDevelopment) {
    // eslint-disable-next-line no-console
    console.warn(
      'There are too many series to rely on default color values. Please pass a color value for every series',
    );
  }

  return colors[colorIndex];
}
