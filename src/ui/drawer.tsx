import { Drawer as AntdDrawer, DrawerProps as AntdDrawerProps } from 'antd';
import styled from '@emotion/styled';

export interface DrawerProps extends AntdDrawerProps {
  containerStyle?: any;
  containerClass?: string;
  children?: React.ReactNode;
  isHiddenMask?: boolean;
}

export const AntdDrawerWrapper = styled.div``;

export function Drawer({
  containerClass,
  containerStyle,
  children,
  isHiddenMask = false,
  ...rest
}: DrawerProps) {
  return (
    <AntdDrawerWrapper
      className={`${containerClass || ''} text-left`}
      style={containerStyle}
    >
      <AntdDrawer
        {...rest}
        className={`${isHiddenMask && 'drawer-hidden-mask'}`}
      >
        {children}
      </AntdDrawer>
    </AntdDrawerWrapper>
  );
}
