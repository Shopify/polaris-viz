import React, {useCallback} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';

import {truncateText} from '../utilities/truncate-text';
import {
  LABEL_FONT_SIZE,
  PRIMARY_VALUE_WIDTH_RATIO,
  PRIMARY_VALUE_WIDTH_RATIO_SOLO,
  SECONDARY_VALUE_WIDTH_RATIO,
  GROUP_NAME_WIDTH_MULTIPLIER,
  TEXT_Y_OFFSET_WITH_SECONDARY,
} from '../utilities/constants';

interface GroupInfoProps {
  groupX: number;
  groupY: number;
  group: {
    name: string;
  };
  groupWidth: number;
  groupHeight: number;
  getColors: (group: any) => {textColor: string};
  opacity: number;
  mainFontSize: number;
  groupValue: string;
  showNameAndSecondaryValue: boolean;
  secondaryFontSize: number;
  groupSecondaryValue: string;
  groupNameOffset: number;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({
  groupX,
  groupY,
  group,
  groupWidth,
  groupHeight,
  getColors,
  opacity,
  mainFontSize,
  groupValue,
  showNameAndSecondaryValue,
  secondaryFontSize,
  groupSecondaryValue,
  groupNameOffset,
}) => {
  const {characterWidths} = useChartContext();

  const getTruncatedText = useCallback(
    (text: string, availableWidth: number) => {
      return truncateText(text, availableWidth, characterWidths);
    },
    [characterWidths],
  );

  const divider = showNameAndSecondaryValue
    ? PRIMARY_VALUE_WIDTH_RATIO
    : PRIMARY_VALUE_WIDTH_RATIO_SOLO;

  const truncatedValue = getTruncatedText(groupValue, groupWidth / divider);
  const truncatedSecondaryValue = showNameAndSecondaryValue
    ? getTruncatedText(
        groupSecondaryValue,
        groupWidth / SECONDARY_VALUE_WIDTH_RATIO,
      )
    : '';
  const truncatedGroupName = showNameAndSecondaryValue
    ? getTruncatedText(group.name, groupWidth * GROUP_NAME_WIDTH_MULTIPLIER)
    : '';

  const textYOffset = showNameAndSecondaryValue
    ? TEXT_Y_OFFSET_WITH_SECONDARY
    : 0;

  return (
    <React.Fragment>
      <text
        x={groupX + groupWidth / 2}
        y={groupY + groupHeight / 2 + textYOffset}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={getColors(group).textColor}
        opacity={opacity}
      >
        <tspan fontWeight={600} fontSize={`${mainFontSize}px`}>
          {truncatedValue}
        </tspan>
        {showNameAndSecondaryValue && (
          <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
            {truncatedSecondaryValue}
          </tspan>
        )}
      </text>

      {showNameAndSecondaryValue && (
        <text
          x={groupX + groupNameOffset}
          y={groupY + groupNameOffset}
          textAnchor="start"
          dominantBaseline="hanging"
          fontSize={LABEL_FONT_SIZE}
          fill={getColors(group).textColor}
          opacity={opacity}
        >
          {truncatedGroupName}
        </text>
      )}
    </React.Fragment>
  );
};
