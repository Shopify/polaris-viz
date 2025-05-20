import {Fragment} from 'react';
import {FONT_FAMILY} from '@shopify/polaris-viz-core';

import {useTheme} from '../../hooks';
import type {FormattedLine} from '../../types';

interface TextLineProps {
  index: number;
  line: FormattedLine[];
  color?: string;
}

export function TextLine({color, index, line}: TextLineProps) {
  const selectedTheme = useTheme();

  return (
    <Fragment>
      {line.map(
        (
          {
            dominantBaseline,
            height,
            fontSize,
            fullText,
            truncatedText,
            textAnchor,
            transform,
            width,
            x,
            y,
            style,
            fill,
          },
          textIndex,
        ) => {
          const key = `${index}-${textIndex}-${truncatedText}`;

          return (
            <Fragment key={key}>
              <text
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                height={height}
                width={width}
                x={x}
                y={y}
                fill={color ?? fill ?? selectedTheme.xAxis.labelColor}
                fontSize={fontSize}
                fontFamily={FONT_FAMILY}
                transform={transform}
                style={style}
              >
                {truncatedText}
              </text>
              <title>{fullText}</title>
            </Fragment>
          );
        },
      )}
    </Fragment>
  );
}
