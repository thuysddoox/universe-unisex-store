import { Form as AntdForm, FormProps } from 'antd';
import { FormListProps } from 'antd/lib/form/FormList';
import styled from '@emotion/styled';
import { ErrorListProps } from 'antd/lib/form';
// import useTranslation from 'next-translate/useTranslation';

const FormWrapper = styled.div`
  .ant-form-item-explain-error {
    [role='alert'] {
      color: var(--red-error);
      font-size: 12px;
    }
  }
  .ant-form-item-has-error .tox-tinymce {
    border-color: var(--red-error);
  }
  .ant-form-item-has-error .avatar-upload {
    border-color: var(--red-error);
  }
`;

export const messages = {
  string: {
    max: '${name} cannot be longer than ${max} characters',
  },
  required: {
    key: 'field_required',
    value: 'This field is required',
  },
  invalidLink: {
    key: 'invalid_link',
    value: 'Invalid link format',
  },
  stringMax: {
    key: 'string_max',
    value: '${name} cannot be longer than ${max} characters',
  },
};

export function Form(props: FormProps & { containerClass?: string }) {
  // const { t } = useTranslation('common');

  const validateMessages = {
    required: messages.required.key,
    string: {
      max: messages.stringMax.key,
    },
    inValidLink: messages.invalidLink.key,
  };

  return (
    <FormWrapper className={`${props.containerClass}`}>
      <AntdForm
        {...props}
        validateMessages={
          props.validateMessages
            ? { ...validateMessages, ...props.validateMessages }
            : validateMessages
        }
      />
    </FormWrapper>
  );
}

export function useForm() {
  return AntdForm.useForm();
}

export function FormList(props: FormListProps) {
  return <AntdForm.List {...props} />;
}

export function FormErrorList(props: ErrorListProps) {
  return <AntdForm.ErrorList {...props} />;
}

export default Form;
