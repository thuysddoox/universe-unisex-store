import { Dropdown as AntdDropdown, DropDownProps as AntdDropDownProps } from 'antd';
import styled from '@emotion/styled';
import { MenuProps } from './menu';

export interface DropDownProps extends AntdDropDownProps {
  containerStyle?: any;
  containerClass?: string;
  children?: React.ReactNode;
}

export const DropdownWrapper = styled.div``;

export function Dropdown(props: DropDownProps) {
  const { containerClass, containerStyle, overlayClassName, ...rest } = props;
  return (
    <DropdownWrapper className={`${containerClass || ''} text-left`} style={containerStyle}>
      <AntdDropdown {...rest} overlayClassName={`${overlayClassName || ''} dropdown`}>
        {props.children}
      </AntdDropdown>
    </DropdownWrapper>
  );
}
