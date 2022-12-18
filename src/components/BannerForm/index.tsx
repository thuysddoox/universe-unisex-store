import { InboxOutlined } from '@ant-design/icons';
import { Banner } from '@interfaces/common';
import Button from '@ui/button';
import Form, { useForm } from '@ui/form';
import FormItem from '@ui/formitem';
import Input, { TextArea } from '@ui/input';
import { Message } from '@ui/message';
import { Col, Image, Row, UploadProps } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { SafeAny } from '../../interfaces/common';
import { useDeleteBanner, useUpdateBanner, useCreateBanner } from '../../network/queries/banner';
import messages from '@constants/messages';
import React, { useState, useEffect, useCallback, useMemo, SyntheticEvent } from 'react';
import _ from 'lodash';
import { confirm } from '@ui/modal';

const BannerForm = ({ banner, refetchList }: { banner?: Banner; refetchList?: SafeAny }) => {
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState<boolean>(_.every(Object.values(banner), _.isEmpty));
  const [intialValues, setIntialValues] = useState<Banner>(banner);
  const [imgUrl, setImgUrl] = useState<string>(banner?.imgUrl ?? '');
  const { mutate: deleteBannerFunc, isLoading: isDeleteLoading } = useDeleteBanner({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.deleteBannerSuccess);
        refetchList();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: updateBannerFunc, isLoading: isUpdateLoading } = useUpdateBanner({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.updateBannerSuccess);
        setIsEdit(false);
        refetchList();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: createBannerFunc, isLoading: isCreateLoading } = useCreateBanner({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.createBannerSuccess);
        refetchList();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const props: UploadProps = useMemo(
    () => ({
      name: 'avatar',
      multiple: false,
      showUploadList: false,
      maxCount: 1,
      // action: 'http://localhost:3000/api/upload/single',
      action: `${process.env.NEXT_PUBLIC_API_HOST_URL}/upload/single`,
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          setImgUrl(info.file?.response?.responseData?.url);
          Message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          Message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
    }),
    [banner?._id],
  );
  const handleAddBanner = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!imgUrl) Message.error('Please upload image for banner.');
    else {
      banner?._id && isEdit
        ? updateBannerFunc({ ...banner, ...form.getFieldsValue(), imgUrl })
        : createBannerFunc({ ...banner, ...form.getFieldsValue(), imgUrl });
    }
  };
  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    confirm({
      title: 'Confirm',
      content: 'Do you want to delete this banner?',
      onOk: () => {
        deleteBannerFunc(banner?._id);
      },
    });
  };
  useEffect(() => {
    setIntialValues(banner);
    setImgUrl((prev) => banner?.imgUrl ?? prev);
    form.setFieldsValue(banner);
  }, [banner]);
  console.log('sdf');
  return (
    <div className="bg-white my-6">
      <div className="flex justify-end items-center p-5">
        {_.every(Object.values(banner), _.isEmpty) || isEdit ? (
          <Button
            icon={<AiOutlineSave className="mr-1 text-xl" />}
            borderradius="3px"
            bgColor="var(--navy)"
            textcolor="white"
            lineheight={'30px'}
            size="small"
            className="ml-2"
            loading={isCreateLoading || isUpdateLoading}
            onClick={handleAddBanner}
          >
            Save
          </Button>
        ) : (
          <Button
            icon={<AiOutlineEdit className="mr-1 text-xl" />}
            borderradius="3px"
            bgColor="var(--warning)"
            bordercolor={'var(--warning)'}
            textcolor="white"
            lineheight={'30px'}
            size="small"
            className="ml-2"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </Button>
        )}

        {!_.every(Object.values(banner), _.isEmpty) && (
          <Button
            borderradius={'3px'}
            icon={<AiOutlineDelete className="mr-1 text-xl" />}
            size="small"
            borderless={true}
            bgColor="var(--red-error)"
            textcolor="#fff"
            className="font-medium ml-2"
            bordercolor={'var(--red-error)'}
            lineheight="30px"
            loading={isDeleteLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
      <Row className="bg-white p-5 border-t border-gray-200">
        <Col span={24} md={12}>
          {' '}
          <Dragger {...props} className="relative">
            <p
              className={`ant-upload-drag-icon mb-0 absolute inset-0 flex flex-wrap items-center justify-center ${
                imgUrl && 'z-10 bg-[rgba(0,0,0,0.1)] '
              } `}
            >
              <div>
                <InboxOutlined />
                <p className="ant-upload-text w-full text-green-500">Click or drag file to this area to upload</p>
              </div>
            </p>
            {imgUrl && <Image preview={false} src={imgUrl} className="object-contain max-h-[250px]" />}
          </Dragger>
        </Col>
        <Col span={24} md={12}>
          <div className="pl-6">
            <Form form={form} initialValues={intialValues} disabled={!isEdit && !_.isEmpty(banner)}>
              <FormItem name="title1" label="Title 1" required={false} className="mb-4">
                <Input placeholder="title" borderradius="0px" />
              </FormItem>
              <FormItem name="title2" label="Title 2" required={false} className="mb-4">
                <Input placeholder="title" borderradius="0px" />
              </FormItem>
              <FormItem name="description" label="Description" required={false} className="mb-0">
                <TextArea rows={4} placeholder="description" className="rounded-0 w-full" borderradius={'4px'} />
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default BannerForm;
