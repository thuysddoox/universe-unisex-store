import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import NextImage from '../../components/NextImage/index';
import { UserContext } from '../../contexts/userContext';
import { useContext } from 'react';
import { AiOutlineEnvironment, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import UploadSingle from '@components/UploadSingle';
import { useUpdateUser } from '../../network/queries/user';
import { Message } from '@ui/message';
import messages from '@constants/messages';
const ProfilePhoto = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser, updateUserInfo } = useContext(UserContext);
  const { mutate: updateUserFunc, isLoading } = useUpdateUser({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        updateUserInfo(response?.data?.responseData?.user);
        Message.success(messages.updateUserProfileSuccess);
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleSave = (_, imgUrl: string) => {
    console.log(imgUrl);
    updateUserFunc({ ...currentUser, avatar: imgUrl });
  };
  return (
    <div className="bg-white rounded-sm py-4">
      <div className="rounded-lg text-center mb-4 px-4">
        <UploadSingle imgUrl={currentUser?.avatar ?? ''} handleSave={handleSave} />
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
