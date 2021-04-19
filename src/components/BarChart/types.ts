import {Color} from 'types';

export enum BarMargin {
  Small = 0.05,
  Medium = 0.1,
  Large = 0.3,
  None = 0,
}

export interface RenderTooltipContentData {
  label: string;
  value: number;
}

// starting out with one annotation type for now
// with the abiliity to expand to others
export enum AnnotationType {
  Line = 'line',
}
export interface Annotation {
  type: AnnotationType;
  color: Color;
  width: number;
  ariaLabel?: string;
  dataIndex?: number;
  // offset ranging from 0 to 1.0
  xOffset?: number;
}
