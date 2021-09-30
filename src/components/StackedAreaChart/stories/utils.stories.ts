export const data = [
  {
    name: 'First-time',
    data: [
      {label: 'January', rawValue: 4237},
      {label: 'February', rawValue: 5024},
      {label: 'March', rawValue: 5730},
      {label: 'April', rawValue: 5587},
      {label: 'May', rawValue: 5303},
      {label: 'June', rawValue: 5634},
      {label: 'July', rawValue: 3238},
    ],
  },
  {
    name: 'Returning',
    data: [
      {label: 'January', rawValue: 5663},
      {label: 'February', rawValue: 7349},
      {label: 'March', rawValue: 9795},
      {label: 'April', rawValue: 7396},
      {label: 'May', rawValue: 7028},
      {label: 'June', rawValue: 12484},
      {label: 'July', rawValue: 4878},
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
