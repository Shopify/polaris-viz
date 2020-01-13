import React from 'react';
import styled from '@emotion/styled';
import tokens from '@shopify/polaris-tokens';

const Bar = styled.div`
  background: ${tokens.colorPurple};
  color: ${tokens.colorWhite};
`;

export function NormalizedStackedBar() {
  return <Bar>NormalizedStackedBar</Bar>;
}
