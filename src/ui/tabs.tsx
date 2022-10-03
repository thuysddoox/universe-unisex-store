import {
  Tabs as AntdTabs,
  TabsProps as AntdTabsProps,
  TabPaneProps as AntdTabPaneProps,
} from 'antd';
import styled from '@emotion/styled';

export interface TabsProps extends AntdTabsProps {
  containerStyle?: any;
  containerClass?: string;
}

export const TabsWrapper = styled.div``;

export function Tabs(props: TabsProps) {
  const { containerClass, children, containerStyle } = props;
  return (
    <TabsWrapper className={`${containerClass || ''}`} style={containerStyle}>
      <AntdTabs {...props}>{children}</AntdTabs>
    </TabsWrapper>
  );
}

export interface TabPaneProps extends AntdTabPaneProps {
  containerStyle?: any;
  containerClass?: string;
}

export const TabPaneWrapper = styled.div`
  &.active {
    width: 100%;
  }
`;

export function TabPane(props: TabPaneProps) {
  const { active, containerStyle, containerClass } = props;
  const { TabPane } = AntdTabs;
  const _containerClass = `${containerClass || ''} ${active ? 'active' : ''}`;
  return (
    <TabPaneWrapper className={_containerClass} style={containerStyle}>
      <TabPane {...props} />
    </TabPaneWrapper>
  );
}
