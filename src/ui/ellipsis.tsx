import React, { CSSProperties } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { SafeAny } from '@interfaces';
import { Tooltip } from 'antd';

export const Ellipsis = ({
  children,
  maxLines = 2,
  style = {},
  className = '',
  title,
  color,
  placement = 'topLeft',
  tooltipInnerStyle,
}: {
  children?: React.ReactNode;
  maxLines?: number;
  style?: CSSProperties;
  className?: string;
  color?: string;
  title?: any;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  tooltipInnerStyle?: React.CSSProperties;
}) => {
  return (
    <Tooltip color={color} title={title} placement={placement} overlayInnerStyle={{ ...tooltipInnerStyle }}>
      <Wrapper className={className} maxLines={maxLines} style={style}>
        {children}
      </Wrapper>
    </Tooltip>
  );
};

export const Wrapper: StyledComponent<SafeAny> = styled.p`
  display: -moz-box;
  display: -webkit-box;
  line-clamp: ${(props: SafeAny) => props.maxLines};
  -webkit-line-clamp: ${(props: SafeAny) => props.maxLines};
  white-space: pre-wrap;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
