export const getDataPoint = (limit = 1000) => {
  return Math.random() * limit;
};

export const THEME_CONTROL_ARGS = {
  description: 'The theme that the chart will inherit its styles from',
  control: {type: 'select', options: ['Default', 'Light']},
};
