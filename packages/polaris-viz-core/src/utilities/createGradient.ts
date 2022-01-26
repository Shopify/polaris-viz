export const createGradient = (color1: string, color2: string) => {
  return [
    {offset: 0, color: color2},
    {offset: 100, color: color1},
  ];
};
