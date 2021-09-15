jest.mock('consts.ts', () => {
  const actual = jest.requireActual('consts.ts');

  return {
    ...actual,
    SPACING_EXTRA_TIGHT: 4,
    SPACING_TIGHT: 8,
    SPACING_BASE_TIGHT: 12,
    SPACING: 16,
    LineChartMargin: {
      Top: 8,
      Left: 0,
      Bottom: 24,
      Right: 4,
    },
    BarChartMargin: {
      Top: 5,
      Left: 0,
      Bottom: 24,
      Right: 20,
    },
    MASK_HIGHLIGHT_COLOR: 'rgb(255, 255, 255)',
    colorPurpleDark: 'rgb(80, 36, 143)',
  };
});

export {};
