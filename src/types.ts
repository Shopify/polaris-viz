export type Color =
  | 'colorBlack'
  | 'colorBlue'
  | 'colorBlueDark'
  | 'colorBlueDarker'
  | 'colorBlueLight'
  | 'colorBlueLighter'
  | 'colorBlueText'
  | 'colorGreen'
  | 'colorGreenDark'
  | 'colorGreenDarker'
  | 'colorGreenLight'
  | 'colorGreenLighter'
  | 'colorGreenText'
  | 'colorIndigo'
  | 'colorIndigoDark'
  | 'colorIndigoDarker'
  | 'colorIndigoLight'
  | 'colorIndigoLighter'
  | 'colorIndigoText'
  | 'colorInk'
  | 'colorInkLight'
  | 'colorInkLighter'
  | 'colorInkLightest'
  | 'colorOrange'
  | 'colorOrangeDark'
  | 'colorOrangeDarker'
  | 'colorOrangeLight'
  | 'colorOrangeLighter'
  | 'colorOrangeText'
  | 'colorPurple'
  | 'colorPurpleDark'
  | 'colorPurpleDarker'
  | 'colorPurpleLight'
  | 'colorPurpleLighter'
  | 'colorPurpleText'
  | 'colorRed'
  | 'colorRedDark'
  | 'colorRedDarker'
  | 'colorRedLight'
  | 'colorRedLighter'
  | 'colorRedText'
  | 'colorSky'
  | 'colorSkyDark'
  | 'colorSkyLight'
  | 'colorSkyLighter'
  | 'colorTeal'
  | 'colorTealDark'
  | 'colorTealDarker'
  | 'colorTealLight'
  | 'colorTealLighter'
  | 'colorTealText'
  | 'colorWhite'
  | 'colorYellow'
  | 'colorYellowDark'
  | 'colorYellowDarker'
  | 'colorYellowLight'
  | 'colorYellowLighter';

export interface Series {
  data: {
    x: string;
    y: number;
  }[];
  name: string;
  formatY?(value: number): string;
  style?: Partial<{
    color: Color;
    lineStyle: LineStyle;
  }>;
}

export type LineStyle = 'dashed' | 'solid';

export interface BarData {
  rawValue: number;
  formattedValue: string;
  label: string;
}
