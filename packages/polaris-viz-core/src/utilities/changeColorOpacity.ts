import type {GradientStop} from 'types';

function importD3Color() {
  let d3Color;
  try {
    d3Color = require('d3-color');
  } catch (e) {
    // Note: This is a workaround for environments where require fails on ESM modules and allows us to use d3-color in a CJS environment.
    try {
      const importDynamic = new Function(
        'modulePath',
        'return import(modulePath)',
      );
      d3Color = importDynamic('d3-color');
    } catch (error) {
      console.error('Failed to import d3-color:', error);
      d3Color = {
        color: (str: string) => ({
          toString: () => str,
          opacity: 1,
        }),
      };
    }
  }
  return d3Color;
}

const d3Color = importD3Color();

export function changeColorOpacity(colorString: string, opacity = 1): string {
  if (!colorString) return colorString;

  if (opacity < 0 || opacity > 1) {
    console.warn('Opacity value out of range:', opacity);
    return colorString;
  }

  try {
    const rgbColor = d3Color.color(colorString);
    if (rgbColor == null) {
      console.warn('Invalid color value:', colorString);
      return colorString;
    }
    rgbColor.opacity = opacity;
    return rgbColor.toString();
  } catch (error) {
    console.warn(`Error processing color: ${colorString}`, error);
    return colorString;
  }
}

export function changeGradientOpacity(gradient: GradientStop[], opacity = 1) {
  if (!gradient || !Array.isArray(gradient)) {
    return [];
  }

  return gradient.map(({offset, color}) => ({
    offset,
    color: changeColorOpacity(color, opacity),
  }));
}
