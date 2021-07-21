export const getSeriesColorsByLength = (length: number, colors: any[]) => {
  if (length <= 5) return colors;

  const defaultHues = colors.slice(0, 5);
  const secondaryVariations = colors.slice(5, 10);

  const result: string[] = [];

  defaultHues.forEach((color, index) => {
    result.push(color);
    result.push(secondaryVariations[index]);
  });

  return result;
};
