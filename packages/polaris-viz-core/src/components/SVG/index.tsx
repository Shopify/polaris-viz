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
  textPath: NativeTextPath,
  path: NativePath,
  polygon: NativePolygon,
  polyline: NativePolyline,
  line: NativeLine,
  rect: NativeRect,
  use: NativeUse,
  image: NativeImage,
  symbol: NativeSymbol,
  defs: NativeDefs,
  linearGradient: NativeLinearGradient,
  radialGradient: NativeRadialGradient,
  stop: NativeStop,
  clippath: NativeClipPath,
  pattern: NativePattern,
  mask: NativeMask,
};

interface SvgNodeProps extends SVGProps<SVGElement> {
  tagName: string;
  children?: ReactNode;
}

function SvgNode({tagName, children, ...props}: SvgNodeProps) {
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
    <SvgNode tagName="svg" {...props}>
      {children}
    </SvgNode>
  );
};

export const Circle = ({children, ...props}: Props<SVGCircleElement>) => {
  return (
    <SvgNode tagName="circle" {...props}>
      {children}
    </SvgNode>
  );
};

export const Ellipse = ({children, ...props}: Props<SVGEllipseElement>) => {
  return (
    <SvgNode tagName="ellipse" {...props}>
      {children}
    </SvgNode>
  );
};

// eslint-disable-next-line id-length
export const G = ({children, ...props}: Props<SVGGElement>) => {
  return (
    <SvgNode tagName="g" {...props}>
      {children}
    </SvgNode>
  );
};

export const Text = ({children, ...props}: Props<SVGTextElement>) => {
  return (
    <SvgNode tagName="text" {...props}>
      {children}
    </SvgNode>
  );
};

export const TSpan = ({children, ...props}: Props<SVGTSpanElement>) => {
  return (
    <SvgNode tagName="tspan" {...props}>
      {children}
    </SvgNode>
  );
};

export const TextPath = ({children, ...props}: Props<SVGTextPathElement>) => {
  return (
    <SvgNode tagName="textPath" {...props}>
      {children}
    </SvgNode>
  );
};

export const Path = ({children, ...props}: Props<SVGPathElement>) => {
  return (
    <SvgNode tagName="path" {...props}>
      {children}
    </SvgNode>
  );
};

export const Polygon = ({children, ...props}: Props<SVGPolygonElement>) => {
  return (
    <SvgNode tagName="polygon" {...props}>
      {children}
    </SvgNode>
  );
};

export const Polyline = ({children, ...props}: Props<SVGPolylineElement>) => {
  return (
    <SvgNode tagName="polyline" {...props}>
      {children}
    </SvgNode>
  );
};

export const Line = ({children, ...props}: Props<SVGLineElement>) => {
  return (
    <SvgNode tagName="line" {...props}>
      {children}
    </SvgNode>
  );
};

export const Rect = ({children, ...props}: Props<SVGRectElement>) => {
  return (
    <SvgNode tagName="rect" {...props}>
      {children}
    </SvgNode>
  );
};

export const Use = ({children, ...props}: Props<SVGUseElement>) => {
  return (
    <SvgNode tagName="use" {...props}>
      {children}
    </SvgNode>
  );
};

export const Image = ({children, ...props}: Props<SVGImageElement>) => {
  return (
    <SvgNode tagName="image" {...props}>
      {children}
    </SvgNode>
  );
};

export const Symbol = ({children, ...props}: Props<SVGSymbolElement>) => {
  return (
    <SvgNode tagName="symbol" {...props}>
      {children}
    </SvgNode>
  );
};

export const Defs = ({children, ...props}: Props<SVGDefsElement>) => {
  return (
    <SvgNode tagName="defs" {...props}>
      {children}
    </SvgNode>
  );
};

export const RadialGradient = ({
  children,
  ...props
}: Props<SVGRadialGradientElement>) => {
  return (
    <SvgNode tagName="radialGradient" {...props}>
      {children}
    </SvgNode>
  );
};

export const LinearGradient = ({
  children,
  ...props
}: Props<SVGLinearGradientElement>) => {
  return (
    <SvgNode tagName="linearGradient" {...props}>
      {children}
    </SvgNode>
  );
};

export const Stop = ({children, ...props}: Props<SVGStopElement>) => {
  return (
    <SvgNode tagName="stop" {...props}>
      {children}
    </SvgNode>
  );
};

export const ClipPath = ({children, ...props}: Props<SVGClipPathElement>) => {
  return (
    <SvgNode tagName="clipPath" {...props}>
      {children}
    </SvgNode>
  );
};

export const Pattern = ({children, ...props}: Props<SVGPatternElement>) => {
  return (
    <SvgNode tagName="pattern" {...props}>
      {children}
    </SvgNode>
  );
};

export const Mask = ({children, ...props}: Props<SVGMaskElement>) => {
  return (
    <SvgNode tagName="mask" {...props}>
      {children}
    </SvgNode>
  );
};
