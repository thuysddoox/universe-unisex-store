import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import NextImage from '../../components/NextImage/index';
import { UserContext } from '../../contexts/userContext';
import { useContext } from 'react';
import { AiOutlineEnvironment, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
const ProfilePhoto = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  return (
    <div className="bg-white rounded-sm py-4">
      <div className="rounded-lg text-center mb-4 px-4">
        <Avatar size={100} src={`${router.basePath}/assets/images/background/bg1.jpg`} />
        <h4 className="text-lg sm:text-xl font-semibold mt-4 uppercase">
          {currentUser?.username ?? currentUser?.displayName ?? currentUser?.lastName + currentUser?.firstName}
        </h4>
      </div>
      <div className="border-t border-gray-300">
        {currentUser?.phone && (
          <p className="flex items-center text-sm my-2 px-4 pt-4">
            <AiOutlinePhone className="text-lg" />
            <span className="ml-2">{currentUser?.phone}</span>
          </p>
        )}
        {currentUser?.email && (
          <p className="flex items-center text-sm my-2 px-4">
            <AiOutlineMail className="text-lg" />
            <span className="ml-2">{currentUser?.email}</span>
          </p>
        )}
        {currentUser?.address && (
          <p className="flex items-center text-sm my-2 px-4">
            <AiOutlineEnvironment className="text-lg" />
            <span className="ml-2">{currentUser?.address}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
