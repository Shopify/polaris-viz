import type {LegendData} from '@shopify/polaris-viz';

export const DATA: LegendData[] = [
  {
    name: 'Solid Icon',
    color: 'green',
  },
  {
    name: 'Line Icon',
    color: 'blue',
    iconType: 'line',
  },
  {
    name: 'Comparison Line',
    color: 'red',
    iconType: 'line',
    isComparison: true,
  },
];
