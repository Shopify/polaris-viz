import React, {useMemo} from 'react';
import {textWrap} from 'd3plus-text';

import {TextAlignment} from '../../types';
import {MAX_X_AXIS_LINES, FONT_SIZE, LINE_HEIGHT} from '../../constants';

interface WrappedTextProps {
  align: TextAlignment;
  color: string;
  height: number;
  text: string;
  transform: string;
  width: number;
  fontSize?: number;
  lineHeight?: number;
  maxLines?: number;
}

function getAlignmentOffset(align: TextAlignment, x: number) {
  switch (align) {
    case TextAlignment.Left:
      return 0;
    case TextAlignment.Center:
      return x / 2;
    case TextAlignment.Right:
      return x;
  }
}

export function WrappedText({
  align,
  color,
  fontSize = FONT_SIZE,
  height,
  lineHeight = LINE_HEIGHT,
  maxLines = MAX_X_AXIS_LINES,
  text,
  transform,
  width,
}: WrappedTextProps) {
  const wrapper = useMemo(() => {
    return textWrap()
      .overflow(false)
      .fontSize(fontSize)
      .maxLines(maxLines)
      .lineHeight(lineHeight)
      .width(width);
  }, [width, maxLines, fontSize, lineHeight]);

  const wrappedData = wrapper(text);
  const lineCount = wrappedData.lines.length - 1;

  return (
    <text
      fill={color}
      transform={transform}
      height={height}
      width={width}
      fontSize={`${FONT_SIZE}px`}
    >
      {wrappedData.lines.map((text: string, index: number) => {
        const addEllipsis = wrappedData.truncated && lineCount === index;

        const label = addEllipsis ? `${text.slice(0, -3)}...` : text;
        const x = getAlignmentOffset(align, width - wrappedData.widths[index]);

        return (
          <tspan key={text} x={x} dy={LINE_HEIGHT}>
            {label}
          </tspan>
        );
      })}
    </text>
  );
}
