import {
  QUARTERNARY_COLOR,
  TERTIARY_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
} from '../constants';

export function getDefaultColor(index = 0): string {
  const colors = [
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    TERTIARY_COLOR,
    QUARTERNARY_COLOR,
  ];
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
