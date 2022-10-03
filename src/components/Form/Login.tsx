import { Button, Checkbox, FormItem, Message, Input, Password, Form, useForm } from '@ui'
import { Col, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEvent, useContext, useState } from 'react'
import md5 from 'md5'
import { fingerPrint } from '@utils'
import { UserContext } from '@contexts'
import messages from '@constants/messages'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import NextImage from '@components/NextImage'
import { UserPopupType } from '@interfaces/common'

const LoginPopup = ({
  changePopup,
  handleModal,
}: {
  changePopup: (type: UserPopupType) => void
  handleModal: (e?: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void
}) => {
  const [form] = useForm()
  const router = useRouter()
  const [formValid, setFormValid] = useState(false)
  // const useLoginMutation = useLogin()
  const userContext = useContext(UserContext)
  const [showRoleSelect, setShowRoleSelect] = useState<boolean>(false)

  const submitLoginForm = async () => {

  }

  return (
    <LoginWrap>
      <Link href='/' passHref>
        <NextImage
          src={`${router.basePath}/assets/images/logo/logo_old.png`}
          layout={'fill'}
          objectFit='contain'
          alt='BloodStock'
          className='mx-auto object-contain h-16 mt-2 mb-4 cursor-pointer w-52 '
        />
      </Link>
      <Form
        className='form font-title py-4 mx-2'
        containerClass='w-full lg:w-auto'
        form={form}
        layout='vertical'
        onFinish={submitLoginForm}
        onValuesChange={() => setFormValid(!!(form.getFieldValue('username') && form.getFieldValue('password')))}>
        <FormItem
          label='Username Or Email'
          name='username'
          required={true}
          rules={[
            {
              required: true,
              message: 'Username/Email is required!',
            },
          ]}>
          <Input type='text' placeholder='' size='large' />
        </FormItem>
        <FormItem
          label='Password'
          className='mt-4'
          name='password'
          required={true}
          rules={[
            { required: true, message: 'Password is required!' },
            () => ({
              validator(_, value: string) {
                if (value?.includes(' ')) {
                  return Promise.reject('Password can not contain space.')
                }
                return Promise.resolve()
              },
            }),
          ]}>
          <Password placeholder='' size='large' />
        </FormItem>
        <FormItem>
          <Row className='mx-0 my-2 xs:my-6 custom-row'>
            <Col span={12} xs={24} sm={12} className='remember order-2 sm:order-1'>
              <FormItem name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </FormItem>
            </Col>
            <Col
              span={12}
              xs={24}
              sm={12}
              className='text-right text-blue-100 forgot-psw  pt-2 sm:pt-0 order-1 xs:order-2'>
              <a className='login-form-forgot text-sm' href=''>
                Forgot password?
              </a>
            </Col>
          </Row>
        </FormItem>
        <Row className='mt-4 btn-group'>
          <Col span={11}>
            <FormItem>
              <Button
                className='font-semibold'
                block
                size='large'
                type='primary'
                htmlType='submit'
                icon={<LoginOutlined />}
                // loading={isLoading}
              >
                Login
              </Button>
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem>
              <Button
                className='font-semibold'
                bordercolor='var(--navy)'
                block
                size='large'
                icon={<UserAddOutlined />}
                onClick={() => changePopup('signup')}
              >
                Sign Up
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      {/* <RoleSelectModal visible={showRoleSelect} setVisible={setShowRoleSelect} user={userContext.currentUser} /> */}
    </LoginWrap>
  )
}
const LoginWrap = styled.div`
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
`

export default LoginPopup
