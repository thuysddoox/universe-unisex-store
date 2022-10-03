import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Upload as AntdUpload, UploadProps } from 'antd';
import { ReactNode } from 'react';

export const UploadButton = ({ isLoading }: { isLoading?: boolean }) => (
  <div>
    {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export const Upload = (props: UploadProps & { children?: ReactNode }) => {
  return (
    <UploadWrapper>
      <AntdUpload {...props} />
    </UploadWrapper>
  );
};

const UploadWrapper = styled.div`
  .ant-upload-list {
    display: flex;
    flex-wrap: wrap;
  }
  .ant-upload-list-picture-card-container {
    order: 2;
  }
  .ant-upload.ant-upload-select-picture-card {
    order: 1;
  }
  .ant-upload-list-picture .ant-upload-list-item,
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover;
  }
  .ant-upload.ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 124px;
    height: 124px;
  }
`;
