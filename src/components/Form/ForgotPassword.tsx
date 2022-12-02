import { useResetPassword } from '@api/queries';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { UserPopupType } from '@interfaces/common';
import { Button, Form, FormItem, Input, Message, useForm } from '@ui';
import { Col, Row } from 'antd';
import { MouseEvent } from 'react';

const ForgotPasswordPopup = ({
  changePopup,
  handleModal,
}: {
  changePopup: (type: UserPopupType) => void;
  handleModal: (e?: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}) => {
  const [form] = useForm();
  const { mutate: userResetPassword, isLoading } = useResetPassword({
    onSuccess: (response) => {
      const isSent = response?.data?.responseData?.isSent ?? false;
      const error = response?.data?.error;
      if (isSent) {
        Message.success(messages.resetPasswordNotify);
        form.resetFields();
        handleModal();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      console.log(error);
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });

  const submitForgotPassword = (data: { email: string }) => {
    userResetPassword(data);
  };

  return (
    <ForgotPassWrap>
      <h3 className="text-center mt-2 mb-4 text-lg font-semibold">Forgot password</h3>
      <p className="font-medium">Please enter your email to reset your password</p>
      <Form
        className="form font-title py-3"
        containerclass="w-full lg:w-auto"
        form={form}
        layout="vertical"
        onFinish={submitForgotPassword}
      >
        <FormItem
          name="email"
          required={true}
          rules={[
            {
              required: true,
              message: 'Email is required!',
            },
          ]}
          hasFeedback
        >
          <Input type="text" placeholder="" size="large" bordercolor={'var(--primary)'} />
        </FormItem>

        <Row className="mt-6 btn-group">
          <Col span={11}>
            <FormItem>
              <Button
                className="font-semibold"
                block
                bordercolor="var(--navy)"
                borderradius={'3px'}
                onClick={() => changePopup('login')}
              >
                Back to Login
              </Button>
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem>
              <Button type="primary" htmlType="submit" block borderradius={'3px'} loading={isLoading}>
                Continue
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </ForgotPassWrap>
  );
};
const ForgotPassWrap = styled.div`
  .btn-group {
    justify-content: space-between;
  }
  .ant-form-item-label > label {
    line-height: 2.6rem;
    font-weight: 600;
    color: var(--font-color);
  }
  .ant-form-item-explain-error {
    font-size: 12px !important;
    margin-left: 2px;
    padding-top: 6px;
  }
`;

export default ForgotPasswordPopup;
