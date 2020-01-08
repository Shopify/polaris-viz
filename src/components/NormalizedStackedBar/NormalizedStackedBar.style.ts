import styled from '@emotion/styled';
import tokens from '@shopify/polaris-tokens';

interface Theme {
  isVertical: boolean;
}

export const Container = styled.div(({theme}: {theme: Theme}) => {
  const verticalStyles = theme.isVertical
    ? {justifyContent: 'flex-end', height: '100%'}
    : null;

  return {
    display: 'flex',
    fontFamily: tokens.fontStackBase,
    flexDirection: theme.isVertical ? 'row-reverse' : 'column',
    ...verticalStyles,
  };
});

export const BarContainer = styled.div(({theme}: {theme: Theme}) => ({
  display: 'flex',
  flexDirection: theme.isVertical ? 'column' : 'row',
}));

export const LabelContainer = styled.div(({theme}: {theme: Theme}) => {
  const verticalStyles = theme.isVertical
    ? {flexFlow: 'column wrap', marginLeft: tokens.spacingExtraLoose}
    : null;

  const horizontalStyles = !theme.isVertical
    ? {gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 150px))'}
    : null;

  return {
    display: theme.isVertical ? 'grid' : 'flex',
    ...verticalStyles,
    ...horizontalStyles,
  };
});
