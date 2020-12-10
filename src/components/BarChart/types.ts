export interface BarData {
  rawValue: number;
  label: string;
}

export enum BarMargin {
  Small = 0.05,
  Medium = 0.1,
  Large = 0.3,
  None = 0,
}

export interface RenderTooltipProps {
  label: string;
  value: number;
}
