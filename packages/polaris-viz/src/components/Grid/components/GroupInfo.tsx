import React from 'react';

interface GroupInfoProps {
  groupX: number;
  groupY: number;
  group: {
    name: string;
  };
  groupWidth: number;
  groupHeight: number;
  getColors: (group: any) => {textColor: string};
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
  mainFontSize,
  groupValue,
  showNameAndSecondaryValue,
  secondaryFontSize,
  groupSecondaryValue,
  groupNameOffset,
}) => {
  return (
    <React.Fragment>
      <text
        x={groupX + groupWidth / 2}
        y={groupY + groupHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={getColors(group).textColor}
      >
        <tspan fontWeight={600} fontSize={`${mainFontSize}px`}>
          {groupValue}
        </tspan>
        {showNameAndSecondaryValue && (
          <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
            {groupSecondaryValue}
          </tspan>
        )}
      </text>

      {showNameAndSecondaryValue && (
        <text
          x={groupX + groupNameOffset}
          y={groupY + groupNameOffset}
          textAnchor="start"
          dominantBaseline="hanging"
          fontSize="11"
          fill={getColors(group).textColor}
        >
          {group.name}
        </text>
      )}
    </React.Fragment>
  );
};
