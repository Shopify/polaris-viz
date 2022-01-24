const names = [
  'Megachasma pelagios',
  'Chiloscyllium punctatum',
  'Negaprion brevirostris',
  'Carcharias taurus',
  'Carcharhinus melanopterus',
  'Ginglymostoma cirratum',
  'Sphyrnidae',
  'Prionace glauca',
  'Carcharhinus longimanus',
  'Carcharodon carcharias',
  'Galeocerdo cuvier',
  'Carcharhinus leucas',
  'Alopias sp.',
  'Isurus oxyrinchus',
  'Cetorhinus maximus',
  'Rhincodon typus',
];

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateLabels = (dataLength: number) => {
  return Array(dataLength)
    .fill(null)
    .map(() => {
      return names[Math.floor(Math.random() * names.length)];
    });
};

export const generateDataSet = (dataLength: number) => {
  return Array(dataLength)
    .fill(null)
    .map(() => {
      return {
        value: randomNumber(20, 50),
        key: names[Math.floor(Math.random() * names.length)],
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
    name: 'Carcharhinus obscurus',
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
    name: 'Carcharhinus brevipinna',
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
