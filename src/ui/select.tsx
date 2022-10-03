import { Select as AntdSelect, SelectProps, FormInstance } from 'antd';
import styled, { StyledComponent } from '@emotion/styled';
import { ReactNode } from 'react';
import { SafeAny } from '@interfaces/common';

export interface SelectControlProps extends SelectProps<SafeAny> {
  options?: SafeAny[];
  getOptionLabel?: (o: SafeAny) => string;
  getOptionValue?: (o: SafeAny) => string;
  optionRender?: (o: SafeAny) => ReactNode;
  form?: FormInstance;
  name?: string;
  disabledOptions?: SafeAny[];
  containerStyle?: any;
  containerClass?: string;
  highlightOptions?: SafeAny[];
  borderradius?: SafeAny;
  bordercolor?: SafeAny;
}

const FormWrapper: StyledComponent<SelectControlProps> = styled.div`
  .ant-select {
    .ant-select-selector {
      border: 1px solid var(--gray);
      border: 1px solid ${(props: SafeAny) => props?.bordercolor || 'var(--gray)'};
      border-radius: ${(props: SafeAny) => props?.borderradius || '30px'};
    }
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: none;
  }
  .ant-select-item-option {
    &.highlight {
      background: #fef3c7;
    }
  }
  .ant-select-item-option-selected {
    background: #1a181836;
    &.highlight {
      background: #fcdf69;
    }
  }
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    &.highlight {
      background: #fde99b;
    }
  }
  -webkit-tap-highlight-color: transparent;
  .ant-select-selection-placeholder{
    font-size: 14px;
    color: var(--light-gray-4)!important;
  }
`;

export function Select(props: SelectControlProps) {
  const {
    options,
    getOptionLabel,
    getOptionValue,
    optionRender,
    form,
    onChange,
    name,
    disabledOptions,
    containerClass,
    containerStyle,
    highlightOptions,
    borderradius,
    bordercolor,
    defaultValue,
    ...rest
  } = props;
  const onValueChange = (val?: SafeAny, option?: SafeAny) => {
    onChange && onChange(val, option);
    form && name && form.setFieldsValue({ [name]: val });
  };
  return (
    <FormWrapper
      className={`relative w-full ${containerClass}`}
      style={containerStyle}
      borderradius={borderradius}
      bordercolor={bordercolor}
    >
      <AntdSelect
        {...rest}
        onChange={(val, option) => onValueChange(val, option)}
        getPopupContainer={(trigger) => trigger.parentNode}
        defaultValue={defaultValue}
      >
        {(options || [])
          .map((i) => ({
            label: getOptionLabel ? getOptionLabel(i) : i.label,
            value: getOptionValue ? getOptionValue(i) : i.value,
          }))
          .map((i, index) => (
            <AntdSelect.Option
              className={`${highlightOptions?.includes(i.value) ? 'highlight' : ''}`}
              title={i.label}
              key={index}
              value={i.value}
              disabled={disabledOptions && disabledOptions.includes(i.value)}
            >
              {optionRender ? optionRender(options?.[index]) : i.label}
            </AntdSelect.Option>
          ))}
      </AntdSelect>
    </FormWrapper>
  );
}

export const Option = AntdSelect.Option;
