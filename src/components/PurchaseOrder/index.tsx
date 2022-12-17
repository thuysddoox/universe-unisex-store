import { useUpdateOrderByCustomer } from '@api/api';
import OrderItem from '@components/OrderItem';
import PurchaseOrderDetail from '@components/PurchaseOrderDetail';
import RateModal from '@components/RateModal';
import { STATUS_ORDER } from '@constants/enum';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { Order } from '@interfaces';
import Button from '@ui/button';
import { Message } from '@ui/message';
import { confirm } from '@ui/modal';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { FcPaid } from 'react-icons/fc';
import { IoTimeOutline } from 'react-icons/io5';
import { SafeAny } from '../../interfaces/common';

const PurchaseOrder = ({ data, refetch, index }: { data?: Order; refetch?: SafeAny; index?: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenRate, setIsOpenRate] = useState<boolean>(false);
  const handleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const { mutate: updateOrderFunc, isLoading } = useUpdateOrderByCustomer({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status == 200) {
        Message.success(messages.cancelOrderSuccess);
        refetch();
      } else Message.error(error?.message);
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleUpdateOrder = (title: string) => {
    confirm({
      title: 'Confirm',
      content: title,
      onOk: () => {
        updateOrderFunc(data?._id);
      },
    });
  };
  const handleOpenRate = () => {
    setIsOpenRate(!isOpenRate);
  };
  console.log(isOpenRate);
  return (
    <PurchaseOrderWrapper className="bg-gray-200 p-5 rounded">
      <div className="flex justify-between items-center py-2">
        <div>
          <strong className="text-base">ORDER #{index + 1 ?? data?._id}</strong>
          <p>({data?.products?.length} sản phẩm)</p>
        </div>
        <div>
          <span>{STATUS_ORDER[data?.status]}</span>
          <span>
            {data?.isPaid && (
              <>
                <span> | </span>
                <span>Paid</span>
                <FcPaid />
              </>
            )}
          </span>
        </div>
      </div>
      <div>
        {data?.products?.slice(0, 2)?.map((product) => (
          <OrderItem
            data={{ product, quantity: product?.quantity }}
            key={product?.productId}
            isCheckout={true}
            className="pb-2 mb-2"
          />
        ))}
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="cursor-pointer text-blue-500 underline" onClick={handleOpen}>
          More detail
        </span>
        <span className="text-base font-medium">
          Total: <span className="text-2xl text-blue-500 ml-5 inline-block">${data?.total + data?.shipCost}</span>
        </span>
      </div>
      <div className="flex justify-between items-end mb-3">
        <div className="flex justify-start items-center">
          <IoTimeOutline />
          <span className="text-xs font-medium ml-1">{dayjs(data?.createdAt).format('HH:mm, DD-MM-YYYY')}</span>
        </div>

        {data?.status === 4 && (
          <Button
            borderradius={'3px'}
            textcolor={'#fff'}
            bordercolor={'var(--navy)'}
            bgColor={'var(--navy)'}
            size="small"
            className="text-sm font-medium flex justify-end"
            onClick={handleOpenRate}
          >
            Rate
          </Button>
        )}
        {data?.status === 1 && !data?.isPaid && (
          <Button
            borderradius={'3px'}
            textcolor={'#fff'}
            bordercolor={'var(--navy)'}
            bgColor={'var(--navy)'}
            size="small"
            className="text-sm font-medium flex justify-end"
            onClick={() => handleUpdateOrder('Do you want to cancel this order!')}
          >
            Cancel
          </Button>
        )}
        {data?.status === 3 && !data?.isPaid && (
          <Button
            borderradius={'3px'}
            textcolor={'#fff'}
            bordercolor={'var(--navy)'}
            bgColor={'var(--navy)'}
            size="small"
            className="text-sm font-medium flex justify-end"
            onClick={() => handleUpdateOrder('Did you reveive and pay this order!')}
          >
            Received
          </Button>
        )}
      </div>
      <PurchaseOrderDetail data={data} handleOpen={handleOpen} isOpen={isOpen} />
      <RateModal refetch={refetch} order={data} open={isOpenRate} handleOpen={handleOpenRate} />
    </PurchaseOrderWrapper>
  );
};

const PurchaseOrderWrapper = styled.div``;

export default React.memo(PurchaseOrder);
