import { Tag as AntdTag, TagProps as AntdTagProps } from 'antd';
import styled from '@emotion/styled';

export interface TagProps extends AntdTagProps {
  containerStyle?: any;
  containerClass?: string;
}

export const TagWrapper = styled.div`
  margin-bottom: 0.5rem;
  &.vertical-pipe {
    margin-right: 1rem;
    position: relative;
    &::after {
      content: '';
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      height: 70%;
      background: var(--gray);
      width: 2px;
      transform: translateY(-50%);
    }
    .ant-tag {
      margin-right: 1rem;
    }
  }
  &.vertical-pipe-left:not(:first-child) {
    margin-left: 0.5rem;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: 70%;
      background: var(--gray);
      width: 2px;
      transform: translateY(-50%);
    }
    .ant-tag {
      margin-left: 1rem;
    }
  }
  .ant-tag {
    display: flex;
    align-items: center;
    background: #dcdcdc;
    border-color: #dcdcdc;
    color: #56554f;
    font-family: var(--font-title);
  }
`;

export function Tag({
  containerClass,
  children,
  containerStyle,
  ...rest
}: TagProps) {
  return (
    <TagWrapper className={`${containerClass || ''}`} style={containerStyle}>
      <AntdTag {...rest}>{children}</AntdTag>
    </TagWrapper>
  );
}
