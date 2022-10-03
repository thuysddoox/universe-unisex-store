import styled from '@emotion/styled';
import FormItem from '@ui/formitem';
import Input, { TextArea } from '@ui/input';
import { Radio, RadioGroup } from '@ui/radio';
import { Select } from '@ui/select';
import { Col, DatePicker, Row } from 'antd';
import React from 'react';
import Form, { useForm } from '../../ui/form';
const CheckoutFrom = () => {
  const [form]= useForm();
  return (
    <CheckoutWrapper>
      <Form size="large" form={form} initialValues={{}}>
        <Row>
          <Col span={12}>
            <FormItem
              label="FullName"
              name="fullname"
              required={true}
              rules={[{ required: true, message: 'Please input your full name!' }]}
              className="m-2"
              hasFeedback
            >
              <Input type="text" placeholder="Full Name" borderradius={'4px'}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="dob"
              label="Date of Birth"
              required={true}
              rules={[{ required: true, message: 'Please input your phone number!' }]}
              className="m-2"
              hasFeedback
            >
              <DatePicker size="large" format={['DD/MM/YYYY', 'DD/MM/YY']} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              name="Email"
              label="Email"
              required={true}
              rules={[{ required: true, message: 'Please input your email adress!' }]}
              className="m-2"
              hasFeedback
            >
              <Input type="email" placeholder="Email Address" borderradius={'4px'}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="Phone"
              label="Phone"
              required={true}
              rules={[{ required: true, message: 'Please input your phone number!' }]}
              className="m-2"
              hasFeedback
            >
              <Input type="phone" placeholder="Phone" borderradius={'4px'}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              name="city"
              label="Province/City"
              required={true}
              rules={[{ required: true, message: 'Please choose your province/city!' }]}
              className="m-2"
              hasFeedback
            >
              <Select placeholder="Choose province/city" options={[{ label: 'He', value: 'he' }]} borderradius={'4px'}/>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              name="district"
              label="District"
              required={true}
              rules={[{ required: true, message: 'Please choose your district!' }]}
              className="m-2"
              hasFeedback
            >
              <Select size="large" placeholder="Choose district" options={[{ label: 'He', value: 'he' }]} borderradius={'4px'}/>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              name="commune"
              label="Commune"
              required={true}
              rules={[{ required: true, message: 'Please choose your commune!' }]}
              className="m-2"
              hasFeedback
            >
              <Select placeholder="Choose commune" options={[{ label: 'He', value: 'he' }]} borderradius={'4px'}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="noHome" label="No.Home/Street" className="m-2">
              <Input type="text" placeholder="No.Home, Street" borderradius={'4px'}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="Note" label="Note" className="m-2">
              <TextArea rows={3} placeholder="Note" className="rounded-0 w-full" borderradius={'4px'} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="payment" label="PAYMENT METHOD" className="m-2">
            <RadioGroup name="payment" defaultValue={1}>
              <Radio value={1}>SHIP CODE: </Radio>
              <Radio value={2}>Pay Online</Radio>
            </RadioGroup>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </CheckoutWrapper>
  );
};
const CheckoutWrapper = styled.div`
  .ant-form-item-label > label {
    line-height: 3rem;
    font-weight: 600;
    display: block;
    font-size: 15px;
  }
  .ant-select-selection-item{
    font-size: 15px;
  }
  .ant-form-item-explain-error {
    font-size: 12px !important;
    margin-left: 2px;
    padding-top: 4px;
  }
  .ant-picker {
    border-radius: 4px;
    width: 100%;
    .ant-picker-input > input {
      font-size: 14px;
      color: var(--light-gray-4) !important;
    }
  }
  .ant-form-item-row {
    display: block;
  }
`;
export default CheckoutFrom;
