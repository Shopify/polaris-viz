export const formatYAxisLabel = (value) => {
  const formatter = new Intl.NumberFormat('en').format;
  if (value == null) {
    return '-';
  }
  return formatter(value);
};

export function formatHourlyLabel(value: string) {
  const formatter = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
  });

  return formatter
    .format(new Date(value))
    .toLocaleLowerCase()
    .replace('am', 'a.m.')
    .replace('pm', 'p.m.');
}
