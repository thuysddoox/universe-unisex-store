import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Ellipsis } from '@ui/ellipsis';

const Favorite = ({ isFavorite, containerClass, heartClass }: { isFavorite: boolean; containerClass?: string, heartClass?: string }) => {
  return (
    <FavoriteWrapper className={`absolute top-0 text-blue-600 ${containerClass}`}>
      <Ellipsis placement="top" title="Add to Favorites">
        <span className={`block rounded-circle px-2 py-1 bg-gray-300 text-base ${heartClass}`}>
          {isFavorite ? <HeartOutlined /> : <HeartFilled />}
        </span>
      </Ellipsis>
    </FavoriteWrapper>
  );
};
const FavoriteWrapper = styled.div``;
export default Favorite;
