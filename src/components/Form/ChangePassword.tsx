
import { localStorageSet, StorageKeys } from '@api/storage';
import NextImage from '@components/NextImage';
import messages from '@constants/messages';
import { UserContext } from '@contexts';
import styled from '@emotion/styled';
import { Button, Form, FormItem, Message, Password, useForm, Modal } from '@ui';
import { Col, Row } from 'antd';
import { isEmpty } from 'lodash';
import md5 from 'md5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

export const ChangePasswordPopup = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = useForm();
  const router = useRouter();
  const [formValid, setFormValid] = useState(false);
  const userContext = useContext(UserContext);
  const [showRoleSelect, setShowRoleSelect] = useState<boolean>(false);
  const handleShowRoleSelect = () => {
    setShowRoleSelect(!showRoleSelect);
  };
  const submitChangePasswordForm = async () => {
   
  };
  return (
    <Modal visible={visible} footer={null} onCancel={() => setVisible(!visible)}>
      <ChangePassWordWrap>
        <Link href="/" passHref>
          <NextImage
            src={`${router.basePath}/assets/images/logo/logo.png`}
            layout={'fill'}
            objectFit="contain"
            alt="BloodStock"
            className="mx-auto object-contain h-16 mt-2 mb-4 cursor-pointer w-52 "
          />
        </Link>
        <Form
          className="form font-title py-4 mx-2 border-t border-solid border-gray-400"
          containerClass="w-full lg:w-auto"
          form={form}
          layout="vertical"
          onFinish={submitChangePasswordForm}
          onValuesChange={() => setFormValid(!!(form.getFieldValue('username') && form.getFieldValue('password')))}>
          <FormItem
            label="Old Password"
            name="oldPassword"
            required={true}
            rules={[
              {
                required: true,
                // message: 'Username/Email is required!',
              },
            ]}>
            <Password type="text" placeholder="" size="large" />
          </FormItem>
          <FormItem
            label="New Password"
            className="mt-4"
            name="newPassword"
            required={true}
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
            ]}>
            <Password placeholder="" size="large" />
          </FormItem>
          <FormItem
            label="Confirm Password"
            className="mt-4"
            name="confirmPassword"
            required={true}
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
            ]}>
            <Password placeholder="" size="large" />
          </FormItem>
          <Row className="m-0 btn-group">
            <Col span={11}>
              <FormItem>
                <Button
                  className="rounded-md w-full font-semibold transition-all py-4"
                  textcolor="var(--navy)"
                  bordercolor="var(--navy)"
                  hoverTextColor="#fff"
                  hoverBgColor="var(--navy)"
                  onClick={() => {
                    setVisible(!visible);
                  }}>
                  Cancel
                </Button>
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="rounded-md w-full font-semibold btn-login transition-all py-4"
                  // loading={useChangePasswordMutation.isLoading}
                  >
                  Change Password
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        {/* <RoleSelectModal visible={showRoleSelect} setVisible={handleShowRoleSelect} user={userContext.currentUser} /> */}
      </ChangePassWordWrap>
    </Modal>
  );
};
export const ChangePasswordForm =()=>{
  const [form] = useForm();
  const [formValid, setFormValid] = useState(false);
  const userContext = useContext(UserContext);
  const [showRoleSelect, setShowRoleSelect] = useState<boolean>(false);
  const handleShowRoleSelect = () => {
    setShowRoleSelect(!showRoleSelect);
  };
  const submitChangePasswordForm = async () => {
   
  };
  return (
    <ChangePassWordWrap>
      <Form
            className="form font-title py-4 mx-2 border-t border-solid border-gray-400"
            containerClass="w-full lg:w-auto"
            form={form}
            layout="vertical"
            onFinish={submitChangePasswordForm}
            onValuesChange={() => setFormValid(!!(form.getFieldValue('username') && form.getFieldValue('password')))}>
            <FormItem
              label="Old Password"
              name="oldPassword"
              required={true}
              rules={[
                {
                  required: true,
                  // message: 'Username/Email is required!',
                },
              ]}>
              <Password type="text" placeholder="" size="large" />
            </FormItem>
            <FormItem
              label="New Password"
              className="mt-4"
              name="newPassword"
              required={true}
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
              ]}>
              <Password placeholder="" size="large" />
            </FormItem>
            <FormItem
              label="Confirm Password"
              className="mt-4"
              name="confirmPassword"
              required={true}
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
              ]}>
              <Password placeholder="" size="large" />
            </FormItem>
            <Row className="m-0 mt-5 btn-group">
              <Col span={11}>
                <FormItem>
                  <Button
                    className="rounded-md w-full font-semibold transition-all py-4"
                    textcolor="var(--navy)"
                    bordercolor="var(--navy)"
                    hoverTextColor="#fff"
                    hoverBgColor="var(--navy)">
                    Cancel
                  </Button>
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="rounded-md w-full font-semibold btn-login transition-all py-4"
                    // loading={useChangePasswordMutation.isLoading}
                    >
                    Change Password
                  </Button>
                </FormItem>
              </Col>
            </Row>
      </Form>
    </ChangePassWordWrap>
  )
}
const ChangePassWordWrap = styled.div`
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
