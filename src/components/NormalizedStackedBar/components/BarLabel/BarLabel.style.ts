import styled from '@emotion/styled';
import {
  spacingExtraTight,
  spacingTight,
  spacingExtraLoose,
} from '@shopify/polaris-tokens';

export const LabelColor = styled.div(({color}: {color: string}) => ({
  background: color,
  border: '1px solid transparent',
  borderRadius: '3px',
  height: '10px',
  width: '10px',
}));

export const Label = styled.div(() => ({
  flex: 1,
  marginLeft: spacingTight,
  wordBreak: 'break-word',
}));

export const Container = styled.div(() => ({
  display: 'flex',
  alignItems: 'baseline',
  marginBottom: spacingExtraLoose,
}));

export const Value = styled.div(() => ({
  marginTop: spacingExtraTight,
}));

export const Bold = styled.div(() => ({
  fontWeight: 600,
}));
