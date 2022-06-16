import React from 'react';

import {useTheme} from '../../hooks';
import {FONT_SIZE} from '../../constants';
import type {FormattedLine} from '../../types';

interface TextLineProps {
  index: number;
  line: FormattedLine[];
  theme: string;
}

export function TextLine({index, line, theme}: TextLineProps) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      {line.map(
        (
          {
            dominantBaseline,
            height,
            fullText,
            truncatedText,
            textAnchor,
            transform,
            width,
            x,
            y,
          },
          textIndex,
        ) => {
          const key = `${index}-${textIndex}-${truncatedText}`;

          return (
            <React.Fragment key={key}>
              <text
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                height={height}
                width={width}
                x={x}
                y={y}
                fill={selectedTheme.xAxis.labelColor}
                fontSize={FONT_SIZE}
                transform={transform}
              >
                {truncatedText}
              </text>
              <title>{fullText}</title>
            </React.Fragment>
          );
        },
      )}
    </React.Fragment>
  );
}
