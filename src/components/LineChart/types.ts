export interface Series {
  data: [string, number][];
  name: string;
  formatY?(value: number): string;
  style?: Partial<{
    color: 'purple' | 'blue' | 'teal';
    lineStyle: 'dashed' | 'solid';
  }>;
  primary?: boolean;
}

export interface ChartDimensions {
  height: number;
  width: number;
}
