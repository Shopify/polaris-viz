import {createElement, ReactNode} from 'react';
import {
  Svg as NativeSvg,
  Circle as NativeCircle,
  Ellipse as NativeEllipse,
  G as NativeG,
  Text as NativeText,
  TSpan as NativeTSpan,
  TextPath as NativeTextPath,
  Path as NativePath,
  Polygon as NativePolygon,
  Polyline as NativePolyline,
  Line as NativeLine,
  Rect as NativeRect,
  Use as NativeUse,
  Image as NativeImage,
  Symbol as NativeSymbol,
  Defs as NativeDefs,
  LinearGradient as NativeLinearGradient,
  RadialGradient as NativeRadialGradient,
  Stop as NativeStop,
  ClipPath as NativeClipPath,
  Pattern as NativePattern,
  Mask as NativeMask,
} from 'react-native-svg';

interface Props {
  native: boolean;
  children?: ReactNode;
  [x: string]: any;
}

export const Svg = ({native, children, ...props}: Props) =>
  createElement(native ? NativeSvg : 'Svg', props, children);
export const Circle = ({native, children, ...props}: Props) =>
  createElement(native ? NativeCircle : 'Circle', props, children);
export const Ellipse = ({native, children, ...props}: Props) =>
  createElement(native ? NativeEllipse : 'Ellipse', props, children);
export const G = ({native, children, ...props}: Props) =>
  createElement(native ? NativeG : 'G', props, children);
export const Text = ({native, children, ...props}: Props) =>
  createElement(native ? NativeText : 'Text', props, children);
export const TSpan = ({native, children, ...props}: Props) =>
  createElement(native ? NativeTSpan : 'TSpan', props, children);
export const TextPath = ({native, children, ...props}: Props) =>
  createElement(native ? NativeTextPath : 'TextPath', props, children);
export const Path = ({native, children, ...props}: Props) =>
  createElement(native ? NativePath : 'Path', props, children);
export const Polygon = ({native, children, ...props}: Props) =>
  createElement(native ? NativePolygon : 'Polygon', props, children);
export const Polyline = ({native, children, ...props}: Props) =>
  createElement(native ? NativePolyline : 'Polyline', props, children);
export const Line = ({native, children, ...props}: Props) =>
  createElement(native ? NativeLine : 'Line', props, children);
export const Rect = ({native, children, ...props}: Props) =>
  createElement(native ? NativeRect : 'Rect', props, children);
export const Use = ({native, children, ...props}: Props) =>
  createElement(native ? NativeUse : 'Use', props, children);
export const Image = ({native, children, ...props}: Props) =>
  createElement(native ? NativeImage : 'Image', props, children);
export const Symbol = ({native, children, ...props}: Props) =>
  createElement(native ? NativeSymbol : 'Symbol', props, children);
export const Defs = ({native, children, ...props}: Props) =>
  createElement(native ? NativeDefs : 'Defs', props, children);
export const LinearGradient = ({native, children, ...props}: Props) =>
  createElement(
    native ? NativeLinearGradient : 'LinearGradient',
    props,
    children,
  );
export const RadialGradient = ({native, children, ...props}: Props) =>
  createElement(
    native ? NativeRadialGradient : 'RadialGradient',
    props,
    children,
  );
export const Stop = ({native, children, ...props}: Props) =>
  createElement(native ? NativeStop : 'Stop', props, children);
export const ClipPath = ({native, children, ...props}: Props) =>
  createElement(native ? NativeClipPath : 'ClipPath', props, children);
export const Pattern = ({native, children, ...props}: Props) =>
  createElement(native ? NativePattern : 'Pattern', props, children);
export const Mask = ({native, children, ...props}: Props) =>
  createElement(native ? NativeMask : 'Mask', props, children);
