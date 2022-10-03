import {
  Menu as AntdMenu,
  MenuProps as AntdMenuProps,
  MenuItemProps as AntdMenuItemProps,
} from 'antd';
import styled from '@emotion/styled';

export interface MenuProps extends AntdMenuProps {
  containerStyle?: any;
  containerClass?: string;
}

export const MenuWrapper = styled.div`
`;

export function Menu(props: MenuProps) {
  const { containerClass, containerStyle } = props;
  return (
    <MenuWrapper className={`${containerClass || ''}`} style={containerStyle}>
      <AntdMenu {...props}>{props.children}</AntdMenu>
    </MenuWrapper>
  );
}

export interface MenuItemProps extends AntdMenuItemProps {
  containerStyle?: any;
  containerClass?: string;
}

export function MenuItem(props: MenuItemProps) {
  return <AntdMenu.Item {...props} />;
}
