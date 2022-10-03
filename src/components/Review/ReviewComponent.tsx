import styled from '@emotion/styled';
import { Avatar, Card, List, Rate } from 'antd';
import Meta from 'antd/lib/card/Meta';

const ReviewComponent = () => {
  return (
    <ReviewComponentWrap>
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
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" className='border-2 border-white'/>}
          title={<a href={'item.href'}>{'item.title'}</a>}
          description={<Rate allowClear={false} defaultValue={1} count={5} className={'text-sm'} />}
        />
        <div className="w-full">
          <p className="my-2">item.content</p>
          <p>12-09-2022 16:33</p>
        </div>
      </List.Item>
    </ReviewComponentWrap>
  );
};
const ReviewComponentWrap = styled.div`
  .ant-rate-star-zero{
    .ant-rate-star-first, .ant-rate-star-second{
      color: white;
    }
  } 
`;
export default ReviewComponent;
