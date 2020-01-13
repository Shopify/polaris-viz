import styled from '@emotion/styled';
import {fontStackBase, spacingLoose} from '@shopify/polaris-tokens';

export const Container = styled.div(({isVertical}: {isVertical: boolean}) => {
  const verticalStyles = isVertical
    ? {justifyContent: 'flex-end', height: '100%'}
    : null;

  return {
    display: 'flex',
    fontFamily: fontStackBase,
    flexDirection: isVertical ? 'row-reverse' : 'column',
    ...verticalStyles,
  };
});

export const BarContainer = styled.div(
  ({isVertical}: {isVertical: boolean}) => ({
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
  }),
);

export const LabelContainer = styled.div(
  ({isVertical}: {isVertical: boolean}) => {
    const verticalStyles = isVertical
      ? {flexFlow: 'column wrap', marginLeft: spacingLoose}
      : null;

    const horizontalStyles = !isVertical
      ? {gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 150px))'}
      : null;

    return {
      display: isVertical ? 'flex' : 'grid',
      ...verticalStyles,
      ...horizontalStyles,
    };
  },
);
