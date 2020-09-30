export function getPathLength(element: SVGPathElement | null) {
  if (element == null) {
    return 0;
  }
  return element.getTotalLength();
}

export function rgbToRgba({rgb, alpha}: {rgb: string; alpha: number}) {
  return rgb.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
}
