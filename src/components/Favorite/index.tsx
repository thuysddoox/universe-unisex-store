import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import messages from '@constants/messages';
import { UserContext } from '@contexts';
import styled from '@emotion/styled';
import { Ellipsis } from '@ui/ellipsis';
import { Message } from '@ui/message';
import { confirm } from '@ui/modal';
import { useContext } from 'react';
import { useFavoriteProduct } from '../../network/queries/favorite';

const Favorite = ({
  isFavorite,
  containerClass,
  heartClass,
  productId,
}: {
  isFavorite: boolean;
  containerClass?: string;
  heartClass?: string;
  productId?: string;
}) => {
  const { currentUser } = useContext(UserContext);
  const { mutate: handleFavoriteFunc, isLoading } = useFavoriteProduct({
    onSuccess: (response) => {
      const productResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (productResp) {
        Message.success(messages.addWishListSuccess);
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      console.log(error);
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleFavorite = () => {
    if (currentUser) {
      confirm({
        title: 'Confirm',
        content: messages.confirmAddToWishList,
        onOk: () => {
          handleFavoriteFunc(productId);
        },
      });
    } else Message.warning(messages.loginRequired);
  };
  return (
    <FavoriteWrapper className={`absolute top-0 text-blue-600 ${containerClass}`}>
      <Ellipsis placement="top" title="Add to Favorites">
        <span className={`block rounded-circle px-2 py-1 bg-gray-300 text-base ${heartClass}`} onClick={handleFavorite}>
          {!isFavorite ? <HeartOutlined /> : <HeartFilled />}
        </span>
      </Ellipsis>
    </FavoriteWrapper>
  );
};
const FavoriteWrapper = styled.div``;
export default Favorite;
