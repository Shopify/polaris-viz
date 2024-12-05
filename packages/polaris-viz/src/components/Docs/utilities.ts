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

export function generateDayRange(numDays: number) {
  const currentDate = new Date('April 1, 2020');
  const dayRange: string[] = [];

  for (let i = 0; i < numDays; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    dayRange.push(date.toString());
  }

  return dayRange;
}

export const generateDataSet = (dataLength: number, typeOfData: string) => {
  const dates = typeOfData === 'dates' ? generateDayRange(dataLength) : [];

  return Array(dataLength)
    .fill(null)
    .map((_, index) => {
      return {
        value: randomNumber(20, 50),
        key:
          typeOfData === 'dates'
            ? dates[index]
            : PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)],
      };
    });
};

export const generateMultipleSeries = (
  quantity: number,
  typeOfData = 'categories',
  dataSetLength = 10,
) => {
  return Array(quantity)
    .fill(null)
    .map((_, index) => ({
      name: `Series ${index + 1}`,
      data: generateDataSet(dataSetLength, typeOfData),
    }));
};

export const SPARKLINE_SERIES = [
  {
    data: [
      {x: 0, y: 100},
      {x: 1, y: 200},
      {x: 2, y: 300},
      {x: 3, y: 400},
      {x: 4, y: 400},
      {x: 5, y: 1000},
      {x: 6, y: 200},
      {x: 7, y: 800},
      {x: 8, y: 900},
      {x: 9, y: 200},
      {x: 10, y: 400},
    ],
  },
  {
    lineStyle: 'dashed',
    area: null,
    data: [
      {x: 0, y: 200},
      {x: 1, y: 200},
      {x: 2, y: 200},
      {x: 3, y: 200},
      {x: 4, y: 200},
      {x: 5, y: 200},
      {x: 6, y: 200},
      {x: 7, y: 200},
      {x: 8, y: 200},
      {x: 9, y: 200},
      {x: 10, y: 200},
    ],
  },
];

export function copyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');

  textArea.style.position = 'fixed';
  textArea.style.top = '-1000px';
  textArea.style.left = '-1000px';
  textArea.style.width = '0';
  textArea.style.height = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    // eslint-disable-next-line no-empty
  } catch (err) {}

  document.body.removeChild(textArea);
}

export const SHARK_SPECIES_GROWTH = [
  {
    name: 'Mako',
    data: [
      {
        key: '0',
        value: 80,
      },
      {
        key: '5',
        value: 170,
      },
      {
        key: '10',
        value: 210,
      },
      {
        key: '15',
        value: 240,
      },
    ],
  },
  {
    name: 'Great White',
    data: [
      {
        key: '0',
        value: 80,
      },
      {
        key: '5',
        value: 180,
      },
      {
        key: '10',
        value: 250,
      },
      {
        key: '15',
        value: 300,
      },
    ],
  },
];

export function fixImagePath(
  rawMd: string,
  originalPath = './public/polaris_viz_header.png',
  newPath = 'polaris_viz_header.png',
) {
  return rawMd.replace(originalPath, newPath);
}
