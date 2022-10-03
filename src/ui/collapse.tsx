import styled from '@emotion/styled';
import {
  Collapse as AntdCollapse,
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps,
} from 'antd';

export interface CollapsePanelProps extends AntdCollapseProps {
  containerStyle?: any;
  containerClass?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const AntdCollapseWrapper = styled.div``;

export function Collapse({
  containerClass,
  containerStyle,
  children,
  ...rest
}: CollapsePanelProps) {
  return (
    <AntdCollapseWrapper
      className={`${containerClass || ''}`}
      style={containerStyle}
    >
      <AntdCollapse {...rest}>{children}</AntdCollapse>
    </AntdCollapseWrapper>
  );
}
export const Panel = AntdCollapse.Panel;
