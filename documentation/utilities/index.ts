export const generateDataSet = (dataLength: number) => {
  return Array(dataLength)
    .fill(null)
    .map((x) => {
      return {
        rawValue: Math.random() * Math.random() * 100,
        label: 'Some value',
      };
    });
};

export const generateLabels = (dataLength: number) => {
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

  return Array(dataLength)
    .fill(null)
    .map((x) => {
      return names[Math.floor(Math.random() * names.length)];
    });
};

export const generateMultipleSeries = (quantity) => {
  return Array(quantity)
    .fill(null)
    .map((_, index) => ({
      name: `Series ${index}`,
      data: generateDataSet(10),
    }));
};
