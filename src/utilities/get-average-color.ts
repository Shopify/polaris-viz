import {color} from 'd3-color';

export const getAverageColor = (firstColor: string, lastColor: string) => {
  if (firstColor === lastColor) {
    return firstColor;
  }

  const first = color(firstColor);
  const last = color(lastColor);

  if (!first || !last) {
    return first?.toString() ?? last?.toString() ?? '';
  }

  const {r: r1, g: g1, b: b1} = first.rgb();
  const {r: r2, g: g2, b: b2} = last.rgb();

  return `rgb(${Math.round((r1 + r2) / 2)},${Math.round(
    (g1 + g2) / 2,
  )},${Math.round((b1 + b2) / 2)})`;
};
