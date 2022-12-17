import { UserContext } from '@contexts';
import { Message } from '@ui/message';
import { Upload, UploadButton } from '@ui/upload';
import { Image } from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
interface UploadImageProps {
  // setLogoId: React.Dispatch<React.SetStateAction<number>>;
  getFileList: React.Dispatch<React.SetStateAction<string[]>>;
  name?: string;
  mutilple?: boolean;
  maxCount?: number;
  fileListUrl?: string[];
  handleRemove?: (url: string) => void;
}

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const UploadImage = ({
  getFileList,
  handleRemove,
  name,
  mutilple,
  maxCount,
  fileListUrl = [],
}: UploadImageProps) => {
  const userContext = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imagesUrl, setImagesUrl] = useState<string[]>(fileListUrl);
  const [fileList, setFileList] = useState<UploadFile[]>(
    fileListUrl?.map((url, index) => ({
      uid: index.toString(),
      name: `thumbnail${index}.png`,
      status: 'done',
      url: url,
    })),
  );
  const [visible, setVisible] = useState(false);

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
        setImagesUrl((prev) => [...prev, url]);
      });
      getFileList((prev) => [...prev, ...(info.file.response?.responseData?.listUrl ?? [])]);
    }
    if (info.file.status === 'error') {
      Message.error(info.file.error);
    }
  };

  const handlePreview = () => {
    setVisible(true);
  };
  const onRemove = (file: UploadFile<any>) => {
    handleRemove(file.response?.responseData?.listUrl[0] ?? file.response?.responseData?.url);
  };
  useEffect(() => {
    setImagesUrl(fileListUrl);
    setFileList(
      fileListUrl?.map((url, index) => ({
        uid: index.toString(),
        name: `thumbnail${index}.png`,
        status: 'done',
        url: url,
      })),
    );
  }, [fileListUrl]);
  return (
    <>
      <Upload
        listType="picture-card"
        name={name}
        multiple={mutilple}
        action={`http://localhost:3000/api/upload/multiple`}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={onRemove}
        maxCount={maxCount ?? 1}
        fileList={fileList}
      >
        {fileList.length > 10 ? <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton />}
      </Upload>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          {imagesUrl?.map((url, id) => (
            <Image src={url} key={url + id} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};
export default UploadImage;
