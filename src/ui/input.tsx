import { Input as AntdInput, InputProps as AntdInputProps, Tooltip } from 'antd';
import styled, { StyledComponent } from '@emotion/styled';
import { SafeAny } from '@interfaces';
import React, { CSSProperties } from 'react';
import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import { TextAreaProps } from 'antd/lib/input';

const InputWrapper: StyledComponent<SafeAny> = styled.div`
  font-family: var(--font-title);
  .ant-input,
  .ant-input-password,
  .ant-input-affix-wrapper{
    border: 1px solid ${(props: SafeAny) => props?.bordercolor || 'var(--gray)'};
    border-radius: ${(props: SafeAny) => props?.borderradius || '30px'};
  }
  .ant-input::placeholder{
    color: var(--light-gray-4)!important;
  }
  .ant-input-group-addon{
    background: transparent;
  }
  .ant-input-search input{
    border-right-width: 0;
    border-color: ${(props: SafeAny) => props?.bordercolor || 'var(--gray)'};
  }
  .ant-input-search-button {
    border-left-width: 0!important;
    border-color: ${(props: SafeAny) => props?.bordercolor || 'var(--gray)'};
    border-top-right-radius: ${(props: SafeAny) => props?.borderradius || '30px'}!important;
    border-bottom-right-radius: ${(props: SafeAny) => props?.borderradius || '30px'}!important;
  }
  .ant-input-search .ant-input:focus{
    box-shadow: none;
  }
  .ant-input-group-addon .ant-input-affix-wrapper-focused,
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: var(--gray);
    // box-shadow: none;
  }
  .ant-input-affix-wrapper-lg {
    font-size: 14px;
    line-height: 34px;
    padding: 0px 12px;
    /* padding: 10px 12px; */
    border-radius: ${(props: SafeAny) => props?.borderradius || '33px'};
    input {
      font-size: 14px;
    }
  }
  .ant-input-lg {
    font-size: 14px;
    /* padding: 10px 12px; */
    line-height: 34px;
    padding: 2px 12px;
    /* line-height: 38px; */
  }
  .ant-input::placeholder {
    color: var(--gray);
    // font-size: 13px;
  }
`;

export interface InputProps extends AntdInputProps {
  containerStyle?: any;
  containerClass?: string;
  ref?: SafeAny;
  id?: string;
  inputId?: string;
  onSearch?: SafeAny;
  borderradius?: SafeAny;
  bordercolor?: SafeAny;
}

// export interface InputNumberMaskProps extends NumberFormatPropsBase<SafeAny> {
//   containerStyle?: CSSProperties;
//   containerClass?: string;
//   tooltip?: string;
// }

export function Input(props: InputProps) {
  const { containerClass, containerStyle, id: inputWrapId, inputId, borderradius, ...rests } = props;
  return (
    <InputWrapper
      className={`${containerClass || ''}`}
      style={containerStyle}
      borderradius={borderradius}
      id={inputWrapId}>
      <AntdInput id={inputId} {...rests} />
    </InputWrapper>
  );
}

export const Password = React.forwardRef<any, InputProps>((props, ref) => {
  const { containerClass } = props;
  return (
    <InputWrapper className={`${containerClass || ''}`} style={props.containerStyle}>
      <AntdInput.Password {...props} ref={ref} />
    </InputWrapper>
  );
});
export const Search = React.forwardRef<any, InputProps>((props, ref) => {
  const { containerClass,bordercolor, onSearch } = props;
  return (
    <InputWrapper className={`${containerClass || ''}`} style={props.containerStyle} bordercolor={bordercolor}>
      <AntdInput.Search {...props} ref={ref} onSearch={onSearch} />
    </InputWrapper>
  );
});

export function TextArea(
  props: TextAreaProps & {
    containerStyle?: CSSProperties;
    containerClass?: string;
    borderradius?: string;
  },
) {
  const { containerClass,borderradius } = props;
  return (
    <InputWrapper className={`${containerClass || ''}`} style={props.containerStyle} borderradius={borderradius}>
      <AntdInput.TextArea {...props} />
    </InputWrapper>
  );
}
export interface InputNumberMaskProps extends NumberFormatPropsBase<SafeAny> {
  containerStyle?: CSSProperties;
  containerClass?: string;
  tooltip?: string;
}

export function InputNumberMask(props: InputNumberMaskProps) {
  const { containerClass } = props;
  return (
    <InputWrapper className={`${containerClass || ''}`} style={props.containerStyle}>
      <Tooltip title={props.tooltip} zIndex={1100} trigger={['click', 'hover']}>
        <NumberFormat  customInput={Input} {...props} />
      </Tooltip>
    </InputWrapper>
  );
}

export default Input;
