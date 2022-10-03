import { Button as AntdButton, ButtonProps } from 'antd';
import styled from '@emotion/styled';

const ButtonWrapper = styled.span`
  .ant-btn {
    color: #fff;
    border: 0;
    box-shadow: none;
    background-color: transparent;
  }
`

export function IconButton(props: ButtonProps) {
  return (
  <ButtonWrapper>
    <AntdButton {...props} />
  </ButtonWrapper>
  );
}

export default IconButton;
