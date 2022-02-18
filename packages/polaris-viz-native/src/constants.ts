import {createElement} from 'react';
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

export const DEFAULT_COMPONENTS = {
  Svg: ({children, ...props}) => createElement(NativeSvg, props, children),
  Circle: ({children, ...props}) =>
    createElement(NativeCircle, props, children),
  Ellipse: ({children, ...props}) =>
    createElement(NativeEllipse, props, children),
  // eslint-disable-next-line id-length
  G: ({children, ...props}) => createElement(NativeG, props, children),
  Text: ({children, ...props}) => createElement(NativeText, props, children),
  TSpan: ({children, ...props}) => createElement(NativeTSpan, props, children),
  TextPath: ({children, ...props}) =>
    createElement(NativeTextPath, props, children),
  Path: ({children, ...props}) => createElement(NativePath, props, children),
  Polygon: ({children, ...props}) =>
    createElement(NativePolygon, props, children),
  Polyline: ({children, ...props}) =>
    createElement(NativePolyline, props, children),
  Line: ({children, ...props}) => createElement(NativeLine, props, children),
  Rect: ({children, ...props}) => createElement(NativeRect, props, children),
  Use: ({children, ...props}) => createElement(NativeUse, props, children),
  Image: ({children, ...props}) => createElement(NativeImage, props, children),
  Symbol: ({children, ...props}) =>
    createElement(NativeSymbol, props, children),
  Defs: ({children, ...props}) => createElement(NativeDefs, props, children),
  LinearGradient: ({children, ...props}) =>
    createElement(NativeLinearGradient, props, children),
  RadialGradient: ({children, ...props}) =>
    createElement(NativeRadialGradient, props, children),
  Stop: ({children, ...props}) => createElement(NativeStop, props, children),
  ClipPath: ({children, ...props}) =>
    createElement(NativeClipPath, props, children),
  Pattern: ({children, ...props}) =>
    createElement(NativePattern, props, children),
  Mask: ({children, ...props}) => createElement(NativeMask, props, children),
};
