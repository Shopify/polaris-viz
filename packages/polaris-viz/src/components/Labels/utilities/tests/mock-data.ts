const LABELS = [
  'Short String',
  'This is a really long string',
  'Medium String',
];

function buildLabels(labels: string[]) {
  return labels.map((label) => ({
    text: label,
    words: [],
    truncatedWords: [],
    truncatedName: '',
    truncatedWidth: 0,
  }));
}

export const PREPARED_LABELS = buildLabels(LABELS);
