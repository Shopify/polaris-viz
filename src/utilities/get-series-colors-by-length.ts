import chunk from 'lodash.chunk';

export const getSeriesColorsByLength = (length: number, colors: any[]) => {
  return colors;
  if (length >= 6) return colors;
  const chunkedColors = chunk(colors, 2);

  // ALTERNATE LIGHTNESS AND HUE
  // const result = chunkedColors.map(
  //   (chunked, index) => chunked[index % 2 === 0 ? 0 : 1],
  // );

  // RETURNS SAME LIGHTNESS BUT DIFFERENT HUE
  const result = chunkedColors.map((chunked) => chunked[0]);

  return result;
};
