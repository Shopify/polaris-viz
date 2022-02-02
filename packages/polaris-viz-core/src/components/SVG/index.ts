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
  createElement(native ? NativeSvg : 'svg', props, children);
export const Circle = ({native, children, ...props}: Props) =>
  createElement(native ? NativeCircle : 'circle', props, children);
export const Ellipse = ({native, children, ...props}: Props) =>
  createElement(native ? NativeEllipse : 'ellipse', props, children);
export const G = ({native, children, ...props}: Props) =>
  createElement(native ? NativeG : 'g', props, children);
export const Text = ({native, children, ...props}: Props) =>
  createElement(native ? NativeText : 'text', props, children);
export const TSpan = ({native, children, ...props}: Props) =>
  createElement(native ? NativeTSpan : 'tSpan', props, children);
export const TextPath = ({native, children, ...props}: Props) =>
  createElement(native ? NativeTextPath : 'textPath', props, children);
export const Path = ({native, children, ...props}: Props) =>
  createElement(native ? NativePath : 'path', props, children);
export const Polygon = ({native, children, ...props}: Props) =>
  createElement(native ? NativePolygon : 'polygon', props, children);
export const Polyline = ({native, children, ...props}: Props) =>
  createElement(native ? NativePolyline : 'polyline', props, children);
export const Line = ({native, children, ...props}: Props) =>
  createElement(native ? NativeLine : 'line', props, children);
export const Rect = ({native, children, ...props}: Props) =>
  createElement(native ? NativeRect : 'rect', props, children);
export const Use = ({native, children, ...props}: Props) =>
  createElement(native ? NativeUse : 'use', props, children);
export const Image = ({native, children, ...props}: Props) =>
  createElement(native ? NativeImage : 'image', props, children);
export const Symbol = ({native, children, ...props}: Props) =>
  createElement(native ? NativeSymbol : 'symbol', props, children);
export const Defs = ({native, children, ...props}: Props) =>
  createElement(native ? NativeDefs : 'defs', props, children);
export const RadialGradient = ({native, children, ...props}: Props) =>
  createElement(
    native ? NativeRadialGradient : 'radialGradient',
    props,
    children,
  );
export const Stop = ({native, children, ...props}: Props) =>
  createElement(native ? NativeStop : 'stop', props, children);
export const ClipPath = ({native, children, ...props}: Props) =>
  createElement(native ? NativeClipPath : 'clipPath', props, children);
export const Pattern = ({native, children, ...props}: Props) =>
  createElement(native ? NativePattern : 'pattern', props, children);
export const Mask = ({native, children, ...props}: Props) =>
  createElement(native ? NativeMask : 'mask', props, children);
