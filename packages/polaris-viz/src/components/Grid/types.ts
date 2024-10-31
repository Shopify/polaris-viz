import type {XAxisOptions, YAxisOptions} from '@shopify/polaris-viz-core';

export type GridAxisOptions = {
  label?: string;
} & Partial<XAxisOptions> &
  Partial<YAxisOptions>;

export interface CellGroup {
  id: string;
  start: {row: number; col: number};
  end: {row: number; col: number};
  bgColor: string;
  color: string;
  name: string;
  description: string;
  goal: string | null;
  connectedGroups?: string[];
  secondaryValue: string;
  value: string;
}

export interface TooltipInfo {
  x: number;
  y: number;
  placement: Placement;
  groupName: string;
  groupDescription: string;
  groupGoal: string;
}

export type Placement = 'left' | 'bottom' | 'top' | 'right';

export interface ChartPositions {
  chartXPosition: number;
  chartYPosition: number;
  drawableHeight: number;
  drawableWidth: number;
  xAxisBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  yAxisBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
