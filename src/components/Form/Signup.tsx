import messages from '@constants/messages'
import styled from '@emotion/styled'
import { Button, Input, Message, Password, Select, useForm } from '@ui'
import { Col, Row, Form, Result } from 'antd'
import md5 from 'md5'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { useMemo, useState } from 'react'
import { userRoles } from '@constants/enum'
import { ROUTES } from '@constants/routes'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { HomeOutlined, RollbackOutlined, UserAddOutlined } from '@ant-design/icons'
import { UserPopupType } from '@interfaces/common'
import NextImage from '@components/NextImage'

const tagRender = (props: CustomTagProps) => {
  const { label } = props
  return <span>{label}</span>
}
const SignupPopup = ({
  changePopup,
  handleModal
}: {
  changePopup: (type: UserPopupType) => void
  handleModal: () => void
}) => {
  const [animated] = useAutoAnimate<HTMLDivElement>()
  const router = useRouter()
  const [form] = useForm()


  const submitSignupForm = async () => {
  
  }

  console.log(router.asPath)

  return (
    <SignupWrap ref={null}>
      <Link href='/' passHref>
        <NextImage
          src={`${router.basePath}/assets/images/logo/logo_old.png`}
          layout={'fill'}
          objectFit='contain'
          alt='BloodStock'
          className='mx-auto object-contain h-16 sm:h-20 mt-2 mb-4 cursor-pointer w-56 sm:w-64'
        />
      </Link>
        <Form
          form={form}
          layout='vertical'
          className='py-4 mx-2'
          onFinish={submitSignupForm}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Please input your first name!' }]}
                label='First name'
                hasFeedback
              >
                <Input placeholder='First Name' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name='lastName'
                rules={[{ required: true, message: 'Please input your last name!' }]}
                label='Last name'
                hasFeedback
              >
                <Input placeholder='Last Name' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name='emailEnquiry'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Email address is invalid!' },
                ]}
                label='Email'
                hasFeedback
              >
                <Input type='email' placeholder='Email Address' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name='password'
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
                ]}
                label='Password'
                hasFeedback
              >
                <Password placeholder='Password' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name='companyName'
                hasFeedback
                label='Company name'
                rules={[
                  {
                    required: true,
                    message: 'Company name is required.'
                  }
                ]}
              >
                <Input placeholder='Company name' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name='mobile' label='Phone'>
                <Input placeholder='Phone' />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name='address' label='Address'>
                <Input placeholder='Address' />
              </Form.Item>
            </Col>
          </Row>
          <Row className='mt-4 justify-center'>
            <Col span={10}>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='rounded-md w-full font-semibold btn-signup transition-all py-4'
                  // loading={isLoading}
                  icon={<UserAddOutlined />}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <p className='text-center text-gray-550 mb-4'>
            Already have an account? Please{' '}
            <button className='text-blue-400 font-semibold' onClick={() => changePopup('login')}>
              Login
            </button>
          </p>
        </Form>
    </SignupWrap>
  )
}
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
`

export default SignupPopup
