const PRODUCT_NAMES = [
  'Shirts',
  'Pants',
  'Shoes',
  'Hat',
  'Jacket',
  'Parka',
  'Toque',
  'Wind-breaker',
  'Sweat pants',
  'Shorts',
  'Hoodies',
  'Scarfs',
  'Beanies',
  'Socks',
  'Flip Flops',
  'Glasses',
];

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateDataSet = (dataLength: number) => {
  return Array(dataLength)
    .fill(null)
    .map(() => {
      return {
        value: randomNumber(20, 50),
        key: PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)],
      };
    });
};

export const generateMultipleSeries = (
  quantity: number,
  dataSetLength = 10,
) => {
  return Array(quantity)
    .fill(null)
    .map((_, index) => ({
      name: `Series ${index}`,
      data: generateDataSet(dataSetLength),
    }));
};
