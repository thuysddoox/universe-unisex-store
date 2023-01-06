import styled from '@emotion/styled';
import FormItem from '@ui/formitem';
import Input, { TextArea } from '@ui/input';
import { RadioGroup } from '@ui/radio';
import { Select } from '@ui/select';
import { Col, DatePicker, FormInstance, Row } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import { SafeAny } from '../../interfaces/common';
import Form from '../../ui/form';
import { useQueryCity, useQueryCommune, useQueryDistrict } from '../../network/queries/address';
import { convertAddress } from '@utils/convertors';

const CheckoutFrom = ({
  data,
  form,
  getData,
  handleSubmitCheckout,
}: {
  data?: SafeAny;
  form?: FormInstance<SafeAny>;
  getData?: React.Dispatch<SafeAny>;
  handleSubmitCheckout?: (data: SafeAny) => void;
}) => {
  const handleChangeValues = useCallback((_, allValues) => {
    getData({ ...data, ...allValues });
  }, []);
  const [addressObj, setAddressObj] = useState<SafeAny>({ city: undefined, district: undefined });
  const { data: cityRes } = useQueryCity();
  const { data: communeRes, refetch: refetchCommune } = useQueryCommune(addressObj?.district);
  const { data: districtRes, refetch: refetchDistrict } = useQueryDistrict(addressObj?.city);
  useEffect(() => {
    refetchCommune();
    refetchDistrict();
  }, [addressObj]);
  console.log(districtRes);
  return (
    <CheckoutWrapper>
      <Form
        size="large"
        form={form}
        initialValues={data}
        onValuesChange={handleChangeValues}
        onFinish={handleSubmitCheckout}
      >
        <Row>
          <Col span={12} sm={24}>
            <FormItem
              label="FullName"
              name="fullName"
              required={true}
              rules={[{ required: true, message: 'Please input your full name!' }]}
              className="m-2"
              hasFeedback
            >
              <Input type="text" placeholder="Full Name" borderradius={'4px'} />
            </FormItem>
          </Col>
          <Col span={12} sm={24}>
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
          <Col span={12} sm={24}>
            <FormItem
              name="email"
              label="Email"
              required={true}
              rules={[{ required: true, message: 'Please input your email adress!' }]}
              className="m-2"
              hasFeedback
            >
              <Input type="email" placeholder="Email Address" borderradius={'4px'} />
            </FormItem>
          </Col>
          <Col span={12} sm={24}>
            <FormItem
              name="phone"
              label="Phone"
              required={true}
              rules={[{ required: true, message: 'Please input your phone number!' }]}
              className="m-2"
              hasFeedback
            >
              <Input type="phone" placeholder="Phone" borderradius={'4px'} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8} sm={24}>
            <FormItem
              name="city"
              label="Province/City"
              required={true}
              rules={[{ required: true, message: 'Please choose your province/city!' }]}
              className="m-2"
              hasFeedback
            >
              <Select
                placeholder="Choose province/city"
                options={convertAddress(cityRes?.data?.results)}
                borderradius={'4px'}
                onChange={(value) => {
                  setAddressObj((prev) => ({ ...prev, city: value }));
                }}
              />
            </FormItem>
          </Col>
          <Col span={8} sm={24}>
            <FormItem
              name="district"
              label="District"
              required={true}
              rules={[{ required: true, message: 'Please choose your district!' }]}
              className="m-2"
              hasFeedback
            >
              <Select
                size="large"
                placeholder="Choose district"
                options={convertAddress(districtRes?.data?.results)}
                borderradius={'4px'}
                onChange={(value) => {
                  setAddressObj((prev) => ({ ...prev, district: value }));
                }}
              />
            </FormItem>
          </Col>
          <Col span={8} sm={24}>
            <FormItem
              name="commune"
              label="Commune"
              required={true}
              rules={[{ required: true, message: 'Please choose your commune!' }]}
              className="m-2"
              hasFeedback
            >
              <Select
                placeholder="Choose commune"
                options={convertAddress(communeRes?.data?.results)}
                borderradius={'4px'}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="noHome" label="No.Home/Street" className="m-2">
              <Input type="text" placeholder="No.Home, Street" borderradius={'4px'} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="note" label="Note" className="m-2">
              <TextArea rows={3} placeholder="Note" className="rounded-0 w-full" borderradius={'4px'} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="payment" label="PAYMENT METHOD" className="m-2">
              <RadioGroup
                name="payment"
                options={[
                  { label: 'Cash on Delivery', value: 1 },
                  { label: 'Payment via card', value: 2 },
                ]}
              />
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
  .ant-select-selection-item {
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
