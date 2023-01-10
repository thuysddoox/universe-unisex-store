import styled from '@emotion/styled';
import Button from '@ui/button';
import FormItem from '@ui/formitem';
import Input from '@ui/input';
import { Select } from '@ui/select';
import { Col, Row, DatePicker } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineSave, AiTwotoneEdit, AiTwotoneLock, AiTwotoneSave } from 'react-icons/ai';
import { UserContext } from '../../contexts/userContext';
import { Ellipsis } from '../../ui/ellipsis';
import Form, { useForm } from '../../ui/form';
import { useUpdateUser } from '../../network/queries/user';
import messages from '@constants/messages';
import { Message } from '@ui/message';
import { confirm } from '@ui/modal';
import SyntheticEvent from 'react';
import { SafeAny } from '../../interfaces/common';
import { useQueryCity, useQueryCommune, useQueryDistrict } from '../../network/queries/address';
import { convertAddress } from '../../utils/convertors';
import dayjs from 'dayjs';
import moment from 'moment';

const ProfileForm = () => {
  const [form] = useForm();
  const [disableForm, setDisableForm] = useState<boolean>(true);
  const { currentUser, setCurrentUser, updateUserInfo } = useContext(UserContext);
  const [addressObj, setAddressObj] = useState<SafeAny>({
    city: currentUser?.city ?? undefined,
    district: currentUser?.district ?? undefined,
  });
  const { data: cityRes } = useQueryCity();
  const { data: communeRes, refetch: refetchCommune } = useQueryCommune(addressObj?.district);
  const { data: districtRes, refetch: refetchDistrict } = useQueryDistrict(addressObj?.city);
  const { mutate: updateUserFunc, isLoading } = useUpdateUser({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        updateUserInfo(response?.data?.responseData?.user);
        Message.success(messages.updateUserProfileSuccess);
        setDisableForm(true);
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    confirm({
      title: 'Confirm',
      content: 'Do you want to update your profile?',
      onOk: () => {
        const { firstName, lastName, dob, ...rest } = form.getFieldsValue();
        console.log(dob);
        updateUserFunc({ ...currentUser, username: lastName + firstName, ...rest, firstName, lastName });
      },
      onCancel: () => {
        form.resetFields();
      },
    });
  };
  useEffect(() => {
    refetchCommune();
    refetchDistrict();
  }, [addressObj]);
  console.log(currentUser);
  return (
    <ProfileWrapper>
      <Form size="large" form={form} initialValues={currentUser} disabled={disableForm}>
        <div>
          <div className="flex items-center justify-between">
            <h4 className="px-2 pb-3 pt-1 text-base border-b border-gray-300 font-bold flex items-center">
              <span>Personal Information</span>{' '}
              <Ellipsis title={`Click to ${disableForm ? 'edit' : 'clock edit'}`}>
                {disableForm ? (
                  <AiTwotoneEdit
                    className="text-xl cursor-pointer ml-2"
                    onClick={() => setDisableForm((prev) => !prev)}
                  />
                ) : (
                  <AiTwotoneLock
                    className="text-xl cursor-pointer ml-2"
                    onClick={() => setDisableForm((prev) => !prev)}
                  />
                )}
              </Ellipsis>
            </h4>
            <Button
              icon={<AiOutlineSave className="mr-1 text-xl" />}
              borderradius="3px"
              bgColor="var(--navy)"
              textcolor="white"
              lineheight={'30px'}
              size="small"
              disabled={false}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>

          <Row>
            <Col span={24} md={12} lg={8}>
              <FormItem
                label="First Name"
                name="firstName"
                required={true}
                rules={[{ required: true, message: 'Please input your first name!' }]}
                className="m-2"
                hasFeedback
              >
                <Input type="text" placeholder="First Name" />
              </FormItem>
            </Col>
            <Col span={24} md={12} lg={8}>
              <FormItem
                label="Last Name"
                name="lastName"
                required={true}
                rules={[{ required: true, message: 'Please input your last name!' }]}
                className="m-2"
                hasFeedback
              >
                <Input type="text" placeholder="Last Name" />
              </FormItem>
            </Col>
            <Col span={24} md={12} lg={8}>
              <FormItem
                label="Full Name"
                name="fullName"
                required={true}
                // rules={[{ required: true, message: 'Please input your full name!' }]}
                className="m-2"
                hasFeedback
              >
                <Input type="text" placeholder="Full Name" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            {/* <Col span={24} md={12} lg={8}>
              <FormItem
                name="dob"
                label="Date of Birth"
                required={true}
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                className="m-2"
                hasFeedback
              >
                <DatePicker size="large" defaultValue={moment(currentUser?.dob)} format={'DD/MM/YYYY'} />
              </FormItem>
            </Col> */}
            <Col span={24} md={12} lg={8}>
              <FormItem
                name="email"
                label="Email"
                required={true}
                rules={[{ required: true, message: 'Please input your email adress!' }]}
                className="m-2"
                hasFeedback
              >
                <Input type="email" placeholder="Email Address" />
              </FormItem>
            </Col>
            <Col span={24} md={12} lg={8}>
              <FormItem
                name="phone"
                label="Phone"
                required={true}
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                className="m-2"
                hasFeedback
              >
                <Input type="phone" placeholder="Phone" />
              </FormItem>
            </Col>
            <Col span={24} md={12} lg={8}>
              <FormItem
                name="gender"
                label="Gender"
                required={true}
                rules={[{ required: true, message: 'Please select your gender!' }]}
                className="m-2"
                hasFeedback
              >
                <Select
                  placeholder="Choose gender"
                  options={[
                    { label: 'male', value: 'male' },
                    { label: 'female', value: 'female' },
                  ]}
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <div className="mt-6">
          <h4 className="px-2 pb-3 pt-1 font-bold text-base border-b border-gray-300 flex items-center">
            <span>Country Information</span>{' '}
            <Ellipsis title={`Click to ${disableForm ? 'edit' : 'clock edit'}`}>
              {disableForm ? (
                <AiTwotoneEdit
                  className="text-xl cursor-pointer ml-2"
                  onClick={() => setDisableForm((prev) => !prev)}
                />
              ) : (
                <AiTwotoneLock
                  className="text-xl cursor-pointer ml-2"
                  onClick={() => setDisableForm((prev) => !prev)}
                />
              )}
            </Ellipsis>
          </h4>
          <Row>
            <Col span={24} sm={12} md={8}>
              <FormItem
                name="city"
                label="Province/City"
                // required={true}
                // rules={[{ required: true, message: 'Please choose your province/city!' }]}
                className="m-2"
                hasFeedback
              >
                <Select
                  placeholder="Choose province/city"
                  options={convertAddress(cityRes?.data?.results)}
                  onChange={(value) => {
                    setAddressObj((prev) => ({ ...prev, city: value }));
                  }}
                />
              </FormItem>
            </Col>
            <Col span={24} sm={12} md={8}>
              <FormItem
                name="district"
                label="District"
                // required={true}
                // rules={[{ required: true, message: 'Please choose your district!' }]}
                className="m-2"
                hasFeedback
              >
                <Select
                  size="large"
                  placeholder="Choose district"
                  options={convertAddress(districtRes?.data?.results)}
                  onChange={(value) => {
                    setAddressObj((prev) => ({ ...prev, district: value }));
                  }}
                />
              </FormItem>
            </Col>
            <Col span={24} sm={12} md={8}>
              <FormItem
                name="commune"
                label="Commune"
                // required={true}
                // rules={[{ required: true, message: 'Please choose your commune!' }]}
                className="m-2"
                hasFeedback
              >
                <Select placeholder="Choose commune" options={convertAddress(communeRes?.data?.results)} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem name="address" label="No.Home/Street" className="m-2">
                <Input type="text" placeholder="No.Home, Street" />
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </ProfileWrapper>
  );
};
const ProfileWrapper = styled.div`
  .ant-form-item-label > label {
    line-height: 3rem;
    font-weight: 600;
    display: block;
    font-size: 15px;
  }
  .ant-input {
    border: 1px solid transparent !important;
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
    border-radius: 33px;
    border-color: var(--gray);
    width: 100%;
    .ant-picker-input > input {
      font-size: 14px;
      color: var(--light-gray-4) !important;
    }
    &:focus {
      border-color: var(--primary-hover);
    }
  }
  .ant-form-item-row {
    display: block;
  }
`;
export default ProfileForm;
