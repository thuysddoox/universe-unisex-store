import { getBase64 } from '@components/UploadImage';
import { Message } from '@ui/message';
import { Upload, UploadButton } from '@ui/upload';
import { Image } from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';

export const UploadSingle = ({
  imgUrl,
  handleSave,
  id,
}: {
  imgUrl?: string;
  id?: string;
  handleSave?: (id?: string, thumbnail?: string) => void;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(imgUrl);
  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
        handleSave(id, info.file.response?.responseData?.url);
      });
    }
    if (info.file.status === 'error') {
      Message.error(info.file.error);
    }
  };
  console.log(imageUrl);
  return (
    <>
      <Upload
        name="avatar"
        multiple={false}
        action={`http://localhost:3000/api/upload/single`}
        onChange={handleChange}
        maxCount={1}
        showUploadList={false}
      >
        <UploadButton
          hide={true}
          icon={
            imageUrl ? (
              <Image preview={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <BiImageAdd className="text-4xl" />
            )
          }
        />
      </Upload>
    </>
  );
};
export default UploadSingle;
