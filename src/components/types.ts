export type StringLabelFormatter = (
  value: string,
  index?: number,
  data?: string[],
) => string;

export type NumberLabelFormatter = (value: number) => string;
