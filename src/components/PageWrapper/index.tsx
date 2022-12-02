import styled, { StyledComponent } from '@emotion/styled';
import { SafeAny } from '../../interfaces/common';

const PageWapper: StyledComponent<SafeAny> = styled.div`
  background-color: ${(props: SafeAny) => props?.bgColor ?? '#fff'};
`;

export default PageWapper;
