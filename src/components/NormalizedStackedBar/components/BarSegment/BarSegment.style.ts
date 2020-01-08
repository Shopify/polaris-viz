import styled from '@emotion/styled';

interface Theme {
  scale: number;
  height: number;
  width: number;
  background: string;
}

export const Segment = styled.div(
  ({theme}: {theme: Theme}) => `
  background: ${`${theme.background}`};
  flex: ${`${theme.scale} 0 0`};
  width: ${`${theme.width}px`};
  height: ${`${theme.height}px`};
  margin: 0 1px 1px 0;
  &:last-of-type {
    margin: 0;
  }
`,
);
