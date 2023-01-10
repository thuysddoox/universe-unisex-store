import { UserAddOutlined } from '@ant-design/icons';
import NextImage from '@components/NextImage';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { SafeAny, User, UserPopupType } from '@interfaces/common';
import { Button, Input, Message, Password, Select, useForm } from '@ui';
import { Col, Form, Row } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSignup } from '../../network/queries/auth';
import { useUpdateUser } from '../../network/queries/user';
import { useState, useEffect } from 'react';
import { ROLES } from '@constants/enum';
import { ROLE } from '../../constants/enum';

const SignupPopup = ({
  changePopup,
  handleModal,
  isAddUser,
  addUserFunc,
  data = {},
  isEdit,
}: {
  changePopup?: (type: UserPopupType) => void;
  handleModal?: () => void;
  isAddUser?: boolean;
  isEdit?: boolean;
  addUserFunc?: SafeAny;
  data?: User;
}) => {
  const [animated] = useAutoAnimate<HTMLDivElement>();
  const router = useRouter();
  const [form] = useForm();
  const [initialValues, setInitialValues] = useState<User>(data);
  const { mutate: updateUserFunc, isLoading: isUpdateLoading } = useUpdateUser({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.updateUserProfileSuccess);
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: userRegister, isLoading } = useSignup({
    onSuccess: (response) => {
      const data = response?.data?.responseData;
      const error = response?.data?.error;
      if (data) {
        changePopup('login');
        Message.success(messages.signupSuccess);
        router.reload();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const submitSignupForm = (data: User) => {
    const { lastName, firstName } = data;
    const user: User = { ...data, username: lastName + firstName };
    isAddUser ? addUserFunc(user) : isEdit ? updateUserFunc(user) : userRegister(user);
  };
  useEffect(() => {
    setInitialValues(data);
  }, [data]);
  return (
    <SignupWrap ref={animated}>
      <Link href="/" passHref>
        <NextImage
          src={`${router.basePath}/assets/images/logo/logo-color.png`}
          layout={'fill'}
          alt="BloodStock"
          containerClass="h-12 sm:h-16 my-3 cursor-pointer relative mx-auto"
        />
      </Link>
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        className="py-4 mx-2"
        onFinish={submitSignupForm}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
              label="First name"
              hasFeedback
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
              label="Last name"
              hasFeedback
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        {(isAddUser || isEdit) && (
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
                label="Gender"
                hasFeedback
              >
                <Select
                  placeholder="Choose gender"
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="role"
                rules={[{ required: true, message: 'Please select role!' }]}
                label="Role"
                hasFeedback
              >
                <Select
                  placeholder="Choose gender"
                  options={[
                    { label: 'Staff', value: 3 },
                    { label: 'Customer', value: 1 },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Email address is invalid!' },
              ]}
              label="Email"
              hasFeedback
            >
              <Input type="email" placeholder="Email Address" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
              hasFeedback
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
        </Row>
        {!isEdit && (
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Password is required!' },
                  () => ({
                    validator(_, value: string) {
                      if (value?.includes(' ')) {
                        return Promise.reject('Password can not contain space.');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                label="Password"
                hasFeedback
              >
                <Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value: string) {
                      if (isEmpty(value) || value === getFieldValue('password')) {
                        return Promise.resolve();
                      } else return Promise.reject('Two passwords do not match!');
                    },
                  }),
                ]}
                label="Confirm Password"
                hasFeedback
              >
                <Password placeholder="Confirm Password" />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <Form.Item name="address" label="Address" hasFeedback>
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="mt-4 justify-center">
          <Col span={10}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-md w-full font-semibold btn-signup transition-all py-4"
                loading={isLoading}
                icon={<UserAddOutlined />}
              >
                {isAddUser ? 'Add' : isEdit ? 'Save Changes' : 'Sign Up'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {(!isAddUser || !isEdit) && (
          <p className="text-center text-gray-550 mb-4">
            Already have an account? Please{' '}
            <button className="text-blue-400 font-semibold" onClick={() => changePopup('login')}>
              Login
            </button>
          </p>
        )}
      </Form>
    </SignupWrap>
  );
};
const SignupWrap = styled.div`
  &.ant-modal {
    .ant-modal-content {
      .ant-modal-body {
        max-height: 90vh;
        background-color: #ffffff;
      }
    }
  }

  .ant-select-selector,
  .ant-input,
  .ant-input-password {
    border-color: rgba(0, 0, 0, 0.2);
  }

  .ant-form-item-label > label {
    line-height: 3rem;
    font-weight: 600;
    color: var(--font-color);
  }

  .ant-form-item-explain-error {
    font-size: 12px !important;
    margin-left: 2px;
    padding-top: 4px;
  }

  .ant-select-selection-overflow {
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .ant-input {
    border: 1px solid transparent;
  }
`;

export default SignupPopup;
