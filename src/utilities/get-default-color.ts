import {Color} from 'types';

export function getDefaultColor(index = 0): Color {
  const colors: Color[] = ['primary', 'secondary', 'tertiary', 'quaternary'];

  if (index >= colors.length) {
    throw new Error(
      'There are too many series to rely on default color values. Please pass a color value for every series',
    );
  }

  return colors[index];
}
