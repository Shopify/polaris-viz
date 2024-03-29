export interface AccessibilitySeries {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}

export enum BarMargin {
  Small = 0.1,
  Medium = 0.3,
  Large = 0.5,
  None = 0,
}
