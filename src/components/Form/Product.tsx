import { Colors } from '@constants/enum';
import styled from '@emotion/styled';
import { Product } from '@interfaces/common';
import Button from '@ui/button';
import { useForm } from '@ui/form';
import FormItem from '@ui/formitem';
import Input from '@ui/input';
import { RadioGroup } from '@ui/radio';
import { Select } from '@ui/select';
import { covertCategoryToOption, covertToOption } from '@utils/convertors';
import { Col, Row, UploadFile } from 'antd';
import dynamic from 'next/dynamic';
import Form from '../../ui/form';
import UploadImage from '../UploadImage/index';
import React, { useState, useEffect } from 'react';
import { useUploadMutilple } from '../../network/queries/upload';
import { Message } from '@ui/message';
import { useCategory, useCreateProduct, useUpdateProduct } from '@api/api';
import messages from '@constants/messages';
import { SafeAny } from '../../interfaces/common';
const Editor = dynamic(() => import('../Editor'), { ssr: false });
const ProductForm = ({
  product,
  isEdit,
  handleCloseForm,
  refetchData,
}: {
  product?: Product;
  isEdit?: boolean;
  handleCloseForm: () => void;
  refetchData: SafeAny;
}) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<string[]>(product?.thumbnails ?? []);
  const [description, setDescription] = useState<string>('');
  const { data: categoryListResp, refetch } = useCategory();
  const { mutate: updateProduct, isLoading: updateLoading } = useUpdateProduct({
    onSuccess: (response) => {
      const productResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (productResp) {
        Message.success(messages.updatedProductSuccess);
        refetchData();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: createProduct, isLoading: uploadLoading } = useCreateProduct({
    onSuccess: (response) => {
      const productResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (productResp) {
        Message.success(messages.addNewProductSuccess);
        refetchData();
        form.resetFields();
        setFileList([]);
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const removeThumb = (url: string) => {
    const index = fileList.findIndex((item) => item === url);
    if (index > -1) {
      const newUrls = [...fileList];
      newUrls.splice(index, 1);
      setFileList(newUrls);
    }
  };
  const submitLoginForm = (data: Product) => {
    const newProduct = {
      ...product,
      ...data,
      description,
      thumbnails: fileList,
      stock: Number(data.stock),
      price: Number(data.price),
      discount: Number(data?.discount ?? 0),
    };
    isEdit ? updateProduct(newProduct) : createProduct(newProduct);
    handleCloseForm();
  };
  useEffect(() => {
    setFileList(product?.thumbnails ?? []);
    form.resetFields();
    form.setFieldsValue(product);
  }, [product]);
  return (
    <ProductFormWrapper>
      <Form form={form} className="p-0" onFinish={submitLoginForm}>
        <Row gutter={24}>
          <Col span={24} md={12}>
            <FormItem
              name="name"
              rules={[{ required: true, message: 'Please input product name!' }]}
              label="Name"
              hasFeedback
            >
              <Input placeholder="Name" borderradius="0px" />
            </FormItem>
            <FormItem
              name="categoryId"
              label="Category"
              required={true}
              rules={[{ required: true, message: 'Please choose category!' }]}
              hasFeedback
            >
              <Select
                placeholder="Choose category"
                options={covertCategoryToOption(categoryListResp?.data?.responseData ?? [])}
                borderradius={'0px'}
              />
            </FormItem>

            <FormItem
              name="size"
              label="Size"
              required={true}
              rules={[{ required: true, message: 'Please choose size!' }]}
              hasFeedback
            >
              <RadioGroup options={['s', 'm', 'l', 'xl']} label="" optionType="button" buttonStyle="solid" />
            </FormItem>
            <Row gutter={24}>
              <Col span={24} sm={12}>
                <FormItem
                  name="color"
                  rules={[{ required: true, message: 'Please input color of product!' }]}
                  label="Color"
                  hasFeedback
                >
                  <Select
                    placeholder="Choose color"
                    options={Colors.map((color) => covertToOption(color))}
                    borderradius={'0px'}
                  />
                </FormItem>
              </Col>
              <Col span={24} sm={12}>
                <FormItem
                  name="stock"
                  rules={[{ required: true, message: 'Please input amount of product!' }]}
                  label="Amount"
                  hasFeedback
                >
                  <Input placeholder="" min={0} type="number" borderradius="0px" />
                </FormItem>
              </Col>
              <Col span={24} sm={12}>
                <FormItem
                  name="price"
                  rules={[{ required: true, message: 'Please input price of product!' }]}
                  label="Price"
                  hasFeedback
                >
                  <Input placeholder="" prefix="$" min={0} type="number" borderradius="0px" />
                </FormItem>
              </Col>
              <Col span={24} sm={12}>
                <FormItem name="discount" label="Discount">
                  <Input placeholder="" prefix="%" type="number" max={100} min={0} borderradius="0px" />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={24} md={12}>
            <FormItem name="thumnails" label="Thumbnails">
              <UploadImage
                name="thumnails"
                mutilple={true}
                maxCount={5}
                handleRemove={removeThumb}
                getFileList={setFileList}
                fileListUrl={fileList}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem name="description" label="Description">
              <Editor value={description} onChange={setDescription} />
            </FormItem>
          </Col>
        </Row>
        <Row className="mt-4 btn-group justify-center">
          <Col span={6} className="mx-4">
            <FormItem>
              <Button
                className="font-semibold"
                bordercolor="var(--navy)"
                block
                size="large"
                // icon={<UserAddOutlined />}
                onClick={() => {
                  form.resetFields();
                  setFileList(product?.thumbnails ?? []);
                }}
              >
                Reset
              </Button>
            </FormItem>
          </Col>
          <Col span={6} className="mx-4">
            <FormItem>
              <Button
                className="font-semibold"
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={uploadLoading || updateLoading}
              >
                Save
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </ProductFormWrapper>
  );
};
const ProductFormWrapper = styled.div`
  .ant-form-item-control {
    width: 100%;
    flex: unset;
  }
  .ant-input {
    border: 1px solid transparent !important;
  }
`;
export default ProductForm;
