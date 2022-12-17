import { useCreateComment } from '@api/api';
import ReviewItem from '@components/ReviewItem';
import messages from '@constants/messages';
import { Order } from '@interfaces/index';
import Button from '@ui/button';
import { Message } from '@ui/message';
import { Modal } from '@ui/modal';
import { Grid } from 'antd';
import React, { useState, useEffect } from 'react';
import { SafeAny } from '../../interfaces/common';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const { useBreakpoint } = Grid;
const RateModal = ({
  order,
  open,
  handleOpen,
  refetch,
}: {
  order: Order;
  open?: boolean;
  handleOpen: () => void;
  refetch: SafeAny;
}) => {
  const screens = useBreakpoint();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isGetData, setIsGetData] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);
  const { mutate: rateProductFunc, isLoading } = useCreateComment({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 201 || response?.status === 200) {
        Message.success(messages.rateProduct);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
      handleOpen();
      setIsGetData(!isGetData);
      setComments([]);
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
      handleOpen();
      setIsGetData(!isGetData);
      setComments([]);
    },
  });
  const handleRateProduct = () => {
    setIsGetData(!isGetData);
  };
  useEffect(() => {
    if (isGetData) {
      const data = comments?.map((comment) => ({
        ...comment,
        username: currentUser?.username,
        avatar: currentUser?.avatar,
        replyComments: [],
        owner: currentUser?._id,
      }));
      rateProductFunc({ comments: data, orderId: order?._id });
      console.log(data);
    }
  }, [comments]);
  console.log(comments);
  return (
    <Modal
      centered
      closable
      open={open}
      title={<h3 className="text-lg uppercase">Rate and Review</h3>}
      footer={
        <>
          <Button
            className="font-semibold mr-4"
            block
            size="large"
            type="primary"
            loading={isLoading}
            onClick={handleRateProduct}
          >
            Submit
          </Button>
          <Button className="font-semibold" bordercolor="var(--navy)" block size="large" onClick={handleOpen}>
            Cancel
          </Button>
        </>
      }
      onOk={handleRateProduct}
      onCancel={handleOpen}
      className="rate-modal"
      width={screens.xl ? '60vw' : screens.lg ? '70vw' : screens.md ? '80vw' : '90vw'}
      bodyStyle={{
        background: '#ffffff',
        margin: '0 0 32px 0',
      }}
    >
      {order?.products?.map((product, index) => (
        <ReviewItem key={product?.productId + index} isGetData={isGetData} data={product} getData={setComments} />
      ))}
    </Modal>
  );
};
export default React.memo(RateModal);
