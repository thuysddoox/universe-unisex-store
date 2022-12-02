import {
  Radio as AntdRadio,
  RadioProps as AntdRadioProps,
  RadioGroupProps as AntRadioGroupProps,
  Space,
  SpaceProps,
} from 'antd';
import styled, { StyledComponent } from '@emotion/styled';
import { CSSProperties } from 'react';
import { SafeAny } from '@interfaces/common';
import React from 'react';

export interface RadioGroupProps extends AntRadioGroupProps {
  containerStyle?: CSSProperties;
  containerClass?: string;
  options?: SafeAny[];
  spaceProps?: SpaceProps;
  label?: string;
}

export const RadioGroupWrapper = styled.div`
  .ant-radio-button-wrapper {
    width: 40px;
    text-align: center;
    text-transform: uppercase;
    margin-right: 1rem;
    margin-top: 0.5rem;
    padding: 0;
  }
  &.color-picker {
    .ant-radio-button-wrapper {
      width: auto !important;
      height: auto !important;
      border-radius: 50%;
      border-width: 1px !important;
      &.ant-radio-button-wrapper-checked {
        background: transparent;
      }
      &::before {
        display: none !important;
      }
      span {
        border-radius: 50%;
      }
    }
  }
`;

export const RadioGroup = (props: RadioGroupProps) => {
  const { containerClass, options, containerStyle, spaceProps, label } = props;
  return (
    <RadioGroupWrapper className={`${containerClass || ''}`} style={containerStyle}>
      {label && <p className="font-medium mt-4 mb-2">{label}</p>}
      <AntdRadio.Group {...props}>
        <Space {...spaceProps}>
          {(options || []).map((item, id) => (
            <Radio {...item} value={item.value || item.label} key={id} children={item.label || item.value} />
          ))}
        </Space>
      </AntdRadio.Group>
    </RadioGroupWrapper>
  );
};

export interface RadioProps extends AntdRadioProps {
  containerStyle?: any;
  containerClass?: string;
  bgcolor?: string;
}

export const RadioWrapper: StyledComponent<any> = styled.div`
  font-family: var(--font-title);
  margin-bottom: 2px;
  .ant-radio-wrapper {
    font-size: 12px;
  }
`;

export const Radio = (props: RadioProps) => {
  const { containerClass, containerStyle, children } = props;
  return (
    <RadioWrapper className={`${containerClass || ''}`} style={containerStyle}>
      <AntdRadio {...props}>{children}</AntdRadio>
    </RadioWrapper>
  );
};
