export const data = [
  {
    name: 'First-time',
    data: [
      {key: 'January', value: 4237},
      {key: 'February', value: 5024},
      {key: 'March', value: 5730},
      {key: 'April', value: 5587},
      {key: 'May', value: 5303},
      {key: 'June', value: 5634},
      {key: 'July', value: 3238},
    ],
  },
  {
    name: 'Returning',
    data: [
      {key: 'January', value: 5663},
      {key: 'February', value: 7349},
      {key: 'March', value: 9795},
      {key: 'April', value: 7396},
      {key: 'May', value: 7028},
      {key: 'June', value: 12484},
      {key: 'July', value: 4878},
    ],
  },
];

export const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export const formatYAxisLabel = (value?: number) => {
  const formatter = new Intl.NumberFormat('en').format;
  if (value == null) {
    return '-';
  }
  return formatter(value);
};
