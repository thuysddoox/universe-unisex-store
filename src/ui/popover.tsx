import { Popover as AntdPopover, PopoverProps as AntdPopoverProps } from 'antd';
import styled from '@emotion/styled';

export interface PopoverProps extends AntdPopoverProps {
  containerStyle?: any;
  containerClass?: string;
}

export const PopoverWrapper = styled.div``;

const CustomAntdPopover = styled(AntdPopover)`
  .ant-popover-arrow {
    display: none !important;
  }
`;

export function Popover({
  containerClass,
  children,
  content,
  containerStyle,
  ...rest
}: PopoverProps) {
  return (
    <PopoverWrapper
      className={`${containerClass || ''}`}
      style={containerStyle}
    >
      <CustomAntdPopover content={content} {...rest}>
        {children}
      </CustomAntdPopover>
    </PopoverWrapper>
  );
}
