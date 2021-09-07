export const getDataPoint = (limit = 1000) => {
  return Math.random() * limit;
};

export const THEME_CONTROL_ARGS = {
  control: {type: 'select', options: ['Default', 'Light']},
};
