import styled from '@emotion/styled';
import tokens from '@shopify/polaris-tokens';

interface Theme {
  color: string;
}

export const LabelColor = styled.div(({theme}: {theme: Theme}) => ({
  background: theme.color,
  borderRadius: '3px',
  height: '15px',
  width: '15px',
}));

export const Label = styled.div`
  flex: 1;
  margin-left: ${tokens.spacingLoose};
  word-break: break-word;
`;

export const Container = styled.div`
  display: flex;
  margin-bottom: ${tokens.spacingExtraLoose};
  margin-right: ${tokens.spacingExtraLoose};
`;
