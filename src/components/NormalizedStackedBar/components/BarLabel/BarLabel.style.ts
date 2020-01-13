import styled from '@emotion/styled';
import {
  spacingExtraTight,
  spacingTight,
  spacingExtraLoose,
} from '@shopify/polaris-tokens';

export const LabelColor = styled.div(({color}: {color: string}) => ({
  background: color,
  borderRadius: '3px',
  height: '10px',
  width: '10px',
}));

export const Label = styled.div`
  flex: 1;
  margin-left: ${spacingTight};
  word-break: break-word;
`;

export const Container = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: ${spacingExtraLoose};
`;

export const Value = styled.div`
  margin-top: ${spacingExtraTight};
`;
