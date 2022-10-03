import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import NextImage from '../../components/NextImage/index';
const ProfilePhoto = ()=>{
  const router = useRouter();
  return (
    <div className="bg-gray-200 pt-4 rounded-lg text-center mb-5">
      <Avatar size={100} src={`${router.basePath}/assets/images/background/bg1.jpg`} />
      <h4 className="text-lg sm:text-xl font-semibold mt-5">ThuysDDoox</h4>
    </div>
  )
}

export default ProfilePhoto;