import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
import styled from '@emotion/styled';

export interface SwitchProps extends AntdSwitchProps {
  containerStyle?: any;
  containerClass?: string;
}

export const SwitchWrapper = styled.div`
  --antd-wave-shadow-color: var(--gray);
  .ant-switch {
    background-color: transparent;
    border: 1px solid var(--gray);
    width: 40px;
    height: 17px;
    &:focus {
      box-shadow: 0 0 0 2px rgb(26, 24, 24 / 20%);
    }
  }
  .ant-switch-handle {
    width: 25px;
    height: 25px;
    top: 50%;
    left: -1px;
    transform: translateY(-50%);

    &:before {
      border-radius: 50%;
      background-color: var(--gray);
    }
  }
  .ant-switch-checked .ant-switch-handle {
    left: calc(100% - 24px);
  }
`;

export function Switch(props: SwitchProps) {
  const { containerClass } = props;
  return (
    <SwitchWrapper
      className={`${containerClass || ''}`}
      style={props.containerStyle}
    >
      <AntdSwitch {...props} />
    </SwitchWrapper>
  );
}
