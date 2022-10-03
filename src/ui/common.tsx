import { STATUS_COLOR } from '@constants/enum';
import styled from '@emotion/styled';

export const FeatureBtn = styled.button`
  cursor: ${(props: { disabled: boolean }) =>
    props.disabled ? 'default' : 'pointer'};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? '0.4' : '1')};
`;
export const StatusContent = styled.span`
  color: ${(props: { crrStatus: number }) => STATUS_COLOR[props.crrStatus]};
`;
