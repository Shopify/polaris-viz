import React, {ComponentClass, createElement, ReactNode, SVGProps} from 'react';
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

import {usePolarisVizContext} from '../../hooks';

const NATIVE_COMPONENTS: {[key: string]: ComponentClass} = {
  svg: NativeSvg,
  circle: NativeCircle,
  ellipse: NativeEllipse,
  // eslint-disable-next-line id-length
  g: NativeG,
  text: NativeText,
  tspan: NativeTSpan,
  textpath: NativeTextPath,
  path: NativePath,
  polygon: NativePolygon,
  polyline: NativePolyline,
  line: NativeLine,
  rect: NativeRect,
  use: NativeUse,
  image: NativeImage,
  symbol: NativeSymbol,
  defs: NativeDefs,
  lineargradient: NativeLinearGradient,
  radialgradient: NativeRadialGradient,
  stop: NativeStop,
  clippath: NativeClipPath,
  pattern: NativePattern,
  mask: NativeMask,
};

interface RootProps extends SVGProps<SVGElement> {
  tagName: string;
  children?: ReactNode;
}

function Root({tagName, children, ...props}: RootProps) {
  const {native} = usePolarisVizContext();

  return createElement(
    native ? NATIVE_COMPONENTS[tagName] : tagName,
    props,
    children,
  );
}

interface Props<T> extends SVGProps<T> {
  children?: ReactNode;
}

export const Svg = ({children, ...props}: Props<SVGSVGElement>) => {
  return (
    <Root tagName="svg" {...props}>
      {children}
    </Root>
  );
};

export const Circle = ({children, ...props}: Props<SVGCircleElement>) => {
  return (
    <Root tagName="circle" {...props}>
      {children}
    </Root>
  );
};

export const Ellipse = ({children, ...props}: Props<SVGEllipseElement>) => {
  return (
    <Root tagName="ellipse" {...props}>
      {children}
    </Root>
  );
};

// eslint-disable-next-line id-length
export const G = ({children, ...props}: Props<SVGGElement>) => {
  return (
    <Root tagName="g" {...props}>
      {children}
    </Root>
  );
};

export const Text = ({children, ...props}: Props<SVGTextElement>) => {
  return (
    <Root tagName="text" {...props}>
      {children}
    </Root>
  );
};

export const TSpan = ({children, ...props}: Props<SVGTSpanElement>) => {
  return (
    <Root tagName="tSpan" {...props}>
      {children}
    </Root>
  );
};

export const TextPath = ({children, ...props}: Props<SVGTextPathElement>) => {
  return (
    <Root tagName="textPath" {...props}>
      {children}
    </Root>
  );
};

export const Path = ({children, ...props}: Props<SVGPathElement>) => {
  return (
    <Root tagName="path" {...props}>
      {children}
    </Root>
  );
};

export const Polygon = ({children, ...props}: Props<SVGPolygonElement>) => {
  return (
    <Root tagName="polygon" {...props}>
      {children}
    </Root>
  );
};

export const Polyline = ({children, ...props}: Props<SVGPolylineElement>) => {
  return (
    <Root tagName="polyline" {...props}>
      {children}
    </Root>
  );
};

export const Line = ({children, ...props}: Props<SVGLineElement>) => {
  return (
    <Root tagName="line" {...props}>
      {children}
    </Root>
  );
};

export const Rect = ({children, ...props}: Props<SVGRectElement>) => {
  return (
    <Root tagName="rect" {...props}>
      {children}
    </Root>
  );
};

export const Use = ({children, ...props}: Props<SVGUseElement>) => {
  return (
    <Root tagName="use" {...props}>
      {children}
    </Root>
  );
};

export const Image = ({children, ...props}: Props<SVGImageElement>) => {
  return (
    <Root tagName="image" {...props}>
      {children}
    </Root>
  );
};

export const Symbol = ({children, ...props}: Props<SVGSymbolElement>) => {
  return (
    <Root tagName="symbol" {...props}>
      {children}
    </Root>
  );
};

export const Defs = ({children, ...props}: Props<SVGDefsElement>) => {
  return (
    <Root tagName="defs" {...props}>
      {children}
    </Root>
  );
};

export const RadialGradient = ({
  children,
  ...props
}: Props<SVGRadialGradientElement>) => {
  return (
    <Root tagName="radialGradient" {...props}>
      {children}
    </Root>
  );
};

export const LinearGradient = ({
  children,
  ...props
}: Props<SVGLinearGradientElement>) => {
  return (
    <Root tagName="linearGradient" {...props}>
      {children}
    </Root>
  );
};

export const Stop = ({children, ...props}: Props<SVGStopElement>) => {
  return (
    <Root tagName="stop" {...props}>
      {children}
    </Root>
  );
};

export const ClipPath = ({children, ...props}: Props<SVGClipPathElement>) => {
  return (
    <Root tagName="clipPath" {...props}>
      {children}
    </Root>
  );
};

export const Pattern = ({children, ...props}: Props<SVGPatternElement>) => {
  return (
    <Root tagName="pattern" {...props}>
      {children}
    </Root>
  );
};

export const Mask = ({children, ...props}: Props<SVGMaskElement>) => {
  return (
    <Root tagName="mask" {...props}>
      {children}
    </Root>
  );
};
