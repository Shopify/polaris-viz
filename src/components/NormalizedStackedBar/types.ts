export enum Orientation {
  Horizontal,
  Vertical,
}

export enum Size {
  Small = 30,
  Medium = 60,
  Large = 90,
}

export enum ColorScheme {
  Classic,
  TwentyTwenty,
}

export type Data = {formattedValue: string; value: number; label: string};

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
