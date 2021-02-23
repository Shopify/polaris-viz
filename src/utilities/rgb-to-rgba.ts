export function rgbToRgba({rgb, alpha}: {rgb: string; alpha: number}) {
  return rgb.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
}
