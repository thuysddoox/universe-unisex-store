import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd';
import styled from '@emotion/styled';

const CheckboxWrapper = styled.div`
  font-family: var(--font-title);
  .ant-checkbox-wrapper {
    font-size: 12px;
  }
`;

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxWrapper>
      <AntdCheckbox {...props} />
    </CheckboxWrapper>
  );
}

export default Checkbox;
