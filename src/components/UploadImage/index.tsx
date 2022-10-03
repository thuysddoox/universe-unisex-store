
import { UserContext } from '@contexts'
import { Upload, UploadButton } from '@ui/upload'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
interface UploadImageProps {
  setLogoId: React.Dispatch<React.SetStateAction<number>>
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const getUrl = (
  // session: Session,
  userId: number,
  guid: string,
  fileName: string
) => {
  // const url = `https://${session?.bucket}.s3.${session?.region}.amazonaws.com/bse-upload/image/user/${userId}/${guid}/${fileName}`
  const url=''

  return url
}

export const UploadImage = ({ setLogoId }: UploadImageProps) => {
  const userContext = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  return (
    <Upload listType='picture-card' maxCount={1} onChange={()=>{}}>
      {imageUrl
        ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
        : <UploadButton isLoading={loading} />
      }
    </Upload>
  )
}
export default UploadImage
