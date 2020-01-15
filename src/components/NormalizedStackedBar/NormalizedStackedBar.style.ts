import styled from '@emotion/styled';
import {fontStackBase, spacingLoose} from '@shopify/polaris-tokens';

export const Container = styled.div(({isVertical}: {isVertical: boolean}) => ({
  fontFamily: fontStackBase,
  fontSize: '14px',
  display: 'flex',
  flexDirection: isVertical ? 'row-reverse' : 'column',
  justifyContent: isVertical ? 'flex-end' : 'normal',
  height: isVertical ? '100%' : 'inherit',
}));

export const BarContainer = styled.div(
  ({isVertical}: {isVertical: boolean}) => ({
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
  }),
);

export const LabelContainer = styled.div(
  ({isVertical}: {isVertical: boolean}) => {
    return isVertical
      ? {display: 'flex', flexFlow: 'column wrap', marginLeft: spacingLoose}
      : {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 150px))',
        };
  },
);
