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

export function formatLinearXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatLinearYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'symbol',
  }).format(value);
}

export function formatPercentageYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(value);
}
