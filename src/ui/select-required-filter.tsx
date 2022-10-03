import { Select as AntdSelect, SelectProps, FormInstance, Switch } from 'antd';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect } from 'react';
import { SafeAny } from '@interfaces/common';
import Button from './button';
interface obj {
  filtered: boolean;
  required: boolean;
  type: string;
}
export interface SelectRequiredFilterProps extends SelectProps<SafeAny> {
  options: SafeAny[];
  getOptionLabel?: (o: SafeAny) => string;
  getOptionValue?: (o: SafeAny) => string;
  optionRender?: (o: SafeAny) => ReactNode;
  form?: FormInstance;
  name?: string;
  disabledOptions?: SafeAny[];
  containerStyle?: any;
  containerClass?: string;
  onChangeRequired?: (val: any[]) => void;
  defaultValue?: obj[];
  onCancel?: () => void;
  onSave?: () => void;
  disableSave?: boolean;
  isOpen?: boolean;
  requiredControl: any;
  filterControl: any;
  handleChangeRequiredSwitch: (e: boolean, val: any) => void;
  handleChangeFilterSwitch: (e: boolean, val: any) => void;
  onValueChange: (val: SafeAny) => void;
  data: any[];
  onDeselect?: (val: SafeAny) => void;
}

const FormWrapper = styled.div`
  .ant-select-selector {
    border: 1px solid var(--gray) !important;
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: none;
  }
  .ant-select-item-option-selected {
    background: white;
  }
  .ant-select-item-option {
    position: relative;

    .ant-select-item-option-content {
      position: absolute;
      left: 38px;
      display: flex;
      justify-content: space-between;

      .ant-switch {
        transition: 0.4s;
      }
    }

    .ant-select-item-option-state {
      position: absolute;
      top: 3px;
    }
  }

  .ant-select-dropdown {
    position: relative;
    .switch-wrapper {
      position: absolute;
      top: 0;
      right: 40px;
      width: 60%;
      display: flex;
      justify-content: space-between;
      z-index: 1000;

      &:hover {
        cursor: default;
      }

      .required-wrapper,
      .filter-wrapper {
        .ant-switch {
          &.ant-switch-checked {
            background-color: var(--navy);
          }

          background-color: #f0f0f0;
        }

        button:disabled,
        button[disabled] {
          background-color: #f0f0f0;
          opacity: 1;
        }

        p {
          padding: 5px 0;

          .ant-switch {
            margin-right: 10px;
          }
        }
      }
    }
    .button-wrapper {
      text-align: right;
      margin: 20px;
    }
  }
  -webkit-tap-highlight-color: transparent;
`;

export function SelectRequiredFilter(props: SelectRequiredFilterProps) {
  const {
    options,
    getOptionLabel,
    getOptionValue,
    optionRender,
    form,
    name,
    disabledOptions,
    containerClass,
    containerStyle,
    onChangeRequired,
    onCancel,
    onSave,
    isOpen,
    disableSave,
    requiredControl,
    filterControl,
    handleChangeRequiredSwitch,
    handleChangeFilterSwitch,
    onValueChange,
    data,
    defaultValue,
    onDeselect,
    ...rest
  } = props;

  useEffect(() => {
    data && onChangeRequired && onChangeRequired(data);
  }, [data, onChangeRequired]);

  return (
    <FormWrapper
      className={`relative w-full ${containerClass}`}
      style={containerStyle}
    >
      <AntdSelect
        {...rest}
        onChange={(val) => onValueChange(val)}
        getPopupContainer={(trigger) => trigger.parentNode}
        optionLabelProp="label"
        dropdownRender={(menu) => {
          return (
            <>
              {menu}
              {/* {menu.props?.options?.length > 0 && ( */}
              <div className="switch-wrapper">
                <div className="required-wrapper">
                  {(options || [])
                    .map((i) => ({
                      label: getOptionLabel ? getOptionLabel(i) : i.label.value,
                      value: getOptionValue ? getOptionValue(i) : i.value.value,
                    }))
                    .map((i, index) => {
                      // if (menu.props?.options?.length >= index + 1) {
                      return (
                        <p>
                          <Switch
                            onChange={(e) =>
                              handleChangeRequiredSwitch(e, i.value)
                            }
                            disabled={
                              data.filter(
                                (dataItem) =>
                                  dataItem?.type?.toLowerCase() ===
                                  i.value.value.toLowerCase()
                              ).length === 0
                            }
                            defaultChecked={
                              defaultValue?.filter(
                                (item: any) =>
                                  item.type.toLowerCase() ===
                                  i.value.value.toLowerCase()
                              )[0]?.required
                            }
                            style={{ color: 'red' }}
                          />
                          <span>Required Tag</span>
                        </p>
                      );
                      // }
                      // return null;
                    })}
                </div>
                <div className="filter-wrapper">
                  {(options || [])
                    .map((i) => ({
                      label: getOptionLabel ? getOptionLabel(i) : i.label.value,
                      value: getOptionValue ? getOptionValue(i) : i.value.value,
                    }))
                    .map((i, index) => {
                      // if (menu.props.options.length >= index + 1) {
                      return (
                        <p>
                          <Switch
                            onChange={(e) =>
                              handleChangeFilterSwitch(e, i.value)
                            }
                            disabled={
                              data.filter(
                                (dataItem) =>
                                  dataItem?.type?.toLowerCase() ===
                                  i.value.value.toLowerCase()
                              ).length === 0
                            }
                            defaultChecked={
                              defaultValue?.filter(
                                (item: any) =>
                                  item.type.toLowerCase() ===
                                  i.value.value.toLowerCase()
                              )[0]?.filtered
                            }
                          />
                          <span>Applied for Filter</span>
                        </p>
                      );
                      // }
                      // return null;
                    })}
                </div>
              </div>
              {/* )} */}

              {onSave && onCancel && (
                <div className="button-wrapper">
                  <Button containerClass="inline-block mr-4" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    containerClass="inline-block mr-4"
                    onClick={onSave}
                    disabled={disableSave ?? false}
                  >
                    Save
                  </Button>
                </div>
              )}
            </>
          );
        }}
        defaultValue={defaultValue?.map((i) => i.type)}
        removeIcon={null}
        allowClear={false}
        suffixIcon={null}
        open={isOpen ?? undefined}
        onDeselect={(val: SafeAny) =>
          onDeselect &&
          onDeselect(
            defaultValue?.filter(
              (item: any) => item.type.toLowerCase() === val.toLowerCase()
            )[0]
          )
        }
      >
        {(options || []).map((i, index) => {
          return (
            <AntdSelect.Option
              title={i.label.value}
              key={index}
              value={i.value}
              label={`${i.label.value}${requiredControl[i.value] ? '*' : ''}`}
              isSelectOption
            >
              {optionRender ? optionRender(options?.[index]) : i.label.value}
            </AntdSelect.Option>
          );
        })}
      </AntdSelect>
    </FormWrapper>
  );
}
