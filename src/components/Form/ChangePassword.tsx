import { useChangePassword } from '@api/queries';
import NextImage from '@components/NextImage';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { UserPopupType } from '@interfaces/common';
import { Button, Form, FormItem, Message, Password, useForm } from '@ui';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { UpdatePasswordRequest } from '../../interfaces/common';

const ChangePasswordPopup = ({
  changePopup,
  handleModal,
  isReset = false,
  idReset,
}: {
  changePopup?: (type: UserPopupType) => void;
  handleModal?: (e?: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
  isReset?: boolean;
  idReset?: string;
}) => {
  const [form] = useForm();
  const router = useRouter();
  const { mutate: userChangePassword, isLoading } = useChangePassword({
    onSuccess: (response) => {
      const isUpdated = response?.data?.responseData?.isUpdated ?? false;
      const error = response?.data?.error;
      if (isUpdated) {
        Message.success(messages.resetPassword);
        form.resetFields();
        handleModal?.();
        isReset && router.push('/');
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });

  const submitLoginForm = (data: UpdatePasswordRequest) => {
    const { newPassword, currentPassword } = data;
    userChangePassword({ newPassword, currentPassword, isReset, userId: idReset });
  };

  return (
    <ChangePasswordWrap>
      <Link href="/" passHref>
        <NextImage
          src={`${router.basePath}/assets/images/logo/logo-color.png`}
          layout={'fill'}
          alt="BloodStock"
          containerClass="h-12 sm:h-16 my-3 cursor-pointer relative mx-auto"
        />
      </Link>
      <Form
        className="form font-title py-4 mx-2"
        containerclass="w-full lg:w-auto"
        form={form}
        layout="vertical"
        onFinish={submitLoginForm}
      >
        {!isReset && (
          <FormItem
            label="Current Password"
            name="currentPassword"
            required={true}
            rules={[
              {
                required: true,
                message: 'Please enter your current password!',
              },
            ]}
          >
            <Password type="text" placeholder="" />
          </FormItem>
        )}
        <FormItem
          label="New Password"
          className="mt-4"
          name="newPassword"
          required={true}
          rules={[
            { required: true, message: 'Please enter your new password!' },
            () => ({
              validator(_, value: string) {
                if (value?.includes(' ')) {
                  return Promise.reject('Password can not contain space.');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Password placeholder="" />
        </FormItem>
        <FormItem
          label="Confirm Password"
          className="mt-4"
          name="confirmPassword"
          required={true}
          rules={[
            { required: true, message: 'Please confirm you password!' },
            () => ({
              validator(_, value: string) {
                if (value?.includes(' ')) {
                  return Promise.reject('Password can not contain space.');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Password placeholder="" />
        </FormItem>
        <Row className={`mt-8 ${isReset ? 'justify-center' : 'btn-group '}`}>
          {!isReset && (
            <Col span={11}>
              <FormItem>
                <Button
                  className="font-semibold"
                  block
                  bordercolor="var(--navy)"
                  borderradius={'3px'}
                  onClick={() => changePopup('login')}
                >
                  Cancel
                </Button>
              </FormItem>
            </Col>
          )}
          <Col span={11}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                block
                borderradius={isReset ? '30px' : '3px'}
                loading={isLoading}
              >
                {isReset ? 'Reset Password' : 'Change Password'}
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </ChangePasswordWrap>
  );
};
const ChangePasswordWrap = styled.div`
  .ant-input {
    border: 1px solid transparent !important;
  }
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
  .remember span {
    font-size: 14px !important;
  }
`;

export default ChangePasswordPopup;
