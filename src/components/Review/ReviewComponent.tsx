import styled from '@emotion/styled';
import { Comment } from '@interfaces/common';
import { Avatar, Card, List, Rate } from 'antd';
import Meta from 'antd/lib/card/Meta';
import dayjs from 'dayjs';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { format } from '../../utils/utils';
import { useState } from 'react';
import { FcAssistant } from 'react-icons/fc';

const ReviewComponent = ({
  comment,
  className,
  isSeller = false,
}: {
  comment?: Comment;
  className?: string;
  isSeller?: boolean;
}) => {
  const [openResponse, setOpenResponse] = useState<boolean>(false);
  return (
    <ReviewComponentWrap className={className}>
      <List.Item
        key={'shfsjkdf'}
        className="flex-wrap bg-gray-200 my-4 p-4 rounded-lg"
        actions={
          [
            // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]
        }
      >
        <List.Item.Meta
          className="w-full"
          avatar={
            !isSeller ? (
              comment?.owner?.avatar ? (
                <Avatar src={comment?.owner?.avatar} className="border-2 border-white" />
              ) : (
                <FaUserCircle className="text-2xl" />
              )
            ) : (
              <FcAssistant className="text-2xl" />
            )
          }
          title={<span>{comment?.owner?.username}</span>}
          description={
            !isSeller ? (
              <Rate allowClear={false} defaultValue={comment?.rate} count={5} className={'text-sm'} />
            ) : (
              <span className="text-blue-400">UNIS STORE</span>
            )
          }
        />
        <div className="w-full">
          <p className="my-2" dangerouslySetInnerHTML={{ __html: comment?.content ?? '' }}></p>
          <div className="flex items-center justify-between">
            <span>{dayjs(comment?.updatedAt ?? comment?.createdAt).format('DD-MM-YYYY HH:MM')}</span>
            {comment?.replyComments?.length > 0 && (
              <span className="flex items-center cursor-pointer" onClick={() => setOpenResponse(!openResponse)}>
                <span>Seller Response</span>
                {openResponse ? <AiOutlineUp /> : <AiOutlineDown />}
              </span>
            )}
          </div>
        </div>
      </List.Item>
      {openResponse &&
        comment?.replyComments?.map((comment) => (
          <ReviewComponent className="my-4 ml-10" key={comment?._id} isSeller={true} comment={comment} />
        ))}
    </ReviewComponentWrap>
  );
};
const ReviewComponentWrap = styled.div`
  .ant-rate-star-zero {
    .ant-rate-star-first,
    .ant-rate-star-second {
      color: white;
    }
  }
`;
export default ReviewComponent;
