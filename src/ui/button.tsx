import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import styled, { StyledComponent } from '@emotion/styled';
import { up } from 'styled-breakpoints';

const ButtonWrapper: StyledComponent<any> = styled.div`
  .ant-btn {
    height: auto !important;
    line-height: ${(props: any) => props?.lineheight || '34px'};
    padding: 2px 12px;
    font-family: var(--font-title);
    border-radius: ${(props: any) => props?.borderradius || '30px'};
    color: ${(props: any) => props?.textcolor || '#000'};
    &:not(.ant-btn-link, .ant-btn-text) {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props: any) => props?.bgColor || 'transparent'};
      border: 1px solid ${(props: any) => props?.bordercolor || 'var(--gray)'};
      color: ${(props: any) => props?.textcolor || '#000'};
      &.bg-white {
        background: #fff;
      }
      &:hover {
        background-color: ${(props: any) => props?.hoverBgColor || 'var(--gray)'};
        color: ${(props: any) => props?.hoverTextColor || '#000'};
        ${up('md')} {
          // background-color: var(--gray);
          color: #fff;
        }
        img {
          filter: invert(1);
        }
      }
      &.ant-btn-primary {
        background-color: var(--gray);
        color: #fff;
        border: 1px solid transparent;
        &:hover {
          ${up('md')} {
            background-color: transparent;
            border: 1px solid var(--gray);
            color: var(--gray);
          }
        }
        &:disabled {
          opacity: 0.6;
        }
      }
    }
    &.ant-btn-link {
      color: var(--navy);
      &:hover {
        color: #3c90b8;
      }
      > span {
        text-decoration: underline;
      }
      &[disabled] {
        color: rgba(0, 0, 0, 0.25);
        border-color: transparent;
        background: transparent;
        text-shadow: none;
        box-shadow: none;
      }
    }
  }
  &.ant-btn-borderless {
    .ant-btn {
      border: 0px;
    }
  }
`;

export interface ButtonProps extends AntdButtonProps {
  borderless?: boolean;
  containerStyle?: any;
  containerClass?: string;
  borderradius?: any;
  bordercolor?: any;
  lineheight?: string | number;
  textcolor?: string;
  hoverTextColor?: string;
  hoverBgColor?: string;
  bgColor?: string;
}

export function Button({ containerClass, containerStyle, borderless, loading = false, ...buttonProps }: ButtonProps) {
  return (
    <ButtonWrapper
      className={`${containerClass || ''} ${borderless ? 'ant-btn-borderless' : ''}`}
      style={containerStyle}
      {...buttonProps}
    >
      <AntdButton loading={loading} {...buttonProps} />
    </ButtonWrapper>
  );
}

export default Button;
